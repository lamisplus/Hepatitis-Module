package org.lamisplus.modules.hepatitis.domain.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.lamisplus.modules.hepatitis.domain.enums.Detect;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotEmpty;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class HepatitisSVR12TestingDto {
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dateTested;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Detect hcvRNA;
    @NotEmpty(message = "hcvRNAValue can not be empty")
    private String hcvRNAValue;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate retreatmentDateTested;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Detect retreatmentHcvRNA;
    @NotEmpty(message = "retreatmentHcvRNAValue can not be empty")
    private String retreatmentHcvRNAValue;
}
