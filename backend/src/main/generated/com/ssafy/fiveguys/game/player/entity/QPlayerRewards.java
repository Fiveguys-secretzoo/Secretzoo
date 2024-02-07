package com.ssafy.fiveguys.game.player.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPlayerRewards is a Querydsl query type for PlayerRewards
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPlayerRewards extends EntityPathBase<PlayerRewards> {

    private static final long serialVersionUID = -167012618L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPlayerRewards playerRewards = new QPlayerRewards("playerRewards");

    public final com.ssafy.fiveguys.game.common.entity.QBaseTimeEntity _super = new com.ssafy.fiveguys.game.common.entity.QBaseTimeEntity(this);

    //inherited
    public final DateTimePath<java.sql.Timestamp> createdDate = _super.createdDate;

    public final BooleanPath isDone = createBoolean("isDone");

    //inherited
    public final DateTimePath<java.sql.Timestamp> lastModifiedDate = _super.lastModifiedDate;

    public final QPlayer player;

    public final NumberPath<Long> playerRewardsSequence = createNumber("playerRewardsSequence", Long.class);

    public final QRewards rewards;

    public QPlayerRewards(String variable) {
        this(PlayerRewards.class, forVariable(variable), INITS);
    }

    public QPlayerRewards(Path<? extends PlayerRewards> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPlayerRewards(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPlayerRewards(PathMetadata metadata, PathInits inits) {
        this(PlayerRewards.class, metadata, inits);
    }

    public QPlayerRewards(Class<? extends PlayerRewards> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.player = inits.isInitialized("player") ? new QPlayer(forProperty("player"), inits.get("player")) : null;
        this.rewards = inits.isInitialized("rewards") ? new QRewards(forProperty("rewards"), inits.get("rewards")) : null;
    }

}

