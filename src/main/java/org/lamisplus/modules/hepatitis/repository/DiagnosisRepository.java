package org.lamisplus.modules.hepatitis.repository;


import org.lamisplus.modules.hepatitis.domain.entity.HepatitisDiagnosis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiagnosisRepository extends JpaRepository<HepatitisDiagnosis, Long> {
}
