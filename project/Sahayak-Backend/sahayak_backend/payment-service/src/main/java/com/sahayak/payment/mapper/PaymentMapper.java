package com.sahayak.payment.mapper;

import com.sahayak.proto.model.payment.*;
import com.sahayak.store.entity.Donation;

import java.time.LocalDateTime;
import java.util.UUID;

public class PaymentMapper {

    public static Donation toDonation(Long campaignId, PaymentInitiateRequest req) {
        Donation d = new Donation();
        d.setCampaignId(campaignId);
        d.setAmount(req.getAmount());
        d.setStatus(req.getStatus().getNumber());
        d.setTransactionId(UUID.randomUUID().toString());
        d.setAmountInr(req.getAmount());
        d.setCurrency(req.getCurrency());
        d.setPaymentGateway(PaymentGateway.valueOf(req.getPaymentGateway().toUpperCase()).getNumber());
        d.setCreatedAt(LocalDateTime.now());
        return d;
    }

    public static PaymentInitiateResponse toPaymentInitResponse(Donation donation, String pgUrl, LocalDateTime expiresTime, String signature) {
        return PaymentInitiateResponse.newBuilder()
                .setDonationId(donation.getId())
                .setAmount(donation.getAmount())
                .setCurrency(donation.getCurrency())
                .setPaymentGatewayUrl(pgUrl)
                .setExpiresTime(String.valueOf(expiresTime))
                .setSignature(signature)
                .build();
    }

    public static DonationDTO toDto(Donation donation) {
        if (donation == null) return null;
        DonationDTO.Builder dtoBuilder = DonationDTO.newBuilder();
        if(donation.getId() != null) dtoBuilder.setDonationId(donation.getId());
        if(donation.getCampaignId() != null) dtoBuilder.setCampaignId(donation.getCampaignId());
        if(donation.getUserId() != null) dtoBuilder.setUserId(donation.getUserId());
        if(donation.getAmount() != null) dtoBuilder.setAmount(donation.getAmount());
        if(donation.getCurrency() != null) dtoBuilder.setCurrency(donation.getCurrency());
        if(donation.getStatus() != null) dtoBuilder.setStatus(PaymentStatus.forNumber(donation.getStatus()));
        if(donation.getPaymentMethod() != null) dtoBuilder.setPaymentMethod(PaymentMethod.forNumber(donation.getPaymentMethod()));
        if(donation.getTransactionId() != null) dtoBuilder.setTransactionId(donation.getTransactionId());
        if(donation.getPaidAt() != null) dtoBuilder.setPaymentTime(String.valueOf(donation.getPaidAt()));
        return dtoBuilder.build();

    }

}
