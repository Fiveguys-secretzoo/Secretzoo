package com.ssafy.fiveguys.game.player.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import java.util.ArrayList;
import java.util.List;
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
public class Animal {

    @Id
    private String animalId;
    private String animalEngName;
    private String animalKorName;

    @OneToMany(mappedBy = "animal", fetch = FetchType.LAZY)
    private List<Rewards> rewards = new ArrayList<>();

}
