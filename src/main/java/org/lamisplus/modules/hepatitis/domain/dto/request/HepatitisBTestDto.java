package org.lamisplus.modules.hepatitis.domain.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.lamisplus.modules.hepatitis.domain.enums.Detect;
import org.lamisplus.modules.hepatitis.domain.enums.ReactiveState;
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
import java.io.Serializable;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class HepatitisBTestDto implements Serializable {
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dateHbvTestRequested;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dateHbvSampleRequested;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dateHbvDnaResultReported;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dateHbvDnaTestRequested;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate stagingDateOfLiverBiopsy;

    @NotNull(message = "hbvDna can either be detected or undetected")
    private Detect hbvDna;

    @NotEmpty(message ="hvbDnaValue can not be empty")
    private String hvbDnaValue;

    @NotEmpty(message ="hbsAgQuantification can not be empty")
    private String hbsAgQuantification;

    @NotEmpty(message ="ctScan can not be empty")
    private String ctScan;

    @NotEmpty(message ="albumin can not be empty")
    private String albumin;

    @NotEmpty(message ="hbeAG can not be empty")
    private ReactiveState hbeAG;

    @NotEmpty(message ="antiHDV can not be empty")
    private ReactiveState antiHDV;

    @NotEmpty(message ="treatmentEligible can not be empty")
    private Status treatmentEligible;

    @NotEmpty(message ="pmtctEligible can not be empty")
    private Status pmtctEligible;

    @Size(min = 5, max = 1000)
    @NotEmpty(message ="comment can not be empty")
    private String comment;

}
