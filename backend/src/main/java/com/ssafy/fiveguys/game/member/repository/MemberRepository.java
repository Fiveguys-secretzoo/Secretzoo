package com.ssafy.fiveguys.game.member.repository;

import com.ssafy.fiveguys.game.member.node.Member;
import java.util.List;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;

public interface MemberRepository extends Neo4jRepository<Member, Long> {
    @Query("MATCH (n:Member {member_id: $memberId})-[r1:FOLLOW]->(f1:Member)-[r2:FOLLOW]->(fx:Member) " +
        "WHERE NOT ((n)-[:FOLLOW]->(fx)) AND NOT ((n)-[:BLOCK]->(fx)) AND n <> fx " +
        "RETURN n, fx, fx.member_id as target_id, fx.name as target_name, count(fx.member_Id) as target_count, collect(distinct f1) as f1_list " +
        "ORDER BY target_count DESC")
    List<MemberProjection> findFriendsOfFriends(@Param("memberId") Long memberId);

    @Query("MATCH (n)-[:FOLLOW]->(c:Member)<-[:FOLLOW]-(fx) " +
        "RETURN count(c) as common_follow_count")
    Long findCommonFollowCount(@Param("memberId") Long memberId);


    // 추가 메서드들 정의
    @Query("MATCH (m:Member)-[:FRIENDS_WITH]->(friend:Member) WHERE member_id(m) = $memberId RETURN friend")
    List<Member> findFriendsById(@Param("memberId") Long memberId);
}


