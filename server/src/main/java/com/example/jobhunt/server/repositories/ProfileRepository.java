package com.example.jobhunt.server.repositories;

import com.example.jobhunt.server.entity.Profile;
import com.example.jobhunt.server.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Profile findByEmail(String email);
    Profile findByUser(User user);
    Optional<Profile> findByUserId(Long userId);
}
