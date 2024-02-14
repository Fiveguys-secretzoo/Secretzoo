package com.ssafy.fiveguys.game.player.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QRankingScore is a Querydsl query type for RankingScore
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QRankingScore extends BeanPath<RankingScore> {

    private static final long serialVersionUID = 83711913L;

    public static final QRankingScore rankingScore = new QRankingScore("rankingScore");

    public final NumberPath<Double> attackScore = createNumber("attackScore", Double.class);

    public final NumberPath<Double> defenseScore = createNumber("defenseScore", Double.class);

    public final NumberPath<Double> passScore = createNumber("passScore", Double.class);

    public QRankingScore(String variable) {
        super(RankingScore.class, forVariable(variable));
    }

    public QRankingScore(Path<? extends RankingScore> path) {
        super(path.getType(), path.getMetadata());
    }

    public QRankingScore(PathMetadata metadata) {
        super(RankingScore.class, metadata);
    }

}

