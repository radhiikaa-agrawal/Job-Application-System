package com.example.jobhunt.server.services;

import com.example.jobhunt.server.entity.Applicant;

import java.util.List;

public interface ApplicantService{
    public Applicant applyJob(Applicant applicant);
    public List<Applicant> getApplicants(Long jobId);
    public List<Applicant> getApplicationsByEmail(String email);
}
