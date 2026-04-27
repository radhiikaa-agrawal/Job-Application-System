package com.example.kshitiz.server.services;

import com.example.kshitiz.server.dto.LoginDTO;
import com.example.kshitiz.server.dto.UserDTO;
import com.example.kshitiz.server.entity.User;

import java.util.Optional;

public interface UserService {
    UserDTO registerUser(UserDTO userDTO);
    UserDTO loginUser(LoginDTO loginDTO);
    UserDTO getUserByEmail(String email);
    User getUserById(Long id);
}
