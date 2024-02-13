package org.lamisplus.modules.hepatitis.repository;


import org.lamisplus.modules.hepatitis.domain.entity.HepatitisDiagnosis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiagnosisRepository extends JpaRepository<HepatitisDiagnosis, Long> {
    boolean existsByHepatitisEnrollment_Uuid(String uuid);

    boolean existsHepatitisDiagnosisByHepatitisEnrollmentUuid(String hepatitisEnrollmentUuid);

    HepatitisDiagnosis findHepatitisDiagnosisByHepatitisEnrollmentUuidAndArchived(String enrollmentUuid, Integer archived);

    HepatitisDiagnosis findHepatitisDiagnosisByIdAndArchived(Long id, Integer archived);

    List<HepatitisDiagnosis> findHepatitisDiagnosesByHepatitisEnrollmentUuidAndArchived(String enrollmentUuid, Integer archived);
}
