package org.lamisplus.modules.hepatitis.repository;

import org.lamisplus.modules.hepatitis.domain.dto.PatientPerson;
import org.lamisplus.modules.hepatitis.domain.dto.response.HepatitisEnrollmentPatientDTO;
import org.lamisplus.modules.hepatitis.domain.entity.HepatitisEnrollment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<HepatitisEnrollment, Long> {
    Optional<HepatitisEnrollment> findByUuid(String uuid);

    HepatitisEnrollment findHepatitisEnrollmentByUuidAndArchived(String uuid, Integer archived);
    
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

    @Query(value = "SELECT active, deceased_date_time, deceased, date_of_registration AS dateOfRegistration, CAST(identifier AS TEXT) AS identifier, CAST(education AS TEXT) AS education, CAST(employment_status AS TEXT) AS employmentStatus, CAST(marital_status AS TEXT) AS maritalStatus, CAST(gender AS TEXT) AS gender, CAST(organization AS TEXT) AS organization, CAST(contact_point AS TEXT) AS contactPoint, CAST(address AS TEXT) AS address,CAST(contact AS TEXT) AS contact, is_date_of_birth_estimated AS isDateOfBirthEstimated, facility_id AS facilityId, emr_id AS emrId, nin_number AS niNumber, date_of_birth AS dateOfBirth, pp.id, pp.uuid, sex, first_name AS firstName, surname, other_name AS otherName, full_name AS fullName, pp.hospital_number AS hospitalNumber FROM patient_person pp WHERE uuid NOT IN (SELECT person_uuid FROM hepatitis_enrollments he where he.archived = 0) and pp.archived=?1 AND pp.facility_id=?2 ORDER BY pp.id desc", nativeQuery = true)
    Page<PatientPerson> findPatientPerson(Integer archived, Long facilityId, Pageable pageable);

    @Query(value = "SELECT active, deceased_date_time, deceased, date_of_registration AS dateOfRegistration, CAST(identifier AS TEXT) AS identifier, CAST(education AS TEXT) AS education, CAST(employment_status AS TEXT) AS employmentStatus, CAST(marital_status AS TEXT) AS maritalStatus, CAST(gender AS TEXT) AS gender, CAST(organization AS TEXT) AS organization, CAST(contact_point AS TEXT) AS contactPoint, CAST(address AS TEXT) AS address,CAST(contact AS TEXT) AS contact, is_date_of_birth_estimated AS isDateOfBirthEstimated, facility_id AS facilityId, emr_id AS emrId, nin_number AS niNumber, date_of_birth AS dateOfBirth, pp.id, pp.uuid, sex, first_name AS firstName, surname, other_name AS otherName, full_name AS fullName, pp.hospital_number AS hospitalNumber FROM patient_person pp WHERE uuid NOT IN (SELECT person_uuid FROM hepatitis_enrollments he where he.archived = 0) AND (pp.first_name ilike ?1 OR pp.surname ilike ?1 OR pp.other_name ilike ?1 OR pp.full_name ilike ?1 OR pp.hospital_number ilike ?1)  and pp.archived=?2 AND pp.facility_id=?3 ORDER BY pp.id desc", nativeQuery = true)
    Page<PatientPerson> findPatientPersonByParameters(String queryParam, Integer archived, Long facilityId, Pageable pageable);

    HepatitisEnrollment findHepatitisEnrollmentByPersonUuidAndArchived(String personUuid, Integer archived);
}
