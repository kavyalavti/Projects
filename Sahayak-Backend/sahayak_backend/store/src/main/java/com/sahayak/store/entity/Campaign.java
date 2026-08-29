package com.sahayak.store.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "campaigns")
public class Campaign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private String patientName;

    private String title;

    private String relation;

    private Integer patientAge;

    private String patientAddress;

    private String state;

    private String city;

    private String disease;

    private String hospital;

    private String doctor;

    private Integer duration;

    private Double totalMedicalCost;

    private Double totalAmount;

    private String endDate;

    private String aadhaarPath;

    private String panPath;

    private String medicalReportPath;

    @Lob
    private String description;

    private String coverImagePath;

    private Integer status;

    @Column(nullable = false, unique = true)
    private String campaignUrl;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Lob
    private String story;
    // Constructors
    public Campaign() {
    }

    public Campaign(Long id, Long userId, String patientName, String title, String relation, Integer patientAge,
                    String patientAddress, String state, String city, String disease, String hospital,
                    String doctor, Integer duration, Double totalMedicalCost,
                    Double totalAmount, String endDate, String aadhaarPath, String panPath,
                    String medicalReportPath, String description, String coverImagePath,
                    Integer status, String campaignUrl, LocalDateTime createdAt, LocalDateTime updatedAt, String story) {
        this.id = id;
        this.userId = userId;
        this.patientName = patientName;
        this.title = title;
        this.relation = relation;
        this.patientAge = patientAge;
        this.patientAddress = patientAddress;
        this.state = state;
        this.city = city;
        this.disease = disease;
        this.hospital = hospital;
        this.doctor = doctor;
        this.duration = duration;
        this.totalMedicalCost = totalMedicalCost;
        this.totalAmount = totalAmount;
        this.endDate = endDate;
        this.aadhaarPath = aadhaarPath;
        this.panPath = panPath;
        this.medicalReportPath = medicalReportPath;
        this.description = description;
        this.coverImagePath = coverImagePath;
        this.status = status;
        this.campaignUrl = campaignUrl;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.story = story;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public String getRelation() {
        return relation;
    }

    public void setRelation(String relation) {
        this.relation = relation;
    }

    public Integer getPatientAge() {
        return patientAge;
    }

    public void setPatientAge(Integer patientAge) {
        this.patientAge = patientAge;
    }

    public String getPatientAddress() {
        return patientAddress;
    }

    public void setPatientAddress(String patientAddress) {
        this.patientAddress = patientAddress;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getDisease() {
        return disease;
    }

    public void setDisease(String disease) {
        this.disease = disease;
    }

    public String getHospital() {
        return hospital;
    }

    public void setHospital(String hospital) {
        this.hospital = hospital;
    }

    public String getDoctor() {
        return doctor;
    }

    public void setDoctor(String doctor) {
        this.doctor = doctor;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public Double getTotalMedicalCost() {
        return totalMedicalCost;
    }

    public void setTotalMedicalCost(Double totalMedicalCost) {
        this.totalMedicalCost = totalMedicalCost;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getAadhaarPath() {
        return aadhaarPath;
    }

    public void setAadhaarPath(String aadhaarPath) {
        this.aadhaarPath = aadhaarPath;
    }

    public String getPanPath() {
        return panPath;
    }

    public void setPanPath(String panPath) {
        this.panPath = panPath;
    }

    public String getMedicalReportPath() {
        return medicalReportPath;
    }

    public void setMedicalReportPath(String medicalReportPath) {
        this.medicalReportPath = medicalReportPath;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getCampaignUrl() {
        return campaignUrl;
    }

    public void setCampaignUrl(String campaignUrl) {
        this.campaignUrl = campaignUrl;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCoverImagePath() {
        return coverImagePath;
    }

    public void setCoverImagePath(String coverImagePath) {
        this.coverImagePath = coverImagePath;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getStory() {return story;}

    public void setStory(String story) {this.story = story;}



}
