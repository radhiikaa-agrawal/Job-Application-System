package com.example.jobhunt.server.services;

import com.example.jobhunt.server.dto.AccountType;
import com.example.jobhunt.server.dto.LoginDTO;
import com.example.jobhunt.server.dto.UserDTO;
import com.example.jobhunt.server.entity.User;
import com.example.jobhunt.server.repositories.UserRepository;
import com.example.jobhunt.server.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public UserDTO registerUser(UserDTO userDTO) {
        // Check if user already exists
        User existingUser = userRepository.findByEmail(userDTO.getEmail());
        if (existingUser != null) {
            throw new RuntimeException("User already exists with email: " + userDTO.getEmail());
        }

        // Create new user
        User user = new User();
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setAccountType(userDTO.getAccountType() != null ? userDTO.getAccountType() : AccountType.APPLICANT);
        user.setGender(userDTO.getGender());

        User savedUser = userRepository.save(user);
        return savedUser.toDTO();
    }

    @Override
    public UserDTO loginUser(LoginDTO loginDTO) {
        User user = userRepository.findByEmail(loginDTO.getEmail());
        if (user == null) {
            throw new RuntimeException("User not found with email: " + loginDTO.getEmail());
        }

        if (!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        UserDTO userDTO = user.toDTO();
        userDTO.setJwtToken(jwtUtil.generateToken(user.getEmail()));
        return userDTO;
    }

    @Override
    public UserDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found with email: " + email);
        }
        return user.toDTO();
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }
}
