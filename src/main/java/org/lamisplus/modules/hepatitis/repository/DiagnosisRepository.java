package org.lamisplus.modules.hepatitis.repository;

import org.lamisplus.modules.hepatitis.domain.entity.Diagnosis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiagnosisRepository extends JpaRepository<Diagnosis, Long> {
}
