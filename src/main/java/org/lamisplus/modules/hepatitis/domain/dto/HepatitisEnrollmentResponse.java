package org.lamisplus.modules.hepatitis.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.lamisplus.modules.hepatitis.domain.enums.Sex;
import org.lamisplus.modules.hepatitis.domain.enums.Status;
import org.lamisplus.modules.patient.domain.dto.PersonDto;
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

    @NotEmpty(message  = "coreEntryPoint can be empty")
    private String coreEntryPoint;

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

    private String hepatitisB;

    private Status Breastfeeding;

    private Status historyOfUsingAbusedSubstance;

    private HepatitisScreeningDto screening;
}
