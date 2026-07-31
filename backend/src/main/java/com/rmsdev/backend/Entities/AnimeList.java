package com.rmsdev.backend.Entities;

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
@Table(name = "tb_lists")
public class AnimeList {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private Account owner;

    @ManyToMany
    @JoinTable(name = "tb_animeLists", joinColumns = @JoinColumn(name = "list_id"), inverseJoinColumns = @JoinColumn(name = "anime_id"))
    private List<Anime> animes;
}
