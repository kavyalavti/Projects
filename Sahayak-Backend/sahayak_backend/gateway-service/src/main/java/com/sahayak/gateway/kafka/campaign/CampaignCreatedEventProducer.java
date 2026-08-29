package com.sahayak.gateway.kafka.campaign;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class CampaignCreatedEventProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;

    @Value("${kafka.topic.campaign-created}")
    private String topic;

    public CampaignCreatedEventProducer(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendEvent(String campaignId) {
        kafkaTemplate.send(topic, campaignId);
    }
}