package com.rmsdev.backend.Services;

import com.rmsdev.backend.DTOs.Requests.EditAnimeListDTO;
import com.rmsdev.backend.DTOs.Responses.AnimeListResponseDTO;
import com.rmsdev.backend.DTOs.Responses.AnimeResponseDTO;
import com.rmsdev.backend.Entities.Anime;
import com.rmsdev.backend.Entities.AnimeList;
import com.rmsdev.backend.Repositories.AnimeListRepository;
import com.rmsdev.backend.Repositories.AnimeRepository;
import com.rmsdev.backend.Utils.Exceptions.BusinessException;
import com.rmsdev.backend.Utils.Exceptions.ConflictException;
import com.rmsdev.backend.Utils.Exceptions.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class AnimeListService {

    private static final String DEFAULT_LIST = "Favoritos";

    private final AnimeListRepository animeListRepository;
    private final AnimeRepository animeRepository;

    public AnimeListResponseDTO getListById(UUID listId) {
        AnimeList list = findList(listId);
        return new AnimeListResponseDTO(list);
    }

    public List<AnimeResponseDTO> getListAnimesById(UUID listId) {
        AnimeList list = findList(listId);
        return list.getAnimes().stream().map(AnimeResponseDTO::new).toList();
    }

    @Transactional
    public AnimeListResponseDTO addAnimeToListById(UUID listId, UUID animeId) {
        AnimeList list = findList(listId);
        ensureEditable(list);

        Anime anime = animeRepository.findById(animeId)
                .orElseThrow(() -> new ResourceNotFoundException("Anime (id: " + animeId + ") was not found!"));

        boolean alreadyThere = list.getAnimes().stream()
                .anyMatch(item -> item.getId().equals(animeId));

        if (alreadyThere) {
            throw new ConflictException("Anime is already at list!");
        }

        list.getAnimes().add(anime);
        AnimeList saved = animeListRepository.save(list);

        log.info("Anime '{}' added to list '{}'", anime.getTitle(), saved.getName());
        return new AnimeListResponseDTO(saved);
    }

    @Transactional
    public AnimeListResponseDTO removeAnimeOfListById(UUID listId, UUID animeId) {
        AnimeList list = findList(listId);
        ensureEditable(list);

        boolean removed = list.getAnimes().removeIf(anime -> anime.getId().equals(animeId));

        if (!removed) {
            throw new ResourceNotFoundException(
                    "Anime (id: " + animeId + ") was not present in list (id: " + listId + ")!");
        }

        AnimeList saved = animeListRepository.save(list);
        log.info("Anime (id: {}) removed from list '{}'", animeId, saved.getName());
        return new AnimeListResponseDTO(saved);
    }

    @Transactional
    public AnimeListResponseDTO editListById(UUID listId, EditAnimeListDTO dto) {
        AnimeList list = findList(listId);
        ensureEditable(list);

        if (dto.name() != null && !dto.name().isBlank()) {
            String newName = dto.name().trim();

            if (DEFAULT_LIST.equalsIgnoreCase(newName)) {
                throw new ConflictException("List Favoritos already exists and can't be used again!");
            }

            if (!newName.equalsIgnoreCase(list.getName())
                    && animeListRepository.existsByOwnerIdAndNameIgnoreCase(list.getOwner().getId(), newName)) {
                throw new ConflictException("A list named " + newName + " already exists for this account");
            }

            list.setName(newName);
        }

        AnimeList saved = animeListRepository.save(list);
        log.info("List (id: {}) updated to '{}'", saved.getId(), saved.getName());
        return new AnimeListResponseDTO(saved);
    }

    @Transactional
    public void deleteListById(UUID listId) {
        AnimeList list = findList(listId);
        ensureEditable(list);

        animeListRepository.delete(list);
        log.info("List (id: {}) '{}' deleted", listId, list.getName());
    }

    private AnimeList findList(UUID listId) {
        return animeListRepository.findWithOwnerAndAnimesById(listId)
                .orElseThrow(() -> new ResourceNotFoundException("List (id: " + listId + ") was not found!"));
    }

    private void ensureEditable(AnimeList list) {
        if (DEFAULT_LIST.equalsIgnoreCase(list.getName())) {
            throw new BusinessException("List Favoritos is default and can't be edited!", HttpStatus.FORBIDDEN);
        }
    }
}
