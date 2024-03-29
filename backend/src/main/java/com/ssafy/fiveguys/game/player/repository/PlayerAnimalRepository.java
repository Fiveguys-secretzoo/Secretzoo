package com.ssafy.fiveguys.game.player.repository;

import com.ssafy.fiveguys.game.player.entity.PlayerAnimal;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PlayerAnimalRepository extends JpaRepository<PlayerAnimal, Long> {



    //네이티브 쿼리
//    @Query(value = "SELECT pa.player_animal_sequence, pa.attack_success, pa.animal_id,"
//        + " pa.attack_fail, pa.defense_success, pa.defense_fail, pa.trust, pa.distrust,"
//        + " pa.truth, pa.lie, pa.created_date, pa.last_modified_date, pa.player_sequence"
//        + " FROM player_animal pa INNER JOIN player p ON pa.player_sequence = p.player_sequence WHERE p.user_sequence = ?", nativeQuery = true)
//    List<PlayerAnimal> findByUserSequence(Long userSequence);

    @Query(value ="SELECT pa FROM PlayerAnimal pa JOIN FETCH pa.player p WHERE p.user.userSequence = :userSequence")
    List<PlayerAnimal> findByUserSequence(@Param("userSequence") Long userSequence);

    //네이티브 쿼리
//    @Query(value = "SELECT * FROM player_animal WHERE player_sequence = ? AND animal_id = ?", nativeQuery = true)
//    PlayerAnimal findByPlayerSequenceAndAnimalId(Long playerSequence, String animalId);
    @Query("SELECT pa FROM PlayerAnimal pa WHERE pa.player.playerSequence = :playerSequence AND pa.animal.animalId = :animalId")
    PlayerAnimal findByPlayerSequenceAndAnimalId(@Param("playerSequence") Long playerSequence, @Param("animalId") String animalId);


}
