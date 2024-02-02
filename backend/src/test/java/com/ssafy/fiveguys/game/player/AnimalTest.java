package com.ssafy.fiveguys.game.player;


import com.example.ranking.player.dto.animal.AnimalType;
import com.example.ranking.player.dto.animal.Cat;
import com.example.ranking.player.dto.animal.Whale;
import org.junit.jupiter.api.Test;

public class AnimalTest {

    @Test
    public void animalTest() {
        AnimalType cat = new Cat();
        AnimalType whale = new Whale();

        System.out.println("cat = " + cat);
        System.out.println("whale = " + whale);

    }
}
