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
public class FollowupPreliminaryDto implements Serializable {

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate fuDateOfVisit ;
    private Long fuWeight ;
    private Long fuHeight ;
    private Long fuBmi ;
    private Long fuBloodPressure ;
    private Long fuHbsagQuantification ;
    private Long fuHbeag ;
    private Long fuHbvDna ;
    private String fuHbvDnaStatus;
    private Long fuHbsag;

}
