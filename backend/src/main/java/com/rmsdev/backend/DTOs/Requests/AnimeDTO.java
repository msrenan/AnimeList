package com.rmsdev.backend.DTOs.Requests;

import com.rmsdev.backend.Enums.ReleaseDay;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record AnimeDTO(@NotBlank(message = "Title can't be blank!") @NotNull(message = "Title can't be null!") String title,
                       @NotNull(message = "Season can't be null!")
                       @Positive(message = "Season can't be negative!")
                       int season,
                       @NotNull(message = "Episode can't be null!")
                       @Positive(message = "Episode can't be negative!")
                       int episode,
                       @NotNull(message = "Release Day can't be null!")
                       ReleaseDay releaseDay,
                       @NotNull(message = "isFinished can't be null!")
                       boolean isFinished,
                       @NotNull(message = "Rewatch can't be null!")
                       boolean rewatch,
                       @NotNull(message = "Favorite can't be null!")
                       boolean favorite,
                       @NotNull(message = "Waiting can't be nulL!")
                       boolean waiting) {
}
