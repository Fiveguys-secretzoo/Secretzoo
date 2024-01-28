package com.example.ranking.player.api;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {


    //index.html 기본 페이지
    @GetMapping("/")
    public String home() {

        return "index.html";
    }
}
