package org.lamisplus.modules.hepatitis.controller;

import lombok.RequiredArgsConstructor;
import org.lamisplus.modules.hepatitis.domain.dto.EnrollmentRequestDto;
import org.lamisplus.modules.hepatitis.domain.dto.EnrollmentResponseDto;
import org.lamisplus.modules.hepatitis.domain.dto.EnrollmentsRequestDto;
import org.lamisplus.modules.hepatitis.domain.dto.EnrollmentsResponseDto;
import org.lamisplus.modules.hepatitis.services.EnrollmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/vi/hepatitis")
public class EnrollmentController {
    private final EnrollmentService enrollmentService;

    @PostMapping("/enrollment")
    public ResponseEntity<EnrollmentsResponseDto> createPatientEnrollment(@RequestBody EnrollmentsRequestDto enrollmentRequestDto){
        return new ResponseEntity<>(enrollmentService.createEnrollment(enrollmentRequestDto), HttpStatus.CREATED);
    }
}
