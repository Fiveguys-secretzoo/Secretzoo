package com.ssafy.fiveguys.game.user.service;

import com.ssafy.fiveguys.game.user.dto.Role;
import com.ssafy.fiveguys.game.user.dto.UserDto;
import com.ssafy.fiveguys.game.user.dto.UserSignDto;
import com.ssafy.fiveguys.game.user.entity.User;
import com.ssafy.fiveguys.game.user.repository.UserRepositoy;
import jakarta.persistence.criteria.CriteriaBuilder.In;
import jakarta.transaction.Transactional;

import java.util.NoSuchElementException;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class UserService {

    private final UserRepositoy userRepositoy;
    private final BCryptPasswordEncoder passwordEncoder;

    public void signUp(UserSignDto userSignDto) {
        User user = User.builder()
                .userId(userSignDto.getUserId())
                .name(userSignDto.getName())
                .password(passwordEncoder.encode(userSignDto.getPassword()))
                .email(userSignDto.getEmail())
                .nickname(userSignDto.getNickname())
                .role(Role.USER)
                .build();

        userRepositoy.save(user);
    }

    public void saveUser(UserDto userDto) {
        User user = User.getUserDto(userDto);
        userRepositoy.save(user);
    }

    public UserDto findUserById(String userId) {
        User user = userRepositoy.findByUserId(userId).orElseThrow(
                () -> new NoSuchElementException("user does not exist."));
        return UserDto.getUser(user);
    }

    public void deleteRefreshToken(String userId) {
        User user = userRepositoy.findByUserId(userId).orElse(null);
        if (user != null) {
            UserDto userDto = UserDto.getUser(user);
            userDto.setRefreshToken(null);
            user = User.getUserDto(userDto);
            userRepositoy.save(user);
        }
    }
}
