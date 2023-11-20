package org.lamisplus.modules.hepatitis.domain.dto.request;

import org.lamisplus.modules.hepatitis.domain.enums.Detect;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotEmpty;
import java.io.Serializable;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class HepatitisCTestDto implements Serializable {
    private Detect hcvRNA;
    @NotEmpty(message = "hcRnaValue can not be empty")
    private String hcRnaValue;
    @NotEmpty(message = "hepatitisCoinfection can not be empty")
    private String hepatitisCoinfection;
    @NotEmpty(message = "commobidities can not be empty")
    private String commobidities;
    @NotEmpty(message = "multipleInfection can be empty")
    private String multipleInfection;
}
