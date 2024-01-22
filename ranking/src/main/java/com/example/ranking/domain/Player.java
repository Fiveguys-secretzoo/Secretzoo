package com.example.ranking.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Player {
    @Id
    private String playerId;
    private String playerName;
    private String playerPassword;

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
        player.setPlayerName(playerName);
        player.setPlayerPassword(playerPassword);
        player.setRankingScore(new Score(0.0, 0.0, 0.0));

        return player;
    }

}
