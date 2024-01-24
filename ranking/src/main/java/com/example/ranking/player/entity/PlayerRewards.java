package com.example.ranking.player.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter @Setter @ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PlayerRewards {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long playerRewardsSequence;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "player_sequence")
    private Player playerSequence;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rewards_id")
    private Rewards rewardsId;

    private boolean isDone;


}
