package org.lamisplus.modules.hepatitis.repository;

import org.lamisplus.modules.hepatitis.domain.entity.Diagnosis;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiagonsisRepository extends JpaRepository<Diagnosis, Integer> {
}
