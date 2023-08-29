package org.lamisplus.modules.hepatitis.domain.dto;

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
    private LocalDate dateHbvDnaTestRequested;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate stagingDateOfLiverBiopsy;
    private Detect hbvDna;
    private String hvbDnaValue;
    private String hbsAgQuantification;
    private String ctScan;
    private String albumin;
    private ReactiveState hbeAG;
    private ReactiveState antiHDV;
    private Status treatmentEligible;
    private Status pmtctEligible;
    private String comment;

}
