package com.ssafy.fiveguys.game.user.controller;

import com.ssafy.fiveguys.game.user.dto.JwtTokenDto;
import com.ssafy.fiveguys.game.user.dto.LoginRequestDto;
import com.ssafy.fiveguys.game.user.dto.UserSignDto;
import com.ssafy.fiveguys.game.user.jwt.JwtProperties;
import com.ssafy.fiveguys.game.user.service.AuthService;
import com.ssafy.fiveguys.game.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.view.RedirectView;

@Slf4j
@Controller
@RequiredArgsConstructor
@CrossOrigin({"http://localhost:3000"})
@RequestMapping("/api/v1")
@Tag(name = "AuthController",description = "사용자(회원, 비회원)가 이용할 수 있는 서비스")
public class AuthApiController {

    private final AuthService authService;
    private final UserService userService;

    @GetMapping("/google")
    public RedirectView google(HttpServletRequest request, HttpServletResponse response)
        throws IOException {
        return new RedirectView("https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=714306826420-cu2685nsad9ddr6vri293r0l51avipkf.apps.googleusercontent.com&scope=profile email&redirect_uri=http://localhost:8080/login/oauth2/code/google");
    }

}
