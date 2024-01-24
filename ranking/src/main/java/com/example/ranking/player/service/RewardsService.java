package com.example.ranking.player.service;


import com.example.ranking.player.dto.AnimalDto;
import com.example.ranking.player.dto.GameResult;
import com.example.ranking.player.dto.animal.AnimalType;
import com.example.ranking.player.entity.Animal;
import com.example.ranking.player.entity.Player;
import com.example.ranking.player.entity.PlayerAnimal;
import com.example.ranking.player.repository.AnimalRepository;
import com.example.ranking.player.repository.PlayerAnimalRepository;
import com.example.ranking.player.repository.PlayerRepository;
import jakarta.persistence.EntityManager;
import java.util.concurrent.ConcurrentHashMap;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class RewardsService {

    private final PlayerRepository playerRepository;
    private final PlayerAnimalRepository playerAnimalRepository;
    private final AnimalRepository animalRepository;
    private final EntityManager em;

    /**
     * player rewards 지표를 DB에 저장(업데이트)
     */
    @Transactional
    public void saveRewards(GameResult gameResult) {

        //플레이어 찾기
        //select player 쿼리 1번
//        Player findByPlayer = playerRepository.findByPlayerId(gameResult.getPlayerId());
        Player findByPlayer = playerRepository.findByPlayerSequence(gameResult.getPlayerSequence());

        //turn 과 round 누적 업데이트
        //update 쿼리 1번
        findByPlayer.setTotalRound(findByPlayer.getTotalRound() + gameResult.getRound());
        findByPlayer.setTotalTurn(findByPlayer.getTotalTurn() + gameResult.getTurn());

        System.out.println("gameResult = " + gameResult);

        ConcurrentHashMap<String, AnimalType> map = new ConcurrentHashMap<>();

//        map.put("TIGER01",gameResult.getTiger());
//        map.put("CAT02", gameResult.getCat());

        System.out.println("map = " + map);

        for (String key : map.keySet()) {

            PlayerAnimal playerAnimal = playerAnimalRepository.findByPlayerSequenceAndAnimalId(findByPlayer.getPlayerSequence(), key);

//            System.out.println("key = " + key);
//            System.out.println("map.get(key).getAnimalScore() = " + map.get(key).getAnimalScore());
//            playerAnimal.setAnimalScore(map.get(key).getAnimalScore());
        }


//        playerAnimalRepository.updatePlayerAnimal();

//        List<PlayerAnimal> playerAnimals = playerAnimalRepository.findByPlayerSequence(gameResult.getPlayerSequence());

    }

    @Transactional
    public void saveRewards2(AnimalDto animalDto) {

        log.info("animalDto={}", animalDto);

        Player player = playerRepository.findByPlayerSequence(animalDto.getPlayerSequence());
        Animal cat = animalRepository.findByAnimalId(animalDto.getCat().getAnimalId());

        /**
         * 고양이 업적 정보 추가 및 업데이트
         */

        PlayerAnimal playerCat = playerAnimalRepository.findByPlayerSequenceAndAnimalId(player.getPlayerSequence(), animalDto.getCat().getAnimalId());
        log.info("playerCat= {}", playerCat);
        //플레이어의 전적 정보가 있으면 업데이트 해주기
        if(playerCat != null)
            playerCat.updateAnimalScore(playerCat.getAnimalScore(), animalDto.getCat().getAnimalScore());

        //만약 해당 플레이어가 동물에 대한 전적 정보가 없다면 새롭게 만들어 주기
        else{
            PlayerAnimal playerAnimal = new PlayerAnimal(player, cat, animalDto.getCat().getAnimalScore());
            log.info("playerAnimal= {}", playerAnimal);
            em.persist(playerAnimal);
        }

        Animal dog = animalRepository.findByAnimalId(animalDto.getDog().getAnimalId());

        /**
         * 고양이 업적 정보 추가 및 업데이트
         */

        PlayerAnimal playerDog = playerAnimalRepository.findByPlayerSequenceAndAnimalId(player.getPlayerSequence(), animalDto.getDog().getAnimalId());
        log.info("playerDog= {}", playerDog);
        //플레이어의 전적 정보가 있으면 업데이트 해주기
        if(playerDog != null)
            playerDog.updateAnimalScore(playerDog.getAnimalScore(), animalDto.getDog().getAnimalScore());

        //만약 해당 플레이어가 동물에 대한 전적 정보가 없다면 새롭게 만들어 주기
        else{
            PlayerAnimal playerAnimal = new PlayerAnimal(player, dog, animalDto.getDog().getAnimalScore());
            log.info("playerAnimal= {}", playerAnimal);
            em.persist(playerAnimal);
        }


    }


}
