package org.lamisplus.modules.hepatitis.service;

import org.lamisplus.modules.hepatitis.domain.dto.request.HepatitisDiagnosisDto;
import org.lamisplus.modules.hepatitis.domain.dto.request.HepatitisEnrollmentDto;
import org.lamisplus.modules.hepatitis.domain.dto.request.HepatitisTreatmentDto;
import org.lamisplus.modules.hepatitis.domain.dto.response.ActivityTracker;
import org.lamisplus.modules.hepatitis.domain.dto.response.HepatitisEnrollmentPatientDTO;
import org.lamisplus.modules.hepatitis.domain.dto.response.HepatitisEnrollmentResponse;
import org.lamisplus.modules.hepatitis.domain.entity.HepatitisDiagnosis;
import org.lamisplus.modules.hepatitis.domain.entity.HepatitisEnrollment;
import org.lamisplus.modules.hepatitis.domain.entity.HepatitisTreatment;
import org.lamisplus.modules.patient.domain.dto.PersonMetaDataDto;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface EnrollmentService {

    ResponseEntity<Map<String, Object>> newHepatitisEnrollment(HepatitisEnrollmentDto enrollmentDto);

    ResponseEntity<String> hepatitisDiagnosis(HepatitisDiagnosisDto diagnosisDto);

    ResponseEntity<String> hepatitisTreatment(HepatitisTreatmentDto treatmentDto);
    
    List<HepatitisEnrollmentPatientDTO> getAllHepatitisEnrollments();

    PersonMetaDataDto getAllPatientsEligibleForHepatitisEnrollment(String searchValue, int pageNo, int pageSize);

    HepatitisEnrollment viewHepatitisEnrollmentByPersonUuid(String personUuid);

    HepatitisDiagnosis viewHepatitisDiagnosisByEnrollmentUuid(String enrollmentUuid);

    HepatitisTreatment viewHepatitisTreatmentByEnrollmentUuid(String enrollmentUuid);

    HepatitisEnrollmentDto updateHepatitisEnrollment(Long id, HepatitisEnrollmentDto enrollmentDto);

    HepatitisDiagnosisDto updateHepatitisDiagnosis(Long id, HepatitisDiagnosisDto diagnosisDto);

    HepatitisTreatmentDto updateHepatitisTreatment(Long id, HepatitisTreatmentDto treatmentDto);

    List<ActivityTracker> getActivityTracker(String personUuid);

    HepatitisDiagnosis viewHepatitisDiagnosisById(Long id);

    HepatitisTreatment viewHepatitisTreatmentById(Long id);

//    HepatitisEnrollment update-hepatitis-enrollment
}
