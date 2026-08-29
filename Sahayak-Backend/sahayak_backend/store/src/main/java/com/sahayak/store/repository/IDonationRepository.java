package com.sahayak.store.repository;


import com.sahayak.store.entity.Donation;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IDonationRepository extends JpaRepository<Donation, Long> {

    @Modifying
    @Transactional
    @Query("UPDATE Donation d SET d.status = :status WHERE d.id = :donationId")
    void updateDonationStatus(Long donationId, int status);

    @Query("SELECT SUM(d.amountInr) FROM Donation d WHERE d.campaignId = :campaignId AND d.status = :status")
    Double successfullPaymentSumInrByCampaignId(Long campaignId, Integer status);

    @Query("SELECT d FROM Donation d WHERE d.campaignId = :campaignId AND d.status = :status")
    List<Donation> findByCampaignId(Long campaignId, Integer status);
}

