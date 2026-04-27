package com.example.jobhunt.server.services;

import com.example.jobhunt.server.entity.Job;

import java.util.List;

public interface JobService {
    Job createJob(Job job);
    Job updateJob(Job job);
    Job getJob(Long id);
    List<Job> getAllJobs();
    List<Job> getJobsByUser(Long userId);
    void deleteJob(Long id);
    List<Job> searchJobs(String title, String location, String experience, String jobType);
}
