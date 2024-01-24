package com.example.ranking.domain.dto.animal;


import com.example.ranking.domain.AnimalScore;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Data
public class AnimalType {


    String animalId;

    AnimalScore animalScore;
//    Long attackSuccess = 0L;
//    Long attackFail = 0L;
//    Long defenseSuccess = 0L;
//    Long defenseFail = 0L;
//    Long trust = 0L;
//    Long distrust = 0L;
//    Long lie = 0L;
//    Long truth = 0L;



}
