package org.lamisplus.modules.hepatitis.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.lamisplus.modules.hepatitis.domain.constants.Enum.Detect;
import org.lamisplus.modules.hepatitis.domain.constants.Enum.ReactiveState;
import org.lamisplus.modules.hepatitis.domain.constants.Enum.Sex;
import org.lamisplus.modules.hepatitis.domain.constants.status.HcvTestType;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "hepatitis_laboratory_register")
public class LaboratoryRegister {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "facility")
    private String facility;

    @Column(name = "state")
    private String state;

    @Column(name = "lga")
    private String lga;

    @Column(name = "ward")
    private String ward;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "patient_name")
    private String patientName;

    @Column(name = "hospital_number")
    private String hospitalNumber;

    @Column(name = "age")
    private int age;

    @Column(name = "sex")
    private Sex sex;

    @Column(name = "clinic")
    private String clinic;

    @Column(name = "hbv_screening")
    private ReactiveState hbvScreening;

    @Column(name = "hbc_ab_Total")
    private ReactiveState hbcAbTotal;

    @Column(name = "hbs_ab")
    private ReactiveState hbsAb;

    @Column(name = "hbs_Ag_quantification")
    private String hbsAgQuantification;

    @Column(name = "hbe_ag")
    private ReactiveState hbeAg;

    @Column(name = "anti_hdv")
    private ReactiveState antiHDV;

    @Column(name = "hbv_dna")
    private String hbvDNA;

    @Column(name = "hcv_screening")
    private ReactiveState hcvScreening;

    @Column(name = "type_of_hcv_rna_test")
    private HcvTestType typeOfHcvRnaTest;

    @Column(name = "hepatitisC_rna_testing")
    private Detect hepCRnaTesting;

    @Column(name = "hcv_rna")
    private String hcvRNA;

    @Column(name = "hiv_status")
    private ReactiveState hivStatus;

}
