package com.sahayak.gateway.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AmountRaisedService {

    @Autowired
    private RestTemplate restTemplate;

    @Cacheable(value = "campaignAmountRaised", key = "#campaignId")
    public Double getAmountRaised(Long campaignId) {
        String url = "http://localhost:8083/api/v1/payment/campaigns/" + campaignId + "/amountRaised";
        Double amountRaised = restTemplate.getForObject(url, Double.class);
        return amountRaised != null ? amountRaised : 0.0;
    }

    @CacheEvict(value = "campaignAmountRaised", key = "#campaignId")
    public void evictAmountRaisedCache(Long campaignId) {
        // Nothing else needed here, just clear the cache entry
    }
}
