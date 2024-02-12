package com.ssafy.fiveguys.game.user.controller;

import com.ssafy.fiveguys.game.user.dto.UserDto;
import com.ssafy.fiveguys.game.user.dto.UserInfoDto;
import com.ssafy.fiveguys.game.user.jwt.JwtProperties;
import com.ssafy.fiveguys.game.user.jwt.JwtTokenProvider;
import com.ssafy.fiveguys.game.user.service.AuthService;
import com.ssafy.fiveguys.game.user.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
@Tag(name = "UserController", description = "회원 관련 서비스 컨트롤러")
@CrossOrigin(origins = {"https://secretzoo.site", "http://localhost:3000"}, exposedHeaders = "*")
public class UserController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    @Operation(summary = "회원 정보 API")
    @GetMapping("/user")
    public ResponseEntity<?> getUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken) {
        String userId = jwtTokenProvider.extractUserId(accessToken);
        log.debug("userId = {}", userId);
        UserDto userDto = userService.findUserById(userId);
        return ResponseEntity.status(HttpStatus.OK).body(userDto);
    }

    @Operation(summary = "회원 프로필 조회 API")
    @GetMapping("/profile")
    public ResponseEntity<?> profileUser(
        @RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken) {
        String userId = jwtTokenProvider.extractUserId(accessToken);
        log.debug("userId = {}", userId);
        UserInfoDto userInfo = UserInfoDto.userInfoFromUserDto(userService.findUserById(userId));
        return ResponseEntity.status(HttpStatus.OK).body(userInfo);
    }

    @Operation(summary = "회원 삭제 API")
    @DeleteMapping("/user")
    public ResponseEntity<?> deleteUser(HttpServletRequest request, @RequestBody String password) {
        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION);
        String userId = jwtTokenProvider.extractUserId(accessToken);
        userService.deleteUser(userId, password);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @Operation(summary = "비밀번호 재확인 API")
    @PostMapping("/password")
    public ResponseEntity<?> confirmPassword(HttpServletRequest request,
        @RequestBody String password) {
        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION);
        String userId = jwtTokenProvider.extractUserId(accessToken);
        userService.validatePassword(userId, password);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @Operation(summary = "닉네임 변경 API")
    @PutMapping("/nickname")
    public ResponseEntity<?> changeNickname(HttpServletRequest request,
        @RequestBody String nickname) {
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);
        String userId = jwtTokenProvider.extractUserId(token);
        userService.changeNickname(userId, nickname);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @Operation(summary = "업적 변경 API")
    @PutMapping("/main-achievement")
    public ResponseEntity<?> changeMainAchievement(HttpServletRequest request,
        @RequestBody String mainAchievement) {
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);
        String userId = jwtTokenProvider.extractUserId(token);
        userService.changeMainAchievement(userId, mainAchievement);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @Operation(summary = "프로필 사진 변경 API")
    @PutMapping("/profile-number")
    public ResponseEntity<?> changeProfileNumber(HttpServletRequest request,
        @RequestBody String profileNumber) {
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);
        String userId = jwtTokenProvider.extractUserId(token);
        userService.changeProfileNumber(userId, profileNumber);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @Operation(summary = "비밀번호 변경 API")
    @PutMapping("/password")
    public ResponseEntity<?> changePassword(HttpServletRequest request,
        @RequestBody String password) {
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);
        String userId = jwtTokenProvider.extractUserId(token);
        userService.changePassword(userId, password);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
