package org.lamisplus.modules.hepatitis.domain.dto.request;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HepatitisRequestDTO {

    private EnrollmentDTO enrollment;

    private DiagnosisDTO diagnosis;

    private TreatmentDTO treatment;

}
