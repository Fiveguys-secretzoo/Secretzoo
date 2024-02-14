package com.ssafy.fiveguys.game.member.node;

import java.util.HashSet;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;
import org.springframework.data.neo4j.core.schema.Relationship.Direction;

@Node
@Getter @Setter
public class Member {

    @Id
    private Long memberId;
    private String name;
    private String nickname;

    @Relationship(type = "FRIENDS_WITH", direction = Direction.OUTGOING)
    private final Set<Member> friends = new HashSet<>();
}
