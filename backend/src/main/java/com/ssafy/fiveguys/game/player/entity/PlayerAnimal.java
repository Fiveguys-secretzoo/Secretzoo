package com.ssafy.fiveguys.game.player.entity;


import com.ssafy.fiveguys.game.player.entity.base.BaseTimeEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter @Setter @ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class PlayerAnimal extends BaseTimeEntity {


    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long playerAnimalSequence;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "player_sequence")
    private Player player;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animal_id")
    private Animal animal;


    private AnimalScore animalScore;

    public PlayerAnimal(Player playerSequence, Animal animal, AnimalScore animalScore) {
        this.player = playerSequence;
        this.animal= animal;
        this.animalScore = animalScore;
    }

//    private Long attackSuccess = 0L;
//    private Long attackFail = 0L;
//    private Long defenseSuccess = 0L;
//    private Long defenseFail = 0L;
//    private Long trust = 0L;
//    private Long distrust = 0L;
//    private Long truth = 0L;
//    private Long lie = 0L;

    /**
     * 생성 메서드
     */
    public PlayerAnimal createPlayerAnimal(Player playerSequence, Animal animalId, AnimalScore animalScore) {
        return new PlayerAnimal(playerSequence, animalId, animalScore);
    }

    /**
     * 업데이트 메서드
     */
    public void updateAnimalScore(AnimalScore prevAnimalScore, AnimalScore newAnimalScore){
        this.animalScore.setAttackSuccess(prevAnimalScore.getAttackSuccess() + newAnimalScore.getAttackSuccess());
        this.animalScore.setAttackFail(prevAnimalScore.getAttackFail() + newAnimalScore.getAttackFail());
        this.animalScore.setDefenseSuccess(prevAnimalScore.getDefenseSuccess() + newAnimalScore.getDefenseSuccess());
        this.animalScore.setDefenseFail(prevAnimalScore.getDefenseFail() + newAnimalScore.getDefenseFail());
        this.animalScore.setTrust(prevAnimalScore.getTrust() + newAnimalScore.getTrust());
        this.animalScore.setDistrust(prevAnimalScore.getDistrust() + newAnimalScore.getDistrust());
        this.animalScore.setTruth(prevAnimalScore.getTruth() + newAnimalScore.getTruth());
        this.animalScore.setLie(prevAnimalScore.getLie() + newAnimalScore.getLie());

    }
}
