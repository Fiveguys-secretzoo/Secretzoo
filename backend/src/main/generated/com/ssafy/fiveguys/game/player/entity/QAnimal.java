package com.ssafy.fiveguys.game.player.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QAnimal is a Querydsl query type for Animal
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAnimal extends EntityPathBase<Animal> {

    private static final long serialVersionUID = 142980969L;

    public static final QAnimal animal = new QAnimal("animal");

    public final StringPath animalEngName = createString("animalEngName");

    public final StringPath animalId = createString("animalId");

    public final StringPath animalKorName = createString("animalKorName");

    public QAnimal(String variable) {
        super(Animal.class, forVariable(variable));
    }

    public QAnimal(Path<? extends Animal> path) {
        super(path.getType(), path.getMetadata());
    }

    public QAnimal(PathMetadata metadata) {
        super(Animal.class, metadata);
    }

}

