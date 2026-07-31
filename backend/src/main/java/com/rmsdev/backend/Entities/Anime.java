package com.rmsdev.backend.Entities;

import com.rmsdev.backend.Enums.ReleaseDay;
import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Entity
@Slf4j
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "tb_animes")
public class Anime {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "ID")
    private UUID id;

    @Column(name = "title")
    private String title;

    @Column(name = "season")
    private int season;

    @Column(name = "episode")
    private int episode;

    @Column(name = "release_day")
    private ReleaseDay releaseDay;

    @Column(name = "finished")
    private boolean isFinished;

    @Column(name = "waiting")
    private boolean waiting;

    @Column(name = "favorite")
    private boolean favorite;

    @Column(name = "rewatch")
    private boolean rewatch;

    @ManyToMany(mappedBy = "animes")
    private List<AnimeList> lists;

}
