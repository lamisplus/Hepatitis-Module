package org.lamisplus.modules.hepatitis.domain.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.lamisplus.modules.hepatitis.domain.entity.HepatitisTreatment;
import org.lamisplus.modules.hepatitis.domain.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class HepatitisBTreatmentDto implements Serializable {

    private String hepatitisBTreatmentExperience;
    private String hepatitisBPastTreatmentRegimen;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate hepatitisBPastTreatmentExperienceDateStarted;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate hepatitisBPastTreatmentExperienceDateCompleted;

    private String hepatitisBPastTreatmentExperiencePrescribedDuration;
    private String hepatitisBNewTreatmentRegimen;
    private String hepatitisBNewTreatmentRegimenPrescribedDuration;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate hepatitisBNewTreatmentRegimenDateStarted;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate hepatitisBNewTreatmentRegimenDateCompleted;

    private String hepatitisBAdverseEventReported;
    private String hepatitisBRegimenSwitchNewRegimen;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate hepatitisBRegimenSwitchDateStarted;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate hepatitisBRegimenSwitchDateCompleted;

    private String hepatitisBRegimenSwitchReasonForSwitch;
    private String hepatitisBRegimenSwitchAdverseEffectReported;
    private String hepatitisBReasonForTreatment;
    private String hepatitisBReasonsForTreatmentComment;



}

