package org.lamisplus.modules.hepatitis.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.hepatitis.domain.dto.request.HepatitisRequestDTO;
import org.lamisplus.modules.hepatitis.domain.dto.response.HepatitisResponseDTO;
import org.lamisplus.modules.hepatitis.service.implementations.HepatitisEnrollmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1")
@AllArgsConstructor
public class HepatitisEnrollmentController {

    private final HepatitisEnrollmentService hepatitisEnrollmentService;


    @GetMapping("/enrollment")
    public List<HepatitisResponseDTO> getAllEnrollment() {
        return hepatitisEnrollmentService.getAllEnrollment();
    }
//    public List<HepatitisResponseDTO> getHepatitisEnrollmentById(){
//        return hepatitisEnrollmentService.getHepatitisEnrollmentById();
//    }

    @PostMapping("/enrollment")
    public String createEnrollment(@RequestBody HepatitisRequestDTO hepatitisRequest) {
        return hepatitisEnrollmentService.createPatient(hepatitisRequest);
    }
}
