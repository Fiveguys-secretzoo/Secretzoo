package com.ssafy.fiveguys.game.player.repository;

import com.ssafy.fiveguys.game.player.entity.PlayerRewards;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PlayerRewardsRepository extends JpaRepository<PlayerRewards, Long> {


    /**
     * playerSequence 로 달성한 업적 조회
     * @param playerSequence
     * @return
     */
    @Query("SELECT pr FROM PlayerRewards pr WHERE pr.player.playerSequence = :playerSequence AND pr.isDone = false")
    List<PlayerRewards> findNotDoneRewardsByPlayerSequence(@Param("playerSequence") Long playerSequence);


    @Query("SELECT pr FROM PlayerRewards pr " +
        "JOIN FETCH pr.player " +
        "JOIN pr.rewards r " +
        "WHERE pr.player.playerSequence = :playerSequence " +
        "AND r.animal.animalId = :animalId " +
        "AND pr.isDone = false")
    List<PlayerRewards> findNotDoneRewardsByPlayerSequenceWithAnimalId(
        @Param("playerSequence") Long playerSequence,
        @Param("animalId") String animalId);


    @Query("SELECT pr FROM PlayerRewards pr " +
        "JOIN FETCH pr.player p " +
        "WHERE p.user.userSequence = :userSequence")
    List<PlayerRewards> findRewardsByUserSequence(@Param("userSequence") Long userSequence);


    /**
     * rewardsId 기준으로 is_done = true 인 횟수
     * @param rewardsId
     * @return
     */
    @Query("SELECT COUNT(pr) FROM PlayerRewards pr WHERE pr.rewards.rewardsId = :rewardsId AND pr.isDone = true")
    int countDoneRewardsWithRewardsId(@Param("rewardsId") String rewardsId);


    /**
     * userSequence 로 완료 업적 조회
     * @param userSequence
     * @return
     */
    @Query(value = "SELECT pr.player_rewards_sequence, pr.player_sequence,"
        + " pr.rewards_id, pr.is_done, pr.created_date, pr.last_modified_date FROM player_rewards pr"
        + " INNER JOIN player p ON pr.player_sequence = p.player_sequence"
        + " WHERE user_sequence = ?"
        + " AND pr.is_done = true", nativeQuery = true)
    List<PlayerRewards> findDoneRewardsByUserSequenceNative(Long userSequence);

    @Query("SELECT pr FROM PlayerRewards pr " +
        "JOIN FETCH pr.player p " +
        "WHERE p.user.userSequence = :userSequence " +
        "AND pr.isDone = true")
    List<PlayerRewards> findDoneRewardsByUserSequence(@Param("userSequence") Long userSequence);


    /**
     * userSequence 로 미완료 업적 조회
     * @param userSequence
     * @return
     */
    @Query(value = "SELECT pr FROM PlayerRewards pr"
        + " JOIN FETCH pr.player p"
        + " WHERE p.user.userSequence = :userSequence"
        + " AND pr.isDone = false")
    List<PlayerRewards> findNotDoneRewardsByUserSequence(@Param("userSequence") Long userSequence);
}
