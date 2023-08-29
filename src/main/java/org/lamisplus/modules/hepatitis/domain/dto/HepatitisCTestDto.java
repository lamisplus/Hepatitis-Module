package org.lamisplus.modules.hepatitis.domain.dto;

import org.lamisplus.modules.hepatitis.domain.enums.Detect;
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
public class HepatitisCTestDto implements Serializable {
    private Detect hcvRNA;
    private String hcRnaValue;
    private String hepatitisCoinfection;
    private String commobidities;
    private String multipleInfection;
}
