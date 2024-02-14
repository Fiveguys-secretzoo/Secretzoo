package com.ssafy.fiveguys.game.player.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QAnimalScore is a Querydsl query type for AnimalScore
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QAnimalScore extends BeanPath<AnimalScore> {

    private static final long serialVersionUID = -2124296023L;

    public static final QAnimalScore animalScore = new QAnimalScore("animalScore");

    public final NumberPath<Long> attackFail = createNumber("attackFail", Long.class);

    public final NumberPath<Long> attackSuccess = createNumber("attackSuccess", Long.class);

    public final NumberPath<Long> defenseFail = createNumber("defenseFail", Long.class);

    public final NumberPath<Long> defenseSuccess = createNumber("defenseSuccess", Long.class);

    public final NumberPath<Long> distrust = createNumber("distrust", Long.class);

    public final NumberPath<Long> lie = createNumber("lie", Long.class);

    public final NumberPath<Long> trust = createNumber("trust", Long.class);

    public final NumberPath<Long> truth = createNumber("truth", Long.class);

    public QAnimalScore(String variable) {
        super(AnimalScore.class, forVariable(variable));
    }

    public QAnimalScore(Path<? extends AnimalScore> path) {
        super(path.getType(), path.getMetadata());
    }

    public QAnimalScore(PathMetadata metadata) {
        super(AnimalScore.class, metadata);
    }

}

