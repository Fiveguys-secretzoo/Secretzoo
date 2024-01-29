package com.ssafy.fiveguys.game.player.service;

import com.example.ranking.player.entity.AnimalScore;
import com.example.ranking.player.entity.PlayerAnimal;
import com.example.ranking.player.entity.PlayerRewards;
import com.example.ranking.player.entity.Rewards;
import com.example.ranking.player.repository.PlayerRewardsRepository;
import com.example.ranking.player.repository.RewardsRepository;
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
     * player_animal 테이블의 cat 데이터를 바탕으로 cat 업적 중 에 달성한 것이 있는지 확인 하는 메서드
     * @param playerCat
     */
    public void checkCat(PlayerAnimal playerCat) {

        log.info("playerCat = {}", playerCat);
        log.info("playerCat.getAnimalScore = {}", playerCat.getAnimalScore());
        log.info("고양이 전체 rewards = {}",rewardsRepository.findByAnimalId(playerCat.getAnimal().getAnimalId()));
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
        map.put("disTrust", animalScore.getDistrust());
        map.put("truth", animalScore.getTruth());
        map.put("lie", animalScore.getLie());
        return map;
    }


    /**
     * player가 달성한 업젇 조회
     * @param playerSequence
     * @return
     */
    public List<PlayerRewards> getPlayerDoneRewards(Long playerSequence) {
        return playerRewardsRepository.findDoneRewardsByPlayerSequence(
            playerSequence);
    }
    /**
     * player의 모든 업적 조회
     * @param playerSequence
     * @return
     */
    public List<PlayerRewards> getPlayerAllRewards(Long playerSequence) {
        return playerRewardsRepository.findRewardsByPlayerSequence(
            playerSequence);
    }

    public int getDoneRewardsCount(String rewardsId) {

        return playerRewardsRepository.findDoneRewardsWithRewardsId(rewardsId);
    }
}
