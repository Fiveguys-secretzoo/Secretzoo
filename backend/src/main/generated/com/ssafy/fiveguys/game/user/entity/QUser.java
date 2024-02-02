package com.ssafy.fiveguys.game.user.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = 709901858L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUser user = new QUser("user");

    public final com.ssafy.fiveguys.game.common.entity.QBaseTimeEntity _super = new com.ssafy.fiveguys.game.common.entity.QBaseTimeEntity(this);

    //inherited
    public final DateTimePath<java.sql.Timestamp> creationDate = _super.creationDate;

    public final StringPath email = createString("email");

    //inherited
    public final DateTimePath<java.sql.Timestamp> lastModifiedDate = _super.lastModifiedDate;

    public final StringPath mainAchievement = createString("mainAchievement");

    public final StringPath name = createString("name");

    public final StringPath nickname = createString("nickname");

    public final StringPath password = createString("password");

    public final com.ssafy.fiveguys.game.player.entity.QPlayer player;

    public final StringPath profileNumber = createString("profileNumber");

    public final StringPath provider = createString("provider");

    public final StringPath providerId = createString("providerId");

    public final StringPath refreshToken = createString("refreshToken");

    public final EnumPath<com.ssafy.fiveguys.game.user.dto.Role> role = createEnum("role", com.ssafy.fiveguys.game.user.dto.Role.class);

    public final StringPath userId = createString("userId");

    public final NumberPath<Long> userSequence = createNumber("userSequence", Long.class);

    public QUser(String variable) {
        this(User.class, forVariable(variable), INITS);
    }

    public QUser(Path<? extends User> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUser(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUser(PathMetadata metadata, PathInits inits) {
        this(User.class, metadata, inits);
    }

    public QUser(Class<? extends User> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.player = inits.isInitialized("player") ? new com.ssafy.fiveguys.game.player.entity.QPlayer(forProperty("player"), inits.get("player")) : null;
    }

}

