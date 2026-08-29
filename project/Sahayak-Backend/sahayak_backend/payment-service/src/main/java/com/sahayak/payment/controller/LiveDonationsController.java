package com.sahayak.payment.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.protobuf.util.JsonFormat;
import com.sahayak.payment.handler.LiveDonationHandler;
import com.sahayak.proto.model.entity.CampaignDTO;
import com.sahayak.proto.model.payment.DonationDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.logging.ErrorManager;

@RestController
@RequestMapping("/api/v1/payment/live-donations")
public class LiveDonationsController {

    private LiveDonationHandler liveDonationHandler;

    private final Logger logger = LoggerFactory.getLogger(LiveDonationsController.class.getName());

    @Autowired
    public LiveDonationsController(LiveDonationHandler liveDonationHandler) {
        this.liveDonationHandler = liveDonationHandler;
    }

    @GetMapping("/{campaignId}")
    public ResponseEntity<?> getLiveDonations(@PathVariable Long campaignId) {
        try {
            List<DonationDTO> donationList = liveDonationHandler.getLiveDonations(campaignId);

            // Prepare simplified donation response
            List<Map<String, Object>> donationsResponse = new ArrayList<>();
            for (DonationDTO donation : donationList) {
                Map<String, Object> donationMap = new HashMap<>();
                donationMap.put("donorName", "Ajay"); // Assuming userId is available
                donationMap.put("amount", donation.getAmount());
                donationMap.put("currency", donation.getCurrency());
                donationsResponse.add(donationMap);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("count", donationsResponse.size());
            response.put("donations", donationsResponse);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error while fetching donations", e);
            return ResponseEntity.internalServerError()
                    .body("Error fetching donations: " + e.getMessage());
        }
    }



}
