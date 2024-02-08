package com.ssafy.fiveguys.game.user.service;

import com.ssafy.fiveguys.game.player.service.PlayerService;
import com.ssafy.fiveguys.game.user.dto.Role;
import com.ssafy.fiveguys.game.user.dto.UserDto;
import com.ssafy.fiveguys.game.user.dto.UserInfoDto;
import com.ssafy.fiveguys.game.user.dto.UserSignDto;
import com.ssafy.fiveguys.game.user.entity.User;
import com.ssafy.fiveguys.game.user.exception.PasswordException;
import com.ssafy.fiveguys.game.user.exception.UserNotFoundException;
import com.ssafy.fiveguys.game.user.repository.UserRepositoy;
import jakarta.transaction.Transactional;

import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class UserService {

    private final UserRepositoy userRepositoy;
    private final BCryptPasswordEncoder passwordEncoder;
    private final PlayerService playerService;

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
     //   playerService.createPlayer(user);

    }

    public void saveUser(UserDto userDto) {
        User user = User.getUserDto(userDto);
        userRepositoy.save(user);
    }

    public UserDto findUserById(String userId) {
        User user = userRepositoy.findByUserId(userId).orElseThrow(
            UserNotFoundException::new);
        return UserDto.getUser(user);
    }

    public boolean verifyEmail(String email) {
        Optional<User> optionalUser = userRepositoy.findByEmail(email);
        return optionalUser.isPresent();
    }

    public void deleteRefreshToken(String userId) {
        User user = userRepositoy.findByUserId(userId).orElseThrow(
            UserNotFoundException::new);
        UserDto userDto = UserDto.getUser(user);
        userDto.setRefreshToken(null);
        userRepositoy.save(User.getUserDto(userDto));
    }

    public void updateUser(UserInfoDto userInfoDto) {
        User user = userRepositoy.findByUserId(userInfoDto.getUserId()).orElseThrow(
            UserNotFoundException::new);
        UserDto userDto = UserDto.getUser(user);
        userDto.setName(userDto.getName());
        userDto.setNickname(userDto.getNickname());
        userDto.setMainReward(userDto.getMainReward());
        userDto.setProfileNumber(userDto.getProfileNumber());
        userRepositoy.save(User.getUserDto(userDto));
    }

    public void deleteUser(String userId, String password) {
        if (validatePassword(userId, password)) {
            userRepositoy.deleteByUserId(userId);
        }
    }

    public boolean validatePassword(String userId, String password) {
        User user = userRepositoy.findByUserId(userId).orElseThrow(
            UserNotFoundException::new);
        if (passwordEncoder.matches(password, user.getPassword())) {
            return true;
        }
        throw new PasswordException("비밀번호가 일치하지 않습니다.");
    }

    public void changePassword(String userId, String password) {
        User user = userRepositoy.findByUserId(userId).orElseThrow(
            UserNotFoundException::new);
            UserDto userDto = UserDto.getUser(user);
            userDto.setPassword(passwordEncoder.encode(password));
            userRepositoy.save(User.getUserDto(userDto));
    }

    public void changeProfileNumber(String userId, String profileNumber) {
        User user = userRepositoy.findByUserId(userId).orElseThrow(
            UserNotFoundException::new);
            UserDto userDto = UserDto.getUser(user);
            userDto.setProfileNumber(profileNumber);
            userRepositoy.save(User.getUserDto(userDto));
    }

    public void changeMainAchievement(String userId, String mainAcheiveMent) {
        User user = userRepositoy.findByUserId(userId).orElseThrow(
            UserNotFoundException::new);
            UserDto userDto = UserDto.getUser(user);
            userDto.setMainReward(mainAcheiveMent);
            userRepositoy.save(User.getUserDto(userDto));
    }

    public void changeNickname(String userId, String nickname) {
        User user = userRepositoy.findByUserId(userId).orElseThrow(
            UserNotFoundException::new);
            UserDto userDto = UserDto.getUser(user);
            userDto.setNickname(nickname);
            userRepositoy.save(User.getUserDto(userDto));
    }
}
