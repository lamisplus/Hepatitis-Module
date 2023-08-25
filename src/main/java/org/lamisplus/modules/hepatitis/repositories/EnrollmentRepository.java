package org.lamisplus.modules.hepatitis.repositories;

import org.lamisplus.modules.hepatitis.domain.entities.Enrollment;
import org.lamisplus.modules.hepatitis.domain.entities.Enrollments;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnrollmentRepository extends JpaRepository<Enrollment,Long> {

}
