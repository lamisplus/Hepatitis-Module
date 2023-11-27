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

    private Status treatmentExperience;
    @NotEmpty(message = "newRegimen can not be empty")
    private String newRegimen;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dateStarted;

    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Status historyOfAdverseEffect;

    @NotEmpty(message = "newRegimen can not be empty")
    private String hbvPastTreatmentRegimen;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dateStopped;

    @NotNull(message = "hepatitisBRegimenSwitch cannot be null or empty")
    private  HepatitisBRegimenSwitchDto hepatitisBRegimenSwitch;

    @NotNull(message = "reasonForHepatitisBTreatment cannot be null or empty")
    private  ReasonForHepatitisBTreatmentDto reasonForHepatitisBTreatment;

}

