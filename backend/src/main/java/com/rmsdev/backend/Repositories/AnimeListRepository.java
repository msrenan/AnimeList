package com.rmsdev.backend.Repositories;

import com.rmsdev.backend.Entities.AnimeList;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AnimeListRepository extends JpaRepository<AnimeList, UUID> {

    @EntityGraph(attributePaths = {"owner", "animes"})
    @Query("select l from AnimeList l where l.id = :id")
    Optional<AnimeList> findWithOwnerAndAnimesById(@Param("id") UUID id);

    @EntityGraph(attributePaths = {"animes"})
    Optional<AnimeList> findFirstByOwnerIdAndNameIgnoreCaseOrderByNameAsc(UUID ownerId, String name);

    boolean existsByOwnerIdAndNameIgnoreCase(UUID ownerId, String name);

    @EntityGraph(attributePaths = {"animes"})
    List<AnimeList> findByOwnerIdOrderByNameAsc(UUID ownerId);

    @EntityGraph(attributePaths = {"animes"})
    List<AnimeList> findByOwnerIdAndNameContainingIgnoreCaseOrderByNameAsc(UUID ownerId, String name);

    @EntityGraph(attributePaths = {"animes"})
    List<AnimeList> findAllByAnimesId(UUID animeId);
}
