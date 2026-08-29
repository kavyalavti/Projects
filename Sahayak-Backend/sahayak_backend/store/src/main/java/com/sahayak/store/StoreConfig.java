package com.sahayak.store;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EntityScan(basePackages = "com.sahayak.store.entity")
@EnableJpaRepositories(basePackages = "com.sahayak.store.repository")
public class StoreConfig {
}