package com.example.ranking.domain.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter @Setter @ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class PlayerAnimal {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long playerAnimalSequence;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "player_sequence")
    private com.example.ranking.domain.entity.Player playerSequence;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animal_id")
    private Animal animalId;

    private Long attackSuccess = 0L;
    private Long attackFail = 0L;
    private Long defenseSuccess = 0L;
    private Long defenseFail = 0L;
    private Long trust = 0L;
    private Long distrust = 0L;
    private Long truth = 0L;
    private Long lie = 0L;

    public PlayerAnimal(com.example.ranking.domain.entity.Player playerSequence, Animal animalId, Long attackSuccess, Long attackFail,
        Long defenseSuccess, Long defenseFail, Long trust, Long distrust, Long lie, Long truth) {
        this.playerSequence = playerSequence;
        this.animalId = animalId;
        this.attackSuccess = attackSuccess;
        this.attackFail = attackFail;
        this.defenseSuccess = defenseSuccess;
        this.defenseFail = defenseFail;
        this.trust = trust;
        this.distrust = distrust;
        this.lie = lie;
        this.truth = truth;
    }

    /**
     * 생성 메서드
     */

    public static PlayerAnimal createPlayerAnimal(com.example.ranking.domain.entity.Player player,  Long attackSuccess, Long attackFail, Long defenseSuccess, Long defenseFail, Long trust, Long distrust, Long lie, Long truth) {

        return null;
    }
}
