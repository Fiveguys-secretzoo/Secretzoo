package com.ssafy.fiveguys.game.common;


import io.swagger.v3.oas.annotations.Operation;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RequestMapping("/test")
public class TestController {


    @Operation(summary = "500 서버 에러 페이지 조회")
    @GetMapping("/500")
    public void error500() {
        throw new IllegalStateException();
    }
    @Operation(summary = "40X 서버 에러 페이지 조회")
    @GetMapping("/40X")
    public void error40X() throws BadRequestException {
        throw new BadRequestException();
    }

}

