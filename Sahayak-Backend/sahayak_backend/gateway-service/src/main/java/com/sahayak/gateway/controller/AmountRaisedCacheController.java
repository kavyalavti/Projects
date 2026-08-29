package com.sahayak.gateway.controller;

import com.sahayak.gateway.service.AmountRaisedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/v1/gateway/cache")
public class AmountRaisedCacheController {

    @Autowired
    private AmountRaisedService amountRaisedService;

    @Value("${service-communication-api-key}")
    private String internalServiceApiKey;

    @PostMapping("/campaigns/{campaignId}/amountRaised/invalidate")
    public void invalidateCache(@PathVariable Long campaignId, @RequestHeader("X-Internal-Api-Key") String apiKey) {
        if (!internalServiceApiKey.equals(apiKey)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access Denied");
        }
        amountRaisedService.evictAmountRaisedCache(campaignId);
    }
}
