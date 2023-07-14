package org.lamisplus.modules.hepatitis.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EnrollmentController {
    @GetMapping("/starter")
    public String getStarted() {
        return "started";
    }
}
