package com.example.ranking.player.dto;


import com.example.ranking.player.entity.RankingScore;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PlayerDto {

    private Long playerSequence;

    private Long totalRound;
    private Long totalTurn;

    private RankingScore rankingScore;

    private Long exp;
    private int level;


}
