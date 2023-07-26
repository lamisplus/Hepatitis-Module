package org.lamisplus.modules.hepatitis.domain.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDate;
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TreatmentResponse {
    private Boolean hbvTreatmentExperience;

    private String hbvPastTreatmentRegimen;

    private String hbvNewRegimen;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate hbvDateStarted;

    private Boolean hbvHistoryOfAdverseEffect;

    private Boolean hcvHistoryOfAdverseEffect;

    private String hbvRegimeSwitchNewRegimen;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate hbvRegimeSwitchDateStarted;

    private String hbvRegimeSwitchHistoryOfAdverseEffect;

    private String hbvRegimeSwitchReason;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate hbvRegimeSwitchDateStopped;

    private String hbvReasonForTreatmentEligibility;

    private String hbvReasonsForTreatmentComment;

    private Boolean hcvTreatmentExperience;

    private String hcvPastTreatmentExperience;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate hcvDateStarted;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate hcvDateCompleted;

    private String hcvPrescribedDuration;

    private String hcvAdverseEventReported;

    private String hcvNewRegimen;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate hcvRegimeSwitchDateStarted;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate hcvRegimeSwitchDateStopped;

    private String hcvRegimeSwitchHistoryOfAdverseEffect;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate svr12TestingDateStarted;

    private String svr12TestingHcvRna;

    private String svr12TestingHcvRnaValue;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate svr12RetreatmentDateTested;

    private String svr12RetreatmentHcvRna;

    private String svr12RetreatmentHcvRnaValue;

    private String hcvRetreatmentNewRegime;

    private String hcvRetreatmentPrescribedDuration;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate hcvRetreatmentDateStarted;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate hcvRetreatmentDateStopped;

    private Boolean hcvRetreatmentAdverseEffect;

    private String hcvRetreatmentHcvGenotype;
}
