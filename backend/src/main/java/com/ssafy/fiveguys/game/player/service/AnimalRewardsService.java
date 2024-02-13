package com.ssafy.fiveguys.game.player.service;

import com.ssafy.fiveguys.game.player.entity.embeddedType.AnimalScore;
import com.ssafy.fiveguys.game.player.entity.PlayerAnimal;
import com.ssafy.fiveguys.game.player.entity.PlayerRewards;
import com.ssafy.fiveguys.game.player.entity.Rewards;
import com.ssafy.fiveguys.game.player.entity.RewardsKey;
import com.ssafy.fiveguys.game.player.repository.PlayerRewardsRepository;
import com.ssafy.fiveguys.game.player.repository.RewardsRepository;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AnimalRewardsService {

    private final RewardsRepository rewardsRepository;
    private final PlayerRewardsRepository playerRewardsRepository;


    @Transactional
    public void checkAnimal(PlayerAnimal playerAnimal) {

        log.debug("playerAnimal = {}", playerAnimal);
        log.debug("playerAnimal.getAnimalScore = {}", playerAnimal.getAnimalScore());
        log.debug("아직 달성하지 못한 playerRewards = {}",
            playerRewardsRepository.findNotDoneRewardsByPlayerSequence(
                playerAnimal.getPlayer().getPlayerSequence()));

        Map<RewardsKey, Long> map = getAnimalRewardsMap(playerAnimal);

        //animal rewards 리스트
        List<Rewards> animalRewards = rewardsRepository.findByAnimal_animalId(
            playerAnimal.getAnimal().getAnimalId());
        log.debug("tiger rewards = {}", animalRewards);
        //달성하지 못한 animal rewards
        List<PlayerRewards> notDoneRewardsByPlayerSequenceWithAnimalId = playerRewardsRepository.findNotDoneRewardsByPlayerSequenceWithAnimalId(
            playerAnimal.getPlayer().getPlayerSequence(), playerAnimal.getAnimal().getAnimalId());

        log.debug("아직 달성하지 못한 animal playerRewards = {}", notDoneRewardsByPlayerSequenceWithAnimalId);
        log.debug("map ={}", map.toString());


        for (PlayerRewards playerRewards : notDoneRewardsByPlayerSequenceWithAnimalId) {
            RewardsKey rewardsKey = playerRewards.getRewards().getRewardsKey();
            if (map.get(rewardsKey) >= playerRewards.getRewards().getRewardsValue()) {
                playerRewards.setDone(true);
                log.debug("달성 : tiger rewards = {}", playerRewards.getRewards().getRewardsName());
            }
        }
    }


    /**
     * player_animal 테이블의 tiger 데이터를 바탕으로 tiger 업적 중 에 달성한 것이 있는지 확인 하는 메서드
     * @param playerTiger
     */
    @Transactional
    public void checkTiger(PlayerAnimal playerTiger) {
        Map<RewardsKey, Long> map = getAnimalRewardsMap(playerTiger);
        //달성하지 못한 tiger rewards
        List<PlayerRewards> notDoneRewardsByPlayerSequenceWithAnimalId = playerRewardsRepository.findNotDoneRewardsByPlayerSequenceWithAnimalId(
            playerTiger.getPlayer().getPlayerSequence(), playerTiger.getAnimal().getAnimalId());
        log.debug("아직 달성하지 못한 tiger playerRewards = {}", notDoneRewardsByPlayerSequenceWithAnimalId);
        log.debug("map ={}", map.toString());

        //달성하지 못한 업적이 없으면 return
        if(notDoneRewardsByPlayerSequenceWithAnimalId.isEmpty()) return;

        for (PlayerRewards playerRewards : notDoneRewardsByPlayerSequenceWithAnimalId) {
            RewardsKey rewardsKey = playerRewards.getRewards().getRewardsKey();
            if (map.get(rewardsKey) >= playerRewards.getRewards().getRewardsValue()) {
                playerRewards.setDone(true);
                log.debug("달성 : tiger rewards = {}", playerRewards.getRewards().getRewardsName());
            }
        }
    }

    /**
     * player_animal 테이블의 cat 데이터를 바탕으로 cat 업적 중 에 달성한 것이 있는지 확인 하는 메서드
     * @param playerCat
     */
    public void checkCat(PlayerAnimal playerCat) {

        Map<RewardsKey, Long> map = getAnimalRewardsMap(playerCat);
        //달성하지 못한 cat rewards
        List<PlayerRewards> notDoneRewardsByPlayerSequenceWithAnimalId = playerRewardsRepository.findNotDoneRewardsByPlayerSequenceWithAnimalId(
            playerCat.getPlayer().getPlayerSequence(), playerCat.getAnimal().getAnimalId());
        log.debug("아직 달성하지 못한 cat playerRewards = {}", notDoneRewardsByPlayerSequenceWithAnimalId);
        log.debug("map ={}", map.toString());

        //달성하지 못한 업적이 없으면 return
        if(notDoneRewardsByPlayerSequenceWithAnimalId.isEmpty()) return;

        for (PlayerRewards playerRewards : notDoneRewardsByPlayerSequenceWithAnimalId) {
            RewardsKey rewardsKey = playerRewards.getRewards().getRewardsKey();
            if (map.get(rewardsKey) >= playerRewards.getRewards().getRewardsValue()) {
                playerRewards.setDone(true);
                log.debug("달성 : cat rewards = {}", playerRewards.getRewards().getRewardsName());
            }
        }
    }


    /**
     * player_animal 테이블의 dog 데이터를 바탕으로 dog 업적 중 에 달성한 것이 있는지 확인 하는 메서드
     * @param playerDog
     */
    public void checkDog(PlayerAnimal playerDog) {

        Map<RewardsKey, Long> map = getAnimalRewardsMap(playerDog);
        //달성하지 못한 dog rewards
        List<PlayerRewards> notDoneRewardsByPlayerSequenceWithAnimalId = playerRewardsRepository.findNotDoneRewardsByPlayerSequenceWithAnimalId(
            playerDog.getPlayer().getPlayerSequence(), playerDog.getAnimal().getAnimalId());
        log.debug("아직 달성하지 못한 dog playerRewards = {}", notDoneRewardsByPlayerSequenceWithAnimalId);
        log.debug("map ={}", map.toString());

        //달성하지 못한 업적이 없으면 return
        if(notDoneRewardsByPlayerSequenceWithAnimalId.isEmpty()) return;

        for (PlayerRewards playerRewards : notDoneRewardsByPlayerSequenceWithAnimalId) {
            RewardsKey rewardsKey = playerRewards.getRewards().getRewardsKey();
            if (map.get(rewardsKey) >= playerRewards.getRewards().getRewardsValue()) {
                playerRewards.setDone(true);
                log.debug("달성 : dog rewards = {}", playerRewards.getRewards().getRewardsName());
            }
        }

    }


    /**
     * player_animal 테이블의 deer 데이터를 바탕으로 deer 업적 중 에 달성한 것이 있는지 확인 하는 메서드
     * @param playerDeer
     */
    public void checkDeer(PlayerAnimal playerDeer) {

        Map<RewardsKey, Long> map = getAnimalRewardsMap(playerDeer);
        //달성하지 못한 deer rewards
        List<PlayerRewards> notDoneRewardsByPlayerSequenceWithAnimalId = playerRewardsRepository.findNotDoneRewardsByPlayerSequenceWithAnimalId(
            playerDeer.getPlayer().getPlayerSequence(), playerDeer.getAnimal().getAnimalId());
        log.debug("아직 달성하지 못한 deer playerRewards = {}", notDoneRewardsByPlayerSequenceWithAnimalId);
        log.debug("map ={}", map.toString());

        //달성하지 못한 업적이 없으면 return
        if(notDoneRewardsByPlayerSequenceWithAnimalId.isEmpty()) return;

        for (PlayerRewards playerRewards : notDoneRewardsByPlayerSequenceWithAnimalId) {
            RewardsKey rewardsKey = playerRewards.getRewards().getRewardsKey();
            if (map.get(rewardsKey) >= playerRewards.getRewards().getRewardsValue()) {
                playerRewards.setDone(true);
                log.debug("달성 : deer rewards = {}", playerRewards.getRewards().getRewardsName());
            }
        }
    }

    /**
     * player_animal 테이블의 pig 데이터를 바탕으로 pig 업적 중 에 달성한 것이 있는지 확인 하는 메서드
     * @param playerPig
     */
    public void checkPig(PlayerAnimal playerPig) {

        Map<RewardsKey, Long> map = getAnimalRewardsMap(playerPig);
        //달성하지 못한 pig rewards
        List<PlayerRewards> notDoneRewardsByPlayerSequenceWithAnimalId = playerRewardsRepository.findNotDoneRewardsByPlayerSequenceWithAnimalId(
            playerPig.getPlayer().getPlayerSequence(), playerPig.getAnimal().getAnimalId());
        log.debug("아직 달성하지 못한 pig playerRewards = {}", notDoneRewardsByPlayerSequenceWithAnimalId);
        log.debug("map ={}", map.toString());

        //달성하지 못한 업적이 없으면 return
        if(notDoneRewardsByPlayerSequenceWithAnimalId.isEmpty()) return;

        for (PlayerRewards playerRewards : notDoneRewardsByPlayerSequenceWithAnimalId) {
            RewardsKey rewardsKey = playerRewards.getRewards().getRewardsKey();
            if (map.get(rewardsKey) >= playerRewards.getRewards().getRewardsValue()) {
                playerRewards.setDone(true);
                log.debug("달성 : pig rewards = {}", playerRewards.getRewards().getRewardsName());
            }
        }
    }


    /**
     * player_animal 테이블의 fox 데이터를 바탕으로 fox 업적 중 에 달성한 것이 있는지 확인 하는 메서드
     * @param playerFox
     */
    public void checkFox(PlayerAnimal playerFox) {

        Map<RewardsKey, Long> map = getAnimalRewardsMap(playerFox);
        //달성하지 못한 fox rewards
        List<PlayerRewards> notDoneRewardsByPlayerSequenceWithAnimalId = playerRewardsRepository.findNotDoneRewardsByPlayerSequenceWithAnimalId(
            playerFox.getPlayer().getPlayerSequence(), playerFox.getAnimal().getAnimalId());
        log.debug("아직 달성하지 못한 fox playerRewards = {}", notDoneRewardsByPlayerSequenceWithAnimalId);
        log.debug("map ={}", map.toString());

        //달성하지 못한 업적이 없으면 return
        if(notDoneRewardsByPlayerSequenceWithAnimalId.isEmpty()) return;

        for (PlayerRewards playerRewards : notDoneRewardsByPlayerSequenceWithAnimalId) {
            RewardsKey rewardsKey = playerRewards.getRewards().getRewardsKey();
            if (map.get(rewardsKey) >= playerRewards.getRewards().getRewardsValue()) {
                playerRewards.setDone(true);
                log.debug("달성 : fox rewards = {}", playerRewards.getRewards().getRewardsName());
            }
        }
    }

    /**
     * player_animal 테이블의 sheep 데이터를 바탕으로 sheep 업적 중 에 달성한 것이 있는지 확인 하는 메서드
     *
     * @param playerSheep
     */
    public void checkSheep(PlayerAnimal playerSheep) {

        Map<RewardsKey, Long> map = getAnimalRewardsMap(playerSheep);
        //sheep rewards 리스트
        List<Rewards> animalRewards = rewardsRepository.findByAnimal_animalId(
            playerSheep.getAnimal().getAnimalId());
        //달성하지 못한 sheep rewards
        List<PlayerRewards> notDoneRewardsByPlayerSequenceWithAnimalId = playerRewardsRepository.findNotDoneRewardsByPlayerSequenceWithAnimalId(
            playerSheep.getPlayer().getPlayerSequence(), playerSheep.getAnimal().getAnimalId());
        log.debug("아직 달성하지 못한 sheep playerRewards = {}", notDoneRewardsByPlayerSequenceWithAnimalId);
        log.debug("map ={}", map.toString());

        //달성하지 못한 업적이 없으면 return
        if(notDoneRewardsByPlayerSequenceWithAnimalId.isEmpty()) return;

        for (PlayerRewards playerRewards : notDoneRewardsByPlayerSequenceWithAnimalId) {
            RewardsKey rewardsKey = playerRewards.getRewards().getRewardsKey();
            if (map.get(rewardsKey) >= playerRewards.getRewards().getRewardsValue()) {
                playerRewards.setDone(true);
                log.debug("달성 : sheep rewards = {}", playerRewards.getRewards().getRewardsName());
            }
        }
    }

    /**
     * player_animal 테이블의 sheep 데이터를 바탕으로 whale 업적 중 에 달성한 것이 있는지 확인 하는 메서드
     * @param playerWhale
     */
    public void checkWhale(PlayerAnimal playerWhale) {

        Map<RewardsKey, Long> map = getAnimalRewardsMap(playerWhale);
        //whale rewards 리스트
        List<Rewards> animalRewards = rewardsRepository.findByAnimal_animalId(
            playerWhale.getAnimal().getAnimalId());
        //달성하지 못한 whale rewards
        List<PlayerRewards> notDoneRewardsByPlayerSequenceWithAnimalId = playerRewardsRepository.findNotDoneRewardsByPlayerSequenceWithAnimalId(
            playerWhale.getPlayer().getPlayerSequence(), playerWhale.getAnimal().getAnimalId());
        log.debug("아직 달성하지 못한 sheep playerRewards = {}", notDoneRewardsByPlayerSequenceWithAnimalId);
        log.debug("map ={}", map.toString());

        //달성하지 못한 업적이 없으면 return
        if(notDoneRewardsByPlayerSequenceWithAnimalId.isEmpty()) return;

        for (PlayerRewards playerRewards : notDoneRewardsByPlayerSequenceWithAnimalId) {
            RewardsKey rewardsKey = playerRewards.getRewards().getRewardsKey();
            if (map.get(rewardsKey) >= playerRewards.getRewards().getRewardsValue()) {
                playerRewards.setDone(true);
                log.debug("달성 : whale rewards = {}", playerRewards.getRewards().getRewardsName());
            }
        }
    }

    /**
     * 업적 업데이트 때 활용하기 위한 map 자료 생성 메서드
     *
     * @param playerAnimal
     * @return
     */
    private static Map<RewardsKey, Long> getAnimalRewardsMap(PlayerAnimal playerAnimal) {
        AnimalScore animalScore = playerAnimal.getAnimalScore();
        Map<RewardsKey, Long> map = new HashMap<>();
        map.put(RewardsKey.attackSuccess, animalScore.getAttackSuccess());
        map.put(RewardsKey.attackFail, animalScore.getAttackFail());
        map.put(RewardsKey.defenseSuccess, animalScore.getDefenseSuccess());
        map.put(RewardsKey.defenseFail, animalScore.getDefenseFail());
        map.put(RewardsKey.trust, animalScore.getTrust());
        map.put(RewardsKey.distrust, animalScore.getDistrust());
        map.put(RewardsKey.truth, animalScore.getTruth());
        map.put(RewardsKey.lie, animalScore.getLie());
        return map;
    }


    /**
     * player가 달성한 업적 조회
     * @param userSequence
     * @return
     */
    public List<PlayerRewards> getPlayerDoneRewards(Long userSequence) {
        return playerRewardsRepository.findDoneRewardsByUserSequence(userSequence);
    }

    /**
     * player가 달성하지 못한 업적 조회
     * @param userSequence
     * @return
     */
    public List<PlayerRewards> getPlayerNotDoneRewards(Long userSequence) {
        return playerRewardsRepository.findNotDoneRewardsByUserSequence(userSequence);
    }

    /**
     * player의 모든 업적 조회
     * @param userSequence
     * @return
     */
    public List<PlayerRewards> getPlayerAllRewards(Long userSequence) {
        return playerRewardsRepository.findRewardsByUserSequence(userSequence);
    }

    /**
     * rewardsId 달성한 player 수 조회
     * @param rewardsId
     * @return
     */

    public int getDoneRewardsCount(String rewardsId) {
        return playerRewardsRepository.countDoneRewardsWithRewardsId(rewardsId);
    }
}
