package org.lamisplus.modules.hepatitis.domain.dto;

import lombok.*;
import org.lamisplus.modules.patient.domain.dto.PersonResponseDto;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class EnrollmentsResponseDto {
    private PersonResponseDto personResponseDto;
    private ScreeningResponseDto screeningResponseDto;
    private EnrollmentResponseDto enrollmentResponseDto;
}
