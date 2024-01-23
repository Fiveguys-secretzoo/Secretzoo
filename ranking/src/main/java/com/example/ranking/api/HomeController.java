package com.example.ranking.api;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {


    //index.html 기본 페이지
    @GetMapping("/")
    public String home() {
        return "index.html";
    }
}
