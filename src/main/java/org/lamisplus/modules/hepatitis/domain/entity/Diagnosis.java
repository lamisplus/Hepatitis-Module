package org.lamisplus.modules.hepatitis.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.lamisplus.modules.hepatitis.domain.constants.Enum.Detect;
import org.lamisplus.modules.hepatitis.domain.constants.Enum.ReactiveState;
import org.lamisplus.modules.hepatitis.domain.constants.status.BiopsyDiagnosis;
import org.lamisplus.modules.hepatitis.domain.constants.status.CoInfection;
import org.lamisplus.modules.hepatitis.domain.constants.status.LiverBiopsyStage;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "hepatitis_diagnosis")
public class Diagnosis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "enrollment_id")
    private int enrollmentId;

    @Column(name = "date_hbv_test_requested")
    private LocalDate dateHBVTestRequested;

    @Column(name = "date_hbv_sample_requested")
    private LocalDate dateHBVSampleRequested;

    @Column(name = "date_hbv_dna_result_reported")
    private LocalDate dateHBVDNAResultReported;

    @Column(name = "hbv_dna")
    private Detect hbvDNA;

    @Column(name = "hbsag_qualification")
    private String hbsagQuantification;

    @Column(name = "hbe_ag")
    private ReactiveState hbeAg;

    @Column(name = "anti_hdv")
    private ReactiveState antiHDV;

    @Column(name = "treatment_eligible")
    private boolean treatmentEligible;

    @Column(name = "pmtct_eligible")
    private boolean pmtctEligible;

    @Column(name = "comment")
    private String comment;

    @Column(name = "hcv_rna")
    private Detect hcvRNA;

    @Column(name = "hepatitis_coinfection")
    private CoInfection hepatitisCoinfection;

    @Column(name = "commobidities")
    private String commobidities;

    @Column(name = "ast")
    private String ast;

    @Column(name = "alt")
    private String alt;

    @Column(name = "pst")
    private String pst;

    @Column(name = "total_bilirubin")
    private String totalBilirubin;

    @Column(name = "direct_bilirubin")
    private String directBilirubin;

    @Column(name = "apri_score")
    private String apriScore;

    @Column(name = "fib_4")
    private String fib4;

    @Column(name = "prothrombin_time")
    private String prothrombinTime;

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

    @Column(name = "acites")
    private boolean acites;

    @Column(name = "grade_of_encephalopathy")
    private int gradeOfEncephalopathy;

    @Column(name = "child_pugh_score")
    private String childPughScore;

    @Column(name = "liver_biopsy_stage")
    private LiverBiopsyStage liverBiopsyStage;

    @Column(name = "diagnosis")
    private BiopsyDiagnosis diagnosis;
}
