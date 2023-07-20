package org.lamisplus.modules.hepatitis.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.hepatitis.domain.dto.request.HepatitisRequestDTO;
import org.lamisplus.modules.hepatitis.domain.entity.Enrollment;
import org.lamisplus.modules.hepatitis.service.HepatitisEnrollmentService;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class HepatitisEnrollmentController {
//
//    @PostMapping(value = "/new_patient")
//    public String createNewPatient(@RequestBody HepatitisRequestDTO hepatitisRequest) {
//        return hepatitisEnrollmentService.createPatient(hepatitisRequest);
//    }
    private final HepatitisEnrollmentService hepatitisEnrollmentService;

    @GetMapping("/enrollment")
    public String getEnrollment() {
        return "get enrollment";
    }

    @PostMapping("/enrollment")
    public String createEnrollment(@RequestBody HepatitisRequestDTO hepatitisRequest) {
        return hepatitisEnrollmentService.createPatient(hepatitisRequest);
    }
}
