package com.rmsdev.backend.Controllers;

import com.rmsdev.backend.DTOs.Requests.LoginDTO;
import com.rmsdev.backend.DTOs.Requests.RegisterDTO;
import com.rmsdev.backend.DTOs.Responses.LoginResponseDTO;
import com.rmsdev.backend.Services.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<LoginResponseDTO> register(@Valid @RequestBody RegisterDTO dto) {
        return ResponseEntity.ok(authService.register(dto));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginDTO dto) {
        return ResponseEntity.ok(authService.login(dto));
    }

    @GetMapping("/check")
    public ResponseEntity<Void> check() {
        return ResponseEntity.ok().build();
    }
}
