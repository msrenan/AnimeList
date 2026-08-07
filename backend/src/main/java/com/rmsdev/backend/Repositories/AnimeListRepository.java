package com.rmsdev.backend.Repositories;

import com.rmsdev.backend.Entities.AnimeList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface AnimeListRepository extends JpaRepository<AnimeList, UUID> {

    Optional<AnimeList> findByName(String name);

}
