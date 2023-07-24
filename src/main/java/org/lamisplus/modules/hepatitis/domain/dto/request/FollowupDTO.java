package org.lamisplus.modules.hepatitis.domain.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FollowupDTO {

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dateOfVisit;
    private String enrollmentId;
    private String weight;
    private String height;
    private String bmi;
    private String bloodPressure;
    private String hbsAgQuantification;
    private String hbeAg;
    private String hbvDna;
    private String alt;
    private String ast;
    private String plt;
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
    private String ascites;
    private String severityOfAscites;
    private String gradeOfEncephalopathy;
    private String childPughScore;
    private String liverBiopsyStage;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private String stagingDateForLiverBiopsy;

    private String diagnosis;
    private String treatmentReg;
    private String clinicalName;
    private String clinicalDiagnosis;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate nextAppointment;

    private String remark;

}
