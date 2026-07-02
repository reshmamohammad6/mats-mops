package com.matsandmops;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MatsAndMopsApplication {
  public static void main(String[] args) {
    SpringApplication app = new SpringApplication(MatsAndMopsApplication.class);
    app.setDefaultProperties(databaseUrlProperties());
    app.run(args);
  }

  private static Map<String, Object> databaseUrlProperties() {
    Map<String, Object> properties = new HashMap<>();
    String databaseUrl = System.getenv("DATABASE_URL");

    if (databaseUrl == null || databaseUrl.isBlank() || System.getenv("SPRING_DATASOURCE_URL") != null) {
      return properties;
    }

    URI uri = URI.create(databaseUrl);
    String[] userInfo = uri.getUserInfo() == null ? new String[] {"", ""} : uri.getUserInfo().split(":", 2);
    int port = uri.getPort() == -1 ? 5432 : uri.getPort();
    String jdbcUrl = "jdbc:postgresql://" + uri.getHost() + ":" + port + uri.getPath();

    properties.put("spring.datasource.url", jdbcUrl);
    properties.put("spring.datasource.username", userInfo[0]);
    properties.put("spring.datasource.password", userInfo.length > 1 ? userInfo[1] : "");
    return properties;
  }
}
