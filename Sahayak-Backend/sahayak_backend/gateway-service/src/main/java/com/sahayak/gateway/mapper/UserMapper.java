package com.sahayak.gateway.mapper;

import com.sahayak.proto.model.entity.UserDTO;
import com.sahayak.store.entity.User;


public class UserMapper {

    public static UserDTO toDto(User user) {
        if (user == null) return null;
        UserDTO.Builder dto = UserDTO.newBuilder();
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setRole(user.getRole());
        dto.setId(user.getUserId());
        return dto.build();
    }

    public static User toEntity(UserDTO dto) {
        if (dto == null) return null;

        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPasswordHash(dto.getPassword());
        if(dto.hasId()) {
            user.setUserId(dto.getId());
        }
        user.setRole(dto.getRole());
        user.setPhoneNumber(dto.getPhoneNumber());
        return user;
    }
}