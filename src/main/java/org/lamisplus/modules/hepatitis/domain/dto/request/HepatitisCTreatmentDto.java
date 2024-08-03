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
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate hepatitisCPastTreatmentExperienceDateStarted;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate hepatitisCPastTreatmentExperienceDateCompleted;

    private String hepatitisCPastTreatmentExperiencePrescribedDuration;
    private String hepatitisCNewTreatmentRegimen;
    private String hepatitisCNewTreatmentRegimenPrescribedDuration;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate hepatitisCNewTreatmentRegimenDateStarted;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate hepatitisCNewTreatmentRegimenDateCompleted;

    private String hepatitisCAdverseEventReported;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate hepatitisCSvr12TestingDateTested;

    private String hepatitisCSvr12TestingHcvRna;
    private Long hepatitisCSvr12TestingHcvRnaValue;
    private String hepatitisCHcvRetreatmentHcvGenotype;
    private String hepatitisCHcvRetreatmentNewRegimen;
    private String hepatitisCHcvRetreatmentPrescribedDuration;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate hepatitisCHcvRetreatmentDateStarted;

    private String hepatitisCHcvRetreatmentAdverseEffect;
    private String hepatitisCHcvRetreatmentHistoryOfAdverseEffect;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate hepatitisCRetreatmentSvr12TestingDateTested;

    private String hepatitisCRetreatmentSvr12TestingRetreatmentHcvRna;

    private Long hepatitisCRetreatmentSvr12TestingRetreatmentHcvRnaValue;


}

