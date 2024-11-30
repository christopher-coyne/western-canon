package com.helios.recommendation.engine;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication()
public class RecommendationEngineApplication {

	public static void main(String[] args) {
		SpringApplication.run(RecommendationEngineApplication.class, args);
	}

}
