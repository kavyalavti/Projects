package com.sahayak.store.repository;

import com.sahayak.store.entity.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Pageable;
import java.util.List;

@Repository
public interface ICampaignRepository extends JpaRepository<Campaign, Long> {
    List<Campaign> findByUserId(Long userId);
    boolean existsByCampaignUrl(String campaignUrl);
    Campaign findByCampaignUrl(String campaignUrl);
    List<Campaign> findByStatus(int status, Pageable pageable);

}
