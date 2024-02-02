package com.ssafy.fiveguys.game.player.api;


import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {


    @Operation(summary = "서버 에러 페이지 조회")
    @GetMapping("/500")
    public void serverError() {
        throw new IllegalStateException();
    }
}

