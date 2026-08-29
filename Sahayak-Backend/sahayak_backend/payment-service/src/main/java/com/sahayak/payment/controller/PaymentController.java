package com.sahayak.payment.controller;


import com.fasterxml.jackson.databind.JsonNode;
import com.google.protobuf.InvalidProtocolBufferException;
import com.google.protobuf.util.JsonFormat;
import com.sahayak.payment.handler.PaymentHandler;
import com.sahayak.proto.model.payment.PaymentInitiateRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/payment")
public class PaymentController {

    private final PaymentHandler paymentHandler;

    public PaymentController(PaymentHandler paymentHandler) {
        this.paymentHandler = paymentHandler;
    }

    @PostMapping("/{campaignUrl}")
    public ResponseEntity<?> createPayment(
            @PathVariable String campaignUrl,
            @RequestBody JsonNode jsonNode,
            @RequestHeader("Idempotency-Key") String idempotencyKey) throws InvalidProtocolBufferException {
        PaymentInitiateRequest.Builder request = PaymentInitiateRequest.newBuilder();
        JsonFormat.parser().merge(jsonNode.toString(), request);
        String redirectPaymentGatewayUrl = paymentHandler.createPaymentOrder(campaignUrl, request.build(), idempotencyKey);
        return ResponseEntity.ok()
                .header("Content-Type", "application/json")
                .body(redirectPaymentGatewayUrl);
    }

    @GetMapping("/campaigns/{campaignId}/amountRaised")
    public ResponseEntity<?> getAmountRaised(@PathVariable Long campaignId) {
        Double amountRaised = paymentHandler.getAmountRaised(campaignId);

        return ResponseEntity.ok().header("Content-Type", "application/json")
                .body(amountRaised);
    }
}

