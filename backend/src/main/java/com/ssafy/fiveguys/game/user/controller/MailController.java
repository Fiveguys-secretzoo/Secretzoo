package com.ssafy.fiveguys.game.user.controller;

import com.ssafy.fiveguys.game.user.dto.EmailRequestDto;
import com.ssafy.fiveguys.game.user.entity.EmailVerification;
import com.ssafy.fiveguys.game.user.service.MailService;
import com.ssafy.fiveguys.game.user.service.RedisService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"https://secretzoo.site", "http://localhost:3000"}, exposedHeaders = "*")
@RequestMapping("/verify-email")
@Tag(name = "MailController", description = "이메일 인증 서비스 컨트롤러")
public class MailController {

    private final MailService mailService;
    private final RedisService redisService;

    @Operation(summary = "이메일 인증 및 유효성 검사 API")
    @PostMapping("/send")
    public ResponseEntity<?> sendVerificationCode(@RequestBody @Valid EmailRequestDto emailDto)
        throws Exception {
        mailService.isDuplicateEmail(emailDto.getEmail());
        mailService.sendEmail(emailDto.getEmail());
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @Operation(summary = "인증 코드 확인 API")
    @PostMapping("/check")
    public ResponseEntity<?> checkVerificationCode(
        @RequestBody @Valid EmailVerification emailVerification) {
        mailService.checkVerificationCode(emailVerification);
        redisService.deleteVerificationCode(emailVerification.getEmail());
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
