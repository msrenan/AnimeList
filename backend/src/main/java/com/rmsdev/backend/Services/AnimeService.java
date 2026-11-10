package com.rmsdev.backend.Services;

import com.rmsdev.backend.DTOs.Requests.AnimeDTO;
import com.rmsdev.backend.DTOs.Requests.EditAnimeDTO;
import com.rmsdev.backend.DTOs.Responses.AnimeResponseDTO;
import com.rmsdev.backend.Entities.Anime;
import com.rmsdev.backend.Entities.AnimeList;
import com.rmsdev.backend.Enums.FilterOptions;
import com.rmsdev.backend.Repositories.AnimeListRepository;
import com.rmsdev.backend.Repositories.AnimeRepository;
import com.rmsdev.backend.Security.CurrentAccountProvider;
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
public class AnimeService {

    private static final String DEFAULT_LIST = "Favoritos";

    private final AnimeRepository animeRepository;
    private final AnimeListRepository animeListRepository;
    private final CurrentAccountProvider currentAccountProvider;

    public List<AnimeResponseDTO> getAnimes(String search, FilterOptions filter) {
        log.info("Fetching animes (search: {}, filter: {})", search, filter);

        List<Anime> animes;

        if (search != null && !search.trim().isEmpty()) {
            animes = animeRepository.findByTitleContainingIgnoreCaseOrderByTitleAsc(search.trim());
        } else if (filter != null) {
            animes = switch (filter) {
                case FAVORITOS -> animeRepository.findByFavoriteTrue();
                case COMEÇAR -> animeRepository.findByNeedToWatchTrue();
                case ASSISTIDOS -> animeRepository.findByIsFinishedTrueAndWaitingForNextSeasonFalse();
                case ASSISTINDO -> animeRepository.findByNeedToWatchFalseAndWatchedFalse();
            };
        } else {
            animes = animeRepository.findAll();
        }

        return animes.stream().map(AnimeResponseDTO::new).toList();
    }

    public AnimeResponseDTO getAnimeById(UUID animeId) {
        Anime anime = animeRepository.findById(animeId)
                .orElseThrow(() -> new ResourceNotFoundException("Anime (id: " + animeId + ") was not found"));

        return new AnimeResponseDTO(anime);
    }

    @Transactional
    public AnimeResponseDTO createAnime(AnimeDTO dto) {
        if (animeRepository.existsByTitleIgnoreCase(dto.title().trim())) {
            throw new ConflictException("Anime " + dto.title() + " already exists!");
        }

        Anime newAnime = Anime.builder()
                .releaseDay(dto.releaseDay())
                .episode(dto.episode())
                .season(dto.season())
                .watched(dto.watched())
                .favorite(dto.favorite())
                .waitingForNextSeason(dto.waitingForNextSeason())
                .isFinished(dto.isFinished())
                .title(dto.title().trim())
                .needToWatch(dto.needToWatch())
                .build();

        Anime saved = animeRepository.save(newAnime);
        syncFavoritesList(saved);

        log.info("Anime '{}' (id: {}) created", saved.getTitle(), saved.getId());
        return new AnimeResponseDTO(saved);
    }

    @Transactional
    public AnimeResponseDTO editAnimeById(UUID animeId, EditAnimeDTO dto) {
        Anime anime = animeRepository.findById(animeId)
                .orElseThrow(() -> new ResourceNotFoundException("Anime (id: " + animeId + ") was not found"));

        if (dto.title() != null && !dto.title().isBlank()) {
            String newTitle = dto.title().trim();
            if (!newTitle.equalsIgnoreCase(anime.getTitle()) && animeRepository.existsByTitleIgnoreCase(newTitle)) {
                throw new ConflictException("Anime " + newTitle + " already exists!");
            }
            anime.setTitle(newTitle);
        }

        if (dto.season() != null && dto.season() >= 0) {
            anime.setSeason(dto.season());
        }

        if (dto.episode() != null && dto.episode() >= 0) {
            anime.setEpisode(dto.episode());
        }

        if (dto.isFinished() != null) {
            anime.setFinished(dto.isFinished());
        }

        if (dto.waitingForNextSeason() != null) {
            anime.setWaitingForNextSeason(dto.waitingForNextSeason());
        }

        if (dto.favorite() != null) {
            anime.setFavorite(dto.favorite());
        }

        if (dto.watched() != null) {
            anime.setWatched(dto.watched());
        }

        if (dto.needToWatch() != null) {
            anime.setNeedToWatch(dto.needToWatch());
        }

        if (dto.releaseDay() != null) {
            anime.setReleaseDay(dto.releaseDay());
        }

        Anime saved = animeRepository.save(anime);
        syncFavoritesList(saved);

        log.info("Anime '{}' (id: {}) updated", saved.getTitle(), saved.getId());
        return new AnimeResponseDTO(saved);
    }

    @Transactional
    public void deleteAnimeById(UUID animeId) {
        Anime anime = animeRepository.findById(animeId)
                .orElseThrow(() -> new ResourceNotFoundException("Anime (id: " + animeId + ") was not found"));

        List<AnimeList> lists = animeListRepository.findAllByAnimesId(animeId);
        lists.forEach(list -> list.getAnimes().removeIf(item -> item.getId().equals(animeId)));
        animeListRepository.saveAll(lists);

        animeRepository.delete(anime);
        log.info("Anime '{}' (id: {}) deleted", anime.getTitle(), anime.getId());
    }

    /**
     * Mantém a lista padrão "Favoritos" da conta autenticada em sincronia com o
     * status de favorito do anime. Antes a busca era feita só pelo nome, o que
     * quebrava quando existia mais de uma conta com uma lista "Favoritos".
     */
    private void syncFavoritesList(Anime anime) {
        var account = currentAccountProvider.get();

        AnimeList favorites = animeListRepository
                .findFirstByOwnerIdAndNameIgnoreCaseOrderByNameAsc(account.getId(), DEFAULT_LIST)
                .orElseThrow(() -> new BusinessException(
                        "Default list Favoritos was not found for this account.",
                        HttpStatus.INTERNAL_SERVER_ERROR));

        boolean changed;
        if (anime.isFavorite()) {
            changed = favorites.getAnimes().stream().noneMatch(item -> item.getId().equals(anime.getId()));
            if (changed) {
                favorites.getAnimes().add(anime);
            }
        } else {
            changed = favorites.getAnimes().removeIf(item -> item.getId().equals(anime.getId()));
        }

        if (changed) {
            animeListRepository.save(favorites);
        }
    }
}
