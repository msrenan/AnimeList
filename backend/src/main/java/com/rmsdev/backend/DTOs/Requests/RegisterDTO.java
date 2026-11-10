package com.rmsdev.backend.DTOs.Requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterDTO(
        @NotBlank(message = "Nickname can't be blank!")
        @Size(min = 3, max = 32, message = "Nickname must have between 3 and 32 characters!")
        String nickname,

        @NotBlank(message = "Email can't be blank!")
        @Email(message = "Invalid email!")
        @Size(max = 255, message = "Email is too long!")
        String email,

        @NotBlank(message = "Password can't be blank!")
        @Size(min = 6, max = 100, message = "Password must have between 6 and 100 characters!")
        String password
) {
}
