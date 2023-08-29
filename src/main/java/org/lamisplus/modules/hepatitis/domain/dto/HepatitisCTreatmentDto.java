package org.lamisplus.modules.hepatitis.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.lamisplus.modules.hepatitis.domain.entity.HepatitisEnrollment;
import org.lamisplus.modules.hepatitis.domain.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class HepatitisCTreatmentDto {
    private HepatitisEnrollment hepatitisEnrollment;
    private Status treatmentExperience;
    private String pastTreatmentExperience;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate dateStarted;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate dateCompleted;
    private Integer prescribedDuration;
    private Status adverseEffectReported;
    private String hbvPastTreatmentRegimen;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate dateStopped;
    private HepatitisSVR12TestingDto hepatitisSvr12TestingDto;

    private HCVRetreatmentDto hcvRetreatmentDto;
}

