package com.rmsdev.backend.Repositories;

import com.rmsdev.backend.Entities.Anime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AnimeRepository extends JpaRepository<Anime, UUID> {

    Optional<Anime> findByTitle(String title);

    boolean existsByTitleIgnoreCase(String title);

    List<Anime> findByTitleContainingIgnoreCase(String title);

    List<Anime> findByTitleStartingWithIgnoreCase(String prefix);

    List<Anime> findByIsFinishedTrueAndWaitingForNextSeasonFalse();

    @Query("SELECT a FROM Anime a WHERE a.isFinished = true AND a.waitingForNextSeason = false")
    List<Anime> findWatchedAnimes();

    @Query("SELECT a FROM Anime a WHERE a.needToWatch = false AND a.watched = false")
    List<Anime> findCurrentlyWatchingAnimes();

    @Query("SELECT a FROM Anime a WHERE a.favorite = true")
    List<Anime> findFavoriteAnimes();

    @Query("SELECT a FROM Anime a WHERE a.needToWatch = true")
    List<Anime> findNeedToWatchAnimes();

}
