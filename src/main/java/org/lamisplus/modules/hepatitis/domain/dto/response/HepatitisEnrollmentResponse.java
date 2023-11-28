package org.lamisplus.modules.hepatitis.domain.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.lamisplus.modules.hepatitis.domain.dto.request.HepatitisScreeningDto;
import org.lamisplus.modules.hepatitis.domain.enums.Sex;
import org.lamisplus.modules.hepatitis.domain.enums.Status;
import org.lamisplus.modules.patient.domain.dto.PersonResponseDto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class HepatitisEnrollmentResponse {

    private String personUuid;

    private PersonResponseDto personResponseDto;

    @NotEmpty(message  = "care entry point can not be empty")
    private String careEntryPoint;

    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Sex sex;

    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Status pregnancy;

    @NotNull(message = "weight can not be null")
    @Positive
    private Double weight;

    @NotNull(message = "height can not be null")
    @Positive
    private Double height;

    @Positive
    private Double bmi;

    @NotEmpty(message = "hepatitisB can not be empty")
    private String hepatitisB;

    @NotEmpty(message = "breastfeeding can not be empty")
    private Status Breastfeeding;

    private Status historyOfUsingAbusedSubstance;

    private HepatitisScreeningDto screening;
}
