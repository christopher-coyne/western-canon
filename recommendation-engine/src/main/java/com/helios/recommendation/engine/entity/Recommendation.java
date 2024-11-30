package com.helios.recommendation.engine.entity;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Entity
public class Recommendation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    // songs - have this be json for now
    @Column(nullable = false) // For PostgreSQL, use 'json' or 'jsonb'
    private String[] songs;

    @ManyToMany(mappedBy = "favoriteRecommendations")
    private List<AppUser> users;

    @ManyToOne
    @JoinColumn(name = "recommendationGroup_id", nullable = false)
    private RecommendationGroup recommendationGroup;

    @ManyToOne
    @JoinColumn(name = "creator_id", nullable = false)
    private AppUser creator;

    @CreatedDate
    @Column(updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    private LocalDateTime deletedAt;

}