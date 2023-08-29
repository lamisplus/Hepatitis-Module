package org.lamisplus.modules.hepatitis.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class ReasonForHepatitisBTreatmentDto {

    private HepatitisBTreatmentDto hepatitisBTreatmentDto;
    private ReasonForHepatitisBTreatmentDto reasonForHepatitisBTreatmentDto;
    private String comment;
}
