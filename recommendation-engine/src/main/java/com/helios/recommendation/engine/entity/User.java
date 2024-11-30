package com.helios.recommendation.engine.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "appUser")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long credits;

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
