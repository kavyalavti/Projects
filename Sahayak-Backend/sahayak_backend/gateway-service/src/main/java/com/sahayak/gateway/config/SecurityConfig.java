package com.sahayak.gateway.config;

import com.sahayak.gateway.security.JwtAuthenticationFilter;
import com.sahayak.gateway.handler.UserHandler;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtFilter;

    private final UserHandler userHandler;

    public SecurityConfig(UserHandler userHandler) {
        this.userHandler = userHandler;
    }

    @Value("${service-communication-api-key}")
    private String internalServiceApiKey;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors().and()
                .csrf().disable()
                .authorizeHttpRequests()
                // Public endpoints
                .requestMatchers(
                        "/api/v1/users/register",
                        "/api/v1/users/login",
                        "/api/v1/otp/**",
                        "/api/v1/campaign/public/**",
                        "/assets/**",
                        "/api/v1/auth/google",
                        "/api/v1/auth/google/callback"
                ).permitAll()
                // Cache invalidation endpoint: secured by API key
                .requestMatchers("/api/v1/gateway/cache/**").permitAll()
                // All other endpoints require JWT
                .anyRequest().authenticated()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider());


        http.addFilterBefore(new InternalApiKeyFilter(internalServiceApiKey), UsernamePasswordAuthenticationFilter.class);


        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userHandler);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public static class InternalApiKeyFilter extends OncePerRequestFilter {

        private final String expectedApiKey;

        public InternalApiKeyFilter(String expectedApiKey) {
            this.expectedApiKey = expectedApiKey;
        }

        private static final String API_KEY_HEADER = "X-Internal-Api-Key";

        @Override
        protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
                throws ServletException, IOException {

            String path = request.getRequestURI();

            if (path.startsWith("/api/v1/gateway/cache/")) {
                String apiKey = request.getHeader(API_KEY_HEADER);
                if (!expectedApiKey.equals(apiKey)) {
                    response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                    response.getWriter().write("Invalid API key for internal cache endpoint");
                    return;
                }
            }

            filterChain.doFilter(request, response);
        }
    }

}
