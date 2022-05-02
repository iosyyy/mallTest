package org.linlinjava.litemall.admin.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
/*
  @author 靖鸿宣
 * @since 2021/8/27
 */
@Configuration
public class CorsConfigw implements WebMvcConfigurer {

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry
        .addMapping("/**")
        .allowedOrigins("*")
        .allowCredentials(true)
        .allowedMethods("GET", "POST", "DELETE", "PUT", "PATCH")
        .maxAge(3600);
  }
}
