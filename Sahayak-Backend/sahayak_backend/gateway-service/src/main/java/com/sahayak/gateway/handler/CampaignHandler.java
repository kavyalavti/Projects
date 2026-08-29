package com.sahayak.gateway.handler;

import com.sahayak.gateway.kafka.campaign.CampaignCreatedEventProducer;
import com.sahayak.gateway.mapper.CampaignMapper;
import com.sahayak.gateway.service.AmountRaisedService;
import com.sahayak.gateway.service.CampaignStoryService;
import com.sahayak.proto.model.entity.CampaignDTO;
import com.sahayak.proto.model.entity.CampaignStatus;
import com.sahayak.store.entity.Campaign;
import com.sahayak.store.repository.ICampaignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CampaignHandler {


    private final ICampaignRepository campaignRepository;
    private final CampaignCreatedEventProducer campaignCreatedEventProducer;
    private final AmountRaisedService amountRaisedService;
    private final CampaignStoryService campaignStoryService;


    @Autowired
    public CampaignHandler(
            ICampaignRepository campaignRepository,
            AmountRaisedService amountRaisedService,
            CampaignCreatedEventProducer campaignCreatedEventProducer,
            CampaignStoryService campaignStoryService) {
        this.campaignRepository = campaignRepository;
        this.amountRaisedService = amountRaisedService;
        this.campaignCreatedEventProducer = campaignCreatedEventProducer;
        this.campaignStoryService = campaignStoryService;
    }

    public Long deleteCampaign(Long id) {
        if (!campaignRepository.existsById(id)) {
            throw new RuntimeException("Campaign not found");
        }
        Campaign campaign = campaignRepository.getReferenceById(id);
        campaignRepository.delete(campaign);
        return id;
    }

    public List<CampaignDTO> getTopCampaigns(int limit) {
        List<Campaign> campaigns = campaignRepository
                .findByStatus(CampaignStatus.ACTIVE_VALUE, PageRequest.of(0, limit));

        return campaigns.stream()
                .map(campaign -> {
                    Double amountRaised = amountRaisedService.getAmountRaised(campaign.getId());
                    CampaignDTO.Builder dto = CampaignMapper.toDto(campaign).toBuilder();
                    dto.setAmountRaised(amountRaised);
                    return dto.build();
                })
                .collect(Collectors.toList());
    }

    public Long createCampaign(CampaignDTO campaignDTO) {
        Campaign campaign = CampaignMapper.toEntity(campaignDTO);
        String customUrl = generateCustomCampaignUrl(campaignDTO.getPatientName(), campaignDTO.getDisease());
        campaign.setCampaignUrl(customUrl);
        campaign.setStatus(CampaignStatus.UNDER_VERIFICATION.getNumber());
        String story = campaignStoryService.generateStory(
                campaignDTO.getPatientName(),
                campaignDTO.getDisease(),
                campaignDTO.getDescription() // assuming description is part of campaignDTO
        );
        campaign.setStory(story);
        Campaign savedCampaign = campaignRepository.save(campaign);

        campaignCreatedEventProducer.sendEvent(String.valueOf(savedCampaign.getId()));
        return savedCampaign.getId();
    }

    private String generateCustomCampaignUrl(String patientName, String disease) {
        String baseSlug = String.format(
                "help-%s-fight-%s",
                sanitize(patientName),
                sanitize(disease)
        );

        int maxRetries = 10;
        for (int i = 0; i < maxRetries; i++) {
            String randomSuffix = UUID.randomUUID().toString().replace("-", "").substring(0, 6);
            String fullSlug = baseSlug + "-" + randomSuffix;
            if (!campaignRepository.existsByCampaignUrl(fullSlug)) {
                return fullSlug;
            }
        }
        throw new IllegalStateException("Failed to generate unique campaign URL after " + maxRetries + " attempts.");
    }

    private String sanitize(String input) {
        return input == null ? "unknown" : input.trim().toLowerCase().replaceAll("[^a-z0-9]+", "-");
    }

    public CampaignDTO getCampaignByCampaignUrl(String url) {
        Campaign campaign = campaignRepository.findByCampaignUrl(url);
        Double amountRaised = amountRaisedService.getAmountRaised(campaign.getId());
        CampaignDTO.Builder dto = CampaignMapper.toDto(campaign).toBuilder();
        dto.setAmountRaised(amountRaised);
        return dto.build();
    }

    public List<CampaignDTO> getCampaignsByUserId(Long userId) {
        List<Campaign> campaigns = campaignRepository.findByUserId(userId);
        return campaigns.stream()
                .map(campaign -> {
                    Double amountRaised = amountRaisedService.getAmountRaised(campaign.getId());
                    CampaignDTO.Builder dto = CampaignMapper.toDto(campaign).toBuilder();
                    dto.setAmountRaised(amountRaised);
                    return dto.build();
                })
                .collect(Collectors.toList());
    }
}
