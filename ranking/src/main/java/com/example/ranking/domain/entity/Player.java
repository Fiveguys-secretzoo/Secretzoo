package com.example.ranking.domain.entity;

import com.example.ranking.domain.Score;
import com.example.ranking.domain.entity.base.BaseTimeEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter @Setter @ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Player extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long playerSequence;
    @Column(name = "user_sequence", unique = true)
    private Long userSequence;

    private Long totalRound;
    private Long totalTurn;

    //player_id도 고유한 값이므로 unique = true 설정을 통해 중복 값을 방지해준다.
    @Column(name = "player_id",  unique = true)
    private String playerId;

    private Score rankingScore;



    /**
     * 생성 메서드
     * @param playerId 유저 아이디
     * @param playerName 유저 이름
     * @param playerPassword 유저 비밀번호
     * @return user
     */
    public static Player createPlayer(String playerId, String playerName, String playerPassword) {

        Player player = new Player();
        player.setPlayerId(playerId);
        player.setRankingScore(new Score(0.0, 0.0, 0.0));

        return player;
    }

}
