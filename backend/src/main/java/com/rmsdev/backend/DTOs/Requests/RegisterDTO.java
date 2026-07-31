package com.rmsdev.backend.DTOs.Requests;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RegisterDTO(
        @NotBlank(message = "Nickname can't be blank!")
        @NotNull(message = "Nickname can't be null!!")
        String nickname,
        @NotBlank(message = "Email can't be blank!")
        @NotNull(message = "Email can't be null!!")
        String email,
        @NotBlank(message = "Password can't be blank!")
        @NotNull(message = "Password can't be null!")
        String password)
{}
