package com.ssafy.fiveguys.game.player.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QPlayerLevel is a Querydsl query type for PlayerLevel
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPlayerLevel extends EntityPathBase<PlayerLevel> {

    private static final long serialVersionUID = 1813276630L;

    public static final QPlayerLevel playerLevel = new QPlayerLevel("playerLevel");

    public final NumberPath<Long> exp = createNumber("exp", Long.class);

    public final NumberPath<Integer> level = createNumber("level", Integer.class);

    public QPlayerLevel(String variable) {
        super(PlayerLevel.class, forVariable(variable));
    }

    public QPlayerLevel(Path<? extends PlayerLevel> path) {
        super(path.getType(), path.getMetadata());
    }

    public QPlayerLevel(PathMetadata metadata) {
        super(PlayerLevel.class, metadata);
    }

}

