package com.sahayak.gateway.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.protobuf.util.JsonFormat;
import com.sahayak.gateway.handler.NotificationHandler;
import com.sahayak.proto.model.entity.NotificationDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationController {

    private final NotificationHandler notificationHandler;
    private final ObjectMapper objectMapper;
    private final Logger logger = LoggerFactory.getLogger(NotificationController.class.getName());

    @Autowired
    public NotificationController(NotificationHandler notificationHandler, ObjectMapper objectMapper) {
        this.notificationHandler = notificationHandler;
        this.objectMapper = objectMapper;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserNotifications(@PathVariable Long userId) {
        try {
            List<NotificationDTO> notifications = notificationHandler.getNotificationsByUserId(userId);

            List<Map<String, Object>> jsonNotifications = new ArrayList<>();
            for (NotificationDTO notification : notifications) {
                String jsonString = JsonFormat.printer().includingDefaultValueFields().print(notification);
                Map<String, Object> notificationMap = objectMapper.readValue(jsonString, Map.class);
                jsonNotifications.add(notificationMap);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("count", jsonNotifications.size());
            response.put("notifications", jsonNotifications);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error while fetching notifications", e);
            return ResponseEntity.internalServerError()
                    .body("Error fetching notifications: " + e.getMessage());
        }
    }

    @PutMapping("/mark-read/{userId}")
    public ResponseEntity<?> markAllAsRead(@PathVariable Long userId) {
        try {
            notificationHandler.markAllNotificationsAsRead(userId);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "All notifications marked as read");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error marking notifications as read", e);
            return ResponseEntity.internalServerError()
                    .body("Error marking notifications as read: " + e.getMessage());
        }
    }

    @GetMapping("unread-count/{userId}")
    public ResponseEntity<?> getUnReadNotificationCount(@PathVariable Long userId) {
        try {
            Long unReadNotificationCount = notificationHandler.getUnReadNotificationCount(userId);

            Map<String, Object> response = new HashMap<>();
            response.put("count", unReadNotificationCount);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error while fetching unread notification count", e);
            return ResponseEntity.internalServerError()
                .body("Error fetching unread notification count: " + e.getMessage());
        }
    }


    @PostMapping("/")
    public ResponseEntity<?> createNotification(@RequestBody JsonNode jsonNode) {
        try {
            NotificationDTO.Builder notificationDTO = NotificationDTO.newBuilder();
            JsonFormat.parser().merge(notificationDTO.toString(), notificationDTO);
            NotificationDTO updated_notification = notificationHandler.createNotification(notificationDTO.build());

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Notification created successfully");
            response.put("notificationId", updated_notification.getId());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error while creating notification", e);
            return ResponseEntity.internalServerError()
                    .body("Error creating notification: " + e.getMessage());
        }
    }

    @DeleteMapping("/{notificationId}")
    public ResponseEntity<?> deleteNotification(@PathVariable Long notificationId) {
        try {
            boolean deleted = notificationHandler.deleteNotification(notificationId);
            if (deleted) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Notification deleted successfully");
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            logger.error("Error deleting notification", e);
            return ResponseEntity.internalServerError()
                    .body("Error deleting notification: " + e.getMessage());
        }
    }
}
