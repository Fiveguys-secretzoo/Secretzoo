package com.ssafy.fiveguys.game.player.entity;

import com.ssafy.fiveguys.game.common.entity.BaseTimeEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Entity
@Getter @Setter
@ToString(of = {"rewardsId", "rewardsName", "rewardsValue", "rewardsKey"})
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Rewards extends BaseTimeEntity {


    @Id
    private String rewardsId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animal_id")
    private Animal animal;

    private String rewardsName;
    private int rewardsValue;

    @Enumerated(EnumType.STRING)
    private RewardsKey rewardsKey;

    @OneToMany(mappedBy = "rewards", cascade = CascadeType.ALL)
    private List<PlayerRewards> playerRewards = new ArrayList<>();
}
