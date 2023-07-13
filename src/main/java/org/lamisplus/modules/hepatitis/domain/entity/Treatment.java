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
@Table(name = "hepatitis_treatment")
public class Treatment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "enrollment_id")
    private int enrollmentId;
    @Column(name = "experience_hepatitis_b")
    private String experienceHepB;
    @Column(name = "new_regime_hepatitis_b")
    private String newRegimeHepB;
    @Column(name = "history_adverse_effect_hepatitis_b")
    private String historyAdverseEffectHepB;
    @Column(name = "new_regime_switch_hepatitis_b")
    private String newRegimeSwitchHepB;
    @Column(name = "date_started_hepatitis_b")
    private LocalDate dateStartedHepB;
    @Column(name = "adverse_effect_reported_hepatitis_b")
    private String adverseEffectReportedHepB;
    @Column(name = "reason_for_switch_hepatitis_b")
    private String reasonForSwitchHepB;
    @Column(name = "date_stop_hepatitis_b")
    private LocalDate dateStoppedHepB;
    @Column(name = "reason_for_treatment_hepatitis_b")
    private String reasonForTreatmentHepB;
    @Column(name = "comment_hepatitis_b")
    private String commentHepB;
    @Column(name = "experience_hepatitis_c")
    private String experienceHepC;
    @Column(name = "date_started_hepatitis_c")
    private LocalDate dateStartedHepC;
    @Column(name = "date_completed_hepatitis_c")
    private LocalDate dateCompletedHepC;
    @Column(name = "prescribed_hepatitis_c")
    private String prescribedHepC;
    @Column(name = "history_adverse_effect_hepatitis_c")
    private String historyAdverseEffectHepC;
    @Column(name = "new_regime_switch_hepatitis_c")
    private String newRegimeSwitchHepC;
    @Column(name = "date_started_switch_hepatitis_c")
    private LocalDate dateStartedSwitchHepC;
    @Column(name = "date_stop_switch_hepatitis_c")
    private LocalDate dateStoppedSwitchHepC;
    @Column(name = "prescribed_switch_hepatitis_c")
    private String prescribedSwitchHepC;
    @Column(name = "adverse_effect_hepatitis_c")
    private String adverseEffectHepC;
    @Column(name = "date_tested_svr")
    private LocalDate dateTestedSVR;
    @Column(name = "hvc_rna_svr")
    private String hvcRnaSVR;
    @Column(name = "hvc_rna_svr_value")
    private String hvcRnaSVRValue;
    @Column(name = "retreatment_date_tested_svr")
    private LocalDate retreatmentDateTested;
    @Column(name = "retreatment_hcv_rna_svr")
    private String retreatmentHcvRnaSVR;
    @Column(name = "new_regime_hcv")
    private String newRegimeHCV;
    @Column(name = "new_prescribed_duration_hcv")
    private String newPrescribedDurationHCV;
    @Column(name = "date_started_hcv")
    private LocalDate dateStartedHCV;
    @Column(name = "date_stopped_hcv")
    private LocalDate dateStoppedHCV;
    @Column(name = "adverse_effect_hcv")
    private String adverseEffectHCV;
    @Column(name = "hcv_genotype")
    private String HCVGenotype;
}
