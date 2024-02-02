package com.ssafy.fiveguys.game.player.service;

import com.ssafy.fiveguys.game.player.entity.AnimalScore;
import com.ssafy.fiveguys.game.player.entity.PlayerAnimal;
import com.ssafy.fiveguys.game.player.entity.PlayerRewards;
import com.ssafy.fiveguys.game.player.entity.Rewards;
import com.ssafy.fiveguys.game.player.repository.PlayerRewardsRepository;
import com.ssafy.fiveguys.game.player.repository.RewardsRepository;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AnimalRewardsService {

    private final RewardsRepository rewardsRepository;
    private final PlayerRewardsRepository playerRewardsRepository;



    /**
     * player_animal 테이블의 tiger 데이터를 바탕으로 tiger 업적 중 에 달성한 것이 있는지 확인 하는 메서드
     * @param playerTiger
     */
    public void checkTiger(PlayerAnimal playerTiger) {

        log.info("playerTiger = {}", playerTiger);
        log.info("playerTiger.getAnimalScore = {}", playerTiger.getAnimalScore());
        log.info("tiger 전체 rewards = {}",rewardsRepository.findByAnimalId(playerTiger.getAnimal().getAnimalId()));
        log.info("아직 달성하지 못한 playerRewards = {}", playerRewardsRepository.findNotDoneRewardsByPlayerSequence(playerTiger.getPlayer().getPlayerSequence()));

        Map<String, Long> map = getAnimalRewardsMap(playerTiger);

        //tiger rewards 리스트
        List<Rewards> animalRewards = rewardsRepository.findByAnimalId(
            playerTiger.getAnimal().getAnimalId());

        //달성하지 못한 cat rewards
        List<PlayerRewards> notDoneRewardsByPlayerSequenceWithAnimalId = playerRewardsRepository.findNotDoneRewardsByPlayerSequenceWithAnimalId(
            playerTiger.getPlayer().getPlayerSequence(), playerTiger.getAnimal().getAnimalId());
        log.info("아직 달성하지 못한 tiger playerRewards = {}", notDoneRewardsByPlayerSequenceWithAnimalId);

        log.info("map ={}", map.toString());
        for (Rewards animalReward : animalRewards) {

            String rewardsKey = animalReward.getRewardsKey();

            //달성 조건 값 보다 더 큰 경우 player에 해당 업적 추가
            if(map.get(rewardsKey) >= animalReward.getRewardsValue()) {
                System.out.println("rewardsKey = 달성 " + rewardsKey);
            }
        }

    }

    /**
     * player_animal 테이블의 cat 데이터를 바탕으로 cat 업적 중 에 달성한 것이 있는지 확인 하는 메서드
     * @param playerCat
     */
    public void checkCat(PlayerAnimal playerCat) {

        log.info("playerCat = {}", playerCat);
        log.info("playerCat.getAnimalScore = {}", playerCat.getAnimalScore());
        log.info("cat 전체 rewards = {}",rewardsRepository.findByAnimalId(playerCat.getAnimal().getAnimalId()));
        log.info("아직 달성하지 못한 playerRewards = {}", playerRewardsRepository.findNotDoneRewardsByPlayerSequence(playerCat.getPlayer().getPlayerSequence()));

        Map<String, Long> map = getAnimalRewardsMap(playerCat);

        //cat rewards 리스트
        List<Rewards> animalRewards = rewardsRepository.findByAnimalId(
            playerCat.getAnimal().getAnimalId());

        //달성하지 못한 cat rewards
        List<PlayerRewards> notDoneRewardsByPlayerSequenceWithAnimalId = playerRewardsRepository.findNotDoneRewardsByPlayerSequenceWithAnimalId(
            playerCat.getPlayer().getPlayerSequence(), playerCat.getAnimal().getAnimalId());
        log.info("아직 달성하지 못한 cat playerRewards = {}", notDoneRewardsByPlayerSequenceWithAnimalId);

        log.info("map ={}", map.toString());
        for (Rewards animalReward : animalRewards) {

            String rewardsKey = animalReward.getRewardsKey();

            //달성 조건 값 보다 더 큰 경우 player에 해당 업적 추가
            if(map.get(rewardsKey) >= animalReward.getRewardsValue()) {
                System.out.println("rewardsKey = 달성 " + rewardsKey);
            }
        }

    }


    /**
     * player_animal 테이블의 dog 데이터를 바탕으로 dog 업적 중 에 달성한 것이 있는지 확인 하는 메서드
     * @param playerDog
     */
    public void checkDog(PlayerAnimal playerDog) {

        log.info("playerDog = {}", playerDog);
        log.info("playerDog.getAnimalScore = {}", playerDog.getAnimalScore());
        log.info("dog 전체 rewards = {}",rewardsRepository.findByAnimalId(playerDog.getAnimal().getAnimalId()));
        log.info("아직 달성하지 못한 playerRewards = {}", playerRewardsRepository.findNotDoneRewardsByPlayerSequence(playerDog.getPlayer().getPlayerSequence()));

        Map<String, Long> map = getAnimalRewardsMap(playerDog);

        //dog rewards 리스트
        List<Rewards> animalRewards = rewardsRepository.findByAnimalId(
            playerDog.getAnimal().getAnimalId());

        //달성하지 못한 dog rewards
        List<PlayerRewards> notDoneRewardsByPlayerSequenceWithAnimalId = playerRewardsRepository.findNotDoneRewardsByPlayerSequenceWithAnimalId(
            playerDog.getPlayer().getPlayerSequence(), playerDog.getAnimal().getAnimalId());
        log.info("아직 달성하지 못한 dog playerRewards = {}", notDoneRewardsByPlayerSequenceWithAnimalId);

        log.info("map ={}", map.toString());
        for (Rewards animalReward : animalRewards) {

            String rewardsKey = animalReward.getRewardsKey();

            //달성 조건 값 보다 더 큰 경우 player에 해당 업적 추가
            if(map.get(rewardsKey) >= animalReward.getRewardsValue()) {
                System.out.println("rewardsKey = 달성 " + rewardsKey);
            }
        }

    }


    /**
     * player_animal 테이블의 deer 데이터를 바탕으로 deer 업적 중 에 달성한 것이 있는지 확인 하는 메서드
     * @param playerDeer
     */
    public void checkDeer(PlayerAnimal playerDeer) {

        log.info("playerDeer = {}", playerDeer);
        log.info("playerDeer.getAnimalScore = {}", playerDeer.getAnimalScore());
        log.info("deer 전체 rewards = {}",rewardsRepository.findByAnimalId(playerDeer.getAnimal().getAnimalId()));
        log.info("아직 달성하지 못한 playerRewards = {}", playerRewardsRepository.findNotDoneRewardsByPlayerSequence(playerDeer.getPlayer().getPlayerSequence()));

        Map<String, Long> map = getAnimalRewardsMap(playerDeer);

        //deer rewards 리스트
        List<Rewards> animalRewards = rewardsRepository.findByAnimalId(
            playerDeer.getAnimal().getAnimalId());

        //달성하지 못한 deer rewards
        List<PlayerRewards> notDoneRewardsByPlayerSequenceWithAnimalId = playerRewardsRepository.findNotDoneRewardsByPlayerSequenceWithAnimalId(
            playerDeer.getPlayer().getPlayerSequence(), playerDeer.getAnimal().getAnimalId());
        log.info("아직 달성하지 못한 deer playerRewards = {}", notDoneRewardsByPlayerSequenceWithAnimalId);

        log.info("map ={}", map.toString());
        for (Rewards animalReward : animalRewards) {

            String rewardsKey = animalReward.getRewardsKey();

            //달성 조건 값 보다 더 큰 경우 player에 해당 업적 추가
            if(map.get(rewardsKey) >= animalReward.getRewardsValue()) {
                System.out.println("rewardsKey = 달성 " + rewardsKey);
            }
        }

    }

    /**
     * player_animal 테이블의 pig 데이터를 바탕으로 pig 업적 중 에 달성한 것이 있는지 확인 하는 메서드
     * @param playerPig
     */
    public void checkPig(PlayerAnimal playerPig) {

        log.info("playerPig = {}", playerPig);
        log.info("playerPig.getAnimalScore = {}", playerPig.getAnimalScore());
        log.info("pig 전체 rewards = {}",rewardsRepository.findByAnimalId(playerPig.getAnimal().getAnimalId()));
        log.info("아직 달성하지 못한 playerRewards = {}", playerRewardsRepository.findNotDoneRewardsByPlayerSequence(playerPig.getPlayer().getPlayerSequence()));

        Map<String, Long> map = getAnimalRewardsMap(playerPig);

        //pig rewards 리스트
        List<Rewards> animalRewards = rewardsRepository.findByAnimalId(
            playerPig.getAnimal().getAnimalId());

        //달성하지 못한 pig rewards
        List<PlayerRewards> notDoneRewardsByPlayerSequenceWithAnimalId = playerRewardsRepository.findNotDoneRewardsByPlayerSequenceWithAnimalId(
            playerPig.getPlayer().getPlayerSequence(), playerPig.getAnimal().getAnimalId());
        log.info("아직 달성하지 못한 pig playerRewards = {}", notDoneRewardsByPlayerSequenceWithAnimalId);

        log.info("map ={}", map.toString());
        for (Rewards animalReward : animalRewards) {

            String rewardsKey = animalReward.getRewardsKey();

            //달성 조건 값 보다 더 큰 경우 player에 해당 업적 추가
            if(map.get(rewardsKey) >= animalReward.getRewardsValue()) {
                System.out.println("rewardsKey = 달성 " + rewardsKey);
            }
        }

    }


    /**
     * player_animal 테이블의 fox 데이터를 바탕으로 fox 업적 중 에 달성한 것이 있는지 확인 하는 메서드
     * @param playerFox
     */
    public void checkFox(PlayerAnimal playerFox) {

        log.info("playerFox = {}", playerFox);
        log.info("playerFox.getAnimalScore = {}", playerFox.getAnimalScore());
        log.info("fox 전체 rewards = {}",rewardsRepository.findByAnimalId(playerFox.getAnimal().getAnimalId()));
        log.info("아직 달성하지 못한 playerRewards = {}", playerRewardsRepository.findNotDoneRewardsByPlayerSequence(playerFox.getPlayer().getPlayerSequence()));

        Map<String, Long> map = getAnimalRewardsMap(playerFox);

        //fox rewards 리스트
        List<Rewards> animalRewards = rewardsRepository.findByAnimalId(
            playerFox.getAnimal().getAnimalId());

        //달성하지 못한 fox rewards
        List<PlayerRewards> notDoneRewardsByPlayerSequenceWithAnimalId = playerRewardsRepository.findNotDoneRewardsByPlayerSequenceWithAnimalId(
            playerFox.getPlayer().getPlayerSequence(), playerFox.getAnimal().getAnimalId());
        log.info("아직 달성하지 못한 fox playerRewards = {}", notDoneRewardsByPlayerSequenceWithAnimalId);

        log.info("map ={}", map.toString());
        for (Rewards animalReward : animalRewards) {

            String rewardsKey = animalReward.getRewardsKey();

            //달성 조건 값 보다 더 큰 경우 player에 해당 업적 추가
            if(map.get(rewardsKey) >= animalReward.getRewardsValue()) {
                System.out.println("rewardsKey = 달성 " + rewardsKey);
            }
        }

    }

    /**
     * player_animal 테이블의 sheep 데이터를 바탕으로 sheep 업적 중 에 달성한 것이 있는지 확인 하는 메서드
     * @param playerSheep
     */
    public void checkSheep(PlayerAnimal playerSheep) {

        log.info("playerSheep = {}", playerSheep);
        log.info("playerSheep.getAnimalScore = {}", playerSheep.getAnimalScore());
        log.info("sheep 전체 rewards = {}",rewardsRepository.findByAnimalId(playerSheep.getAnimal().getAnimalId()));
        log.info("아직 달성하지 못한 playerRewards = {}", playerRewardsRepository.findNotDoneRewardsByPlayerSequence(playerSheep.getPlayer().getPlayerSequence()));

        Map<String, Long> map = getAnimalRewardsMap(playerSheep);

        //sheep rewards 리스트
        List<Rewards> animalRewards = rewardsRepository.findByAnimalId(
            playerSheep.getAnimal().getAnimalId());

        //달성하지 못한 sheep rewards
        List<PlayerRewards> notDoneRewardsByPlayerSequenceWithAnimalId = playerRewardsRepository.findNotDoneRewardsByPlayerSequenceWithAnimalId(
            playerSheep.getPlayer().getPlayerSequence(), playerSheep.getAnimal().getAnimalId());
        log.info("아직 달성하지 못한 sheep playerRewards = {}", notDoneRewardsByPlayerSequenceWithAnimalId);

        log.info("map ={}", map.toString());
        for (Rewards animalReward : animalRewards) {

            String rewardsKey = animalReward.getRewardsKey();

            //달성 조건 값 보다 더 큰 경우 player에 해당 업적 추가
            if(map.get(rewardsKey) >= animalReward.getRewardsValue()) {
                System.out.println("rewardsKey = 달성 " + rewardsKey);
            }
        }

    }

    /**
     * player_animal 테이블의 sheep 데이터를 바탕으로 whale 업적 중 에 달성한 것이 있는지 확인 하는 메서드
     * @param playerWhale
     */
    public void checkWhale(PlayerAnimal playerWhale) {

        log.info("playerWhale = {}", playerWhale);
        log.info("playerWhale.getAnimalScore = {}", playerWhale.getAnimalScore());
        log.info("sheep 전체 rewards = {}",rewardsRepository.findByAnimalId(playerWhale.getAnimal().getAnimalId()));
        log.info("아직 달성하지 못한 playerRewards = {}", playerRewardsRepository.findNotDoneRewardsByPlayerSequence(playerWhale.getPlayer().getPlayerSequence()));

        Map<String, Long> map = getAnimalRewardsMap(playerWhale);

        //whale rewards 리스트
        List<Rewards> animalRewards = rewardsRepository.findByAnimalId(
            playerWhale.getAnimal().getAnimalId());

        //달성하지 못한 whale rewards
        List<PlayerRewards> notDoneRewardsByPlayerSequenceWithAnimalId = playerRewardsRepository.findNotDoneRewardsByPlayerSequenceWithAnimalId(
            playerWhale.getPlayer().getPlayerSequence(), playerWhale.getAnimal().getAnimalId());
        log.info("아직 달성하지 못한 sheep playerRewards = {}", notDoneRewardsByPlayerSequenceWithAnimalId);

        log.info("map ={}", map.toString());
        for (Rewards animalReward : animalRewards) {

            String rewardsKey = animalReward.getRewardsKey();

            //달성 조건 값 보다 더 큰 경우 player에 해당 업적 추가
            if(map.get(rewardsKey) >= animalReward.getRewardsValue()) {
                System.out.println("rewardsKey = 달성 " + rewardsKey);
            }
        }

    }

    /**
     * 업적 업데이트 때 활용하기 위한 map 자료 생성 메서드
     * @param playerAnimal
     * @return
     */
    private static Map<String, Long> getAnimalRewardsMap(PlayerAnimal playerAnimal) {
        AnimalScore animalScore = playerAnimal.getAnimalScore();

        Map<String, Long> map = new HashMap<>();
        map.put("attackSuccess", animalScore.getAttackSuccess());
        map.put("attackFail", animalScore.getAttackFail());
        map.put("defenseSuccess", animalScore.getDefenseSuccess());
        map.put("defenseFail", animalScore.getDefenseFail());
        map.put("trust", animalScore.getTrust());
        map.put("distrust", animalScore.getDistrust());
        map.put("truth", animalScore.getTruth());
        map.put("lie", animalScore.getLie());
        return map;
    }


    /**
     * player가 달성한 업젇 조회
     * @param userSequence
     * @return
     */
    public List<PlayerRewards> getPlayerDoneRewards(Long userSequence) {
        return playerRewardsRepository.findDoneRewardsByUserSequence(userSequence);
    }

    /**
     * player의 모든 업적 조회
     * @param userSequence
     * @return
     */

    public List<PlayerRewards> getPlayerAllRewards(Long userSequence) {
        return playerRewardsRepository.findRewardsByUserSequence(userSequence);
    }

    public int getDoneRewardsCount(String rewardsId) {
        return playerRewardsRepository.findDoneRewardsWithRewardsId(rewardsId);
    }
}
