package com.ssafy.fiveguys.game.player.dto;


import com.ssafy.fiveguys.game.player.dto.animal.AnimalType;
import com.ssafy.fiveguys.game.player.dto.animal.Cat;
import com.ssafy.fiveguys.game.player.dto.animal.Deer;
import com.ssafy.fiveguys.game.player.dto.animal.Dog;
import com.ssafy.fiveguys.game.player.dto.animal.Fox;
import com.ssafy.fiveguys.game.player.dto.animal.Pig;
import com.ssafy.fiveguys.game.player.dto.animal.Sheep;
import com.ssafy.fiveguys.game.player.dto.animal.Tiger;
import com.ssafy.fiveguys.game.player.dto.animal.Whale;
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
