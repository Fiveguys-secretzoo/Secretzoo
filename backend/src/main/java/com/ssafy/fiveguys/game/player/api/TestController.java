package com.ssafy.fiveguys.game.player.api;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {


    @GetMapping("/500")
    public void serverError() {
        throw new IllegalStateException();
    }
}

