package org.lamisplus.modules.hepatitis.domain.dto.request;


import com.fasterxml.jackson.annotation.JsonFormat;
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
public class FollowupClinicalParametersDto implements Serializable {


    private Long fuAlt ;
    private Long fuAst ;
    private Long fuPlt ;
    private Long fuTotalBilirubin ;
    private Long fuDirectBilirubin ;
    private Long fuAlbumin ;
    private Long fuApriScore ;
    private Long fuFib4 ;
    private Long fuProthrombinTime ;
    private Long fuUrea ;
    private Long fuCreatinine ;
    private String fuUltrasoundScan ;
    private Long fuAfp ;
    private String fuFibroscan ;
    private String fuCtScan ;
    private String fuAscites ;
    private String fuSeverityOfAscites ;
    private String fuGradeOfEncephalopathy ;
    private String fuChildPughScore ;
    private String fuLiverBiopsyStage ;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate fuStagingDateLiverBiopsy ;
    private String fuDiagnosis ;
    private String fuOutcome;

}
