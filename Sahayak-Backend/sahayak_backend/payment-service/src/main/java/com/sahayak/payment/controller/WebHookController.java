package com.sahayak.payment.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.protobuf.InvalidProtocolBufferException;
import com.google.protobuf.util.JsonFormat;
import com.sahayak.payment.handler.WebHookHandler;


import com.sahayak.proto.model.payment.PaymentWebhookRequest;
import com.sahayak.proto.model.payment.PaymentWebhookResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/payment/webhook")
public class WebHookController {

    private final WebHookHandler webHookHandler;

    public WebHookController(WebHookHandler webHookHandler) {
        this.webHookHandler = webHookHandler;
    }

    @PostMapping
    public ResponseEntity<?> handleWebhook(@RequestBody JsonNode jsonNode) throws InvalidProtocolBufferException {
        // Parse incoming JSON to PaymentWebhookRequest
        PaymentWebhookRequest.Builder requestBuilder = PaymentWebhookRequest.newBuilder();
        JsonFormat.parser().merge(jsonNode.toString(), requestBuilder);

        // Process the webhook event
        PaymentWebhookResponse response = webHookHandler.processWebhook(requestBuilder.build());

        // Convert the response to JSON string
        String jsonResponse = JsonFormat.printer().print(response);

        // Return the response
        return ResponseEntity.ok()
                .header("Content-Type", "application/json")
                .body(jsonResponse);
    }
}
