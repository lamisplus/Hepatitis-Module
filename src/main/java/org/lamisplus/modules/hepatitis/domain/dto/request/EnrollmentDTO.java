package org.lamisplus.modules.hepatitis.domain.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

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

    @NotBlank(message = "surname is mandatory")
    private String surname;

    @NotBlank(message = "other name is mandatory")
    private String otherName;

    @NotBlank(message = "phone number is mandatory")
    private String phone;

    @NotBlank(message = "residential address is mandatory")
    private String residentialAddress;

    @NotBlank(message = "landmark is mandatory")
    private String landmark;

    @NotBlank(message = "country is mandatory")
    private String country;

    @NotBlank(message = "state is mandatory")
    private String state;

    @NotBlank(message = "lga is mandatory")
    private String lga;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @NotBlank(message = "hospital number is mandatory")
    private LocalDate dateOfBirth;

    private Integer age;

    @NotBlank(message = "sex is mandatory")
    private String sex;

    @NotBlank(message = "occupation is mandatory")
    private String occupation;

    @NotBlank(message = "marital status is mandatory")
    private String maritalStatus;

    @NotBlank(message = "education is mandatory")
    private String education;

    @NotBlank(message = "care entry point is mandatory")
    private String careEntryPoint;

    @NotBlank(message = "weight is mandatory")
    private String weight;

    @NotBlank(message = "height is mandatory")
    private String height;

    @NotBlank(message = "bmi is mandatory")
    private String bmi;

    @NotBlank(message = "pregnancy is mandatory")
    private Boolean pregnancy;

    @NotBlank(message = "breast feeding is mandatory")
    private Boolean breastFeeding;

    @NotBlank(message = "history of drug abuse is mandatory")
    private Boolean historyOfUsingAbusedSubstance;

    @NotBlank(message = "hepatitis B is mandatory")
    private String hepatitisBhbsAg;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @NotBlank(message = "screening date of hepatitis B is mandatory")
    private LocalDate dateOfHepatitisBPositiveScreening;

    @NotBlank(message = "hepatitis C is mandatory")
    private String hepatitisChcvAb;


}

