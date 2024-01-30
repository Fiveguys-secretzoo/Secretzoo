package com.example.ranking.player.entity;


import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


/**
 * Player 의 랭킹 점수에 사용되는 점수
 */
@Embeddable
@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class RankingScore {

    private static final double ATTEMPT  = 10.0; //시도애 대한 가중치를 10으로 설정
    private static final double SUCCESS = 100.0; //성공에 대한 가중치를 100으로 설정(시도의 10배 점수 부여)
    private static final double MINUS = 0.991;

    private double attackScore;
    private double defenseScore;
    private double passScore;


    /**
     *  Attack, Defense 점수 가중치 계산 로직
     * @param attempt
     * @param success
     * @return
     */
    public static double scoreCalculator(Long attempt, Long success) {

        //시도 횟수 점수 가중치 계산
        double attemptScore = ATTEMPT * (1 - Math.pow(MINUS, attempt));

        //성공 횟수 점수 가중치 계산
        double successScore = SUCCESS * (1 - Math.pow(MINUS, success));
        return attemptScore + successScore;
    }




}
