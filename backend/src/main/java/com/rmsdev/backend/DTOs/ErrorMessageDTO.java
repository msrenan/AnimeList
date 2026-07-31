package com.rmsdev.backend.DTOs;

import java.time.Instant;

public record ErrorMessageDTO(String title, int code, String message, Instant timestamp) {
}
