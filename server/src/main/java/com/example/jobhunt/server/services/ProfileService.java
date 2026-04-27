package com.example.jobhunt.server.services;

import com.example.jobhunt.server.entity.Profile;

public interface ProfileService {
    Profile createProfile(Profile profile);
    Profile updateProfile(Profile profile);
    Profile getProfile(Long id);
    Profile getProfileByUserId(Long userId);
    void deleteProfile(Long id);
}
