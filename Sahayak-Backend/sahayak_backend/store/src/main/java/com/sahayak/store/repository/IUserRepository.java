package com.sahayak.store.repository;

import com.sahayak.store.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IUserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email); // or findByEmail if you use email for login

    boolean existsByEmail(String email); // Optional, if you want to check for duplicates
}
