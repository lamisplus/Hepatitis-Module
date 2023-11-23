package org.lamisplus.modules.hepatitis.controller;

import org.lamisplus.modules.hepatitis.domain.dto.request.HepatitisDiagnosisDto;
import org.lamisplus.modules.hepatitis.domain.dto.request.HepatitisEnrollmentDto;
import org.lamisplus.modules.hepatitis.domain.dto.request.HepatitisTreatmentDto;
import org.lamisplus.modules.hepatitis.domain.dto.response.HepatitisEnrollmentPatientDTO;
import org.lamisplus.modules.hepatitis.domain.entity.HepatitisEnrollment;
import org.lamisplus.modules.hepatitis.service.EnrollmentService;
import lombok.RequiredArgsConstructor;
import org.lamisplus.modules.patient.domain.dto.PersonMetaDataDto;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/v1/hepatitis")
@RequiredArgsConstructor
public class EnrollmentController {
    private final EnrollmentService enrollmentService;

    @PostMapping("/enrollment")
    public ResponseEntity<Map<String, Object>> hepatitisEnrollment(@Valid @RequestBody HepatitisEnrollmentDto enrollmentDto) {
        return enrollmentService.newHepatitisEnrollment(enrollmentDto);
    }

    @PostMapping("/diagnosis")
    public ResponseEntity<String> hepatitisDiagnosis(@Valid @RequestBody HepatitisDiagnosisDto diagnosisDto) {
        return enrollmentService.hepatitisDiagnosis(diagnosisDto);
    }

    @PostMapping("/treatment")
    public ResponseEntity<String> hepatitisTreatment(@Valid @RequestBody HepatitisTreatmentDto treatmentDto) {
        return enrollmentService.hepatitisTreatment(treatmentDto);
    }

    @GetMapping
    public ResponseEntity<List<HepatitisEnrollmentPatientDTO>> getAllEnrollments() {
        return ResponseEntity.ok(enrollmentService.getAllHepatitisEnrollments());
    }

    @GetMapping(value = "/patient")
    public ResponseEntity<PersonMetaDataDto> getPatientEligibleForHepatitis(
            @RequestParam(defaultValue = "*") String searchParam,
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "10") Integer pageSize)  {
        PersonMetaDataDto personMetaDataDto = enrollmentService.getAllPatientsEligibleForHepatitisEnrollment(searchParam, pageNo, pageSize);
        return new ResponseEntity<> (personMetaDataDto, new HttpHeaders(), HttpStatus.OK);
    }
}
