package com.helios.recommendation.engine.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long credits;

    @ManyToMany
    @JoinTable(
            name = "favorite_recommendations",
            joinColumns = @JoinColumn(name = "appUser_id"),
            inverseJoinColumns = @JoinColumn(name = "recommendation_id")
    )
    private List<Recommendation> favoriteRecommendations;

    @OneToMany(mappedBy = "creator", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Recommendation> createdRecommendations;

    public Long getId() {
        return id;
    }

    public Long getCredits() {
        return credits;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCredits(Long credits) {
        this.credits = credits;
    }
}
