package org.lamisplus.modules.hepatitis.repository;

import org.lamisplus.modules.hepatitis.domain.dto.response.HepatitisEnrollmentPatientDTO;
import org.lamisplus.modules.hepatitis.domain.entity.HepatitisEnrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<HepatitisEnrollment, Long> {
    Optional<HepatitisEnrollment> findByUuid(String uuid);
    
    @Query(value = "SELECT p.id AS id,p.created_by \n" +
            "         as createBy, p.date_of_registration as dateOfRegistration, p.first_name as firstName, p.surname AS surname, \n" +
            "         p.other_name AS otherName, \n" +
            "         p.hospital_number AS hospitalNumber, CAST (EXTRACT(YEAR from AGE(NOW(), date_of_birth)) AS INTEGER) AS age, \n" +
            "                                    INITCAP(p.sex) AS gender, p.date_of_birth AS dateOfBirth, p.is_date_of_birth_estimated AS isDobEstimated, \n" +
            "                                    p.facility_id as facilityId , p.uuid as personUuid, \n" +
            "                                    e.care_entry_point AS entryPoint, e.id as enrollmentId, e.uuid as uuid,\n" +
            "                                    b.biometric_type as biometricStatus \n" +
            "                                    FROM patient_person p LEFT Join biometric b ON b.person_uuid = p.uuid \n" +
            "                                    INNER JOIN hepatitis_enrollments e ON p.uuid = e.person_uuid \n" +
            "                                    WHERE p.archived=0 AND e.archived=0 AND p.facility_id= ?1\n" +
            "                                   GROUP BY p.id, p.first_name, \n" +
            "                                   p.first_name,  e.care_entry_point,e.id, b.biometric_type, p.surname, p.other_name, p.hospital_number, p.date_of_birth\n" +
            "                                   ORDER BY p.id DESC",
            nativeQuery = true)
    List<HepatitisEnrollmentPatientDTO> getEnrolledPatientsByFacility(Long facilityId);
}
