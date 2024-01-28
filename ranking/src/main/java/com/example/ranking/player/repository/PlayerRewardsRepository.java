package com.example.ranking.player.repository;

import com.example.ranking.player.entity.PlayerAnimal;
import com.example.ranking.player.entity.PlayerRewards;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PlayerRewardsRepository extends JpaRepository<PlayerRewards, Long> {


    /**
     * playerSequence 로 달성한 업적 조회
     * @param playerSequence
     * @return
     */
    @Query(value = "SELECT * FROM player_rewards WHERE player_sequence = ? AND is_done = false", nativeQuery = true)
    List<PlayerRewards> findNotDoneRewardsByPlayerSequence(Long playerSequence);

    /**
     * playerSequence 로 달성하지 못한 동물 업적 조회 with animalId
     * @param playerSequence
     * @param animalId
     * @return
     */
    @Query(value = "SELECT pr.player_rewards_sequence, pr.player_sequence, pr.rewards_id, pr.is_done, pr.created_date, pr.last_modified_date FROM player_rewards pr"
        + " INNER JOIN rewards r ON pr.rewards_id = r.rewards_id"
        + " WHERE pr.player_sequence = ? AND r.animal_id = ? AND pr.is_done = false", nativeQuery = true)
    List<PlayerRewards> findNotDoneRewardsByPlayerSequenceWithAnimalId(Long playerSequence, String animalId);

    /**
     * playerSequence 로 달성한 업적 조회
     * @param playerSequence
     * @return
     */
    @Query(value = "SELECT * FROM player_rewards WHERE player_sequence = ? AND is_done = true", nativeQuery = true)
    List<PlayerRewards> findDoneRewardsByPlayerSequence(Long playerSequence);

    /**
     * playerSequence 로 달성 여부 상관없이 모든 업적 조회
     * @param playerSequence
     * @return
     */
    @Query(value = "SELECT * FROM player_rewards WHERE player_sequence = ?", nativeQuery = true)
    List<PlayerRewards> findRewardsByPlayerSequence(Long playerSequence);







}
