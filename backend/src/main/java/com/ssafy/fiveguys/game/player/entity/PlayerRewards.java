package com.ssafy.fiveguys.game.player.entity;

import com.ssafy.fiveguys.game.common.entity.BaseTimeEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter @Setter
@Builder
@ToString(of = {"playerRewardsSequence", "isDone"})
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class PlayerRewards extends BaseTimeEntity {

    public PlayerRewards(Player player, Rewards rewards, boolean isDone) {
        this.player = player;
        this.rewards = rewards;
        this.isDone = isDone;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "player_rewards_sequence")
    private Long playerRewardsSequence;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "player_sequence")
    private Player player;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rewards_id")
    private Rewards rewards;

    @Column(name = "is_done", columnDefinition = "boolean DEFAULT false" )
    private boolean isDone;


}
