package com.example.kshitiz.server.services;

import com.example.kshitiz.server.entity.Profile;

public interface ProfileService {
    Profile createProfile(Profile profile);
    Profile updateProfile(Profile profile);
    Profile getProfile(Long id);
    Profile getProfileByUserId(Long userId);
    void deleteProfile(Long id);
}
