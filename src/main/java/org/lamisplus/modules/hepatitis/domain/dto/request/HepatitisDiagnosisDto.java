package org.lamisplus.modules.hepatitis.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class HepatitisDiagnosisDto implements Serializable {

    @NotEmpty(message = "HepatitisEnrollementUUID cannot be null or empty")
    private String enrollmentUuid;
    @NotNull(message = "hepatitisBTest cannot be null or empty")
    private HepatitisBTestDto hepatitisBTest;
    @NotNull(message = "hepatitisCTest cannot be null or empty")
    private HepatitisCTestDto hepatitisCTest;
    @NotNull(message = "clinicalParameters cannot be null or empty")
    private ClinicalParametersDto clinicalParameters;
}
