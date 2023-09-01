package org.lamisplus.modules.hepatitis.service;

import org.lamisplus.modules.hepatitis.domain.dto.request.HepatitisDiagnosisDto;
import org.lamisplus.modules.hepatitis.domain.dto.request.HepatitisEnrollmentDto;
import org.lamisplus.modules.hepatitis.domain.dto.request.HepatitisTreatmentDto;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface EnrollmentService {

    ResponseEntity<Map<String, Object>> newHepatitisEnrollment(HepatitisEnrollmentDto enrollmentDto);

    ResponseEntity<String> hepatitisDiagnosis(HepatitisDiagnosisDto diagnosisDto);

    ResponseEntity<String> hepatitisTreatment(HepatitisTreatmentDto treatmentDto);

    ResponseEntity<?> getAllHepatitisEnrollments();
}
