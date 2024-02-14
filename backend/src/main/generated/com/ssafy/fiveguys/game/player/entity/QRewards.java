package com.ssafy.fiveguys.game.player.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QRewards is a Querydsl query type for Rewards
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRewards extends EntityPathBase<Rewards> {

    private static final long serialVersionUID = 2095029079L;

    public static final QRewards rewards = new QRewards("rewards");

    public final com.ssafy.fiveguys.game.player.entity.base.QBaseTimeEntity _super = new com.ssafy.fiveguys.game.player.entity.base.QBaseTimeEntity(this);

    public final StringPath animalId = createString("animalId");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastModifiedDate = _super.lastModifiedDate;

    public final StringPath rewardsId = createString("rewardsId");

    public final StringPath rewardsKey = createString("rewardsKey");

    public final StringPath rewardsName = createString("rewardsName");

    public final NumberPath<Integer> rewardsValue = createNumber("rewardsValue", Integer.class);

    public QRewards(String variable) {
        super(Rewards.class, forVariable(variable));
    }

    public QRewards(Path<? extends Rewards> path) {
        super(path.getType(), path.getMetadata());
    }

    public QRewards(PathMetadata metadata) {
        super(Rewards.class, metadata);
    }

}

