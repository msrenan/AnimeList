package com.rmsdev.backend.Services;

import com.rmsdev.backend.DTOs.Requests.AnimeDTO;
import com.rmsdev.backend.DTOs.Requests.EditAnimeDTO;
import com.rmsdev.backend.DTOs.Requests.UpdateAnimeDTO;
import com.rmsdev.backend.DTOs.Responses.AnimeResponseDTO;
import com.rmsdev.backend.Entities.Anime;
import com.rmsdev.backend.Repositories.AnimeRepository;
import com.rmsdev.backend.Utils.Exceptions.ConflictException;
import com.rmsdev.backend.Utils.Exceptions.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class AnimeService {

    private final AnimeRepository animeRepository;

    public List<AnimeResponseDTO> getAnimes(String search) {

        List<Anime> animes;



        if (search != null && !search.trim().isEmpty()) {
            log.info("Search Query: " + search);
            animes = animeRepository.findByTitleContainingIgnoreCase(search.trim());
        } else {
            log.info("There was no search query!");
            animes = animeRepository.findAll();
        }

        return animes.stream().map(anime -> new AnimeResponseDTO(anime)).toList();
    }

    public AnimeResponseDTO getAnimeById(UUID animeId) {

        Anime anime = animeRepository.findById(animeId)
                .orElseThrow(() -> new ResourceNotFoundException("Anime (id: " + animeId + ") was not found"));

        return new AnimeResponseDTO(anime);
    }

    public AnimeResponseDTO getAnimeByTitle(String title) {

        Anime anime = animeRepository.findByTitle(title)
                .orElseThrow(() -> new ResourceNotFoundException("Anime " + title + " was not found"));

        return new AnimeResponseDTO(anime);
    }

    public AnimeResponseDTO createAnime(AnimeDTO dto) {

        if (animeRepository.existsByTitle(dto.title())) {
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

        return new AnimeResponseDTO(saved);

    }

    public AnimeResponseDTO updateAnimeById(UUID animeId, UpdateAnimeDTO dto) {

        Anime anime = animeRepository.findById(animeId)
                .orElseThrow(() -> new ResourceNotFoundException("Anime (id: " + animeId + ") was not found"));


        if (dto.season() != null) {
            anime.setSeason(dto.season());
        }

        if (dto.episode() != null) {
            anime.setEpisode(dto.episode());
        }

        if (dto.isFinished() != null) {
            anime.setFinished(dto.isFinished());
        }

        if (dto.waiting() != null) {
            anime.setWaitingForNextSeason(dto.waiting());
        }

        Anime saved = animeRepository.save(anime);
        return new AnimeResponseDTO(saved);
    }

    public AnimeResponseDTO editAnimeById(UUID animeId, EditAnimeDTO dto) {

        Anime anime = animeRepository.findById(animeId)
                .orElseThrow(() -> new ResourceNotFoundException("Anime (id: " + animeId + ") was not found"));

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
        return new AnimeResponseDTO(saved);

    }

    public AnimeResponseDTO updateAnimeByTitle(String title, UpdateAnimeDTO dto) {

        Anime anime = animeRepository.findByTitle(title)
                .orElseThrow(() -> new ResourceNotFoundException("Anime " + title + " was not found"));


        if (dto.season() != null) {
            anime.setSeason(dto.season());
        }

        if (dto.episode() != null) {
            anime.setEpisode(dto.episode());
        }

        if (dto.isFinished() != null) {
            anime.setFinished(dto.isFinished());
        }

        if (dto.waiting() != null) {
            anime.setWaitingForNextSeason(dto.waiting());
        }

        Anime saved = animeRepository.save(anime);
        return new AnimeResponseDTO(saved);
    }

    public AnimeResponseDTO editAnimeByTitle(String title, EditAnimeDTO dto) {

        Anime anime = animeRepository.findByTitle(title)
                .orElseThrow(() -> new ResourceNotFoundException("Anime " + title + " was not found"));


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
        return new AnimeResponseDTO(saved);
    }

    public void deleteAnimeById(UUID animeId) {

        Anime anime = animeRepository.findById(animeId)
                .orElseThrow(() -> new ResourceNotFoundException("Anime (id: " + animeId + ") was not found"));

        animeRepository.deleteById(anime.getId());

    }

    public void deleteAnimeByTitle(String title) {

        Anime anime = animeRepository.findByTitle(title)
                .orElseThrow(() -> new ResourceNotFoundException("Anime " + title + " was not found"));

        animeRepository.deleteById(anime.getId());

    }
}
