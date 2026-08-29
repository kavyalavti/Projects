package com.sahayak.store.service;

import com.sahayak.store.entity.User;
import com.sahayak.store.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserStorageService {

    @Autowired
    private IUserRepository userRepository;

    public long save(User user) {
        return userRepository.save(user).getUserId();
    }

    public User getUser(Long id) {
        return userRepository.getReferenceById(id);
    }
}
