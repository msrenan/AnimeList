package com.rmsdev.backend.DTOs.Responses;

import com.rmsdev.backend.Entities.Anime;
import com.rmsdev.backend.Enums.ReleaseDay;

import java.util.UUID;

public record AnimeResponseDTO(UUID id, String title, int season, int episode, ReleaseDay releaseDay, boolean isFinished,
                               boolean waitingForNextSeason, boolean watched, boolean favorite, boolean needToWatch) {

    public AnimeResponseDTO(Anime anime) {
        this(
                anime.getId(),
                anime.getTitle(),
                anime.getSeason(),
                anime.getEpisode(),
                anime.getReleaseDay(),
                anime.isFinished(),
                anime.isWaitingForNextSeason(),
                anime.isWatched(),
                anime.isFavorite(),
                anime.isNeedToWatch()
        );
    }

}
