package org.lamisplus.modules.hepatitis.domain.dto;

import lombok.AllArgsConstructor;
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
public class HepatitisDiagnosisDto implements Serializable {
    private String hepatitisEnrollmentUUid;
    private HepatitisBTestDto hepatitisBTest;
    private HepatitisCTestDto hepatitisCTest;
    private ClinicalParametersDto clinicalParameters;
}
