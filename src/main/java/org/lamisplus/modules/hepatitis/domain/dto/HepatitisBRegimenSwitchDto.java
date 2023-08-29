package org.lamisplus.modules.hepatitis.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
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
public class HepatitisBRegimenSwitchDto implements Serializable {

    private String newRegime;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate dateStarted;
    private Status adverseEffectReported;
    private String reasonForSwitch;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate dateStopped;
}
