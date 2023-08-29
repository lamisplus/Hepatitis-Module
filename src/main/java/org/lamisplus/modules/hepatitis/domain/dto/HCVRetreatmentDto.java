package org.lamisplus.modules.hepatitis.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.lamisplus.modules.hepatitis.domain.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class HCVRetreatmentDto implements Serializable {
    private String newRegimen;
    private Integer prescribedDuration;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate dateStarted;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate dateStopped;
    private Status retreatmentAdverseEffect;
    private Status history_of_AdverseEffect;
    private String hbvPastTreatmentRegimen;

}
