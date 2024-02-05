package com.ssafy.fiveguys.game.player.repository;

import static com.ssafy.fiveguys.game.player.entity.QPlayer.player;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.fiveguys.game.player.dto.player.PlayerSearch;
import com.ssafy.fiveguys.game.player.dto.player.PlayerSearchResult;
import com.ssafy.fiveguys.game.player.entity.Player;
import com.ssafy.fiveguys.game.player.entity.QPlayer;
import com.ssafy.fiveguys.game.user.entity.QUser;
import jakarta.persistence.EntityManager;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

@Repository

public class PlayerRepositoryImpl{

    private final JPAQueryFactory query;

    public PlayerRepositoryImpl(EntityManager entityManager) {
        this.query = new JPAQueryFactory(entityManager);
    }

    public List<Player> findAll(Pageable pageable) {
        QPlayer player = QPlayer.player;
        QUser user = QUser.user;
        return query
            .select(player)
            .from(player)
            .join(player.user, user)
            .orderBy(player.user.userSequence.asc())
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize())
            .fetch();
    }
    public PlayerSearchResult findAll(PlayerSearch playerSearch, Pageable pageable) {
        QPlayer player = QPlayer.player;
        QUser user = QUser.user;
        List<Player> list = query
            .select(player)
            .from(player)
            .join(player.user, user)
            .where(nicknameLike(playerSearch.getNickname()), userIdLike(playerSearch.getUserId()))
            .orderBy(player.user.userSequence.asc())
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize())
            .fetch();

        int totalCount = (int) query
            .select(player)
            .from(player)
            .join(player.user, user)
            .where(nicknameLike(playerSearch.getNickname()), userIdLike(playerSearch.getUserId()))
            .fetchCount();

        return new PlayerSearchResult(list, totalCount);
    }




    private BooleanExpression nicknameLike(String nameCond) {
        if (!StringUtils.hasText(nameCond)) {
            return null;
        }
        return player.user.nickname.contains(nameCond);
    }
    private BooleanExpression userIdLike(String userIdCond) {
        if (!StringUtils.hasText(userIdCond)) {
            return null;
        }
        return player.user.userId.contains(userIdCond);
    }

}
