package org.lamisplus.modules.hepatitis.domain.dto.response;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HepatitisResponseDTO {
    private EnrollmentResponse enrollment;
    private DiagnosisResponse diagnosis;
    private TreatmentResponse treatment;

}
