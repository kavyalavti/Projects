package com.sahayak.payment.handler;

import com.sahayak.payment.mapper.PaymentMapper;
import com.sahayak.proto.model.entity.CampaignDTO;
import com.sahayak.proto.model.payment.DonationDTO;
import com.sahayak.proto.model.payment.PaymentStatus;
import com.sahayak.store.entity.Campaign;
import com.sahayak.store.entity.Donation;
import com.sahayak.store.repository.IDonationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LiveDonationHandler {
    @Autowired
    private IDonationRepository donationRepository;

    @Autowired
    public LiveDonationHandler(IDonationRepository donationRepository) {
        this.donationRepository = donationRepository;
    }

    // Method to handle live donation updates
    public List<DonationDTO> getLiveDonations(Long campaignId) {
        List<Donation> donations = donationRepository.findByCampaignId(campaignId, PaymentStatus.STATUS_SUCCESS.getNumber());

        return donations.stream()
                .map(donation -> PaymentMapper.toDto(donation).toBuilder().build())
                .collect(Collectors.toList());
    }


}
