package com.ssafy.fiveguys.game.user.controller;

import com.ssafy.fiveguys.game.user.dto.UserInfoDto;
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
// @CrossOrigin("http://localhost:3000")
public class UserController {

    private final UserService userService;
    private final AuthService authService;

    @Operation(summary = "회원 정보 조회 API")
    @GetMapping("/user")
    public ResponseEntity<?> getUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken) {
        String userId = authService.extractUserId(accessToken);
        log.debug("userId = {}", userId);
        UserInfoDto userInfo = UserInfoDto.userInfoFromUserDto(userService.findUserById(userId));
        return ResponseEntity.status(HttpStatus.OK).body(userInfo);
    }

    @Operation(summary = "회원 정보 갱신 API")
    @PutMapping("/user")
    public ResponseEntity<?> updateUser(@RequestBody UserInfoDto userInfoDto) {
        userService.updateUser(userInfoDto);
        return ResponseEntity.status(HttpStatus.OK).body("update Success");
    }

    @Operation(summary = "회원 삭제 API")
    @DeleteMapping("/user/{password}")
    public ResponseEntity<?> deleteUser(HttpServletRequest request, @PathVariable String password) {
        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION);
        String userId = authService.extractUserId(accessToken);
        userService.deleteUser(userId, password);
        return ResponseEntity.status(HttpStatus.OK).body("update Success");
    }

    @Operation(summary = "비밀번호 재확인 API")
    @PostMapping("/password")
    public ResponseEntity<?> confirmPassword(HttpServletRequest request,
        @RequestBody String password) {
        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION);
        String userId = authService.extractUserId(accessToken);
        if (userService.validatePassword(userId, password)) {
            return ResponseEntity.status(HttpStatus.OK).body("password correct.");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("password incorrect");
    }

    // 닉네임변경, 업적변경, 프로필변경, 비밀변호변경
}
