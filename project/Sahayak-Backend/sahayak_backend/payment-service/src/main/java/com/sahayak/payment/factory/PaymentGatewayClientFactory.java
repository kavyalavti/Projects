package com.sahayak.payment.factory;

import com.sahayak.payment.client.PaymentGatewayClient;
import com.sahayak.proto.model.payment.PaymentGateway;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class PaymentGatewayClientFactory {

    private final Map<Integer, PaymentGatewayClient> clientMap = new HashMap<>();

    public PaymentGatewayClientFactory(
            @Qualifier("testingClient") PaymentGatewayClient testingClient,
            @Qualifier("paytmClient") PaymentGatewayClient paytmClient
    ) {
        clientMap.put(PaymentGateway.TESTING_VALUE, testingClient); // 1 = testing
        clientMap.put(PaymentGateway.PAYTM_VALUE, paytmClient);    // 2 = Paytm
    }

    public PaymentGatewayClient getClient(Integer paymentGateway) {
        PaymentGatewayClient client = clientMap.get(paymentGateway);
        if (client == null) {
            throw new IllegalArgumentException("Unsupported payment gateway ID: " + paymentGateway);
        }
        return client;
    }
}
