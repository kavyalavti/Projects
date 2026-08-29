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
public class OpenAIApiClient {

    @Value("${openai.api-base-url-chat-completion}")
    private String ENDPOINT;

    @Value("${openai.api-key}")
    private String OPENAI_API_KEY;


    public String generateText(String prompt) {
        try {
            HttpClient client = HttpClient.newHttpClient();
            String requestBody = String.format(
                    "{ \"model\": \"gpt-4o\", \"messages\": [{ \"role\": \"user\", \"content\": \"%s\" }], \"temperature\": 0.7 }",
                    prompt.replace("\"", "\\\"")
            );

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(ENDPOINT))
                    .header("Content-Type", "application/json")
                    .header("Authorization", "Bearer " + OPENAI_API_KEY)
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                    .build();

            int retries = 0;
            int maxRetries = 3;
            long delayMillis = 1000;

            while (retries < maxRetries) {
                HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
                if (response.statusCode() == 429) {
                    System.out.println("Received 429: Too Many Requests. Retrying in " + delayMillis + " ms.");
                    Thread.sleep(delayMillis);
                    delayMillis *= 2; // exponential backoff
                    retries++;
                } else if (response.statusCode() >= 200 && response.statusCode() < 300) {
                    // Success!
                    ObjectMapper mapper = new ObjectMapper();
                    JsonNode jsonNode = mapper.readTree(response.body());
                    String content = jsonNode
                            .path("choices").get(0)
                            .path("message").path("content")
                            .asText();
                    return content.trim();
                } else {
                    // Other error
                    System.out.println("Error: " + response.body());
                    break;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "Story generation failed. Please try again.";
    }

}
