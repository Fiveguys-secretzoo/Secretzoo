package com.ssafy.fiveguys.game.player.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPlayer is a Querydsl query type for Player
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPlayer extends EntityPathBase<Player> {

    private static final long serialVersionUID = 570344526L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPlayer player = new QPlayer("player");

    public final com.ssafy.fiveguys.game.player.entity.base.QBaseTimeEntity _super = new com.ssafy.fiveguys.game.player.entity.base.QBaseTimeEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final NumberPath<Long> exp = createNumber("exp", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastModifiedDate = _super.lastModifiedDate;

    public final NumberPath<Integer> playerLevel = createNumber("playerLevel", Integer.class);

    public final ListPath<PlayerRewards, QPlayerRewards> playerRewards = this.<PlayerRewards, QPlayerRewards>createList("playerRewards", PlayerRewards.class, QPlayerRewards.class, PathInits.DIRECT2);

    public final NumberPath<Long> playerSequence = createNumber("playerSequence", Long.class);

    public final com.ssafy.fiveguys.game.player.entity.embeddedType.QRankingScore rankingScore;

    public final NumberPath<Long> totalPass = createNumber("totalPass", Long.class);

    public final NumberPath<Long> totalRound = createNumber("totalRound", Long.class);

    public final NumberPath<Long> totalTurn = createNumber("totalTurn", Long.class);

    public final com.ssafy.fiveguys.game.user.entity.QUser user;

    public QPlayer(String variable) {
        this(Player.class, forVariable(variable), INITS);
    }

    public QPlayer(Path<? extends Player> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPlayer(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPlayer(PathMetadata metadata, PathInits inits) {
        this(Player.class, metadata, inits);
    }

    public QPlayer(Class<? extends Player> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.rankingScore = inits.isInitialized("rankingScore") ? new com.ssafy.fiveguys.game.player.entity.embeddedType.QRankingScore(forProperty("rankingScore")) : null;
        this.user = inits.isInitialized("user") ? new com.ssafy.fiveguys.game.user.entity.QUser(forProperty("user"), inits.get("user")) : null;
    }

}

