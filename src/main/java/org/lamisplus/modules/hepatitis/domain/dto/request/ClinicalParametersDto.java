package org.lamisplus.modules.hepatitis.domain.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.lamisplus.modules.hepatitis.domain.enums.BiopsyDiagnosis;
import org.lamisplus.modules.hepatitis.domain.enums.Moderation;
import org.lamisplus.modules.hepatitis.domain.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
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
    @NotEmpty(message = "astValue can not be empty")
    private String astValue;
    @NotEmpty(message = "totalBiliRubin can not be empty")
    private String totalBiliRubin;
    @NotEmpty(message = "directBiliribin can not be empty")
    private String directBiliribin;
    @NotEmpty(message = "apriScore can not be empty")
    private String apriScore;
    @NotEmpty(message = "fib4 can not be empty")
    private String fib4;
    @NotEmpty(message = " prothrombinTimeNR can not be empty")
    private String prothrombinTimeNR;
    @NotEmpty(message = " urea can not be empty")
    private String urea;
    @NotEmpty(message = " creatinine can not be empty")
    private String creatinine;
    @NotEmpty(message = " afp can not be empty")
    private String afp;
    @NotEmpty(message = " fibroscan not be empty")
    private String fibroscan;
    @NotEmpty(message = " ultrasoundScan can not be empty")
    private String ultrasoundScan;
    private Status ascites;
    private Moderation severityOfAscites;
    @Size(max = 5)
    @NotEmpty(message = " gradeOfEncephalopathy can not be empty")
    private Integer gradeOfEncephalopathy;
    @NotEmpty(message = " childPughScore can not be empty")
    private String childPughScore;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private BiopsyDiagnosis liverBiopsyStage;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private BiopsyDiagnosis diagnosis_result;
}
