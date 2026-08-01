package com.rmsdev.backend.DTOs;

import java.time.Instant;
import java.util.Map;

public record InvalidFieldDTO(String title, int code, Map<String, String> message, Instant timestamp) {
}
