package com.ssafy.fiveguys.game.player.entity;

import com.ssafy.fiveguys.game.player.entity.base.BaseTimeEntity;
import com.ssafy.fiveguys.game.user.entity.User;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
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
    @OneToOne
    @JoinColumn(name = "user_sequence")
    private User user;

    private Long totalRound;
    private Long totalTurn;
    private Long totalPass;
    private RankingScore rankingScore;
    private Long exp;
    private int playerLevel;


}
