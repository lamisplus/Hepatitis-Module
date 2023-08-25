package org.lamisplus.modules.hepatitis.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.lamisplus.modules.patient.domain.dto.PersonDto;
import org.lamisplus.modules.patient.domain.dto.PersonResponseDto;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnrollmentsRequestDto {
    private PersonDto personDto;
    private ScreeningRequestDto screeningRequestDtoDto;
    private EnrollmentRequestDto enrollmentRequestDto;
}
