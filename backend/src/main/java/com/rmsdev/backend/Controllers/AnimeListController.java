package com.rmsdev.backend.Controllers;

import com.rmsdev.backend.DTOs.Requests.EditAnimeListDTO;
import com.rmsdev.backend.DTOs.Responses.AnimeListResponseDTO;
import com.rmsdev.backend.Services.AnimeListService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/list")
public class AnimeListController {

    private final AnimeListService animeListService;

    @GetMapping("/{listId}")
    public ResponseEntity<AnimeListResponseDTO> getListById(@PathVariable String listId) {
        var responseDTO = animeListService.getListById(UUID.fromString(listId));

        return ResponseEntity.ok(responseDTO);
    }

    @PatchMapping("/{listId}/add/id/{animeId}")
    public ResponseEntity<AnimeListResponseDTO> addAnimeToListById(@PathVariable String listId, @PathVariable String animeId) {
        var responseDTO = animeListService.addAnimeToListById(UUID.fromString(listId), UUID.fromString(animeId));

        return ResponseEntity.ok(responseDTO);
    }

    @PatchMapping("/{listId}/remove/id/{animeId}")
    public ResponseEntity<AnimeListResponseDTO> removeAnimeOfListById(@PathVariable String listId, @PathVariable String animeId) {
        var responseDTO = animeListService.removeAnimeOfListById(UUID.fromString(listId), UUID.fromString(animeId));

        return ResponseEntity.ok(responseDTO);
    }

    @PatchMapping("/{listId}/add/title/{animeTitle}")
    public ResponseEntity<AnimeListResponseDTO> addAnimeToListByTitle(@PathVariable String listId, @PathVariable String animeTitle) {
        var responseDTO = animeListService.addAnimeToListByTitle(UUID.fromString(listId), animeTitle);

        return ResponseEntity.ok(responseDTO);
    }

    @PatchMapping("/{listId}/remove/title/{animeTitle}")
    public ResponseEntity<AnimeListResponseDTO> removeAnimeOfListByTitle(@PathVariable String listId, @PathVariable String animeTitle) {
        var responseDTO = animeListService.removeAnimeOfListByTitle(UUID.fromString(listId), animeTitle);

        return ResponseEntity.ok(responseDTO);
    }

    @PutMapping("/{listId}")
    public ResponseEntity<AnimeListResponseDTO> editListById(@PathVariable String listId, @Valid @RequestBody EditAnimeListDTO dto) {
        var responseDTO = animeListService.editListById(UUID.fromString(listId), dto);

        return ResponseEntity.ok(responseDTO);
    }

    @DeleteMapping("/{listId}")
    public ResponseEntity<Void> deleteListById(@PathVariable String listId) {
        animeListService.deleteListById(UUID.fromString(listId));

        return ResponseEntity.ok().build();
    }

}
