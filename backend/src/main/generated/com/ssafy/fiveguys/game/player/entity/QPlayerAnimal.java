package com.ssafy.fiveguys.game.player.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPlayerAnimal is a Querydsl query type for PlayerAnimal
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPlayerAnimal extends EntityPathBase<PlayerAnimal> {

    private static final long serialVersionUID = 70011882L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPlayerAnimal playerAnimal = new QPlayerAnimal("playerAnimal");

    public final com.ssafy.fiveguys.game.common.entity.QBaseTimeEntity _super = new com.ssafy.fiveguys.game.common.entity.QBaseTimeEntity(this);

    public final QAnimal animal;

    public final com.ssafy.fiveguys.game.player.entity.embeddedType.QAnimalScore animalScore;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastModifiedDate = _super.lastModifiedDate;

    public final QPlayer player;

    public final NumberPath<Long> playerAnimalSequence = createNumber("playerAnimalSequence", Long.class);

    public QPlayerAnimal(String variable) {
        this(PlayerAnimal.class, forVariable(variable), INITS);
    }

    public QPlayerAnimal(Path<? extends PlayerAnimal> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPlayerAnimal(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPlayerAnimal(PathMetadata metadata, PathInits inits) {
        this(PlayerAnimal.class, metadata, inits);
    }

    public QPlayerAnimal(Class<? extends PlayerAnimal> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.animal = inits.isInitialized("animal") ? new QAnimal(forProperty("animal")) : null;
        this.animalScore = inits.isInitialized("animalScore") ? new com.ssafy.fiveguys.game.player.entity.embeddedType.QAnimalScore(forProperty("animalScore")) : null;
        this.player = inits.isInitialized("player") ? new QPlayer(forProperty("player"), inits.get("player")) : null;
    }

}

