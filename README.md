# JobHunt - Full Stack Job Application System

Developed by **Radhika Agrawal**

A comprehensive Job Application System where job seekers can easily browse and apply for job postings, and employers can post job and internship opportunities with detailed requirements and descriptions.

## 🚀 Technologies Used

### Frontend
- **React.js**: For building the interactive user interface.
- **Tailwind CSS**: For modern and responsive styling.
- **Redux Toolkit**: For efficient state management.

### Backend
- **Spring Boot**: For building the robust server-side application.
- **PostgreSQL**: As the primary database to store user, job, and application data.

## 🛠️ Prerequisites
- Node.js (v14 or higher)
- Java 17 or higher
- Maven
- PostgreSQL Database

## ⚙️ Getting Started

### 1. Frontend Setup
```bash
cd client
npm install
npm run dev
```

### 2. Backend Setup
```bash
cd server
mvn clean install
mvn spring-boot:run
```

### 3. Database Configuration
Open `src/main/resources/application.properties` in the server directory and configure your PostgreSQL database:

```properties
spring.application.name=server
spring.datasource.url=jdbc:postgresql://localhost:5432/jobhunt_db
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
```

## 📋 Features
- **User Authentication**: Secure login and registration for Candidates and Recruiters.
- **Job Postings**: Recruiters can create, update, and delete job listings.
- **Job Applications**: Candidates can browse jobs and apply with a single click.
- **Profile Management**: Users can update their profiles and view application status.
- **Responsive Design**: Fully optimized for mobile and desktop screens.

---
© 2026 Radhika Agrawal. All rights reserved.
