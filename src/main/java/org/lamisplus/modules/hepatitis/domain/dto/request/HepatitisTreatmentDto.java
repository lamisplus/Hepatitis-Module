package org.lamisplus.modules.hepatitis.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
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
@Builder
public class HepatitisTreatmentDto implements Serializable {

    @NotEmpty(message = "HepatitisEnrollementUUID cannot be null or empty")
    private String enrollmentUuid;
    @NotNull(message = "hepatitisBTreatmentDto cannot be null or empty")
    private HepatitisBTreatmentDto hepatitisBTreatment;
    @NotNull(message = "hepatitishepatitisCTreatmentDtoCTest cannot be null or empty")
    private HepatitisCTreatmentDto hepatitisCTreatment;
}
