package org.lamisplus.modules.hepatitis.repository;

import org.lamisplus.modules.hepatitis.domain.entity.HepatitisEnrollment;
import org.lamisplus.modules.hepatitis.domain.entity.HepatitisTreatment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TreatmentRepository extends JpaRepository<HepatitisTreatment, Long> {
    boolean existsByHepatitisEnrollment_Uuid(String uuid);
    boolean existsHepatitisTreatmentByHepatitisEnrollment_Uuid(String enrollmentUuid);

    HepatitisTreatment findHepatitisTreatmentByHepatitisEnrollmentAndArchived(HepatitisEnrollment enrollment, Integer archived);

    List<HepatitisTreatment> findHepatitisTreatmentsByHepatitisEnrollmentAndArchived(HepatitisEnrollment enrollment, Integer archived);

    HepatitisTreatment findHepatitisTreatmentsByIdAndArchived(Long id, Integer archived);
}
