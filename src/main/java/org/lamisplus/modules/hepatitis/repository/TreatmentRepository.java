package org.lamisplus.modules.hepatitis.repository;

import org.lamisplus.modules.hepatitis.domain.entity.Enrollment;
import org.lamisplus.modules.hepatitis.domain.entity.Treatment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface TreatmentRepository extends JpaRepository<Treatment, Long> {
    Optional<Treatment> findOneTreatmentByEnrollmentId(UUID uuid);
}
