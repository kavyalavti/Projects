package com.sahayak.gateway.handler;

import com.sahayak.gateway.mapper.NotificationMapper;
import com.sahayak.proto.model.entity.NotificationDTO;
import com.sahayak.proto.model.entity.NotificationStatus;
import com.sahayak.store.entity.Notification;
import com.sahayak.store.repository.INotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationHandler {

    @Autowired
    private INotificationRepository notificationRepository;

    @Autowired
    public NotificationHandler(INotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public List<NotificationDTO> getNotificationsByUserId(Long userId) {
        List<Notification> notifications = notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
        return NotificationMapper.toDtoList(notifications);
    }

    public Long getUnReadNotificationCount(Long userId) {
        int unReadStatus = NotificationStatus.NOT_READ.getNumber();
        return notificationRepository.countByUserIdAndStatus(userId, unReadStatus);
    }

    public void markAllNotificationsAsRead(Long userId) {
        List<Notification> notifications = notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
        notifications.forEach(notification -> notification.setStatus(NotificationStatus.READ.getNumber()));
        notificationRepository.saveAll(notifications);
    }

    public NotificationDTO createNotification(NotificationDTO notificationDto) {
        Notification notification = notificationRepository.save(NotificationMapper.toEntity(notificationDto));
        return NotificationMapper.toDto(notification);
    }

    public boolean deleteNotification(Long notificationId) {
        if (notificationRepository.existsById(notificationId)) {
            notificationRepository.deleteById(notificationId);
            return true;
        }
        return false;
    }
}
