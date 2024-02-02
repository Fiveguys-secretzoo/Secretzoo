package com.ssafy.fiveguys.game.player.entity;

import com.ssafy.fiveguys.game.player.entity.base.BaseTimeEntity;
import com.ssafy.fiveguys.game.user.entity.User;
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
//    @Column(name = "player_id",  unique = true)
//    private String playerId;

    private RankingScore rankingScore;

    private Long exp;
    private int playerLevel;


}
