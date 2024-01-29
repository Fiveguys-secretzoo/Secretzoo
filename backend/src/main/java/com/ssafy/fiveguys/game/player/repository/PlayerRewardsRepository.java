package com.ssafy.fiveguys.game.player.repository;

import com.ssafy.fiveguys.game.player.entity.PlayerRewards;
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

    @Query(value = "SELECT pr.player_rewards_sequence, pr.player_sequence,"
        + " pr.rewards_id, pr.is_done, pr.created_date, pr.last_modified_date FROM player_rewards pr"
        + " INNER JOIN player p ON pr.player_sequence = p.player_sequence"
        + " WHERE user_sequence = ?", nativeQuery = true)
    List<PlayerRewards> findRewardsByUserSequence(Long userSequence);

    /**
     * rewardsId 기준으로 is_done = true 인 횟수
     * @param rewardsId
     * @return
     */
    @Query(value = "SELECT count(*) FROM player_rewards WHERE rewards_id = ? AND is_done = true", nativeQuery = true)
    int findDoneRewardsWithRewardsId(String rewardsId);


    @Query(value = "SELECT pr.player_rewards_sequence, pr.player_sequence,"
        + " pr.rewards_id, pr.is_done, pr.created_date, pr.last_modified_date FROM player_rewards pr"
        + " INNER JOIN player p ON pr.player_sequence = p.player_sequence"
        + " WHERE user_sequence = ?"
        + " AND pr.is_done = true", nativeQuery = true)
    List<PlayerRewards> findDoneRewardsByUserSequence(Long userSequence);
}
