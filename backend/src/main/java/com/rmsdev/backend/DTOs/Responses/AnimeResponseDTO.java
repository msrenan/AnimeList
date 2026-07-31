package com.rmsdev.backend.DTOs.Responses;

import com.rmsdev.backend.Entities.Anime;
import com.rmsdev.backend.Enums.ReleaseDay;

import java.time.Instant;
import java.util.UUID;

public record AnimeResponseDTO(UUID id, String title, int season, int episode, ReleaseDay releaseDay, boolean isFinished,
                               boolean waiting, boolean rewatch, boolean favorite) {

    public AnimeResponseDTO(Anime anime) {
        this(
                anime.getId(),
                anime.getTitle(),
                anime.getSeason(),
                anime.getEpisode(),
                anime.getReleaseDay(),
                anime.isFinished(),
                anime.isWaiting(),
                anime.isRewatch(),
                anime.isFavorite()
        );
    }

}
