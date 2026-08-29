package com.sahayak.gateway.mapper;

import com.sahayak.proto.model.entity.NotificationDTO;
import com.sahayak.proto.model.entity.NotificationStatus;
import com.sahayak.proto.model.entity.NotificationType;
import com.sahayak.store.entity.Notification;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class NotificationMapper {
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

    public static Notification toEntity(NotificationDTO dto) {
        if (dto == null) return null;

        Notification notification = new Notification();

        if (dto.hasId()) notification.setId(dto.getId());
        if (dto.hasUserId()) notification.setUserId(dto.getUserId());
        if (dto.hasType()) notification.setType(dto.getType().getNumber());
        if (dto.hasMessage()) notification.setMessage(dto.getMessage());
        if (dto.hasStatus()) notification.setStatus(dto.getStatus().getNumber());
        if (dto.hasCreatedAt()) {
            notification.setCreatedAt(LocalDateTime.parse(dto.getCreatedAt(), FORMATTER));
        }

        return notification;
    }

    public static NotificationDTO toDto(Notification notification) {
        if (notification == null) return null;

        NotificationDTO.Builder dto = NotificationDTO.newBuilder();

        if (notification.getId() != null) dto.setId(notification.getId());
        if (notification.getUserId() != null) dto.setUserId(notification.getUserId());
        if (notification.getType() != null) dto.setType(NotificationType.forNumber(notification.getType()));
        if (notification.getMessage() != null) dto.setMessage(notification.getMessage());
        if (notification.getStatus() != null) dto.setStatus(NotificationStatus.forNumber(notification.getStatus()));
        if (notification.getCreatedAt() != null) {
            dto.setCreatedAt(notification.getCreatedAt().format(FORMATTER));
        }

        return dto.build();
    }

    public static List<NotificationDTO> toDtoList(List<Notification> notifications) {
        return notifications.stream()
                .map(NotificationMapper::toDto)
                .toList();
    }
}
