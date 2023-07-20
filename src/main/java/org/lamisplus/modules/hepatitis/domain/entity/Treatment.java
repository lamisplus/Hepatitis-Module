package org.lamisplus.modules.hepatitis.domain.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.lamisplus.modules.hepatitis.domain.constants.Enum.Detect;
import org.lamisplus.modules.hepatitis.domain.constants.status.PrescribedDuration;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "hepatitis_treatment")
public class Treatment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne
    @JoinColumn(name = "enrollment_id", referencedColumnName = "uuid", nullable = false)
    private Enrollment enrollmentId;

    @Column(name = "experience_hepatitis_b")
    private Boolean experienceHepB;

    @Column(name = "new_regime_hepatitis_b")
    private String newRegimeHepB;

    @Column(name = "history_adverse_effect_hepatitis_b")
    private boolean historyAdverseEffectHepB;

    @Column(name = "new_regime_switch_hepatitis_b")
    private Detect newRegimeSwitchHepB;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name = "date_started_hepatitis_b")
    private LocalDate dateStartedHepB;

    @Column(name = "adverse_effect_reported_hepatitis_b")
    private Boolean adverseEffectReportedHepB;

    @Column(name = "reason_for_switch_hepatitis_b")
    private String reasonForSwitchHepB;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name = "date_stop_hepatitis_b")
    private LocalDate dateStoppedHepB;

    @Column(name = "reason_for_treatment_hepatitis_b")
    private String reasonForTreatmentHepB;

    @Column(name = "comment_hepatitis_b")
    private String commentHepB;

    @Column(name = "experience_hepatitis_c")
    private Boolean experienceHepC;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name = "date_started_hepatitis_c")
    private LocalDate dateStartedHepC;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name = "date_completed_hepatitis_c")
    private LocalDate dateCompletedHepC;

    @Column(name = "prescribed_hepatitis_c")
    private PrescribedDuration prescribedHepC;

    @Column(name = "history_adverse_effect_hepatitis_c")
    private Boolean historyAdverseEffectHepC;

    @Column(name = "new_regime_switch_hepatitis_c")
    private Detect newRegimeSwitchHepC;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name = "date_started_switch_hepatitis_c")
    private LocalDate dateStartedSwitchHepC;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name = "date_stop_switch_hepatitis_c")
    private LocalDate dateStoppedSwitchHepC;

    @Column(name = "prescribed_switch_hepatitis_c")
    private PrescribedDuration prescribedSwitchHepC;

    @Column(name = "adverse_effect_hepatitis_c")
    private Boolean adverseEffectHepC;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name = "date_tested_svr")
    private LocalDate dateTestedSVR;

    @Column(name = "hvc_rna_svr")
    private Detect hvcRnaSVR;

    @Column(name = "hvc_rna_svr_value")
    private String hvcRnaSVRValue;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name = "retreatment_date_tested_svr")
    private LocalDate retreatmentDateTested;

    @Column(name = "retreatment_hcv_rna_svr")
    private String retreatmentHcvRnaSVR;

    @Column(name = "new_regime_hcv")
    private Detect newRegimeHCV;

    @Column(name = "new_prescribed_duration_hcv")
    private PrescribedDuration newPrescribedDurationHCV;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name = "date_started_hcv")
    private LocalDate dateStartedHCV;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name = "date_stopped_hcv")
    private LocalDate dateStoppedHCV;

    @Column(name = "adverse_effect_hcv")
    private String adverseEffectHCV;

    @Column(name = "HCVGenotype")
    private String HCVGenotype;
}
