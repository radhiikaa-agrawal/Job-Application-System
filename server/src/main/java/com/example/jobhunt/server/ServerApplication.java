package com.example.jobhunt.server;

import com.example.jobhunt.server.dto.AccountType;
import com.example.jobhunt.server.entity.Job;
import com.example.jobhunt.server.entity.User;
import com.example.jobhunt.server.repositories.JobRepository;
import com.example.jobhunt.server.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.Arrays;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	@Bean
	public CommandLineRunner seedData(UserRepository userRepository, JobRepository jobRepository, PasswordEncoder passwordEncoder) {
		return args -> {
			if (userRepository.count() == 0) {
				User user = new User();
				user.setName("Radhika Agrawal");
				user.setEmail("radhikaa0016@gmail.com");
				user.setPassword(passwordEncoder.encode("password123"));
				user.setAccountType(AccountType.APPLICANT);
				user.setGender("girl");
				userRepository.save(user);
				
				User employer = new User();
				employer.setName("Google HR");
				employer.setEmail("hr@google.com");
				employer.setPassword(passwordEncoder.encode("password123"));
				employer.setAccountType(AccountType.EMPLOYER);
				employer.setGender("boy");
				userRepository.save(employer);
				
				System.out.println("Seeded default users: radhikaa0016@gmail.com and hr@google.com");

				if (jobRepository.count() == 0) {
					Job job1 = new Job();
					job1.setJobTitle("Software Engineer");
					job1.setCompany("Google");
					job1.setExperience("Entry Level");
					job1.setJobType("Full Time");
					job1.setSalary("15-25 LPA");
					job1.setLocation("Bangalore");
					job1.setApplicants(12L);
					job1.setDescription("Exciting opportunity for a Software Engineer at Google.");
					job1.setPostedOn(LocalDate.now());
					job1.setPostedBy(employer);
					job1.setSkillsRequired(Arrays.asList("Java", "Spring Boot", "React"));
					jobRepository.save(job1);

					Job job2 = new Job();
					job2.setJobTitle("Frontend Developer");
					job2.setCompany("Amazon");
					job2.setExperience("Intermediate");
					job2.setJobType("Remote");
					job2.setSalary("20-30 LPA");
					job2.setLocation("Remote");
					job2.setApplicants(8L);
					job2.setDescription("Build the future of retail at Amazon.");
					job2.setPostedOn(LocalDate.now().minusDays(2));
					job2.setPostedBy(employer);
					job2.setSkillsRequired(Arrays.asList("React", "Tailwind CSS", "TypeScript"));
					jobRepository.save(job2);

					Job job3 = new Job();
					job3.setJobTitle("Data Scientist");
					job3.setCompany("Microsoft");
					job3.setExperience("Senior");
					job3.setJobType("Full Time");
					job3.setSalary("35-50 LPA");
					job3.setLocation("Hyderabad");
					job3.setApplicants(15L);
					job3.setDescription("Analyze big data and build AI models at Microsoft.");
					job3.setPostedOn(LocalDate.now().minusDays(5));
					job3.setPostedBy(employer);
					job3.setSkillsRequired(Arrays.asList("Python", "TensorFlow", "Pandas"));
					jobRepository.save(job3);

					Job job4 = new Job();
					job4.setJobTitle("Java Developer");
					job4.setCompany("Meta");
					job4.setExperience("Intermediate");
					job4.setJobType("Hybrid");
					job4.setSalary("25-40 LPA");
					job4.setLocation("Mumbai");
					job4.setApplicants(20L);
					job4.setDescription("Develop scalable Java services for Meta's infrastructure.");
					job4.setPostedOn(LocalDate.now().minusDays(1));
					job4.setPostedBy(employer);
					job4.setSkillsRequired(Arrays.asList("Java", "Spring Boot", "Microservices"));
					jobRepository.save(job4);

					Job job5 = new Job();
					job5.setJobTitle("Python Engineer");
					job5.setCompany("Netflix");
					job5.setExperience("Intermediate");
					job5.setJobType("Remote");
					job5.setSalary("30-45 LPA");
					job5.setLocation("Remote");
					job5.setApplicants(5L);
					job5.setDescription("Optimize streaming algorithms with Python at Netflix.");
					job5.setPostedOn(LocalDate.now().minusDays(10));
					job5.setPostedBy(employer);
					job5.setSkillsRequired(Arrays.asList("Python", "Django", "AWS"));
					jobRepository.save(job5);

					Job job6 = new Job();
					job6.setJobTitle("React Developer");
					job6.setCompany("Adobe");
					job6.setExperience("Entry Level");
					job6.setJobType("Full Time");
					job6.setSalary("12-20 LPA");
					job6.setLocation("Noida");
					job6.setApplicants(30L);
					job6.setDescription("Create amazing user interfaces for Adobe Creative Cloud.");
					job6.setPostedOn(LocalDate.now().minusDays(3));
					job6.setPostedBy(employer);
					job6.setSkillsRequired(Arrays.asList("React", "CSS", "Redux"));
					jobRepository.save(job6);

					System.out.println("Seeded initial jobs.");
				}
			}
		};
	}

}
