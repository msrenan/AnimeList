package com.rmsdev.backend.DTOs.Requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;
import java.util.UUID;

public record AnimeListDTO(
        @NotBlank(message = "List name can't be blank!")
        @NotNull(message = "List name can't be null!")
        String name,
        List<UUID> animeIds) {
}
