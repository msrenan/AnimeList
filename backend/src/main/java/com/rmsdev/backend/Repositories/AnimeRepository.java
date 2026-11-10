package com.rmsdev.backend.Repositories;

import com.rmsdev.backend.Entities.Anime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AnimeRepository extends JpaRepository<Anime, UUID> {

    Optional<Anime> findByTitleIgnoreCase(String title);

    boolean existsByTitleIgnoreCase(String title);

    List<Anime> findByTitleContainingIgnoreCaseOrderByTitleAsc(String title);

    List<Anime> findByIsFinishedTrueAndWaitingForNextSeasonFalse();

    List<Anime> findByNeedToWatchFalseAndWatchedFalse();

    List<Anime> findByFavoriteTrue();

    List<Anime> findByNeedToWatchTrue();
}
