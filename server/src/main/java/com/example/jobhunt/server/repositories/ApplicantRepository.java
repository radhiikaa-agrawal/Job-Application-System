package com.example.jobhunt.server.repositories;

import com.example.jobhunt.server.entity.Applicant;
import com.example.jobhunt.server.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApplicantRepository extends JpaRepository<Applicant, Long> {
    List<Applicant> findByJob(Job job);
    Optional<Applicant> findByEmailAndJob(String email, Job job);
    List<Applicant> findByEmail(String email);
}
