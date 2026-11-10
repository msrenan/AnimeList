package com.rmsdev.backend.DTOs.Requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record EditAccountDTO(
        @NotBlank(message = "Nickname can't be blank!")
        @Size(min = 3, max = 32, message = "Nickname must have between 3 and 32 characters!")
        String nickname
) {
}
