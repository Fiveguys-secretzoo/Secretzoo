package com.example.ranking.player.entity;

import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class AnimalScore {


    private Long attackSuccess = 0L;
    private Long attackFail = 0L;
    private Long defenseSuccess = 0L;
    private Long defenseFail = 0L;
    private Long trust = 0L;
    private Long distrust = 0L;
    private Long truth = 0L;
    private Long lie = 0L;
}
