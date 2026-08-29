package com.sahayak.gateway.client;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class GeminiAIApiClient {

    @Value("${gemini.api-key}")
    private String geminiApiKey;

    @Value("${gemini.api-base-url}")
    private String geminiApiUrl;

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public String generateText(String prompt) {
        try {
            // Gemini API requires a different request body structure
            String requestBody = String.format(
                    "{ \"contents\": [{ \"role\": \"user\", \"parts\": [{ \"text\": \"%s\" }] }] }",
                    prompt.replace("\"", "\\\"")
            );

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(geminiApiUrl + "?key=" + geminiApiKey))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                    .build();

            int retries = 0;
            int maxRetries = 3;
            long delayMillis = 1000;

            HttpClient client = HttpClient.newHttpClient();

            while (retries < maxRetries) {
                HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
                int statusCode = response.statusCode();

                if (statusCode == 429) {
                    System.out.println("Received 429: Too Many Requests. Retrying in " + delayMillis + " ms.");
                    Thread.sleep(delayMillis);
                    delayMillis *= 2;
                    retries++;
                } else if (statusCode >= 200 && statusCode < 300) {
                    // Parse Gemini response
                    String responseBody = response.body();
                    JsonNode jsonNode = objectMapper.readTree(responseBody);

                    // Gemini's text response typically sits here:
                    String content = jsonNode
                            .path("candidates").get(0)
                            .path("content").path("parts").get(0)
                            .path("text")
                            .asText();

                    return content.trim();
                } else {
                    System.out.println("Error (" + statusCode + "): " + response.body());
                    break;
                }
            }
        } catch (Exception e) {
            System.err.println("Exception occurred while generating text: " + e.getMessage());
            e.printStackTrace();
        }
        return "Story generation failed. Please try again.";
    }
}
