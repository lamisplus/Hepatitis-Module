package org.lamisplus.modules.hepatitis.repository;

import org.lamisplus.modules.hepatitis.domain.entity.Treatment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TreatmentRepository extends JpaRepository<Treatment, Long> {

}
