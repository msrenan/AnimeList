package com.rmsdev.backend.DTOs.Responses;

import com.rmsdev.backend.Entities.Account;

import java.util.UUID;

public record AccountResponseDTO(UUID id, String nick, String email) {

    public AccountResponseDTO(Account acc) {
        this(
          acc.getId(),
          acc.getNick(),
          acc.getEmail()
        );
    }
}
