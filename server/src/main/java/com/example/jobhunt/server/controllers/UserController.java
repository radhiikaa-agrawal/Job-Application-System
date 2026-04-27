package com.example.jobhunt.server.controllers;

import com.example.jobhunt.server.dto.LoginDTO;
import com.example.jobhunt.server.dto.UserDTO;
import com.example.jobhunt.server.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin()
@RequestMapping("/users")
@Validated
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping("/register")
    public ResponseEntity<UserDTO>registerUser(@RequestBody @Valid UserDTO userDTO) {
    userDTO=userService.registerUser(userDTO);
    return new ResponseEntity<>(userDTO, HttpStatus.CREATED);
    }
    @PostMapping("/login")
    public ResponseEntity<UserDTO>loginUser(@RequestBody @Valid LoginDTO loginDTO) {
        UserDTO userDTO=userService.loginUser(loginDTO);

        if (userDTO != null) {
            return new ResponseEntity<>(userDTO, HttpStatus.OK);  // Login successful
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);  // Invalid credentials
        }
    }

}
