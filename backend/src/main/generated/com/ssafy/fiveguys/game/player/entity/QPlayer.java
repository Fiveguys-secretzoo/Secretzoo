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

    public final StringPath playerId = createString("playerId");

    public final NumberPath<Integer> playerLevel = createNumber("playerLevel", Integer.class);

    public final NumberPath<Long> playerSequence = createNumber("playerSequence", Long.class);

    public final QRankingScore rankingScore;

    public final NumberPath<Long> totalRound = createNumber("totalRound", Long.class);

    public final NumberPath<Long> totalTurn = createNumber("totalTurn", Long.class);

    public final NumberPath<Long> userSequence = createNumber("userSequence", Long.class);

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
        this.rankingScore = inits.isInitialized("rankingScore") ? new QRankingScore(forProperty("rankingScore")) : null;
    }

}

