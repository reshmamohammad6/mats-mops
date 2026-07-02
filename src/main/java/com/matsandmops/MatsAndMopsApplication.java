package com.matsandmops;

import java.net.URI;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MatsAndMopsApplication {
  public static void main(String[] args) {
    applyDatabaseUrl();
    SpringApplication.run(MatsAndMopsApplication.class, args);
  }

  private static void applyDatabaseUrl() {
    String databaseUrl = System.getenv("DATABASE_URL");

    if (databaseUrl == null || databaseUrl.isBlank() || System.getenv("SPRING_DATASOURCE_URL") != null) {
      return;
    }

    URI uri = URI.create(databaseUrl);
    String[] userInfo = uri.getUserInfo() == null ? new String[] {"", ""} : uri.getUserInfo().split(":", 2);
    int port = uri.getPort() == -1 ? 5432 : uri.getPort();
    String jdbcUrl = "jdbc:postgresql://" + uri.getHost() + ":" + port + uri.getPath();

    System.setProperty("spring.datasource.url", jdbcUrl);
    System.setProperty("spring.datasource.username", userInfo[0]);
    System.setProperty("spring.datasource.password", userInfo.length > 1 ? userInfo[1] : "");
  }
}
