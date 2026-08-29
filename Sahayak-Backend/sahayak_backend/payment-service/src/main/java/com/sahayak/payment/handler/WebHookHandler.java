package com.sahayak.payment.handler;

import com.sahayak.payment.client.PaymentGatewayClient;
import com.sahayak.payment.factory.PaymentGatewayClientFactory;
import com.sahayak.proto.model.payment.*;

import com.sahayak.store.entity.Donation;
import com.sahayak.store.repository.IDonationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class WebHookHandler {
    @Autowired
    private final IDonationRepository donationRepository;
    private final PaymentGatewayClientFactory factory;

    public WebHookHandler(IDonationRepository donationRepository, PaymentGatewayClientFactory factory) {
        // Initialize and inject dependency on donationRepository
        this.donationRepository = donationRepository;
        this.factory = factory;
    }

    /**
     * Processes the webhook event received from external systems.
     *
     * @param request the PaymentWebhookRequest object containing event data
     * @return PaymentWebhookResponse with status and details
     */
    public PaymentWebhookResponse processWebhook(PaymentWebhookRequest request) {
        // Log webhook event (optional)
        System.out.println("Received webhook event: " + request);
        Long donationId = request.getDonationId();
        Optional<Donation> donationOpt = donationRepository.findById(donationId);
        if(donationOpt.isEmpty()) {
            return PaymentWebhookResponse.newBuilder()
                    .setStatus("FAILURE")
                    .setMessage("Donation not found for ID: " + donationId)
                    .build();
        }
        Donation donation = donationOpt.get();
        PaymentGateway paymentGateway = PaymentGateway.forNumber(donation.getPaymentGateway());
        assert paymentGateway != null;
        PaymentGatewayClient client = factory.getClient(paymentGateway.getNumber());
        // TODO: Add actual business logic here to:
        // - Validate webhook signature (if needed)
        // - Update payment status in your DB
        // - Trigger downstream actions (like sending email notifications)
        // - Log event for analytics
        if(client.validateTransactionID(donation.getTransactionId(),request.getTransactionId())) {
            // Update donation status based on webhook event
            donation.setStatus(PaymentStatus.valueOf(request.getStatus().toUpperCase()).getNumber());
            donation.setPaidAt(LocalDateTime.parse(request.getPaymentTime()));
            donation.setPaymentMethod(PaymentMethod.valueOf(request.getPaymentMethod()).getNumber());
            donationRepository.save(donation);

        } else {
            // Handle invalid transaction ID case
            return PaymentWebhookResponse.newBuilder()
                    .setStatus("FAILURE")
                    .setMessage("Invalid transaction ID.")
                    .build();
        }

        // For demonstration, let's assume webhook is always successful
        return PaymentWebhookResponse.newBuilder()
                .setStatus("SUCCESS")
                .setMessage("Webhook processed successfully.")
                .build();
    }
}
