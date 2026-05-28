package com.example.security.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping
public class ContentController {

    @GetMapping("/user/content")
    public ResponseEntity<Map<String, String>> getUserContent() {
        return ResponseEntity.ok(Map.of(
                "message", "Welcome! This is secure content fetched from the backend (accessible to both USER and ADMIN)."
        ));
    }

    @GetMapping("/admin/content")
    public ResponseEntity<Map<String, String>> getAdminContent() {
        return ResponseEntity.ok(Map.of(
                "message", "Access Granted! This is high-privilege administrative content (accessible ONLY to ADMIN)."
        ));
    }
}
