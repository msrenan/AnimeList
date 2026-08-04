package com.rmsdev.backend.Entities;

import com.rmsdev.backend.Enums.ReleaseDay;
import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

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
    // Melhorar logs do Back.
    @Column(name = "season")
    private int season;

    @Column(name = "episode")
    private int episode;

    @Column(name = "release_day")
    private ReleaseDay releaseDay;

    @Column(name = "finished")
    private boolean isFinished;

    @Column(name = "waitingForNextSeason")
    private boolean waitingForNextSeason;

    @Column(name = "favorite")
    private boolean favorite;

    @Column(name = "watched")
    private boolean watched;

    @Column(name = "need_to_watch")
    private boolean needToWatch;

    @ManyToMany(mappedBy = "animes")
    private List<AnimeList> lists;

}
