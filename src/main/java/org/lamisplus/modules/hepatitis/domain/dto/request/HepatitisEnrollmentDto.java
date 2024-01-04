package org.lamisplus.modules.hepatitis.domain.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
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

    private Long personId;

    private PersonDto personDto;

    private Long facilityId;

    @NotEmpty(message = "Care entry point can not be empty")
    private String careEntryPoint;

//    @JsonFormat(shape = JsonFormat.Shape.STRING)
//    private String sex;

//    @JsonFormat(shape = JsonFormat.Shape.STRING)
//    @NotNull(message = "Pregnancy status must either be YES or NO")
    private String pregnancy;

    @NotNull(message = "Weight value cannot be null or empty")
    @Positive(message = "weight cannot be negative")
    private Double weight;

    @NotNull(message = "Height cannot be null or empty")
    @Positive
    private Double height;

    @Positive(message = "BMI value cannot be zero or negative")
    private Double bmi;
    @NotEmpty(message = "HepatitisB cannot be empty")
    private String hepatitisB;

//    @NotEmpty(message = "Breastfeeding status must either be in the format YES or NO")
//    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private String Breastfeeding;

    @NotNull(message = "historyOfUsingAbusedSubstance must not be null")
    private String historyOfUsingAbusedSubstance;

    @NotNull(message = "Please add screening with: screening: { dateOfFirstHepatitisBPositiveScreening\": 2020-08-23, hepatitisC: '' }")
    private HepatitisScreeningDto screening;

}
