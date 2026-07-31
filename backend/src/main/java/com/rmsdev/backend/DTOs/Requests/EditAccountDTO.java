package com.rmsdev.backend.DTOs.Requests;

import jakarta.validation.constraints.NotBlank;

public record EditAccountDTO(
        @NotBlank(message = "Nickname can't be blank!")
        String nickname) {
}
