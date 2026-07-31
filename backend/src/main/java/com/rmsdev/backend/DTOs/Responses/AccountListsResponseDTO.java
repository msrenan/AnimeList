package com.rmsdev.backend.DTOs.Responses;

import com.rmsdev.backend.Entities.Account;

import java.util.List;
import java.util.UUID;

public record AccountListsResponseDTO(UUID ownerId, List<AnimeListResponseDTO> lists) {

    public AccountListsResponseDTO(Account acc) {
        this(
                acc.getId(),
                acc.getLists().stream().map(list -> new AnimeListResponseDTO(list)).toList()
        );
    }

}
