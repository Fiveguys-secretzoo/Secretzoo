package com.ssafy.fiveguys.game.member.service;

import com.ssafy.fiveguys.game.member.node.Member;
import com.ssafy.fiveguys.game.member.repository.MemberRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    @Transactional
    public void addFriend(Member member, Member friend) {
        member.getFriends().add(friend);
        friend.getFriends().add(member);
        memberRepository.save(member);
        memberRepository.save(friend);
    }

    @Transactional(readOnly = true)
    public List<Member> findFriendsOfUser(Member member) {
        return memberRepository.findFriendsById(member.getMemberId());
    }


    @Transactional
    public void removeFriend(Member member, Member friend) {
        member.getFriends().remove(friend);
        friend.getFriends().remove(member);
        memberRepository.save(member);
        memberRepository.save(friend);
    }
}
