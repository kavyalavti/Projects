package com.sahayak.scheduler.service;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

public abstract class NotificationService {

    // Abstract method to be implemented by specific notification services (Email, SMS, etc.)
    public abstract void sendNotification(String recipient, String message);

    @Async  // Makes the notification sending asynchronous
    public void sendAsyncNotification(String recipient, String message) {
        sendNotification(recipient, message);
    }
}
