package org.lamisplus.modules.hepatitis.controller;

import org.lamisplus.modules.hepatitis.domain.dto.request.HepatitisDiagnosisDto;
import org.lamisplus.modules.hepatitis.domain.dto.request.HepatitisEnrollmentDto;
import org.lamisplus.modules.hepatitis.domain.dto.request.HepatitisTreatmentDto;
import org.lamisplus.modules.hepatitis.domain.dto.response.ActivityTracker;
import org.lamisplus.modules.hepatitis.domain.dto.response.HepatitisEnrollmentPatientDTO;
import org.lamisplus.modules.hepatitis.domain.dto.response.HepatitisEnrollmentResponse;
import org.lamisplus.modules.hepatitis.domain.entity.HepatitisDiagnosis;
import org.lamisplus.modules.hepatitis.domain.entity.HepatitisEnrollment;
import org.lamisplus.modules.hepatitis.domain.entity.HepatitisTreatment;
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

    @GetMapping(value = "view-hepatitis-enrollment/{personUuid}")
    public ResponseEntity<HepatitisEnrollment> viewHepatitisEnrollment(@PathVariable("personUuid") String personUuid) {
        return ResponseEntity.ok (enrollmentService.viewHepatitisEnrollmentByPersonUuid(personUuid));
    }

    @GetMapping(value = "view-hepatitis-diagnosis/{enrollmentUuid}")
    public ResponseEntity<HepatitisDiagnosis> viewHepatitisDiagnosis(@PathVariable("enrollmentUuid") String enrollmentUuid) {
        return ResponseEntity.ok (enrollmentService.viewHepatitisDiagnosisByEnrollmentUuid(enrollmentUuid));
    }

    @GetMapping(value = "view-hepatitis-diagnosis-by-id/{id}")
    public ResponseEntity<HepatitisDiagnosis> viewHepatitisDiagnosisById(@PathVariable("id") Long id) {
        return ResponseEntity.ok (enrollmentService.viewHepatitisDiagnosisById(id));
    }

    @GetMapping(value = "view-hepatitis-treatment-by-id/{id}")
    public ResponseEntity<HepatitisTreatment> viewHepatitisTreatmentById(@PathVariable("id") Long id) {
        return ResponseEntity.ok (enrollmentService.viewHepatitisTreatmentById(id));
    }

    @GetMapping(value = "view-hepatitis-treatment/{enrollmentUuid}")
    public ResponseEntity<HepatitisTreatment> viewHepatitisTreatment(@PathVariable("enrollmentUuid") String enrollmentUuid) {
        return ResponseEntity.ok (enrollmentService.viewHepatitisTreatmentByEnrollmentUuid(enrollmentUuid));
    }

    @PutMapping(value = "update-hepatitis-enrollment/{id}")
    public ResponseEntity<HepatitisEnrollmentDto> updateHepatitisEnrollment(@PathVariable("id") Long id, @Valid @RequestBody HepatitisEnrollmentDto enrollmentDto) {
        return ResponseEntity.ok (enrollmentService.updateHepatitisEnrollment(id, enrollmentDto));
    }

    @PutMapping(value = "update-hepatitis-diagnosis/{id}")
    public ResponseEntity<HepatitisDiagnosisDto> updateHepatitisDiagnosis(@PathVariable("id") Long id, @Valid @RequestBody HepatitisDiagnosisDto diagnosisDto) {
        return ResponseEntity.ok (enrollmentService.updateHepatitisDiagnosis(id, diagnosisDto));
    }

    @PutMapping(value = "update-hepatitis-treatment/{id}")
    public ResponseEntity<HepatitisTreatmentDto> updateHepatitisTreatment(@PathVariable("id") Long id, @Valid @RequestBody HepatitisTreatmentDto treatmentDto) {
        return ResponseEntity.ok (enrollmentService.updateHepatitisTreatment(id, treatmentDto));
    }

    @GetMapping(value = "activities/{personUuid}")
    public ResponseEntity<List<ActivityTracker>> getActivitiesByPersonUuid(@PathVariable("personUuid") String personUuid) {
        return ResponseEntity.ok (enrollmentService.getActivityTracker(personUuid));
    }
}
