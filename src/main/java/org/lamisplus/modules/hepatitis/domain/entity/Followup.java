package org.lamisplus.modules.hepatitis.domain.entity;

import jdk.nashorn.internal.objects.annotations.Property;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.lamisplus.modules.hepatitis.domain.constants.status.BiopsyDiagnosis;
import org.lamisplus.modules.hepatitis.domain.constants.status.Outcome;
import org.springframework.data.annotation.Id;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "hepatitis_followup")
public class Followup {
    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "enrollment_id")
    private int enrollmentId;

    @Column(name = "date_of_visit")
    private LocalDate dateOfVisit;

    @Column(name = "blood_pressure")
    private String bloodPressure;

    @Column(name = "weight")
    private String weight;

    @Column(name = "height")
    private String height;

    @Column(name = "bmi")
    private String bmi;

    @Column(name = "hbeAg")
    private String hbeAg;

    @Column(name = "hbv_DNA")
    private String hbvDNA;

    @Column(name = "hbs_Ag_Quantification")
    private String hbsAgQuantification;

    @Column(name = "ast")
    private String ast;

    @Column(name = "alt")
    private String alt;

    @Column(name = "plt")
    private String plt;

    @Column(name = "total_bilirubin")
    private String totalBilirubin;

    @Column(name = "albumin")
    private String albumin;

    @Column(name = "direct_bilirubin")
    private String directBilirubin;

    @Column(name = "apri_score")
    private String apriScore;

    @Column(name = "fib_-4")
    private String fib4;

    @Column(name = "prothrombin_time_/INR")
    private String prothrombinTimeINR;

    @Column(name = "urea")
    private String urea;

    @Column(name = "creatinine")
    private String creatinine;

    @Column(name = "afp")
    private String afp;

    @Column(name = "fibroscan")
    private String fibroscan;

    @Column(name = "ultrasound_scan")
    private String ultrasoundScan;

    @Column(name = "ct_scan")
    private String ctScan;

    @Column(name = "ascites")
    private String ascites;

    @Column(name = "encephalo_pathy")
    @Property
    private int encephaloPathy;

    @Column(name = "child_pugh_score")
    private String childPughScore;

    @Column(name = "clinical_diagnosis")
    private BiopsyDiagnosis clinicalDiagnosis;

    @Column(name = "treatment_regimen_used")
    private String treatmentRegimenUsed;

    @Column(name = "next_appointment_date")
    private LocalDate nextAppointmentDate;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "outcome")
    private Outcome outcome;

    @Column(name = "clinical_signature")
    private String clinicalSignature;


}
