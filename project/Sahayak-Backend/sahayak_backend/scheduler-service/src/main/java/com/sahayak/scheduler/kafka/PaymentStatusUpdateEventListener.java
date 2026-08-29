//package com.sahayak.scheduler.kafka;
//
//import com.sahayak.scheduler.service.EmailNotificationService;
//import com.sahayak.store.entity.Donation;
//import com.sahayak.store.entity.User;
//import com.sahayak.store.repository.IDonationRepository;
//import com.sahayak.store.repository.IUserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.kafka.annotation.KafkaListener;
//import org.springframework.stereotype.Service;
//
//import java.util.Optional;
//
//@Service
//public class PaymentStatusUpdateEventListener {
//
//    private final EmailNotificationService emailNotificationService;
//    private final IDonationRepository donationRepository;
//    private final IUserRepository userRepository;
//
//    @Autowired
//    public PaymentStatusUpdateEventListener(EmailNotificationService emailNotificationService,
//                                            IDonationRepository donationRepository,
//                                        IUserRepository userRepository) {
//        this.emailNotificationService = emailNotificationService;
//        this.donationRepository = donationRepository;
//        this.userRepository = userRepository;
//    }
//
//    @KafkaListener(
//            topics = "payment-topic",
//            groupId = "scheduler-group",
//            containerFactory = "kafkaListenerContainerFactory"
//    )
//    public void handlePaymentStatusUpdate(String donationId) {
//        Long donationIdLong = Long.parseLong(donationId.replaceAll("\"", ""));
//        Donation donation = donationRepository.findById(donationIdLong).orElse(null);
//        assert donation != null;
//
//        String message = String.format(
//                "Hello, your payment for Patient '%s' has been successfully created!",
//                campaign.getPatientName()
//        );
//
//        emailNotificationService.sendAsyncNotification(user.get().getEmail(), message);
//    }
//}