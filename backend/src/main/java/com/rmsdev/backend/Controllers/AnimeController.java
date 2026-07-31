package com.rmsdev.backend.Controllers;

import com.rmsdev.backend.DTOs.Requests.AnimeDTO;
import com.rmsdev.backend.DTOs.Requests.EditAnimeDTO;
import com.rmsdev.backend.DTOs.Requests.UpdateAnimeDTO;
import com.rmsdev.backend.DTOs.Responses.AnimeResponseDTO;
import com.rmsdev.backend.Services.AnimeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/anime")
public class AnimeController {

    private final AnimeService animeService;

    @GetMapping
    public ResponseEntity<List<AnimeResponseDTO>> getAnimes() {
        var responseDTO = animeService.getAnimes();

        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping("/id/{animeId}")
    public ResponseEntity<AnimeResponseDTO> getAnimeById(@PathVariable String animeId) {
        var responseDTO = animeService.getAnimeById(UUID.fromString(animeId));

        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping("/title/{animeTitle}")
    public ResponseEntity<AnimeResponseDTO> getAnimeByTitle(@PathVariable String animeTitle) {
        var responseDTO = animeService.getAnimeByTitle(animeTitle);

        return ResponseEntity.ok(responseDTO);
    }

    @PostMapping
    public ResponseEntity<AnimeResponseDTO> createAnime(@Valid @RequestBody AnimeDTO anime) {
        var responseDTO = animeService.createAnime(anime);

        return ResponseEntity.ok(responseDTO);
    }

    @PatchMapping("/id/{animeId}")
    public ResponseEntity<AnimeResponseDTO> updateAnimeById(@PathVariable String animeId, @Valid @RequestBody UpdateAnimeDTO dto) {
        var responseDTO = animeService.updateAnimeById(UUID.fromString(animeId), dto);

        return ResponseEntity.ok(responseDTO);
    }

    @PutMapping("/id/{animeId}")
    public ResponseEntity<AnimeResponseDTO> editAnimeById(@PathVariable String animeId, @Valid @RequestBody EditAnimeDTO dto) {
        var responseDTO = animeService.editAnimeById(UUID.fromString(animeId), dto);

        return ResponseEntity.ok(responseDTO);
    }

    @PatchMapping("/title/{animeTitle}")
    public ResponseEntity<AnimeResponseDTO> updateAnimeByTitle(@PathVariable String animeTitle, @Valid @RequestBody UpdateAnimeDTO dto) {
        var responseDTO = animeService.updateAnimeByTitle(animeTitle, dto);

        return ResponseEntity.ok(responseDTO);
    }

    @PutMapping("/title/{animeTitle}")
    public ResponseEntity<AnimeResponseDTO> editAnimeByTitle(@PathVariable String animeTitle, @Valid @RequestBody EditAnimeDTO dto) {
        var responseDTO = animeService.editAnimeByTitle(animeTitle, dto);

        return ResponseEntity.ok(responseDTO);
    }

    @DeleteMapping("/id/{animeId}")
    public ResponseEntity<Void> deleteAnimeById(@PathVariable String animeId) {
        animeService.deleteAnimeById(UUID.fromString(animeId));

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/title/{animeTitle}")
    public ResponseEntity<Void> deleteAnimeByTitle(@PathVariable String animeTitle) {
        animeService.deleteAnimeByTitle(animeTitle);

        return ResponseEntity.ok().build();
    }
}
