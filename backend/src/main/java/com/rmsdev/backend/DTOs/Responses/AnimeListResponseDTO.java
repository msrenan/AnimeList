package com.rmsdev.backend.DTOs.Responses;

import com.rmsdev.backend.Entities.AnimeList;

import java.util.List;
import java.util.UUID;

public record AnimeListResponseDTO(UUID id, String name, UUID ownerId, List<AnimeResponseDTO> animes) {

    public AnimeListResponseDTO(AnimeList list) {
        this(
                list.getId(),
                list.getName(),
                list.getOwner().getId(),
                list.getAnimes().stream().map(anime -> new AnimeResponseDTO(anime)).toList()
        );
    }
}
