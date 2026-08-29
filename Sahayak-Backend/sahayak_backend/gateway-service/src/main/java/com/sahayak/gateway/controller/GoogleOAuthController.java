package com.sahayak.gateway.controller;

import com.sahayak.gateway.handler.GoogleOAuthHandler;
import com.sahayak.proto.model.entity.AuthResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/v1/auth")
public class GoogleOAuthController {

    @Autowired
    private GoogleOAuthHandler googleOAuthHandler;

    @GetMapping("/google")
    public void redirectToGoogle(HttpServletResponse response) throws Exception {
        String redirectUrl = googleOAuthHandler.buildGoogleOAuthUrl();
        response.sendRedirect(redirectUrl);
    }

    @GetMapping("/google/callback")
    public void handleGoogleCallback(@RequestParam("code") String code, HttpServletResponse response) throws Exception {
        // Your handler returns an object that has both JWT and userId
        AuthResponse result = googleOAuthHandler.processGoogleCallback(code); // Updated method
        String jwt = result.getToken();
        Long userId = result.getUserId();

        // Redirect to frontend with both token and userId
        String frontendRedirectUrl = String.format(
                "http://localhost:3000/google-login-success?token=%s&userId=%s",
                jwt, userId
        );
        response.sendRedirect(frontendRedirectUrl);
    }

}
