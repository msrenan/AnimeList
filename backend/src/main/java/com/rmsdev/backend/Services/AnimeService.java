package com.rmsdev.backend.Services;

import com.rmsdev.backend.DTOs.Requests.AnimeDTO;
import com.rmsdev.backend.DTOs.Requests.EditAnimeDTO;
import com.rmsdev.backend.DTOs.Requests.UpdateAnimeDTO;
import com.rmsdev.backend.DTOs.Responses.AnimeResponseDTO;
import com.rmsdev.backend.Entities.Anime;
import com.rmsdev.backend.Entities.AnimeList;
import com.rmsdev.backend.Enums.FilterOptions;
import com.rmsdev.backend.Repositories.AnimeListRepository;
import com.rmsdev.backend.Repositories.AnimeRepository;
import com.rmsdev.backend.Utils.Exceptions.BusinessException;
import com.rmsdev.backend.Utils.Exceptions.ConflictException;
import com.rmsdev.backend.Utils.Exceptions.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class AnimeService {

    private final AnimeRepository animeRepository;
    private final AnimeListRepository animeListRepository;

    public List<AnimeResponseDTO> getAnimes(String search, FilterOptions filter) {

        log.info("Attempting to get animes data!");

        List<Anime> animes;

        if (search != null && !search.trim().isEmpty()) {
            log.info("Searching for {}!", search);
            animes = animeRepository.findByTitleContainingIgnoreCase(search.trim());
            log.info("Sending back results: {}", animes);
        } else if (filter != null) {
            log.info("Filtering for {}", filter);
            if (filter == FilterOptions.FAVORITOS) {
                animes = animeRepository.findFavoriteAnimes();
            } else if (filter == FilterOptions.COMEÇAR) {
                animes = animeRepository.findNeedToWatchAnimes();
            } else if (filter == FilterOptions.ASSISTIDOS) {
                animes = animeRepository.findWatchedAnimes();
            } else {
                animes = animeRepository.findCurrentlyWatchingAnimes();
            }
            log.info("Sending back results: {}", animes);
        } else {
            log.info("Since there was not a search query, sending back all animes data!");
            animes = animeRepository.findAll();
        }

        return animes.stream().map(anime -> new AnimeResponseDTO(anime)).toList();
    }

    public AnimeResponseDTO getAnimeById(UUID animeId) {

        log.info("Attempting to get data of anime (id: {})!", animeId);

        Anime anime = animeRepository.findById(animeId)
                .orElseThrow(() -> new ResourceNotFoundException("Anime (id: " + animeId + ") was not found"));

        log.info("Sending back {} data!", anime.getTitle());

        return new AnimeResponseDTO(anime);
    }

    public AnimeResponseDTO createAnime(AnimeDTO dto) {

        log.info("Attempting to create new Anime!");

        if (animeRepository.existsByTitleIgnoreCase(dto.title())) {
            log.info("Anime {} already exists!", dto.title());
            throw new ConflictException("Anime " + dto.title() + " already exists!");
        }

        Anime newAnime = Anime.builder()
                .id(null)
                .releaseDay(dto.releaseDay())
                .lists(new ArrayList<>())
                .episode(dto.episode())
                .season(dto.season())
                .watched(dto.watched())
                .favorite(dto.favorite())
                .waitingForNextSeason(dto.waitingForNextSeason())
                .isFinished(dto.isFinished())
                .title(dto.title())
                .needToWatch(dto.needToWatch())
                .build();

        Anime saved = animeRepository.save(newAnime);

        AnimeList favoritos = animeListRepository.findByName("Favoritos")
                .orElseThrow(() -> new BusinessException("Something wen't REALLY wrong.", HttpStatus.INTERNAL_SERVER_ERROR));

        var favAnimes = favoritos.getAnimes();
        if (saved.isFavorite()) {
            if (!favAnimes.contains(saved)) {
                log.info("{} become a favorite anime! Adding it to Favoritos default list!", saved.getTitle());
                favAnimes.add(saved);
                favoritos.setAnimes(favAnimes);
            }
        } else {
            if (favAnimes.contains(saved)) {
                log.info("{} is not a favorite anime anymore! Removing it from Favoritos default list!", saved.getTitle());
                favAnimes.remove(saved);
            }
        }

        animeListRepository.save(favoritos);

        log.info("New anime (id: {}) {} was successfully created!", saved.getId(), saved.getTitle());

        return new AnimeResponseDTO(saved);

    }

    public AnimeResponseDTO editAnimeById(UUID animeId, EditAnimeDTO dto) {

        log.info("Attempting to edit anime (id: {})!", animeId);

        Anime anime = animeRepository.findById(animeId)
                .orElseThrow(() -> new ResourceNotFoundException("Anime (id: " + animeId + ") was not found"));

        log.info("Changes: {}", dto.toString());

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

        if (dto.title() != null && dto.title() != "") {
            anime.setTitle(dto.title());
        }

        if (dto.needToWatch() != null) {
            anime.setNeedToWatch(dto.needToWatch());
        }

        if (dto.releaseDay() != null) {
            anime.setReleaseDay(dto.releaseDay());
        }

        Anime saved = animeRepository.save(anime);

        AnimeList favoritos = animeListRepository.findByName("Favoritos")
                .orElseThrow(() -> new BusinessException("Something wen't REALLY wrong.", HttpStatus.INTERNAL_SERVER_ERROR));

        var favAnimes = favoritos.getAnimes();
        if (saved.isFavorite()) {
            if (!favAnimes.contains(saved)) {
                log.info("{} become a favorite anime! Adding it to Favoritos default list!", saved.getTitle());
                favAnimes.add(saved);
                favoritos.setAnimes(favAnimes);
            }
        } else {
            if (favAnimes.contains(saved)) {
                log.info("{} is not a favorite anime anymore! Removing it from Favoritos default list!", saved.getTitle());
                favAnimes.remove(saved);
            }
        }

        animeListRepository.save(favoritos);

        log.info("Anime {} edited successfully!", saved.getTitle());

        return new AnimeResponseDTO(saved);

    }

    public void deleteAnimeById(UUID animeId) {

        log.info("Attempting to delete anime (id: {})", animeId);

        Anime anime = animeRepository.findById(animeId)
                .orElseThrow(() -> new ResourceNotFoundException("Anime (id: " + animeId + ") was not found"));

        List<AnimeList> lists = animeListRepository.findAll();
        log.info("Removing {} from lists!", anime.getTitle());
        for (AnimeList list : lists) {
            if (list.getAnimes().contains(anime)) {
                log.info("\tRemoving it from {}", list.getName());
                list.getAnimes().remove((anime));
            }
        }

        log.info("Anime (id: {}) {} was sucessfully deleted!", anime.getId(), anime.getTitle());
        animeListRepository.saveAll(lists);
        animeRepository.deleteById(anime.getId());
    }
}
