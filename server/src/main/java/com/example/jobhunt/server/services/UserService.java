package com.example.jobhunt.server.services;

import com.example.jobhunt.server.dto.LoginDTO;
import com.example.jobhunt.server.dto.UserDTO;
import com.example.jobhunt.server.entity.User;

import java.util.Optional;

public interface UserService {
    UserDTO registerUser(UserDTO userDTO);
    UserDTO loginUser(LoginDTO loginDTO);
    UserDTO getUserByEmail(String email);
    User getUserById(Long id);
}
