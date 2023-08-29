package org.lamisplus.modules.hepatitis.controller;

import org.lamisplus.modules.hepatitis.domain.dto.HepatitisDiagnosisDto;
import org.lamisplus.modules.hepatitis.domain.dto.HepatitisEnrollmentDto;
import org.lamisplus.modules.hepatitis.domain.dto.HepatitisTreatmentDto;
import org.lamisplus.modules.hepatitis.service.EnrollmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Map;


@RestController
@RequestMapping("/enrollment")
@RequiredArgsConstructor
public class EnrollmentController {
    private final EnrollmentService enrollmentService;

    @PostMapping("/form-1")
    public ResponseEntity<Map<String, Object>> hepatitisEnrollment(@Valid @RequestBody HepatitisEnrollmentDto enrollmentDto) {
        return enrollmentService.newHepatitisEnrollment(enrollmentDto);
    }

    @PostMapping("/form-2")
    public ResponseEntity<String> hepatitisDiagnosis(@Valid @RequestBody HepatitisDiagnosisDto diagnosisDto) {
        return enrollmentService.hepatitisDiagnosis(diagnosisDto);
    }

    @PostMapping("/form-3")
    public ResponseEntity<String> hepatitisTreatment(@Valid @RequestBody HepatitisTreatmentDto treatmentDto) {
        return enrollmentService.hepatitisTreatment(treatmentDto);
    }

    @GetMapping
    public ResponseEntity<?> getAllEnrollments() {
        return enrollmentService.getAllHepatitisEnrollments();
    }
}
