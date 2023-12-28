package com.example.coursaty.Repository;

import com.example.coursaty.Entitiy.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Enrollment.EnrollmentId> {
}
