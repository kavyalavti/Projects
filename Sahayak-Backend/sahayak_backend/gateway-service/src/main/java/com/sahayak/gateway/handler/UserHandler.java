package com.sahayak.gateway.handler;

import com.sahayak.proto.model.entity.UserDTO;
import com.sahayak.store.entity.User;
import com.sahayak.store.repository.IUserRepository;
import com.sahayak.gateway.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserHandler implements UserDetailsService {

    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserHandler(IUserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public Long register(UserDTO userDTO) throws Exception {
        try {
            String rawPassword = userDTO.getPassword();  // assuming getPassword() gives you the raw password
            String hashedPassword = passwordEncoder.encode(rawPassword);
            if (userRepository.existsByEmail(userDTO.getEmail())) {
                throw new RuntimeException("User with this email already exists");
            }
            User user = UserMapper.toEntity(userDTO);
            user.setPasswordHash(hashedPassword);
            Long id = userRepository.save(user).getUserId();
            if (id == null) {
                throw new RuntimeException("Failed to register user: Repository returned null");
            }
            return id;
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    public UserDTO updateUser(Long id, UserDTO updatedData) throws Exception{
        try {
            User user = userRepository.getReferenceById(id);

            if(updatedData.hasEmail()) {
                user.setEmail(updatedData.getEmail());
            }
            if(updatedData.hasName()) {
                user.setName(updatedData.getName());
            }
            if(updatedData.hasPhoneNumber()) {
                user.setPhoneNumber(updatedData.getPhoneNumber());
            }
            if(updatedData.hasPassword()) {
                String rawPassword = updatedData.getPassword();
                String hashedPassword = passwordEncoder.encode(rawPassword);
                user.setPasswordHash(hashedPassword);
            }

            userRepository.save(user);

            return UserMapper.toDto(user);
        } catch (Exception e) {
            throw new RuntimeException("Failed to update user: " + e.getMessage());
        }

    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }
    // Method to retrieve UserId from email for authentication or other purposes
    public Long getUserIdFromEmail(String email) throws UsernameNotFoundException {
        // Find the user by email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        // Return the UserId
        return user.getUserId();
    }
    public UserDTO getUserFromId(Long id) {
        User user = userRepository.getReferenceById(id);
        return UserMapper.toDto(user);
    }

    // Inside your existing UserHandler.java
    public User loadOrCreateGoogleUser(String email, String name) {
        Optional<User> user = userRepository.findByEmail(email);

        return user.get();
    }


}
