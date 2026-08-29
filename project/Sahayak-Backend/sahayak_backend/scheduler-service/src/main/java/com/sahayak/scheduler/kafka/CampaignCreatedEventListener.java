package com.sahayak.scheduler.kafka;


import com.sahayak.scheduler.service.EmailNotificationService;
import com.sahayak.store.entity.Campaign;
import com.sahayak.store.entity.User;
import com.sahayak.store.repository.ICampaignRepository;
import com.sahayak.store.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CampaignCreatedEventListener {

    private final EmailNotificationService emailNotificationService;
    private final ICampaignRepository campaignRepository;
    private final IUserRepository userRepository;

    @Autowired
    public CampaignCreatedEventListener(EmailNotificationService emailNotificationService,
                                        ICampaignRepository campaignRepository,
                                        IUserRepository userRepository) {
        this.emailNotificationService = emailNotificationService;
        this.campaignRepository = campaignRepository;
        this.userRepository = userRepository;
    }

    @KafkaListener(
            topics = "campaign-created",
            groupId = "scheduler-group",
            containerFactory = "kafkaListenerContainerFactory"
    )
    public void handleCampaignCreated(String campaignId) {
        Long campaignIdLong = Long.parseLong(campaignId.replaceAll("\"", ""));
        Campaign campaign = campaignRepository.findById(campaignIdLong).orElse(null);
        assert campaign != null;
        Long userId = campaign.getUserId();
        Optional<User> user = userRepository.findById(userId);

        if (campaign == null) {
            return;
        }

        String message = String.format(
                "Hello, your campaign for Patient '%s' has been successfully created!",
                campaign.getPatientName()
        );

        emailNotificationService.sendAsyncNotification(user.get().getEmail(), message);
    }
}