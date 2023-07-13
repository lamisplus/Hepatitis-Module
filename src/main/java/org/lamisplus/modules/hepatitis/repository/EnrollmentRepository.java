package org.lamisplus.modules.hepatitis.repository;

import org.lamisplus.modules.hepatitis.domain.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {
}
