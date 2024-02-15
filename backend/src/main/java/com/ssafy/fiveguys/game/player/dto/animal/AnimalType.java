package com.ssafy.fiveguys.game.player.dto.animal;


import com.ssafy.fiveguys.game.player.entity.embeddedType.AnimalScore;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Data
public class AnimalType {


    String animalId;
    AnimalScore animalScore;




}
