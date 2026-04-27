package com.example.jobhunt.server.controllers;

import com.example.jobhunt.server.dto.AccountType;
import com.example.jobhunt.server.dto.ApplicationDTO;
import com.example.jobhunt.server.entity.Applicant;
import com.example.jobhunt.server.entity.Job;
import com.example.jobhunt.server.entity.User;
import com.example.jobhunt.server.repositories.UserRepository;
import com.example.jobhunt.server.services.ApplicantService;
import com.example.jobhunt.server.utils.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/applicant")
public class ApplicantController {
    @Autowired
    private ApplicantService applicantService;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;
    @PostMapping("/applyJob/{jobId}")
    public ResponseEntity<ApplicationDTO> applyJob( @RequestHeader("Authorization") String token,@PathVariable Long jobId,@Valid @RequestBody ApplicationDTO applicationDTO) {

        String email=jwtUtil.extractEmail(token.replace("Bearer ", ""));

        Applicant applicant =applicationDTO.toEntity();


        User user=userRepository.findByEmail(email);
        if (user.getAccountType() != AccountType.APPLICANT) {
            throw new RuntimeException("Invalid token!");
        }
        if(!Objects.equals(user.getEmail(), applicant.getEmail())){
            throw new RuntimeException("User email doesn't match with applicant email");
        }

        Job job=new Job();
        job.setId(jobId);
        applicant.setJob(job);
        applicantService.applyJob(applicant);
        ApplicationDTO createdApplicationDTO =applicant.toDTO();
        return new ResponseEntity<>(createdApplicationDTO, HttpStatus.CREATED);
    }

    @GetMapping("/getAllApplicants/{jobId}")
    public ResponseEntity<List<ApplicationDTO>> getAllApplicants(@PathVariable Long jobId) {
    List<Applicant> applicants=applicantService.getApplicants(jobId);
    List<ApplicationDTO> applicationDTOS=applicants.stream()
            .map(Applicant:: toDTO).collect(Collectors.toList());
    return new ResponseEntity<>(applicationDTOS, HttpStatus.OK);
    }

    @GetMapping("/getApplications")
    public ResponseEntity<List<ApplicationDTO>> getApplications(@RequestHeader("Authorization") String token) {
        String email = jwtUtil.extractEmail(token.replace("Bearer ", ""));
        List<Applicant> applicants = applicantService.getApplicationsByEmail(email);
        List<ApplicationDTO> applicationDTOS = applicants.stream()
                .map(Applicant::toDTO).collect(Collectors.toList());
        return new ResponseEntity<>(applicationDTOS, HttpStatus.OK);
    }
}
