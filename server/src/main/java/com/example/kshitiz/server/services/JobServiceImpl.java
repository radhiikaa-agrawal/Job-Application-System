package com.example.kshitiz.server.services;

import com.example.kshitiz.server.entity.Job;
import com.example.kshitiz.server.repositories.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobServiceImpl implements JobService {

    @Autowired
    private JobRepository jobRepository;

    @Override
    public Job createJob(Job job) {
        job.setPostedOn(LocalDate.now());
        if (job.getApplicants() == null) {
            job.setApplicants(0L);
        }
        return jobRepository.save(job);
    }

    @Override
    public Job updateJob(Job job) {
        Job existingJob = jobRepository.findById(job.getId());
        if (existingJob == null) {
            throw new RuntimeException("Job not found with id: " + job.getId());
        }
        return jobRepository.save(job);
    }

    @Override
    public Job getJob(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + id));
    }

    @Override
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    @Override
    public List<Job> getJobsByUser(Long userId) {
        return jobRepository.findByPostedById(userId);
    }

    @Override
    public void deleteJob(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + id));
        jobRepository.delete(job);
    }

    @Override
    public List<Job> searchJobs(String title, String location, String experience, String jobType) {
        List<Job> jobs = jobRepository.findAll();
        
        return jobs.stream()
                .filter(job -> (title == null || job.getJobTitle().toLowerCase().contains(title.toLowerCase())))
                .filter(job -> (location == null || job.getLocation().toLowerCase().contains(location.toLowerCase())))
                .filter(job -> (experience == null || job.getExperience().toLowerCase().contains(experience.toLowerCase())))
                .filter(job -> (jobType == null || job.getJobType().toLowerCase().contains(jobType.toLowerCase())))
                .collect(Collectors.toList());
    }
}
