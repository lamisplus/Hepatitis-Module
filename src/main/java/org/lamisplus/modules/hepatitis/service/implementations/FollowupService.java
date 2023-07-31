package org.lamisplus.modules.hepatitis.service.implementations;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.hepatitis.domain.dto.request.FollowupDTO;
import org.lamisplus.modules.hepatitis.domain.entity.Enrollment;
import org.lamisplus.modules.hepatitis.domain.entity.Followup;
import org.lamisplus.modules.hepatitis.repository.EnrollmentRepository;
import org.lamisplus.modules.hepatitis.repository.FollowupRepository;
import org.lamisplus.modules.hepatitis.service.mapper.HepatitisMapper;
import org.springframework.stereotype.Service;

import javax.ws.rs.NotFoundException;
import java.util.UUID;

@RequiredArgsConstructor
@Slf4j
@Service
public class FollowupService {
    private final FollowupRepository followupRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final HepatitisMapper hepatitisMapper;

    public String addFollowup(FollowupDTO followupDTO) {
        Enrollment enrollment = this.enrollmentRepository.findOneEnrollmentByUuid(UUID.fromString(followupDTO.getEnrollmentId())).orElse(null);
        if (enrollment == null) {
            throw new NotFoundException("Enrollment ID not found");
        }
        Followup mappedFollowup = hepatitisMapper.mapFollowupDtoEntity(followupDTO, enrollment);
        Followup followupData = followupRepository.save(mappedFollowup);
        return followupData.getId().toString();
    }
}
