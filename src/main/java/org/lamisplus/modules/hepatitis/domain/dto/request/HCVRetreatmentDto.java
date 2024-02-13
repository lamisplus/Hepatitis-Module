package org.lamisplus.modules.hepatitis.domain.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.lamisplus.modules.hepatitis.domain.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class HCVRetreatmentDto implements Serializable {
    @NotEmpty(message = "newRegimen can not be empty")
    private String newRegimen;
    @NotEmpty(message = "prescribedDuration; can not be empty")
    private Integer prescribedDuration;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dateStarted;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dateStopped;
    private Status retreatmentAdverseEffect;
    private Status history_of_AdverseEffect;
    @NotEmpty(message = "hbvPastTreatmentRegimen can not be empty")
    private String hbvPastTreatmentRegimen;

}
