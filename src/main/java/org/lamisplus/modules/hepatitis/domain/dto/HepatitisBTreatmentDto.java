package org.lamisplus.modules.hepatitis.domain.dto;

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
import java.io.Serializable;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class HepatitisBTreatmentDto implements Serializable {
    private HepatitisTreatment hepatitisTreatment;
    private Status treatmentExperience;
    private String newRegimen;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate dateStarted;
    @Enumerated(EnumType.STRING)
    private Status historyOfAdverseEffect;
    private String hbvPastTreatmentRegimen;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate dateStopped;

    HepatitisBRegimenSwitchDto hepatitisBRegimenSwitchDto;
    ReasonForHepatitisBTreatmentDto reasonForHepatitisBTreatmentDto;

}

