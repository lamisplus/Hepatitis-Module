package org.lamisplus.modules.hepatitis.domain.dto;

import org.lamisplus.modules.hepatitis.domain.enums.BiopsyDiagnosis;
import org.lamisplus.modules.hepatitis.domain.enums.Moderation;
import org.lamisplus.modules.hepatitis.domain.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class ClinicalParametersDto implements Serializable {

    private Status ast;
    private Status alt;
    private Status pst;
    private String astValue;
    private String totalBiliRubin;
    private String directBiliribin;
    private String apriScore;
    private String fib4;
    private String prothrombinTimeNR;
    private String urea;
    private String creatinine;
    private String afp;
    private String fibroscan;
    private String ultrasoundScan;
    private Status ascites;
    private Moderation severityOfAscites;
    private Integer gradeOfEncephalopathy;
    private String childPughScore;
    private BiopsyDiagnosis liverBiopsyStage;
    private BiopsyDiagnosis diagnosis_result;
}
