package com.rmsdev.backend.DTOs.Responses;

import java.util.UUID;

public record LoginResponseDTO(UUID accountId, String token) {
}
