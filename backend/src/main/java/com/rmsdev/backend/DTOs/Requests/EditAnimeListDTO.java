package com.rmsdev.backend.DTOs.Requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record EditAnimeListDTO(
        @NotBlank(message = "List name can't be blank!")
        @Size(max = 60, message = "List name can't be longer than 60 characters!")
        String name
) {
}
