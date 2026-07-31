package com.rmsdev.backend.Services;

import com.rmsdev.backend.DTOs.Requests.EditAnimeListDTO;
import com.rmsdev.backend.DTOs.Responses.AnimeListResponseDTO;
import com.rmsdev.backend.Entities.Account;
import com.rmsdev.backend.Entities.Anime;
import com.rmsdev.backend.Entities.AnimeList;
import com.rmsdev.backend.Repositories.AccountRepository;
import com.rmsdev.backend.Repositories.AnimeListRepository;
import com.rmsdev.backend.Repositories.AnimeRepository;
import com.rmsdev.backend.Utils.Exceptions.BusinessException;
import com.rmsdev.backend.Utils.Exceptions.ResourceNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

        AnimeList list = animeListRepository.findById(listId)
                .orElseThrow(() -> new ResourceNotFoundException("List (id: " + listId + ") was not found!"));

        return new AnimeListResponseDTO(list);

    }

    public AnimeListResponseDTO addAnimeToListById(UUID listId, UUID animeId) {

        AnimeList list = animeListRepository.findById(listId)
                .orElseThrow(() -> new ResourceNotFoundException("List (id: " + listId + ") was not found!"));

        Anime anime = animeRepository.findById(animeId)
                .orElseThrow(() -> new ResourceNotFoundException("Anime (id: " + animeId + ") was not found!"));


        List<Anime> curr = list.getAnimes();

        curr.add(anime);

        list.setAnimes(curr);

        AnimeList saved = animeListRepository.save(list);

        return new AnimeListResponseDTO(saved);
    }

    public AnimeListResponseDTO removeAnimeOfListById(UUID listId, UUID animeId) {

        AnimeList list = animeListRepository.findById(listId)
                .orElseThrow(() -> new ResourceNotFoundException("List (id: " + listId + ") was not found!"));

        boolean removed = list.getAnimes().removeIf(anime -> anime.getId().equals(animeId));

        if (!removed) {
            throw new ResourceNotFoundException("Anime (id: " + animeId + ") was not present in list (id: " + listId + ")!");
        }

        AnimeList saved = animeListRepository.save(list);

        return new AnimeListResponseDTO(saved);
    }

    public AnimeListResponseDTO addAnimeToListByTitle(UUID listId, String title) {

        AnimeList list = animeListRepository.findById(listId)
                .orElseThrow(() -> new ResourceNotFoundException("List (id: " + listId + ") was not found!"));

        Anime anime = animeRepository.findByTitle(title)
                .orElseThrow(() -> new ResourceNotFoundException("Anime " + title + " was not found!"));


        List<Anime> curr = list.getAnimes();

        curr.add(anime);

        list.setAnimes(curr);

        AnimeList saved = animeListRepository.save(list);

        return new AnimeListResponseDTO(saved);
    }

    public AnimeListResponseDTO removeAnimeOfListByTitle(UUID listId, String title) {

        AnimeList list = animeListRepository.findById(listId)
                .orElseThrow(() -> new ResourceNotFoundException("List (id: " + listId + ") was not found!"));

        boolean removed = list.getAnimes().removeIf(anime -> anime.getTitle().equals(title));

        if (!removed) {
            throw new ResourceNotFoundException("Anime " + title + " was not present in list (id: " + listId + ")!");
        }

        AnimeList saved = animeListRepository.save(list);

        return new AnimeListResponseDTO(saved);
    }

    public AnimeListResponseDTO editListById(UUID listId, EditAnimeListDTO dto) {

        AnimeList list = animeListRepository.findById(listId)
                .orElseThrow(() -> new ResourceNotFoundException("List (id: " + listId + ") was not found!"));

        if (dto.name() != null && !dto.name().isBlank()) {
            list.setName(dto.name());
        }

        AnimeList saved = animeListRepository.save(list);

        return new AnimeListResponseDTO(saved);
    }

    public void deleteListById(UUID listId) {

        AnimeList list = animeListRepository.findById(listId)
                .orElseThrow(() -> new ResourceNotFoundException("List (id: " + listId + ") was not found!"));

        if (list.getName().equalsIgnoreCase("favoritos")) {
            throw new BusinessException("The list " + list.getName() + " can't be deleted!");
        }

        animeListRepository.deleteById(list.getId());

    }
}
