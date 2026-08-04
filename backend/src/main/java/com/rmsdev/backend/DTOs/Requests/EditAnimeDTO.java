package com.rmsdev.backend.DTOs.Requests;

import com.rmsdev.backend.Enums.ReleaseDay;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record EditAnimeDTO(
        String title,
        Integer season,
        Integer episode,
        ReleaseDay releaseDay,
        Boolean isFinished,
        Boolean watched,
        Boolean favorite,
        Boolean waitingForNextSeason,
        Boolean needToWatch) {
}
