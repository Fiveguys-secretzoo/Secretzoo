package com.ssafy.fiveguys.game.player.service;


import com.ssafy.fiveguys.game.player.dto.player.PlayerDto;
import com.ssafy.fiveguys.game.player.dto.rank.RankRequestDto;
import com.ssafy.fiveguys.game.player.dto.player.PlayerSearch;
import com.ssafy.fiveguys.game.player.entity.PlayerRewards;
import com.ssafy.fiveguys.game.player.entity.Rewards;
import com.ssafy.fiveguys.game.player.entity.embeddedType.LevelExp;
import com.ssafy.fiveguys.game.player.entity.Player;
import com.ssafy.fiveguys.game.player.entity.embeddedType.RankingScore;
import com.ssafy.fiveguys.game.player.exception.UserException;
import com.ssafy.fiveguys.game.player.repository.PlayerRepository;
import com.ssafy.fiveguys.game.player.repository.PlayerRepositoryImpl;
import com.ssafy.fiveguys.game.player.repository.RewardsRepository;
import com.ssafy.fiveguys.game.user.entity.User;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class PlayerService {

    private final PlayerRepository playerRepository;
    private final RewardsRepository rewardsRepository;
    private final PlayerRepositoryImpl playerRepositoryImpl;

    /**
     * userSequence 로 player 조회
     *
     * @param userSequence
     * @return
     */
    public Player getPlayerByUserSequence(Long userSequence) {
        return playerRepository.findByUser_UserSequence(userSequence);

    }

    /**
     * player 정보 조회
     *
     * @param userSequence
     * @return
     */
    public PlayerDto getPlayer(Long userSequence) {
        Player player = playerRepository.findByUser_UserSequence(userSequence);
        if (player == null) {
            throw new UserException();
        }
        return new PlayerDto(
            player.getUser().getUserSequence(), player.getUser().getUserId(),
            player.getUser().getName(),
            player.getUser().getNickname(), player.getUser().getProfileNumber(),
            player.getUser().getMainReward(),
            player.getTotalRound(), player.getTotalTurn(),
            player.getRankingScore(), player.getExp(), player.getPlayerLevel());
    }

    /**
     * player 전체 조회
     *
     * @return
     */
    public List<PlayerDto> getAllPlayer() {
        List<Player> playerList = playerRepository.findAll();
        return playerList.stream()
            .map(player -> new PlayerDto(
                player.getUser().getUserSequence(), player.getUser().getUserId(),
                player.getUser().getName(),
                player.getUser().getNickname(),player.getUser().getProfileNumber(),
                player.getUser().getMainReward(),player.getTotalRound(), player.getTotalTurn(),
                player.getRankingScore(), player.getExp(), player.getPlayerLevel())
            ).toList();
    }

    /**
     * player 검색
     *
     * @return
     */
    public List<PlayerDto> getAllPlayer(PlayerSearch playerSearch, Pageable pageable) {
        log.info("playerSearch={}", playerSearch);
        List<Player> playerList = playerRepositoryImpl.findAll(playerSearch, pageable);
        return playerList.stream()
            .map(player -> new PlayerDto(
                player.getUser().getUserSequence(), player.getUser().getUserId(),
                player.getUser().getName(),
                player.getUser().getNickname(),player.getUser().getProfileNumber(),
                player.getUser().getMainReward(),player.getTotalRound(), player.getTotalTurn(),
                player.getRankingScore(), player.getExp(), player.getPlayerLevel())
            ).toList();
    }

    /**
     * player 전체 수 조회
     *
     * @return
     */
    public int playerTotalCount() {
        return (int) playerRepository.count();
    }


    /**
     * player 점수, 경험치, 레벨 저장
     *
     * @param userSequence
     * @param rankRequestDto
     */
    @Transactional
    public void savePlayer(Long userSequence, RankRequestDto rankRequestDto) {

        log.info("user seq = {}", userSequence);
        //pass count 저장
        Player player = playerRepository.findByUser_UserSequence(userSequence);
        if (player == null) {
            return;
        }

        player.setTotalPass(player.getTotalPass() + rankRequestDto.getPassCount());
        //success 점수를 경험치로 저장
        int totalSuccess = (int) (rankRequestDto.getAttackSuccess()
            + rankRequestDto.getDefenseSuccess());
        //플에이어 경험지 계산
        long exp = LevelExp.expCalculator(rankRequestDto.getPassCount(), totalSuccess);
        log.info("player curr exp = {}", player.getExp());
        log.info("player add exp = {}", exp);
        //경험치 업데이트
        player.setExp(exp + player.getExp());
        log.info("player new exp = {}", player.getExp());
        //레벨 업데이트
        this.updateLevel(userSequence, player.getExp());
    }

    /**
     * 레벨 업데이트
     *
     * @param userSequence
     * @param exp
     */
    @Transactional
    public void updateLevel(Long userSequence, Long exp) {

        Player player = playerRepository.findByUser_UserSequence(userSequence);
        int playerLevel;

        // 레벨 로직 -> 현재 만렙 20
        if (exp < 100) {
            playerLevel = 1;
        } else if (exp < 200) {
            playerLevel = 2;
        } else if (exp < 400) {
            playerLevel = 3;
        } else if (exp < 600) {
            playerLevel = 4;
        } else if (exp < 800) {
            playerLevel = 5;
        } else if (exp < 1000) {
            playerLevel = 6;
        } else if (exp < 1400) {
            playerLevel = 7;
        } else if (exp < 1800) {
            playerLevel = 8;
        } else if (exp < 2200) {
            playerLevel = 9;
        } else if (exp < 2800) {
            playerLevel = 10;
        } else if (exp < 3200) {
            playerLevel = 11;
        } else if (exp < 4000) {
            playerLevel = 12;
        } else if (exp < 4800) {
            playerLevel = 13;
        } else if (exp < 5600) {
            playerLevel = 15;
        } else if (exp < 6600) {
            playerLevel = 16;
        } else if (exp < 7600) {
            playerLevel = 17;
        } else if (exp < 8600) {
            playerLevel = 18;
        } else if (exp < 10000) {
            playerLevel = 19;
        } else {
            playerLevel = 20;
        }

        player.setPlayerLevel(playerLevel);

        log.info("user seq = {}", userSequence);
        log.info("player exp = {}", player.getExp());
        log.info("player level = {}", player.getPlayerLevel());
    }


    /**
     * user signup 하면 player 기본 데이터 튜플 생성
     *
     * @param user
     */
    public void createPlayer(User user) {
        Player player = Player.builder()
            .playerLevel(0)
            .exp(0)
            .user(user)
            .rankingScore(new RankingScore(0.0, 0.0, 0.0))
            .build();

        playerRepository.save(player);

        List<Rewards> allRewards = rewardsRepository.findAll();
        List<PlayerRewards> playerRewards = allRewards.stream()
            .map(rewards -> new PlayerRewards(player, rewards, false))
            .collect(Collectors.toList());
        player.setPlayerRewards(playerRewards);

    }

}
