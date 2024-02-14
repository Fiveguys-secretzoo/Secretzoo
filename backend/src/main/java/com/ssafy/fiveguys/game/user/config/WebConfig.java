package com.ssafy.fiveguys.game.user.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("https://secretzoo.site", "http://localhost:3000")
            .allowedMethods("HEAD", "GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS");
    }
}
