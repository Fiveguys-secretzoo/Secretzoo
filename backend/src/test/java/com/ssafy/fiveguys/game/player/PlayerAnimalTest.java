package com.ssafy.fiveguys.game.player;

import com.ssafy.fiveguys.game.player.entity.PlayerAnimal;
import com.ssafy.fiveguys.game.player.repository.PlayerAnimalRepository;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
public class PlayerAnimalTest {


    @Autowired
    PlayerAnimalRepository playerAnimalRepository;
    @Test
    @Transactional
    public void playerAnimalTest() {

        List<PlayerAnimal> byUserSequence = playerAnimalRepository.findByUserSequence(101L);
        System.out.println("byUserSequence = " + byUserSequence);
    }

    @Transactional
    @Test
    void findByUserSequence() {
        PlayerAnimal playerAnimal = playerAnimalRepository.findByPlayerSequenceAndAnimalId(1L, "TIGER01");
        System.out.println("playerAnimal = " + playerAnimal);
    }
}
