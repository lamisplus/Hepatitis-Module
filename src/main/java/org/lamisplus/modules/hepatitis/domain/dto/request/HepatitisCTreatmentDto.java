package org.lamisplus.modules.hepatitis.domain.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.lamisplus.modules.hepatitis.domain.entity.HepatitisEnrollment;
import org.lamisplus.modules.hepatitis.domain.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class HepatitisCTreatmentDto {
    private Status treatmentExperience;

    @NotEmpty(message = "pastTreatmentExperience can not be empty")
    private String pastTreatmentExperience;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dateStarted;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dateCompleted;
    @Size(min = 1)
    @NotNull(message = "prescribedDuration can not be null")
    private Integer prescribedDuration;

    private Status adverseEffectReported;

    @NotEmpty(message = "hbvPastTreatmentRegimen can not be empty")
    private String hbvPastTreatmentRegimen;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dateStopped;

    @NotNull(message = "hepatitisSvr12TestingDto cannot be null or empty")
    private HepatitisSVR12TestingDto hepatitisSvr12Testing;
    @NotNull(message = "hcvRetreatmentDto cannot be null or empty")
    private HCVRetreatmentDto hcvRetreatment;
}

