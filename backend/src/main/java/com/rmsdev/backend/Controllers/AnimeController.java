package com.rmsdev.backend.Controllers;

import com.rmsdev.backend.DTOs.Requests.AnimeDTO;
import com.rmsdev.backend.DTOs.Requests.EditAnimeDTO;
import com.rmsdev.backend.DTOs.Responses.AnimeResponseDTO;
import com.rmsdev.backend.Enums.FilterOptions;
import com.rmsdev.backend.Services.AnimeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/anime")
public class AnimeController {

    private final AnimeService animeService;

    @GetMapping
    public ResponseEntity<List<AnimeResponseDTO>> getAnimes(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) FilterOptions filter) {
        return ResponseEntity.ok(animeService.getAnimes(search, filter));
    }

    @GetMapping("/id/{animeId}")
    public ResponseEntity<AnimeResponseDTO> getAnimeById(@PathVariable UUID animeId) {
        return ResponseEntity.ok(animeService.getAnimeById(animeId));
    }

    @PostMapping
    public ResponseEntity<AnimeResponseDTO> createAnime(@Valid @RequestBody AnimeDTO anime) {
        return ResponseEntity.ok(animeService.createAnime(anime));
    }

    @PutMapping("/id/{animeId}")
    public ResponseEntity<AnimeResponseDTO> editAnimeById(
            @PathVariable UUID animeId,
            @Valid @RequestBody EditAnimeDTO dto) {
        return ResponseEntity.ok(animeService.editAnimeById(animeId, dto));
    }

    @DeleteMapping("/id/{animeId}")
    public ResponseEntity<Void> deleteAnimeById(@PathVariable UUID animeId) {
        animeService.deleteAnimeById(animeId);
        return ResponseEntity.ok().build();
    }
}
