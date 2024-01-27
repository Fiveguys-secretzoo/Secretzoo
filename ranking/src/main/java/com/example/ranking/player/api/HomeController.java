package com.example.ranking.player.api;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @Value("${server.servlet.context-path}")
    private String contextPath;

    //index.html 기본 페이지
    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("contextPath", contextPath);
        return "index.html";
    }
}
