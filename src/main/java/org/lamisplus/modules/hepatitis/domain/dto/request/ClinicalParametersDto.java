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

    private astPltAltDto astPltAlt;
    @NotEmpty(message = "totalBiliRubin can not be empty")
    private String totalBiliRubin;
    @NotEmpty(message = "directBiliribin can not be empty")
    private String directBiliribin;
    @NotEmpty(message = "apriScore can not be empty")
    private String apriScore;
    @NotEmpty(message = "fib4 can not be empty")
    private String fib4;
    @NotEmpty(message = " prothrombinTimeNR can not be empty")
    private Long prothrombinTimeNR;
    @NotEmpty(message = " urea can not be empty")
    private Long urea;
    @NotEmpty(message = " creatinine can not be empty")
    private Long creatinine;
    @NotEmpty(message = " afp can not be empty")
    private Long afp;
    @NotEmpty(message = " fibroscan not be empty")
    private Long fibroscan;
    @NotEmpty(message = " ultrasoundScan can not be empty")
    private Long ultrasoundScan;
    private Status ascites;
    private String severityOfAscites;
    @NotEmpty(message = " gradeOfEncephalopathy can not be empty")
    private Long gradeOfEncephalopathy;
    @NotEmpty(message = " childPughScore can not be empty")
    private String childPughScore;
    private String liverBiopsyStage;
//    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private String diagnosisResult;
}
