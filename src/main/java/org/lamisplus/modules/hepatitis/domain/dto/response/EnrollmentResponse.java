package org.lamisplus.modules.hepatitis.domain.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EnrollmentResponse {
    private UUID uuid;

    private String hospitalNumber;

    private String surname;

    private String otherName;

    private String phone;

    private String residentialAddress;

    private String landmark;

    private String country;

    private String state;

    private String lga;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
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
