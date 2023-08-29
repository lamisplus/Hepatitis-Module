package org.lamisplus.modules.hepatitis.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class HepatitisTreatmentDto implements Serializable {
    private String hepatitisEnrollmentUuid;
    private HepatitisBTreatmentDto hepatitisBTreatmentDto;
    private HepatitisCTreatmentDto hepatitisCTreatmentDto;
}
