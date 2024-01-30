package com.ssafy.fiveguys.game.player.dto.animal;


import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@RequiredArgsConstructor
@Getter @Setter
@ToString
public class Cat extends AnimalType {

    private final String animalId = "CAT02";


}
