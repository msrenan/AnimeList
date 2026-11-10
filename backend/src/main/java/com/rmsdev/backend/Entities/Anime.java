package com.rmsdev.backend.Entities;

import com.rmsdev.backend.Enums.ReleaseDay;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "tb_animes", indexes = {
        @Index(name = "idx_anime_title", columnList = "title")
})
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

    @Enumerated(EnumType.ORDINAL)
    @JdbcTypeCode(SqlTypes.SMALLINT)
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
