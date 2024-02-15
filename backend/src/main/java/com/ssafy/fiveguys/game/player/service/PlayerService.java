package com.ssafy.fiveguys.game.player.service;


import com.ssafy.fiveguys.game.player.dto.player.PlayerDetailDto;
import com.ssafy.fiveguys.game.player.dto.player.PlayerDto;
import com.ssafy.fiveguys.game.player.dto.player.PlayerResult;
import com.ssafy.fiveguys.game.player.dto.player.PlayerSearchResult;
import com.ssafy.fiveguys.game.player.dto.rank.RankRequestDto;
import com.ssafy.fiveguys.game.player.dto.player.PlayerSearch;
import com.ssafy.fiveguys.game.player.entity.PlayerLevel;
import com.ssafy.fiveguys.game.player.entity.PlayerRewards;
import com.ssafy.fiveguys.game.player.entity.Rewards;
import com.ssafy.fiveguys.game.player.entity.embeddedType.LevelExp;
import com.ssafy.fiveguys.game.player.entity.Player;
import com.ssafy.fiveguys.game.player.entity.embeddedType.RankingScore;
import com.ssafy.fiveguys.game.player.repository.PlayerLevelRepository;
import com.ssafy.fiveguys.game.player.repository.PlayerRepository;
import com.ssafy.fiveguys.game.player.repository.PlayerRepositoryImpl;
import com.ssafy.fiveguys.game.player.repository.RewardsRepository;
import com.ssafy.fiveguys.game.user.entity.User;
import com.ssafy.fiveguys.game.user.exception.UserNotFoundException;
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
    private final PlayerLevelService levelService;
    private final RankService rankService;
    private final PlayerLevelRepository playerLevelRepository;

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
    public PlayerDetailDto getPlayer(Long userSequence) {
        Player player = playerRepository.findByUser_UserSequence(userSequence);
        if (player == null) {
            throw new UserNotFoundException();
        }
        PlayerLevel currentLevel = playerLevelRepository.findFirstByExpGreaterThanOrderByExpAsc(
            player.getExp());
        PlayerLevel prevLevel;
        if (currentLevel.getLevel() == 1) {
            prevLevel = new PlayerLevel(1, 0);
        } else {
            prevLevel = playerLevelRepository.findExpByLevel(currentLevel.getLevel() - 1);
        }
        return new PlayerDetailDto(
            player.getUser().getUserSequence(), player.getUser().getUserId(),
            player.getUser().getName(),
            player.getUser().getNickname(), player.getUser().getProfileNumber(),
            player.getUser().getMainReward(),
            player.getTotalRound(), player.getTotalTurn(), player.getRankingScore(),
            player.getPlayerLevel().getLevel(), prevLevel.getExp(), player.getExp(),
            currentLevel.getExp());
    }

    /**
     * player 전체 조회
     *
     * @return
     */
    public List<PlayerDto> getAllPlayer(Pageable pageable) {
        List<Player> playerList = playerRepositoryImpl.findAll(pageable);
        return playerList.stream()
            .map(player -> new PlayerDto(
                player.getUser().getUserSequence(), player.getUser().getUserId(),
                player.getUser().getName(),
                player.getUser().getNickname(), player.getUser().getProfileNumber(),
                player.getUser().getMainReward(), player.getTotalRound(), player.getTotalTurn(),
                player.getRankingScore(), player.getExp(), player.getPlayerLevel().getLevel())
            ).toList();
    }

    /**
     * player 검색
     *
     * @return
     */
    public PlayerResult getAllPlayer(PlayerSearch playerSearch, Pageable pageable) {
        log.info("playerSearch={}", playerSearch);
        PlayerSearchResult playerSearchResult = playerRepositoryImpl.findAll(playerSearch,
            pageable);
        List<PlayerDto> list = playerSearchResult.getPlayers().stream()
            .map(player -> new PlayerDto(
                player.getUser().getUserSequence(), player.getUser().getUserId(),
                player.getUser().getName(),
                player.getUser().getNickname(), player.getUser().getProfileNumber(),
                player.getUser().getMainReward(), player.getTotalRound(), player.getTotalTurn(),
                player.getRankingScore(), player.getExp(), player.getPlayerLevel().getLevel()))
            .toList();

        return new PlayerResult(list, playerSearchResult.getTotalCount());
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

        log.debug("user seq = {}", userSequence);
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
        log.debug("player curr exp = {}", player.getExp());
        log.debug("player add exp = {}", exp);
        //경험치 업데이트
        player.setExp(exp + player.getExp());
        log.debug("player new exp = {}", player.getExp());
        //레벨 업데이트
        levelService.updateLevel(userSequence, player.getExp());
    }


    /**
     * user signup 하면 player 기본 데이터 튜플 생성
     *
     * @param user
     */
    public void createPlayer(User user) {
        Player player = Player.builder()
            .playerLevel(new PlayerLevel(1, 0))
            .exp(0)
            .user(user)
            .rankingScore(new RankingScore(0.0, 0.0, 0.0))
            .build();

        playerRepository.save(player);
        log.debug("player 생성 성공");
        List<Rewards> allRewards = rewardsRepository.findAll();
        List<PlayerRewards> playerRewards = rewardsRepository.findAll().stream()
            .map(rewards -> {
                PlayerRewards playerReward = new PlayerRewards(player, rewards, false);
                //회원 가입시 바로 달성되는 업적이 있음
                if (rewards.getRewardsId().equals("G001")) playerReward.setDone(true);
                return playerReward;
            })
            .collect(Collectors.toList());
        player.setPlayerRewards(playerRewards);
        //레디스 랭킹에 새로운 유저 정보 초기화
        rankService.addNewPlayerRanking(player);

    }

}
