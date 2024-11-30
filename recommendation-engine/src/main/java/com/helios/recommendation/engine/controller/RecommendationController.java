package com.helios.recommendation.engine.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/recommendation")
public class RecommendationController {

    // Endpoint for user registration
    @GetMapping()
    public ResponseEntity<String> register() {
        return ResponseEntity.ok("User registered successfully");
    }
}
