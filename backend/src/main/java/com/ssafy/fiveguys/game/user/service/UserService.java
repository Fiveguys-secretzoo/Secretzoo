package com.ssafy.fiveguys.game.user.service;

import com.ssafy.fiveguys.game.user.dto.Role;
import com.ssafy.fiveguys.game.user.dto.UserDto;
import com.ssafy.fiveguys.game.user.dto.UserInfoDto;
import com.ssafy.fiveguys.game.user.dto.UserSignDto;
import com.ssafy.fiveguys.game.user.entity.User;
import com.ssafy.fiveguys.game.user.exception.PasswordException;
import com.ssafy.fiveguys.game.user.exception.UserIdNotFoundException;
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

    public void updateUser(UserInfoDto userInfoDto) {
        User user = userRepositoy.findByUserId(userInfoDto.getUserId()).orElse(null);
        if (user != null) {
            UserDto userDto = UserDto.getUser(user);
            userDto.setName(userDto.getName());
            userDto.setNickname(userDto.getNickname());
            userDto.setMainAchievement(userDto.getMainAchievement());
            userDto.setProfileNumber(userDto.getProfileNumber());
            user = User.getUserDto(userDto);
            userRepositoy.save(user);
        }

    }

    public void deleteUser(String userId, String password) {
        if (validatePassword(userId, password)) {
            userRepositoy.deleteByUserId(userId);
        } else {
            throw new PasswordException("비밀번호가 일치하지 않습니다.");
        }

    }

    public boolean validatePassword(String userId, String password) {
        User user = userRepositoy.findByUserId(userId).orElse(null);
        if (user != null) {
            if (passwordEncoder.matches(password, user.getPassword())) {
                return true;
            } else {
                return false;
            }
        } else {
            throw new UserIdNotFoundException("user does not exist.");
        }
    }

    public void changePassword(String userId, String password) {
        User user = userRepositoy.findByUserId(userId).orElse(null);
        if (user != null) {
            UserDto userDto = UserDto.getUser(user);
            userDto.setPassword(passwordEncoder.encode(password));
            User updatedUser = User.getUserDto(userDto);
            userRepositoy.save(updatedUser);
        } else {
            throw new UserIdNotFoundException("user does not exist.");
        }
    }

    public void changeProfileNumber(String userId, String profileNumber) {
        User user = userRepositoy.findByUserId(userId).orElse(null);
        if (user != null) {
            UserDto userDto = UserDto.getUser(user);
            userDto.setProfileNumber(profileNumber);
            User updatedUser = User.getUserDto(userDto);
            userRepositoy.save(updatedUser);
        } else {
            throw new UserIdNotFoundException("user does not exist.");
        }
    }

    public void changeMainAchievement(String userId, String mainAcheiveMent) {
        User user = userRepositoy.findByUserId(userId).orElse(null);
        if (user != null) {
            UserDto userDto = UserDto.getUser(user);
            userDto.setMainAchievement(mainAcheiveMent);
            User updatedUser = User.getUserDto(userDto);
            userRepositoy.save(updatedUser);
        } else {
            throw new UserIdNotFoundException("user does not exist.");
        }
    }

    public void changeNickname(String userId, String nickname) {
        User user = userRepositoy.findByUserId(userId).orElse(null);
        if (user != null) {
            UserDto userDto = UserDto.getUser(user);
            userDto.setNickname(nickname);
            User updatedUser = User.getUserDto(userDto);
            userRepositoy.save(updatedUser);
        } else {
            throw new UserIdNotFoundException("user does not exist.");
        }
    }
}
