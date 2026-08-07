package com.rmsdev.backend.Controllers;

import com.rmsdev.backend.DTOs.Requests.LoginDTO;
import com.rmsdev.backend.DTOs.Responses.LoginResponseDTO;
import com.rmsdev.backend.DTOs.Requests.RegisterDTO;
import com.rmsdev.backend.Services.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<LoginResponseDTO> register(@Valid @RequestBody RegisterDTO dto) {
        var responseDTO = authService.register(dto);
        return ResponseEntity.ok(responseDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginDTO dto) {
        var responseDTO = authService.login(dto);
        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping("/check")
    public ResponseEntity<Void> check() {
        return ResponseEntity.ok().build();
    }
}
