package com.rmsdev.backend.DTOs.Requests;


import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Positive;

public record UpdateAnimeDTO(
        @Nullable
        @Positive(message = "Season can't be negative!")
        Integer season,
        @Nullable
        @Positive(message = "Episode can't be negative!")
        Integer episode,
        Boolean isFinished,
        Boolean waiting) {
}
