package com.sahayak.gateway.service;

import com.sahayak.gateway.client.GeminiAIApiClient;
import com.sahayak.gateway.client.OpenAIApiClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CampaignStoryService {

    @Autowired
    private OpenAIApiClient openAIApiClient;
    @Autowired
    private GeminiAIApiClient geminiAIApiClient;

//    public String generateStory(String patientName, String disease, String description) {
//        String prompt = String.format(
//                "Create an engaging, emotional, and supportive story about %s, a brave patient battling %s. Include the provided description: \"%s\" and conclude with a message of hope and a call to support.",
//                patientName, disease, description
//        );
//
//        return openAIApiClient.generateText(prompt);
//    }

    public String generateStory(String patientName, String disease, String description) {
        String prompt = String.format(
                "Write a clear, authentic, and factually accurate campaign story in maximum 150 words for a crowdfunding platform. " +
                        "The story is about %s, a real patient currently fighting %s. " +
                        "Use the following patient-provided description to ensure all details are accurate and avoid adding any false information:\n\n" +
                        "\"%s\"\n\n" +
                        "Please focus only on:\n" +
                        "1. Explaining the patient’s health journey with %s.\n" +
                        "2. Describing why financial help is crucial (like medical bills, treatments, recovery costs).\n" +
                        "3. Ending with a genuine, heartfelt appeal for support and donations.\n\n" +
                        "Avoid adding any fictional or random information. Use a compassionate and respectful tone suitable for a crowdfunding platform. " +
                        "Keep it factual, direct, and centered on health and financial needs.",
                patientName, disease, description, disease
        );

        return geminiAIApiClient.generateText(prompt);
    }
}
