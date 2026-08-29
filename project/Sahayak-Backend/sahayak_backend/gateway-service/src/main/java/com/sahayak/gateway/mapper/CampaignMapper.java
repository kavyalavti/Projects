package com.sahayak.gateway.mapper;

import com.sahayak.proto.model.entity.CampaignDTO;
import com.sahayak.proto.model.entity.CampaignStatus;
import com.sahayak.store.entity.Campaign;
import java.time.format.DateTimeFormatter;

import java.time.LocalDateTime;

public class CampaignMapper {
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

    public static Campaign toEntity(CampaignDTO dto) {
        if (dto == null) return null;

        Campaign campaign = new Campaign();

        if (dto.hasId()) campaign.setId(dto.getId());
        if (dto.hasUserId()) campaign.setUserId(dto.getUserId());
        if (dto.hasPatientName()) campaign.setPatientName(dto.getPatientName());
        if (dto.hasRelation()) campaign.setRelation(dto.getRelation());
        if (dto.hasPatientAge()) campaign.setPatientAge(dto.getPatientAge());
        if (dto.hasPatientAddress()) campaign.setPatientAddress(dto.getPatientAddress());
        if (dto.hasState()) campaign.setState(dto.getState());
        if (dto.hasCity()) campaign.setCity(dto.getCity());
        if (dto.hasDisease()) campaign.setDisease(dto.getDisease());
        if (dto.hasHospital()) campaign.setHospital(dto.getHospital());
        if (dto.hasDoctor()) campaign.setDoctor(dto.getDoctor());
        if (dto.hasDuration()) campaign.setDuration(dto.getDuration());
        if (dto.hasTotalMedicalCost()) campaign.setTotalMedicalCost(dto.getTotalMedicalCost());
        if (dto.hasTotalAmount()) campaign.setTotalAmount(dto.getTotalAmount());
        if (dto.hasEndDate()) campaign.setEndDate(dto.getEndDate());
        if (dto.hasAadhaarPath()) campaign.setAadhaarPath(dto.getAadhaarPath());
        if (dto.hasPanPath()) campaign.setPanPath(dto.getPanPath());
        if (dto.hasMedicalReportPath()) campaign.setMedicalReportPath(dto.getMedicalReportPath());
        if (dto.hasDescription()) campaign.setDescription(dto.getDescription());
        if (dto.hasStatus()) campaign.setStatus(dto.getStatus().getNumber());
        if (dto.hasCampaignUrl()) campaign.setCampaignUrl(dto.getCampaignUrl());
        if (dto.hasCoverImagePath()) campaign.setCoverImagePath(dto.getCoverImagePath());
        if (dto.hasCreatedAt()) campaign.setCreatedAt(LocalDateTime.parse(dto.getCreatedAt(), FORMATTER));
        if (dto.hasUpdatedAt()) campaign.setUpdatedAt(LocalDateTime.parse(dto.getUpdatedAt(), FORMATTER));
        if (dto.hasStory()) campaign.setStory(dto.getStory());

        return campaign;
    }

    public static CampaignDTO toDto(Campaign campaign) {
        if (campaign == null) return null;

        CampaignDTO.Builder dto = CampaignDTO.newBuilder();

        if (campaign.getId() != null) dto.setId(campaign.getId());
        if (campaign.getUserId() != null) dto.setUserId(campaign.getUserId());
        if (campaign.getPatientName() != null) dto.setPatientName(campaign.getPatientName());
        if (campaign.getRelation() != null) dto.setRelation(campaign.getRelation());
        if (campaign.getPatientAge() != null) dto.setPatientAge(campaign.getPatientAge());
        if (campaign.getPatientAddress() != null) dto.setPatientAddress(campaign.getPatientAddress());
        if (campaign.getState() != null) dto.setState(campaign.getState());
        if (campaign.getCity() != null) dto.setCity(campaign.getCity());
        if (campaign.getDisease() != null) dto.setDisease(campaign.getDisease());
        if (campaign.getHospital() != null) dto.setHospital(campaign.getHospital());
        if (campaign.getDoctor() != null) dto.setDoctor(campaign.getDoctor());
        if (campaign.getDuration() != null) dto.setDuration(campaign.getDuration());
        if (campaign.getTotalMedicalCost() != null) dto.setTotalMedicalCost(campaign.getTotalMedicalCost());
        if (campaign.getTotalAmount() != null) dto.setTotalAmount(campaign.getTotalAmount());
        if (campaign.getEndDate() != null) dto.setEndDate(campaign.getEndDate());
        if (campaign.getAadhaarPath() != null) dto.setAadhaarPath(campaign.getAadhaarPath());
        if (campaign.getPanPath() != null) dto.setPanPath(campaign.getPanPath());
        if (campaign.getMedicalReportPath() != null) dto.setMedicalReportPath(campaign.getMedicalReportPath());
        if (campaign.getDescription() != null) dto.setDescription(campaign.getDescription());
        if (campaign.getStatus() != null) dto.setStatus(CampaignStatus.forNumber(campaign.getStatus()));
        if (campaign.getCampaignUrl() != null) dto.setCampaignUrl(campaign.getCampaignUrl());
        if (campaign.getCoverImagePath() != null) dto.setCoverImagePath(campaign.getCoverImagePath());
        if (campaign.getCreatedAt() != null) dto.setCreatedAt(campaign.getCreatedAt().format(FORMATTER));
        if (campaign.getUpdatedAt() != null) dto.setUpdatedAt(campaign.getUpdatedAt().format(FORMATTER));
        if (campaign.getStory() != null) dto.setStory(campaign.getStory());

        return dto.build();
    }
}
