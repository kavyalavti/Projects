package com.sahayak.payment.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/v1/payment/**").permitAll()  // All payment APIs open
                        .anyRequest().authenticated()  // Protect other endpoints (if any)
                )
                .httpBasic().disable(); // No JWT, no HTTP Basic

        return http.build();
    }
}
