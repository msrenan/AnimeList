package com.rmsdev.backend.DTOs.Requests;

import com.rmsdev.backend.Enums.ReleaseDay;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public record EditAnimeDTO(
        @NotBlank(message = "Title can't be Blank!")
        String title,
        @Nullable
        @Positive(message = "Season can't be negative!")
        Integer season,
        @Nullable
        @Positive(message = "Episode can't be negative!")
        Integer episode,
        ReleaseDay releaseDay,
        Boolean isFinished,
        Boolean favorite,
        Boolean rewatch,
        Boolean waiting) {
}
