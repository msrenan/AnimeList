package com.rmsdev.backend.DTOs.Requests;

import jakarta.validation.constraints.NotBlank;

public record EditAnimeListDTO(
        @NotBlank(message = "List name can't be blank!")
        String name) {
}
