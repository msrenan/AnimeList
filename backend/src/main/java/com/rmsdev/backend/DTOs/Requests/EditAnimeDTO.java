package com.rmsdev.backend.DTOs.Requests;

import com.rmsdev.backend.Enums.ReleaseDay;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

public record EditAnimeDTO(
        @Size(max = 255, message = "Title can't be longer than 255 characters!")
        String title,

        @Min(value = 0, message = "Season can't be negative!")
        Integer season,

        @Min(value = 0, message = "Episode can't be negative!")
        Integer episode,

        ReleaseDay releaseDay,
        Boolean isFinished,
        Boolean watched,
        Boolean favorite,
        Boolean waitingForNextSeason,
        Boolean needToWatch
) {
}
