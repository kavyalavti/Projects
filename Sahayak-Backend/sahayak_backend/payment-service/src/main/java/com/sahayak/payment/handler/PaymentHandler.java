package com.sahayak.payment.handler;

import com.sahayak.payment.client.PaymentGatewayClient;
import com.sahayak.payment.factory.PaymentGatewayClientFactory;
import com.sahayak.payment.kafka.PaymentRequestProducer;
import com.sahayak.payment.mapper.PaymentMapper;
import com.sahayak.proto.model.payment.PaymentInitiateRequest;
import com.sahayak.proto.model.payment.PaymentStatus;
import com.sahayak.store.entity.Campaign;
import com.sahayak.store.entity.Donation;
import com.sahayak.store.repository.ICampaignRepository;
import com.sahayak.store.repository.IDonationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;

@Service
public class PaymentHandler {

    @Autowired
    private IDonationRepository donationRepository;
    private ICampaignRepository campaignRepository;

    private final PaymentGatewayClientFactory factory;
    private final PaymentRequestProducer paymentRequestProducer;
    private final RestTemplate restTemplate;

    @Value("${service-communication-api-key}")
    private String serviceCommunicationApiKey;

    @Autowired
    public PaymentHandler(
            IDonationRepository donationRepository,
            PaymentGatewayClientFactory factory,
            PaymentRequestProducer paymentRequestProducer,
            RestTemplate restTemplate,
            ICampaignRepository campaignRepository) {
        this.donationRepository = donationRepository;
        this.campaignRepository = campaignRepository;
        this.factory = factory;
        this.paymentRequestProducer = paymentRequestProducer;
        this.restTemplate = restTemplate;
    }

    // TODO: Currency Conversion and other validations
    public String createPaymentOrder(String campaignUrl, PaymentInitiateRequest request, String idempotencyKey) {
        // Build the payment request with status and timestamp
        if(!campaignRepository.existsByCampaignUrl(campaignUrl)) {
            throw new RuntimeException("Campaign not found for URL: " + campaignUrl);
        }
        Campaign Campaign = campaignRepository.findByCampaignUrl(campaignUrl);
        Long campaignId = Campaign.getId();
        PaymentInitiateRequest.Builder paymentRequestBuilder = PaymentInitiateRequest.newBuilder(request);
        paymentRequestBuilder.setStatus(PaymentStatus.STATUS_PENDING);
        paymentRequestBuilder.setCreatedAt(String.valueOf(LocalDateTime.now()));
        paymentRequestBuilder.setAmountInRupees(request.getAmount());
        PaymentInitiateRequest paymentRequest = paymentRequestBuilder.build();

        // Save the donation to DB
        Donation donation = donationRepository.save(PaymentMapper.toDonation(campaignId, paymentRequest));

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Internal-Api-Key", serviceCommunicationApiKey); // Your secret API key
        HttpEntity<Void> entity = new HttpEntity<>(headers);

        restTemplate.postForObject(
                "http://localhost:8081/api/v1/gateway/cache/campaigns/" + campaignId + "/amountRaised/invalidate",
                entity,
                Void.class
        );

        // Get payment gateway client and create payment order
        PaymentGatewayClient client = factory.getClient(donation.getPaymentGateway());

        try {
            // Simulate delay for demonstration
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Thread was interrupted during delay", e);
        }

        // Create payment order and return the gateway URL
        String paymentGatewayUrl = client.createOrder(donation.getId(), paymentRequest);
        return paymentGatewayUrl;
    }

    public Double getAmountRaised(Long campaignId) {
        Double amountRaised = donationRepository.successfullPaymentSumInrByCampaignId(campaignId, PaymentStatus.STATUS_SUCCESS.getNumber());
        return amountRaised != null ? amountRaised : 0.0;
    }
}
