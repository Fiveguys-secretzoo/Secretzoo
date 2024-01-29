package com.ssafy.fiveguys.game.user.service.security;

import com.ssafy.fiveguys.game.user.auth.GameUserDetails;
import com.ssafy.fiveguys.game.user.repository.UserRepositoy;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class GameUserDetailsService implements UserDetailsService {

    private final UserRepositoy userRepositoy;

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        System.out.println("GameUserDetailsService.loadUserByUsername");
        return userRepositoy.findByUserId(userId)
            .map(this::createUserDetails)
            .orElseThrow(() -> new UsernameNotFoundException(
                "Can't find user with this userId. -> " + userId));
    }

    public UserDetails createUserDetails(com.ssafy.fiveguys.game.user.entity.User user) {
        return User.builder()
            .username(user.getUserId())
            .password(user.getPassword())
            .roles(user.getRole().toString())
            .build();
    }
}
