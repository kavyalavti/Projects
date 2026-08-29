package com.sahayak.gateway.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.protobuf.util.JsonFormat;
import com.sahayak.gateway.handler.CampaignHandler;
import com.sahayak.gateway.handler.FileHandler;
import com.sahayak.proto.model.entity.CampaignDTO;
import com.sahayak.gateway.security.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/v1/campaign")
public class CampaignController {

    private final CampaignHandler campaignHandler;
    private final FileHandler fileHandler;
    private final JwtUtil jwtUtil;
    private static final int LIMIT = 5;

    private final Logger logger = LoggerFactory.getLogger(CampaignController.class.getName());

    @Autowired
    public CampaignController(CampaignHandler campaignHandler,
                              FileHandler fileHandler,
                              JwtUtil jwtUtil) {
        this.campaignHandler = campaignHandler;
        this.fileHandler = fileHandler;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping(value = "/{userId}", consumes = {"multipart/form-data"})
    public ResponseEntity<?> createCampaign(
            @PathVariable Long userId,
            @RequestPart("data") JsonNode formData,
            @RequestPart(value = "coverImagePath", required = false) MultipartFile coverImage,
            @RequestPart(value = "aadhaarPath", required = false) MultipartFile aadhaar,
            @RequestPart(value = "panPath", required = false) MultipartFile pan,
            @RequestPart(value = "medicalReportPath", required = false) MultipartFile medicalReport,
            @RequestHeader("Authorization") String token) {

        try {
            CampaignDTO.Builder campaignDTO = CampaignDTO.newBuilder();
            JsonFormat.parser().merge(formData.toString(), campaignDTO);

            // Handle file uploads
            String aadhaarPath = fileHandler.processFileUpload(aadhaar, "aadhaar");
            String panPath = fileHandler.processFileUpload(pan, "pan");
            String medicalReportPath = fileHandler.processFileUpload(medicalReport, "report");
            String coverImagePath = fileHandler.processFileUpload(coverImage , "coverImagePath");

            // Set file paths
            campaignDTO.setAadhaarPath(aadhaarPath);
            campaignDTO.setPanPath(panPath);
            campaignDTO.setMedicalReportPath(medicalReportPath);
            campaignDTO.setCoverImagePath(coverImagePath);

            // Set userId and timestamps
            campaignDTO.setUserId(userId);
            String now = LocalDateTime.now().toString();
            campaignDTO.setCreatedAt(now);
            campaignDTO.setUpdatedAt(now);

            Long campaignId = campaignHandler.createCampaign(campaignDTO.build());

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Campaign created successfully");
            response.put("campaignId", campaignId);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("Error while creating campaign", e);
            return ResponseEntity.internalServerError()
                    .body("Error creating campaign: " + e.getMessage());
        }
    }

    @DeleteMapping("/{campaignId}")
    public ResponseEntity<?> deleteCampaign(
            @PathVariable Long campaignId,
            @RequestHeader("Authorization") String token) {
        try {
            // Delete the campaign
            campaignHandler.deleteCampaign(campaignId);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Campaign deleted successfully");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error while deleting campaign", e);
            return ResponseEntity.internalServerError()
                    .body("Error deleting campaign: " + e.getMessage());
        }
    }

    @GetMapping("/public/get_top_campaigns")
    public ResponseEntity<?> getTopCampaigns() {
        try {
            List<CampaignDTO> campaignList = campaignHandler.getTopCampaigns(LIMIT);

            List<Map<String, Object>> jsonCampaigns = new ArrayList<>();
            ObjectMapper objectMapper = new ObjectMapper();

            for (CampaignDTO campaign : campaignList) {
                String jsonString = JsonFormat.printer().includingDefaultValueFields().print(campaign);
                Map<String, Object> campaignMap = objectMapper.readValue(jsonString, Map.class);
                jsonCampaigns.add(campaignMap);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("count", jsonCampaigns.size());
            response.put("campaigns", jsonCampaigns);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error while fetching campaigns", e);
            return ResponseEntity.internalServerError()
                    .body("Error fetching campaigns: " + e.getMessage());
        }
    }

    @GetMapping("/public/{campaignUrl}")
    public ResponseEntity<?> getPublicCampaignsForUser(@PathVariable String campaignUrl) {
        try {
            CampaignDTO campaign = campaignHandler.getCampaignByCampaignUrl(campaignUrl);


            String jsonResponse = JsonFormat.printer().print(campaign);
            return ResponseEntity.ok()
                    .header("Content-Type", "application/json")
                    .body(jsonResponse);

        } catch (Exception e) {
            logger.error("Error while fetching campaigns", e);
            return ResponseEntity.internalServerError()
                    .body("Error fetching campaigns: " + e.getMessage());
        }
    }
    @GetMapping("/{userId}")
    public ResponseEntity<?> getAllCampaignsForUser(@PathVariable Long userId,
                                                    @RequestHeader("Authorization") String token) {
        try {
            List<CampaignDTO> campaignList = campaignHandler.getCampaignsByUserId(userId);

            List<Map<String, Object>> jsonCampaigns = new ArrayList<>();
            ObjectMapper objectMapper = new ObjectMapper();

            for (CampaignDTO campaign : campaignList) {
                String jsonString = JsonFormat.printer().includingDefaultValueFields().print(campaign);
                Map<String, Object> campaignMap = objectMapper.readValue(jsonString, Map.class);
                jsonCampaigns.add(campaignMap);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("count", jsonCampaigns.size());
            response.put("campaigns", jsonCampaigns);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error while fetching campaigns", e);
            return ResponseEntity.internalServerError()
                    .body("Error fetching campaigns: " + e.getMessage());
        }
    }
}
