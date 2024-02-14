package com.ssafy.fiveguys.game.player.entity;

import com.ssafy.fiveguys.game.player.entity.base.BaseTimeEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Entity
@Getter @Setter @ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Rewards extends BaseTimeEntity {


    @Id
    private String rewardsId;
    private String animalId;

    private String rewardsName;
    private int rewardsValue;
    private String rewardsKey;
}
