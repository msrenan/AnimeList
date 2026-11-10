package com.rmsdev.backend.DTOs.Requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginDTO(
        @NotBlank(message = "Email/Username can't be blank!")
        @Size(max = 255, message = "Email/Username is too long!")
        String login,

        @NotBlank(message = "Password can't be blank!")
        @Size(max = 100, message = "Password is too long!")
        String password
) {
}
