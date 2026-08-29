package com.sahayak.payment.client;

import com.sahayak.proto.model.payment.PaymentInitiateRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Base64;


@Service("testingClient")
public class TestingPaymentGatewayClientImpl implements PaymentGatewayClient {
    @Value("${payment-gateway.apiKey}")
    private String apiKey;

    @Value("${payment-gateway.secret}")
    private String secret;

    @Value("${payment-data-encryption.key")
    private String paymentDataEncryptionKey;

    // TODO: call real SDK; here we return a stub URL
    @Override
    public String createOrder(Long donationId, PaymentInitiateRequest request) {


        return "http://localhost:3000/payment_simulation_testing.html";
    }

    @Override
    public String sign(Long donationId, Double amount, LocalDateTime expiresAt) {
        try {
            // Prepare data string to sign
            String dataToSign = donationId + "|" + amount + "|" + expiresAt.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);


            // Initialize HMAC SHA-256
            Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKeySpec = new SecretKeySpec(paymentDataEncryptionKey.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            sha256_HMAC.init(secretKeySpec);

            // Compute the HMAC
            byte[] hmacBytes = sha256_HMAC.doFinal(dataToSign.getBytes(StandardCharsets.UTF_8));

            // Encode to Base64 to make it easy to transmit
            return Base64.getEncoder().encodeToString(hmacBytes);
        } catch (Exception e) {
            throw new RuntimeException("Error while generating HMAC SHA-256 signature", e);
        }
    }

    @Override
    public boolean validateTransactionID(String dbTransactionId, String gatewayTransactionId) {
        // For Paytm, we would typically call their API to validate the transaction ID
        // Here we assume all transaction IDs are valid for simplicity
        if (dbTransactionId == null || gatewayTransactionId == null) {
            return false;
        }
        if (!dbTransactionId.equals(gatewayTransactionId)) {
            return false;
        }
        return true;
    }
}

