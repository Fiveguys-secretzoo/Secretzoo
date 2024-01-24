package com.example.ranking.player.entity;

import com.example.ranking.player.entity.base.BaseTimeEntity;
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

    private String rewardsName;
    private int rewardsValue;
    private String rewardsKey;
}
