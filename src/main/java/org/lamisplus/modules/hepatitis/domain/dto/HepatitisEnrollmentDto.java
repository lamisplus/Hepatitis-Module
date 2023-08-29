package org.lamisplus.modules.hepatitis.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.lamisplus.modules.hepatitis.domain.enums.Sex;
import org.lamisplus.modules.hepatitis.domain.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.lamisplus.modules.patient.domain.dto.PersonDto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class HepatitisEnrollmentDto implements Serializable {

    private String personUuid;

    private PersonDto personDto;

    @NotEmpty(message  = "coreEntryPoint can be null OR empty")
    private String coreEntryPoint;

    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Sex sex;

    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Status pregnancy;

    @NotEmpty(message  = "coreEntryPoint can be null OR empty")
    @Positive
    private Double weight;

    @NotEmpty(message  = "coreEntryPoint can be null OR empty")
    @Positive
    private Double height;

    @Positive
    private Double bmi;

    private String hepatitisB;

    private Status Breastfeeding;

    private Status historyOfUsingAbusedSubstance;

    private HepatitisScreeningDto screening;

}
