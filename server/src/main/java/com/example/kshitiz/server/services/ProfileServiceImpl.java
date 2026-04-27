package com.example.kshitiz.server.services;

import com.example.kshitiz.server.entity.Experience;
import com.example.kshitiz.server.entity.Profile;
import com.example.kshitiz.server.repositories.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfileServiceImpl implements ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    @Override
    public Profile createProfile(Profile profile) {
        if (profile.getExperiences() != null) {
            for (Experience experience : profile.getExperiences()) {
                experience.setProfile(profile);
            }
        }
        return profileRepository.save(profile);
    }

    @Override
    public Profile updateProfile(Profile profile) {
        Profile existingProfile = profileRepository.findById(profile.getId())
                .orElseThrow(() -> new RuntimeException("Profile not found with id: " + profile.getId()));
        
        // Update fields
        existingProfile.setJobTitle(profile.getJobTitle());
        existingProfile.setCompany(profile.getCompany());
        existingProfile.setLocation(profile.getLocation());
        existingProfile.setAbout(profile.getAbout());
        existingProfile.setSkills(profile.getSkills());
        
        // Update experiences
        if (profile.getExperiences() != null) {
            existingProfile.getExperiences().clear();
            for (Experience experience : profile.getExperiences()) {
                experience.setProfile(existingProfile);
                existingProfile.getExperiences().add(experience);
            }
        }
        
        return profileRepository.save(existingProfile);
    }

    @Override
    public Profile getProfile(Long id) {
        return profileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Profile not found with id: " + id));
    }

    @Override
    public Profile getProfileByUserId(Long userId) {
        return profileRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found for user id: " + userId));
    }

    @Override
    public void deleteProfile(Long id) {
        Profile profile = profileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Profile not found with id: " + id));
        profileRepository.delete(profile);
    }
}
