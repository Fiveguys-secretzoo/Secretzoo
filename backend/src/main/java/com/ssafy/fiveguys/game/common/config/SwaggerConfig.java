package com.ssafy.fiveguys.game.common.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableWebMvc
public class SwaggerConfig {
    @Bean
    public OpenAPI openAPI() {
        Info info = new Info()
            .version("1.0.0")
            .title("API 명세서")
            .description("Secret Zoo dev.");

        return new OpenAPI()
            .info(info);
    }
}
