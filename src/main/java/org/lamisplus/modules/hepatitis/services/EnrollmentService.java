package org.lamisplus.modules.hepatitis.services;

import org.lamisplus.modules.hepatitis.domain.dto.EnrollmentResponseDto;
import org.lamisplus.modules.hepatitis.domain.dto.EnrollmentsRequestDto;
import org.lamisplus.modules.hepatitis.domain.dto.EnrollmentsResponseDto;

public interface EnrollmentService {

    EnrollmentsResponseDto createEnrollment(EnrollmentsRequestDto enrollmentRequestDto);
}
