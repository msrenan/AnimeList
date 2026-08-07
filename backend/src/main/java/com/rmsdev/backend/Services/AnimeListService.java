package com.rmsdev.backend.Services;

import com.rmsdev.backend.DTOs.Requests.EditAnimeListDTO;
import com.rmsdev.backend.DTOs.Responses.AnimeListResponseDTO;
import com.rmsdev.backend.DTOs.Responses.AnimeResponseDTO;
import com.rmsdev.backend.Entities.Account;
import com.rmsdev.backend.Entities.Anime;
import com.rmsdev.backend.Entities.AnimeList;
import com.rmsdev.backend.Repositories.AccountRepository;
import com.rmsdev.backend.Repositories.AnimeListRepository;
import com.rmsdev.backend.Repositories.AnimeRepository;
import com.rmsdev.backend.Utils.Exceptions.BusinessException;
import com.rmsdev.backend.Utils.Exceptions.ConflictException;
import com.rmsdev.backend.Utils.Exceptions.ResourceNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class AnimeListService {

    private final AnimeListRepository animeListRepository;
    private final AnimeRepository animeRepository;
    private final AccountRepository accountRepository;

    public AnimeListResponseDTO getListById(UUID listId) {

        log.info("Attempting to get list (id: {}) data!", listId);

        AnimeList list = animeListRepository.findById(listId)
                .orElseThrow(() -> new ResourceNotFoundException("List (id: " + listId + ") was not found!"));

        log.info("Sending back list {} data!", list.getName());

        return new AnimeListResponseDTO(list);

    }

    public List<AnimeResponseDTO> getListAnimesById(UUID listId) {

        log.info("Attempting to get list (id: {}) animes!", listId);

        AnimeList list = animeListRepository.findById(listId)
                .orElseThrow(() -> new ResourceNotFoundException("List (id: " + listId + ") was not found!"));

        log.info("Sending back list {} {} anime(s)", list.getName(), list.getAnimes().size());
        return list.getAnimes().stream().map(anime -> new AnimeResponseDTO(anime)).toList();

    }

    public AnimeListResponseDTO addAnimeToListById(UUID listId, UUID animeId) {

        log.info("Attempting to add anime (id: {}) in list (id: {})!", animeId, listId);

        AnimeList list = animeListRepository.findById(listId)
                .orElseThrow(() -> new ResourceNotFoundException("List (id: " + listId + ") was not found!"));

        if (list.getName().equalsIgnoreCase("favoritos")) {
            log.warn("Anime was going to be inserted into Favoritos, which is a default list!");
            throw new BusinessException("List Favoritos is default and can't be edited!", HttpStatus.FORBIDDEN);
        }

        Anime anime = animeRepository.findById(animeId)
                .orElseThrow(() -> new ResourceNotFoundException("Anime (id: " + animeId + ") was not found!"));

        if (list.getAnimes().contains(anime)) {
            log.info("{} is already at list {}", anime.getTitle(), list.getName());
            throw new ConflictException("Anime is already at list!");
        }

        List<Anime> curr = list.getAnimes();

        curr.add(anime);

        list.setAnimes(curr);

        AnimeList saved = animeListRepository.save(list);

        log.info("Anime {} was successfully added into list {}!", anime.getTitle(), saved.getName());
        return new AnimeListResponseDTO(saved);
    }

    public AnimeListResponseDTO removeAnimeOfListById(UUID listId, UUID animeId) {

        log.info("Attempting to remove anime (id: {}) in list (id: {})!", animeId, listId);

        AnimeList list = animeListRepository.findById(listId)
                .orElseThrow(() -> new ResourceNotFoundException("List (id: " + listId + ") was not found!"));

        if (list.getName().equalsIgnoreCase("favoritos")) {
            log.warn("Anime was going to be removed from Favoritos, which is a default list!");
            throw new BusinessException("List Favoritos is default and can't be edited!", HttpStatus.FORBIDDEN);
        }

        boolean removed = list.getAnimes().removeIf(anime -> anime.getId().equals(animeId));

        if (!removed) {
            log.info("Anime (id: {}) is not at list {}", animeId, list.getName());
            throw new ResourceNotFoundException("Anime (id: " + animeId + ") was not present in list (id: " + listId + ")!");
        }

        AnimeList saved = animeListRepository.save(list);

        log.info("Anime (id: {}) was successfully added into list {}!", animeId, saved.getName());

        return new AnimeListResponseDTO(saved);
    }

    public AnimeListResponseDTO editListById(UUID listId, EditAnimeListDTO dto) {

        log.info("Attempting to edit list (id: {})!", listId);

        AnimeList list = animeListRepository.findById(listId)
                .orElseThrow(() -> new ResourceNotFoundException("List (id: " + listId + ") was not found!"));

        if (list.getName().equalsIgnoreCase("favoritos")) {
            log.warn("Target list is Favoritos, which is a default list!");
            throw new BusinessException("List Favoritos is default and can't be edited!", HttpStatus.FORBIDDEN);
        }

        if (dto.name() != null && !dto.name().isBlank()) {
            log.info("Changes: {} -> {}", list.getName(), dto.name());
            list.setName(dto.name());
        }

        AnimeList saved = animeListRepository.save(list);

        log.info("List sucessfully edited!");

        return new AnimeListResponseDTO(saved);
    }

    public void deleteListById(UUID listId) {

        log.info("Attempting to delete list (id: {})!", listId);

        AnimeList list = animeListRepository.findById(listId)
                .orElseThrow(() -> new ResourceNotFoundException("List (id: " + listId + ") was not found!"));

        if (list.getName().equalsIgnoreCase("favoritos")) {
            log.warn("Target list is Favoritos, which can't be deleted!");
            throw new BusinessException("List Favoritos is default and can't be edited!", HttpStatus.FORBIDDEN);
        }

        log.info("List (id: {}) {} was sucessfully deleted!", listId, list.getName());
        animeListRepository.deleteById(list.getId());

    }
}
