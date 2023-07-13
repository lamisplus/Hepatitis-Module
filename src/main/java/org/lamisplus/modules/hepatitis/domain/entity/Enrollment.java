package org.lamisplus.modules.hepatitis.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "hepatitis_enrollment")
public class Enrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "uuid")
    private String uuid;
    @Column(name = "hospital_number")
    private String hospitalNo;
    @Column(name = "surname")
    private String surname;
    @Column(name = "other_name")
    private String otherName;
    @Column(name = "phone_number")
    private String phone;
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
    @Column(name = "date_of_birth")
    private String dob;
    @Column(name = "age")
    private Integer age;
    @Column(name = "occupation")
    private String occupation;
    @Column(name = "marital_status")
    private String maritalStatus;
    @Column(name = "education")
    private String education;
    @Column(name = "entry_point")
    private String entryPoint;
    @Column(name = "weight")
    private String weight;
    @Column(name = "height")
    private String height;
    @Column(name = "bmi")
    private String bmi;
    @Column(name = "hepatitis_b")
    private String hepatitisB;
    @Column(name = "breast_feeding")
    private String breastFeeding;
    @Column(name = "history_of_drug_abuse")
    private String historyOfAbuse;
    @Column(name = "screening_hepatitis_b")
    private String screenHepatitisB;
    @Column(name = "screening_date_of_hepatitis_b")
    private LocalDate screenDateOfHepB;
    @Column(name = "screening_of_hepatitis_c")
    private String screenHepatitisC;
}
