package com.ssafy.fiveguys.game.player.entity;

import com.ssafy.fiveguys.game.common.entity.BaseTimeEntity;
import com.ssafy.fiveguys.game.player.entity.embeddedType.RankingScore;
import com.ssafy.fiveguys.game.user.entity.User;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@Builder
@ToString(of = {"playerSequence", "totalRound", "totalTurn", "totalPass", "exp"})
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Player extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "player_sequence")
    private Long playerSequence;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_sequence")
    private User user;

    @Column(name = "total_round")
    private long totalRound;
    @Column(name = "total_turn")
    private long totalTurn;
    @Column(name = "total_pass")
    private long totalPass;

    @Embedded
    private RankingScore rankingScore;

    @Column(name = "exp")
    private long exp;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "player_level")
    private PlayerLevel playerLevel;

    @OneToMany(mappedBy = "player", cascade = CascadeType.ALL)
    private List<PlayerRewards> playerRewards;
}



