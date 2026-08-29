package com.sahayak.gateway.handler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sahayak.gateway.config.GoogleOAuthConfig;
import com.sahayak.proto.model.entity.AuthResponse;
import com.sahayak.proto.model.entity.UserDTO;
import com.sahayak.store.entity.User;
import com.sahayak.gateway.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
        import java.util.*;

@Service
public class GoogleOAuthHandler {

    @Autowired
    private GoogleOAuthConfig config;

    @Autowired
    private UserHandler userHandler;

    @Autowired
    private JwtUtil jwtUtil;

    private final RestTemplate restTemplate = new RestTemplate();

    public String buildGoogleOAuthUrl() {
        String scope = "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
        String url = "https://accounts.google.com/o/oauth2/v2/auth" +
                "?client_id=" + config.getClientId() +
                "&redirect_uri=" + config.getRedirectUri() +
                "&response_type=code" +
                "&scope=" + scope +
                "&access_type=offline" +
                "&prompt=consent";
        return url;
    }

    public AuthResponse processGoogleCallback(String code) {
        // Exchange code for access token
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("code", code);
        body.add("client_id", config.getClientId());
        body.add("client_secret", config.getClientSecret());
        body.add("redirect_uri", config.getRedirectUri());
        body.add("grant_type", "authorization_code");

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(config.getTokenUri(), request, String.class);

        String accessToken = null;
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode jsonNode = mapper.readTree(response.getBody());
            accessToken = jsonNode.get("access_token").asText();
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse access token", e);
        }

        // Fetch user profile
        HttpHeaders profileHeaders = new HttpHeaders();
        profileHeaders.setBearerAuth(accessToken);
        HttpEntity<String> profileRequest = new HttpEntity<>(profileHeaders);
        ResponseEntity<String> profileResponse = restTemplate.exchange(config.getUserInfoUri(), HttpMethod.GET, profileRequest, String.class);

        String email = null;
        String name = null;
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode profileJson = mapper.readTree(profileResponse.getBody());
            email = profileJson.get("email").asText();
            name = profileJson.get("name").asText();
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse user profile", e);
        }

        // Check if user exists
        UserDTO.Builder userDTO = UserDTO.newBuilder();
        User user = userHandler.loadOrCreateGoogleUser(email, name);
        String token = jwtUtil.generateToken(user.getUsername());
        Long userId = user.getUserId();
        AuthResponse authResponse = AuthResponse.newBuilder()
                .setToken(token)
                .setMessage("Login successful")
                .setUserId(userId)
                .build();

        return authResponse;
    }
}
