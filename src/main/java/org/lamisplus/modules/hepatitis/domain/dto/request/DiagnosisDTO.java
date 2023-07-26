package org.lamisplus.modules.hepatitis.domain.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DiagnosisDTO {

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @NotBlank(message = "hbv test requested date is mandatory")
    private LocalDate dateHbvTestRequested;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @NotBlank(message = "hbv sample collected date is mandatory")
    private LocalDate dateHbvSampleCollected;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @NotBlank(message = "hbv reported result date is mandatory")
    private java.time.LocalDate dateHbvDnaResultReported;

    @NotBlank(message = "hbv dna is mandatory")
    private String hbvDna;

    @NotBlank(message = "hbv dna value is mandatory")
    private String hbvDnaValue;

    @NotBlank(message = "hbeAg is mandatory")
    private String hbeAg;

    @NotBlank(message = "hbsAg quantification is mandatory")
    private String hbsAgQuantification;

    @NotBlank(message = "anti hdv is mandatory")
    private String antiHdv;

    @NotBlank(message = "treatment eligibility is mandatory")
    private Boolean treatmentEligible;

    @NotBlank(message = "pmtct eligibility is mandatory")
    private Boolean pmtctEligible;

    @NotBlank(message = "comment is mandatory")
    private String comment;

    @NotBlank(message = "hcv rna is mandatory")
    private String hcvRna;

    @NotBlank(message = "hcv value is mandatory")
    private String hcvValue;

    @NotBlank(message = "hepatitis co-infection is mandatory")
    private String hepatitisCoInfection;

    @NotBlank(message = "specify multiple infection is mandatory")
    private String specifyMulitipleInfection;

    @NotBlank(message = "alt is mandatory")
    private String alt;

    @NotBlank(message = "ast is mandatory")
    private String ast;

    @NotBlank(message = "plt  is mandatory")
    private String plt;

    @NotBlank(message = "alt value is mandatory")
    private String altValue;

    @NotBlank(message = "ast value is mandatory")
    private String astValue;

    @NotBlank(message = "pltValue is mandatory")
    private String pltValue;

    @NotBlank(message = "total bilirubin is mandatory")
    private String totalBilirubin;

    @NotBlank(message = "direct bilirubin is mandatory")
    private String directBilirubin;

    @NotBlank(message = "albumin is mandatory")
    private String albumin;

    @NotBlank(message = "apriscore is mandatory")
    private String apriScore;

    @NotBlank(message = "fib4 is mandatory")
    private String fib4;

    @NotBlank(message = "promthrombin time is mandatory")
    private String prothrombinTime;

    @NotBlank(message = "urea is mandatory")
    private String urea;

    @NotBlank(message = "creatinine is mandatory")
    private String creatinine;

    @NotBlank(message = "ultrasound is mandatory")
    private String ultrasoundScan;

    @NotBlank(message = "afp is mandatory")
    private String afp;

    @NotBlank(message = "fibroscan is mandatory")
    private String fibroscan;

    @NotBlank(message = "ctscan is mandatory")
    private String ctScan;

    @NotBlank(message = "ascites is mandatory")
    private Boolean ascites;

    @NotBlank(message = "severity of ascites is mandatory")
    private String severityOfAscites;

    @NotBlank(message = "Encephalopathy grade is mandatory")
    private Integer gradeOfEncephalopathy;

    @NotBlank(message = "child pugh score is mandatory")
    private String childPughScore;

    @NotBlank(message = "liver biopsy stage is mandatory")
    private String liverBiopsyStage;

    @NotBlank(message = "staging date for liver biopsy is mandatory")
    private String stagingDateForLiverBiopsy;

    @NotBlank(message = "diagnosis is mandatory")
    private String diagnosis;

    @NotBlank(message = "commobidities is mandatory")
    private String commobidities;

}
