package org.lamisplus.modules.hepatitis.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.hepatitis.domain.dto.request.FollowupDTO;
import org.lamisplus.modules.hepatitis.service.implementations.FollowupService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class FollowupController {

    private final FollowupService followupService;

    @PostMapping("/patient-followup")
    public String addFollowup(@RequestBody FollowupDTO followupDTO) {
        return this.followupService.addFollowup(followupDTO);
    }
}
