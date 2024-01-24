package com.example.ranking.domain.dto;


import com.example.ranking.domain.dto.animal.AnimalType;
import com.example.ranking.domain.dto.animal.Cat;
import com.example.ranking.domain.dto.animal.Deer;
import com.example.ranking.domain.dto.animal.Dog;
import com.example.ranking.domain.dto.animal.Fox;
import com.example.ranking.domain.dto.animal.Pig;
import com.example.ranking.domain.dto.animal.Sheep;
import com.example.ranking.domain.dto.animal.Tiger;
import com.example.ranking.domain.dto.animal.Whale;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AnimalDto {

    private Long playerSequence;
    private String playerId;
    private Long round;
    private Long turn;

    private AnimalType cat = new Cat();
    private AnimalType dog = new Dog();
    private AnimalType tiger = new Tiger();
    private AnimalType whale = new Whale();
    private AnimalType sheep = new Sheep();
    private AnimalType fox = new Fox();
    private AnimalType pig = new Pig();
    private AnimalType deer = new Deer();

}
