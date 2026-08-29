//package com.sahayak.gateway.controller;
//
//import com.sahayak.gateway.handler.WebhookHandler;
//import com.sahayak.proto.model.payment.PaymentStatusResponse;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/webhooks/payments")
//public class WebhookController {
//
//    private final WebhookHandler handler;
//
//    public WebhookController(WebhookHandler handler) {
//        this.handler = handler;
//    }
//
//    @PostMapping
//    public ResponseEntity<Void> handle(@RequestHeader("X-Gateway-Signature") String sig,
//                                       @RequestBody PaymentStatusResponse payload) {
//        handler.handle(sig, payload);
//        return ResponseEntity.ok().build();
//    }
//}
