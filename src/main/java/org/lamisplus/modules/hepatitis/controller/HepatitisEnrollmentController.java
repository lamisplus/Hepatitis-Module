package org.lamisplus.modules.hepatitis.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.hepatitis.domain.dto.request.HepatitisRequestDTO;
import org.lamisplus.modules.hepatitis.service.HepatitisEnrollmentService;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class HepatitisEnrollmentController {

//    private final HepatitisEnrollmentService hepatitisEnrollmentService;
//
//    @PostMapping(value = "/new_patient")
//    public String createNewPatient(@RequestBody HepatitisRequestDTO hepatitisRequest) {
//        return hepatitisEnrollmentService.createPatient(hepatitisRequest);
//    }

    @GetMapping("/enrollment")
    public String getEnrollment() {
        return "get enrollment";
    }
}
