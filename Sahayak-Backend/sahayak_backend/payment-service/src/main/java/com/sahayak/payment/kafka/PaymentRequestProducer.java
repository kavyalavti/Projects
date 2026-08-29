package com.sahayak.payment.kafka;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class PaymentRequestProducer {
    private final KafkaTemplate<String, String> kafka;
    @Value("${kafka.topic.payment-topic}")
    private String topic;

    public PaymentRequestProducer(KafkaTemplate<String, String> kafka) {
        this.kafka = kafka;
    }
    public void send(String event) {
        kafka.send(topic, event);
    }
}