package com.rmsdev.backend.DTOs.Requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record LoginDTO(
        @NotBlank(message = "Email/Username can't be blank!")
        @NotNull(message = "Emaail/Username can't be null!")
        String login,
        @NotNull(message = "Password can't be blank!")
        @NotBlank(message = "Password can't be null!")
        String password) {
}
