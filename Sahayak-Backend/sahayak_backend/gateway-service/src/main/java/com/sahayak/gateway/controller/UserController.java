package com.sahayak.gateway.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.protobuf.InvalidProtocolBufferException;
import com.google.protobuf.util.JsonFormat;
import com.sahayak.proto.model.entity.AuthRequest;
import com.sahayak.proto.model.entity.AuthResponse;
import com.sahayak.proto.model.entity.UserDTO;
import com.sahayak.gateway.handler.UserHandler;
import com.sahayak.proto.model.entity.UserRole;
import com.sahayak.gateway.security.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserHandler userHandler;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;

    private final Logger logger = LoggerFactory.getLogger(UserController.class.getName());

    @Autowired
    public UserController(UserHandler userHandler,
                          AuthenticationManager authenticationManager,
                          UserDetailsService userDetailsService,
                          JwtUtil jwtUtil) {
        this.userHandler = userHandler;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<Long> registerUser(@RequestBody JsonNode jsonNode) {
        try {
            UserDTO.Builder userDTO = UserDTO.newBuilder();
            JsonFormat.parser().merge(String.valueOf(jsonNode), userDTO);
            userDTO.setRole(UserRole.USER_VALUE);
            Long id = userHandler.register(userDTO.build());
            return ResponseEntity.ok(id);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }



    @GetMapping("/{id}")
    public ResponseEntity<?> getAllUserInfo(@RequestHeader("Authorization") String token, @PathVariable Long id) {
        try {

            UserDTO user = userHandler.getUserFromId(id);

            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

            // Return user info as response
            String jsonResponse = JsonFormat.printer().print(user);
            return ResponseEntity.ok()
                    .header("Content-Type", "application/json")
                    .body(jsonResponse);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id,
            @RequestBody JsonNode jsonNode) {
        try {
            UserDTO.Builder updatedUser = UserDTO.newBuilder();
            JsonFormat.parser().merge(String.valueOf(jsonNode), updatedUser);

            UserDTO savedUser = userHandler.updateUser(id, updatedUser.build());

            String jsonResponse = JsonFormat.printer().print(savedUser);
            return ResponseEntity.ok()
                    .header("Content-Type", "application/json")
                    .body(jsonResponse);
        } catch (InvalidProtocolBufferException e) {
            throw new RuntimeException(e);
        } catch (Exception e) {
            logger.error("Error updating user: " + e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Error updating user");
        }
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody JsonNode jsonNode) {
        try {
            AuthRequest.Builder request = AuthRequest.newBuilder();
            JsonFormat.parser().merge(String.valueOf(jsonNode), request);
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUserName(), request.getPassword())
            );

            UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUserName());
            Long userId = userHandler.getUserIdFromEmail(request.getUserName());
            String jwt = jwtUtil.generateToken(userDetails.getUsername());
            AuthResponse response = AuthResponse.newBuilder()
                    .setToken(jwt)
                    .setMessage("Login successful")
                    .setUserId(userId)
                    .build();

            String jsonResponse = JsonFormat.printer().print(response);

            // Return the JSON response
            return ResponseEntity.ok()
                    .header("Content-Type", "application/json")
                    .body(jsonResponse);


        } catch (BadCredentialsException e) {
            logger.error("Login failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        } catch (InvalidProtocolBufferException e) {
            throw new RuntimeException(e);
        } catch (Exception e) {
            // Handle exception if any
            return ResponseEntity.status(500).body("Error generating response");
        }
    }
}
