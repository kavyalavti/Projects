package com.sahayak.gateway;

import com.sahayak.gateway.config.Twilioconfig;
import com.twilio.Twilio;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.client.RestTemplate;

@EnableCaching
@SpringBootApplication(scanBasePackages = {
        "com.sahayak.gateway",
        "com.sahayak.store"
})
@EntityScan(basePackages = "com.sahayak.store.entity")
@EnableAsync
public class GatewayApplication {
    @Autowired
    private Twilioconfig twilioconfig;
    @PostConstruct
    public void setup(){
        Twilio.init(twilioconfig.getAccountSid(),twilioconfig.getAuthToken());
    }
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
    public static void main(String[] args) {
        SpringApplication.run(GatewayApplication.class, args);
    }
}
