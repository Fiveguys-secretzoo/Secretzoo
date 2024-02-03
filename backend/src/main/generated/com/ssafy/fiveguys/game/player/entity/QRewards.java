package com.ssafy.fiveguys.game.player.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QRewards is a Querydsl query type for Rewards
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRewards extends EntityPathBase<Rewards> {

    private static final long serialVersionUID = 2095029079L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QRewards rewards = new QRewards("rewards");

    public final com.ssafy.fiveguys.game.player.entity.base.QBaseTimeEntity _super = new com.ssafy.fiveguys.game.player.entity.base.QBaseTimeEntity(this);

    public final QAnimal animal;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastModifiedDate = _super.lastModifiedDate;

    public final ListPath<PlayerRewards, QPlayerRewards> playerRewards = this.<PlayerRewards, QPlayerRewards>createList("playerRewards", PlayerRewards.class, QPlayerRewards.class, PathInits.DIRECT2);

    public final StringPath rewardsId = createString("rewardsId");

    public final EnumPath<RewardsKey> rewardsKey = createEnum("rewardsKey", RewardsKey.class);

    public final StringPath rewardsName = createString("rewardsName");

    public final NumberPath<Integer> rewardsValue = createNumber("rewardsValue", Integer.class);

    public QRewards(String variable) {
        this(Rewards.class, forVariable(variable), INITS);
    }

    public QRewards(Path<? extends Rewards> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QRewards(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QRewards(PathMetadata metadata, PathInits inits) {
        this(Rewards.class, metadata, inits);
    }

    public QRewards(Class<? extends Rewards> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.animal = inits.isInitialized("animal") ? new QAnimal(forProperty("animal")) : null;
    }

}

