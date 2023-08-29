package org.lamisplus.modules.hepatitis.service;

import org.lamisplus.modules.hepatitis.domain.dto.HepatitisDiagnosisDto;
import org.lamisplus.modules.hepatitis.domain.dto.HepatitisEnrollmentDto;
import org.lamisplus.modules.hepatitis.domain.dto.HepatitisTreatmentDto;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface EnrollmentService {

    ResponseEntity<Map<String, Object>> newHepatitisEnrollment(HepatitisEnrollmentDto enrollmentDto);

    ResponseEntity<String> hepatitisDiagnosis(HepatitisDiagnosisDto diagnosisDto);

    ResponseEntity<String> hepatitisTreatment(HepatitisTreatmentDto treatmentDto);

    ResponseEntity<?> getAllHepatitisEnrollments();
}
