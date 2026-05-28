package com.example.security.mapper;

import com.example.security.dto.RegisterRequest;
import com.example.security.dto.UserDto;
import com.example.security.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toDto(User user);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true) // Handle password encoding in service
    User toEntity(RegisterRequest registerRequest);
}
