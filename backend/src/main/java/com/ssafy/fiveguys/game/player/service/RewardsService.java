package com.ssafy.fiveguys.game.player.service;


import com.ssafy.fiveguys.game.player.dto.animal.AnimalDto;
import com.ssafy.fiveguys.game.player.entity.Animal;
import com.ssafy.fiveguys.game.player.entity.embeddedType.AnimalScore;
import com.ssafy.fiveguys.game.player.entity.Player;
import com.ssafy.fiveguys.game.player.entity.PlayerAnimal;
import com.ssafy.fiveguys.game.player.repository.AnimalRepository;
import com.ssafy.fiveguys.game.player.repository.PlayerAnimalRepository;
import com.ssafy.fiveguys.game.player.repository.PlayerRepository;
import jakarta.persistence.EntityManager;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class RewardsService {

    private final PlayerRepository playerRepository;
    private final PlayerAnimalRepository playerAnimalRepository;
    private final AnimalRepository animalRepository;
    private final EntityManager em;
    private final AnimalRewardsService animalRewardsService;

    @Transactional
    public void saveRewards(AnimalDto animalDto) {

        log.info("animalDto={}", animalDto);

        //플레이어
        Player player = playerRepository.findByUser_UserSequence(animalDto.getUserSequence());
        //플레이어가 null -> 비회원 -> 업적 관련 저장 로직 불필요
        if(player == null) return;
        //turn 과 round 누적 업데이트
        //update 쿼리 1번
        player.setTotalRound(player.getTotalRound() + animalDto.getRound());
        player.setTotalTurn(player.getTotalTurn() + animalDto.getTurn());

        /**
         * 호랑이 업적 정보 추가 및 업데이트
         */

        //플레이어 - 호랑이
        Animal tiger = animalRepository.findByAnimalId(animalDto.getTiger().getAnimalId());

        PlayerAnimal playerTiger = playerAnimalRepository.findByPlayerSequenceAndAnimalId(
            player.getPlayerSequence(), animalDto.getTiger().getAnimalId());
        log.debug("playerTiger= {}", playerTiger);
        //플레이어의 전적 정보가 있으면 업데이트 해주기
        if (playerTiger != null) {
            playerTiger.updateAnimalScore(playerTiger.getAnimalScore(),
                animalDto.getTiger().getAnimalScore());
        }

        //만약 해당 플레이어가 동물에 대한 전적 정보가 없다면 새롭게 만들어 주기
        else {
            PlayerAnimal playerAnimal = new PlayerAnimal(player, tiger,
                animalDto.getTiger().getAnimalScore());
            log.debug("playerAnimal= {}", playerAnimal);
            em.persist(playerAnimal);
        }

        //Tiger 업적 데이터 저장 및 업데이트 이후 tiger 관련 업적 달성 여부 확인 메서드 호출
        animalRewardsService.checkTiger(playerTiger);

        /**
         * 고양이 업적 정보 추가 및 업데이트
         */
        //플레이어 - 고양이
        Animal cat = animalRepository.findByAnimalId(animalDto.getCat().getAnimalId());

        PlayerAnimal playerCat = playerAnimalRepository.findByPlayerSequenceAndAnimalId(
            player.getPlayerSequence(), animalDto.getCat().getAnimalId());
        log.debug("playerCat= {}", playerCat);
        //플레이어의 전적 정보가 있으면 업데이트 해주기
        if (playerCat != null) {
            playerCat.updateAnimalScore(playerCat.getAnimalScore(),
                animalDto.getCat().getAnimalScore());
        }

        //만약 해당 플레이어가 동물에 대한 전적 정보가 없다면 새롭게 만들어 주기
        else {
            PlayerAnimal playerAnimal = new PlayerAnimal(player, cat,
                animalDto.getCat().getAnimalScore());
            log.debug("playerAnimal= {}", playerAnimal);
            em.persist(playerAnimal);
            //playerCat 에 방금 생성한 entity 저장 후 담아주기 -> animalRewardsService 에서 확인 절차 들어가야 하기 때문에
            playerCat = playerAnimal;
        }

        //Cat 업적 데이터 저장 및 업데이트 이후 Cat 관련 업적 달성 여부 확인 메서드 호출
        animalRewardsService.checkCat(playerCat);

        /**
         * 강아지 업적 정보 추가 및 업데이트
         */

        //플레이어 - 강아지
        Animal dog = animalRepository.findByAnimalId(animalDto.getDog().getAnimalId());

        PlayerAnimal playerDog = playerAnimalRepository.findByPlayerSequenceAndAnimalId(
            player.getPlayerSequence(), animalDto.getDog().getAnimalId());
        log.debug("playerDog= {}", playerDog);
        //플레이어의 전적 정보가 있으면 업데이트 해주기
        if (playerDog != null) {
            playerDog.updateAnimalScore(playerDog.getAnimalScore(),
                animalDto.getDog().getAnimalScore());
        }

        //만약 해당 플레이어가 동물에 대한 전적 정보가 없다면 새롭게 만들어 주기
        else {
            PlayerAnimal playerAnimal = new PlayerAnimal(player, dog,
                animalDto.getDog().getAnimalScore());
            log.debug("playerAnimal= {}", playerAnimal);
            em.persist(playerAnimal);
        }

        //Dog 업적 데이터 저장 및 업데이트 이후 관련 업적 달성 여부 확인 메서드 호출
        animalRewardsService.checkDog(playerDog);

        /**
         * 고라니 업적 정보 추가 및 업데이트
         */

        //플레이어 - 고라니
        Animal deer = animalRepository.findByAnimalId(animalDto.getDeer().getAnimalId());

        PlayerAnimal playerDeer = playerAnimalRepository.findByPlayerSequenceAndAnimalId(
            player.getPlayerSequence(), animalDto.getDeer().getAnimalId());
        log.debug("playerDeer= {}", playerDeer);
        //플레이어의 전적 정보가 있으면 업데이트 해주기
        if (playerDeer != null) {
            playerDeer.updateAnimalScore(playerDeer.getAnimalScore(),
                animalDto.getDeer().getAnimalScore());
        }

        //만약 해당 플레이어가 동물에 대한 전적 정보가 없다면 새롭게 만들어 주기
        else {
            PlayerAnimal playerAnimal = new PlayerAnimal(player, deer,
                animalDto.getDeer().getAnimalScore());
            log.debug("playerAnimal= {}", playerAnimal);
            em.persist(playerAnimal);
        }

        //Deer 업적 데이터 저장 및 업데이트 이후 관련 업적 달성 여부 확인 메서드 호출
        animalRewardsService.checkDeer(playerDeer);

        /**
         * 돼지 업적 정보 추가 및 업데이트
         */

        //플레이어 - 돼지
        Animal pig = animalRepository.findByAnimalId(animalDto.getPig().getAnimalId());

        PlayerAnimal playerPig = playerAnimalRepository.findByPlayerSequenceAndAnimalId(
            player.getPlayerSequence(), animalDto.getPig().getAnimalId());
        log.debug("playerPig= {}", playerPig);
        //플레이어의 전적 정보가 있으면 업데이트 해주기
        if (playerPig != null) {
            playerPig.updateAnimalScore(playerPig.getAnimalScore(),
                animalDto.getPig().getAnimalScore());
        }

        //만약 해당 플레이어가 동물에 대한 전적 정보가 없다면 새롭게 만들어 주기
        else {
            PlayerAnimal playerAnimal = new PlayerAnimal(player, pig,
                animalDto.getPig().getAnimalScore());
            log.debug("playerAnimal= {}", playerAnimal);
            em.persist(playerAnimal);
        }

        //Pig 업적 데이터 저장 및 업데이트 이후 관련 업적 달성 여부 확인 메서드 호출
        animalRewardsService.checkPig(playerPig);

        /**
         * 여우 업적 정보 추가 및 업데이트
         */

        //플레이어 - 여우
        Animal fox = animalRepository.findByAnimalId(animalDto.getFox().getAnimalId());

        PlayerAnimal playerFox = playerAnimalRepository.findByPlayerSequenceAndAnimalId(
            player.getPlayerSequence(), animalDto.getFox().getAnimalId());
        log.debug("playerFox= {}", playerFox);
        //플레이어의 전적 정보가 있으면 업데이트 해주기
        if (playerFox != null) {
            playerFox.updateAnimalScore(playerFox.getAnimalScore(),
                animalDto.getFox().getAnimalScore());
        }

        //만약 해당 플레이어가 동물에 대한 전적 정보가 없다면 새롭게 만들어 주기
        else {
            PlayerAnimal playerAnimal = new PlayerAnimal(player, fox,
                animalDto.getFox().getAnimalScore());
            log.debug("playerAnimal= {}", playerAnimal);
            em.persist(playerAnimal);
        }

        //Dog 업적 데이터 저장 및 업데이트 이후 관련 업적 달성 여부 확인 메서드 호출
        animalRewardsService.checkFox(playerFox);

        /**
         * 양 업적 정보 추가 및 업데이트
         */

        //플레이어 - 양
        Animal sheep = animalRepository.findByAnimalId(animalDto.getSheep().getAnimalId());

        PlayerAnimal playerSheep = playerAnimalRepository.findByPlayerSequenceAndAnimalId(
            player.getPlayerSequence(), animalDto.getSheep().getAnimalId());
        log.debug("playerSheep= {}", playerSheep);
        //플레이어의 전적 정보가 있으면 업데이트 해주기
        if (playerSheep != null) {
            playerSheep.updateAnimalScore(playerSheep.getAnimalScore(),
                animalDto.getSheep().getAnimalScore());
        }

        //만약 해당 플레이어가 동물에 대한 전적 정보가 없다면 새롭게 만들어 주기
        else {
            PlayerAnimal playerAnimal = new PlayerAnimal(player, sheep,
                animalDto.getSheep().getAnimalScore());
            log.debug("playerAnimal= {}", playerAnimal);
            em.persist(playerAnimal);
        }

        //Dog 업적 데이터 저장 및 업데이트 이후 관련 업적 달성 여부 확인 메서드 호출
        animalRewardsService.checkSheep(playerSheep);

        /**
         * 고래 업적 정보 추가 및 업데이트
         */

        //플레이어 - 양
        Animal whale = animalRepository.findByAnimalId(animalDto.getWhale().getAnimalId());

        PlayerAnimal playerWhale = playerAnimalRepository.findByPlayerSequenceAndAnimalId(
            player.getPlayerSequence(), animalDto.getWhale().getAnimalId());
        log.debug("playerWhale= {}", playerWhale);
        //플레이어의 전적 정보가 있으면 업데이트 해주기
        if (playerWhale != null) {
            playerWhale.updateAnimalScore(playerWhale.getAnimalScore(),
                animalDto.getSheep().getAnimalScore());
        }

        //만약 해당 플레이어가 동물에 대한 전적 정보가 없다면 새롭게 만들어 주기
        else {
            PlayerAnimal playerAnimal = new PlayerAnimal(player, whale,
                animalDto.getSheep().getAnimalScore());
            log.debug("playerAnimal= {}", playerAnimal);
            em.persist(playerAnimal);
        }

        //Dog 업적 데이터 저장 및 업데이트 이후 관련 업적 달성 여부 확인 메서드 호출
        animalRewardsService.checkSheep(playerWhale);


    }

    //유저의 동물 관련 전체 점수 조회하는 메서드
    public AnimalScore getTotalAnimalScore(Long userSequence) {
        List<PlayerAnimal> playerAnimals = playerAnimalRepository.findByUserSequence(userSequence);

        long attackSuccess = 0;
        long attackFail = 0;
        long defenseSuccess = 0;
        long defenseFail = 0;
        long trust = 0;
        long distrust = 0;
        long truth = 0;
        long lie = 0;

        //전체 animal score 합계
        for (PlayerAnimal playerAnimal : playerAnimals) {
            log.debug("playerAnimal.getAnimalScore = {}", playerAnimal.getAnimalScore());
            attackSuccess += playerAnimal.getAnimalScore().getAttackSuccess();
            attackFail += playerAnimal.getAnimalScore().getAttackFail();
            defenseSuccess += playerAnimal.getAnimalScore().getDefenseSuccess();
            defenseFail += playerAnimal.getAnimalScore().getDefenseFail();
            trust += playerAnimal.getAnimalScore().getTrust();
            distrust += playerAnimal.getAnimalScore().getDistrust();
            truth += playerAnimal.getAnimalScore().getTruth();
            lie += playerAnimal.getAnimalScore().getLie();
        }

        //AnimalScore 에 담아서 return
        return new AnimalScore(attackSuccess, attackFail,
            defenseSuccess, defenseFail, trust, distrust, truth, lie);

    }


}
