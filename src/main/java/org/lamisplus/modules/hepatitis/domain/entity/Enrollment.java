package org.lamisplus.modules.hepatitis.domain.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.lamisplus.modules.hepatitis.domain.constants.Enum.ReactiveState;
import org.lamisplus.modules.hepatitis.domain.constants.Enum.Sex;
import org.lamisplus.modules.hepatitis.domain.constants.status.CareEntryPoint;
import org.lamisplus.modules.hepatitis.domain.constants.status.LevelOfEducation;
import org.lamisplus.modules.hepatitis.domain.constants.status.MaritalStatus;
import org.lamisplus.modules.hepatitis.domain.constants.status.Occupation;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "hepatitis_enrollment")
public class Enrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "uuid")
    private UUID uuid;

    @Column(name = "hospital_number")
    private String hospitalNo;

    @Column(name = "surname")
    private String surname;

    @Column(name = "other_name")
    private String otherName;

    @Column(name = "phone_number")
    private String phone;

    @Column(name = "sex")
    private Sex sex;

    @Column(name = "address")
    private String address;

    @Column(name = "landmark")
    private String landmark;

    @Column(name = "country")
    private String country;

    @Column(name = "state")
    private String state;

    @Column(name = "lga")
    private String lga;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name = "date_of_birth")
    private LocalDate dob;

    @Column(name = "age")
    private Integer age;

    @Column(name = "occupation")
    private Occupation occupation;

    @Column(name = "marital_status")
    private MaritalStatus maritalStatus;

    @Column(name = "education")
    private LevelOfEducation education;

    @Column(name = "entry_point")
    private CareEntryPoint entryPoint;

    @Column(name = "weight")
    private String weight;

    @Column(name = "height")
    private String height;

    @Column(name = "bmi")
    private String bmi;

    @Column(name = "hepatitis_b")
    private ReactiveState hepatitisBhBsAg;

    @Column(name = "pregnant")
    private Boolean pregnant;

    @Column(name = "breast_feeding")
    private Boolean breastFeeding;

    @Column(name = "history_of_drug_abuse")
    private Boolean historyOfAbuse;

//    @Column(name = "screening_hepatitis_b")
//    private ReactiveState screenHepatitisB;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name = "screening_date_of_hepatitis_b")
    private LocalDate screenDateOfHepB;

    @Column(name = "screening_of_hepatitis_c")
    private ReactiveState screenHepatitisC;
}
