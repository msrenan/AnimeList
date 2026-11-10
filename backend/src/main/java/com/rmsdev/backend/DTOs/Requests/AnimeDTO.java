package com.rmsdev.backend.DTOs.Requests;

import com.rmsdev.backend.Enums.ReleaseDay;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AnimeDTO(
        @NotBlank(message = "Title can't be blank!")
        @Size(max = 255, message = "Title can't be longer than 255 characters!")
        String title,

        @NotNull(message = "Season can't be null!")
        @Min(value = 0, message = "Season can't be negative!")
        Integer season,

        @NotNull(message = "Episode can't be null!")
        @Min(value = 0, message = "Episode can't be negative!")
        Integer episode,

        @NotNull(message = "Release Day can't be null!")
        ReleaseDay releaseDay,

        @NotNull(message = "isFinished can't be null!")
        Boolean isFinished,

        @NotNull(message = "Watched can't be null!")
        Boolean watched,

        @NotNull(message = "Favorite can't be null!")
        Boolean favorite,

        @NotNull(message = "Waiting can't be null!")
        Boolean waitingForNextSeason,

        @NotNull(message = "Need to Watch can't be null!")
        Boolean needToWatch
) {
}
