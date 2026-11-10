package com.rmsdev.backend.Controllers;

import com.rmsdev.backend.DTOs.Requests.EditAnimeListDTO;
import com.rmsdev.backend.DTOs.Responses.AnimeListResponseDTO;
import com.rmsdev.backend.DTOs.Responses.AnimeResponseDTO;
import com.rmsdev.backend.Services.AnimeListService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/list")
public class AnimeListController {

    private final AnimeListService animeListService;

    @GetMapping("/{listId}")
    public ResponseEntity<AnimeListResponseDTO> getListById(@PathVariable UUID listId) {
        return ResponseEntity.ok(animeListService.getListById(listId));
    }

    @GetMapping("/{listId}/animes")
    public ResponseEntity<List<AnimeResponseDTO>> getListAnimesById(@PathVariable UUID listId) {
        return ResponseEntity.ok(animeListService.getListAnimesById(listId));
    }

    @PatchMapping("/{listId}/add/id/{animeId}")
    public ResponseEntity<AnimeListResponseDTO> addAnimeToListById(
            @PathVariable UUID listId,
            @PathVariable UUID animeId) {
        return ResponseEntity.ok(animeListService.addAnimeToListById(listId, animeId));
    }

    @PatchMapping("/{listId}/remove/id/{animeId}")
    public ResponseEntity<AnimeListResponseDTO> removeAnimeOfListById(
            @PathVariable UUID listId,
            @PathVariable UUID animeId) {
        return ResponseEntity.ok(animeListService.removeAnimeOfListById(listId, animeId));
    }

    @PutMapping("/{listId}")
    public ResponseEntity<AnimeListResponseDTO> editListById(
            @PathVariable UUID listId,
            @Valid @RequestBody EditAnimeListDTO dto) {
        return ResponseEntity.ok(animeListService.editListById(listId, dto));
    }

    @DeleteMapping("/{listId}")
    public ResponseEntity<Void> deleteListById(@PathVariable UUID listId) {
        animeListService.deleteListById(listId);
        return ResponseEntity.ok().build();
    }
}
