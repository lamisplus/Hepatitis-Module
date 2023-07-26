package org.lamisplus.modules.hepatitis.domain.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDate;
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DiagnosisResponse {
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dateHbvTestRequested;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dateHbvSampleCollected;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private java.time.LocalDate dateHbvDnaResultReported;

    private String hbvDna;

    private String hbvDnaValue;

    private String hbeAg;

    private String hbsAgQuantification;

    private String antiHdv;

    private Boolean treatmentEligible;

    private Boolean pmtctEligible;

    private String comment;

    private String hcvRna;

    private String hcvValue;

    private String hepatitisCoInfection;

    private String specifyMultipleInfection;

    private String alt;

    private String ast;

    private String plt;

    private String altValue;

    private String astValue;

    private String pltValue;

    private String totalBilirubin;

    private String directBilirubin;

    private String albumin;

    private String apriScore;

    private String fib4;

    private String prothrombinTime;

    private String urea;

    private String creatinine;

    private String ultrasoundScan;

    private String afp;

    private String fibroscan;

    private String ctScan;

    private Boolean ascites;

    private String severityOfAscites;

    private Integer gradeOfEncephalopathy;

    private String childPughScore;

    private String liverBiopsyStage;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate stagingDateForLiverBiopsy;

    private String diagnosis;

    private String commobidities;
}
