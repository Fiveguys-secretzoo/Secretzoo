package com.ssafy.fiveguys.game.member.repository;

import com.ssafy.fiveguys.game.member.node.Member;
import java.util.List;

public interface MemberProjection {
    Long getTargetId();
    String getTargetName();
    Long getTargetCount();
    List<Member> getF1List();
    Long getCommonFollowCount();
}
