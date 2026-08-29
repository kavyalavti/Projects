package com.sahayak.payment.client;

import com.sahayak.proto.model.payment.PaymentInitiateRequest;

import java.time.LocalDateTime;

public interface  PaymentGatewayClient {
    String createOrder(Long donationId, PaymentInitiateRequest request);
    String sign(Long donationId, Double amount, LocalDateTime expiresAt);
    boolean validateTransactionID(String dbTransactionId, String gatewayTransactionId);
}