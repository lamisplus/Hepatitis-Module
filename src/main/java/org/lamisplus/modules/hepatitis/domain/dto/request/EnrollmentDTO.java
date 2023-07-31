package org.lamisplus.modules.hepatitis.domain.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.lamisplus.modules.hepatitis.domain.constants.status.CareEntryPoint;
import org.lamisplus.modules.hepatitis.domain.constants.status.LevelOfEducation;
import org.lamisplus.modules.hepatitis.domain.constants.status.MaritalStatus;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.util.UUID;
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EnrollmentDTO {

    private UUID uuid;

    @NotBlank(message = "hospital number is mandatory")
    private String hospitalNumber;

    @NotBlank(message = "hospital number is mandatory")
    private String surname;

    @NotBlank(message = "hospital number is mandatory")
    private String otherName;

    @NotBlank(message = "hospital number is mandatory")
    private String phone;

    @NotBlank(message = "hospital number is mandatory")
    private String residentialAddress;

    @NotBlank(message = "hospital number is mandatory")
    private String landmark;


    private String country;

    private String state;

    private String lga;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @NotBlank(message = "hospital number is mandatory")
    private LocalDate dateOfBirth;

    private Integer age;

    private String sex;

    private String occupation;

    private String maritalStatus;

    private String education;

    private String careEntryPoint;

    private String weight;

    private String height;

    private String bmi;

    private Boolean pregnancy;

    private Boolean breastFeeding;

    private Boolean historyOfUsingAbusedSubstance;

    private String hepatitisBhbsAg;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dateOfHepatitisBPositiveScreening;

    private String hepatitisChcvAb;


}

