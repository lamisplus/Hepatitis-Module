package org.lamisplus.modules.hepatitis.service.mapper;

import org.lamisplus.modules.hepatitis.domain.constants.Enum.Detect;
import org.lamisplus.modules.hepatitis.domain.constants.Enum.ReactiveState;
import org.lamisplus.modules.hepatitis.domain.constants.Enum.Sex;
import org.lamisplus.modules.hepatitis.domain.constants.status.*;
import org.lamisplus.modules.hepatitis.domain.dto.request.DiagnosisDTO;
import org.lamisplus.modules.hepatitis.domain.dto.request.EnrollmentDTO;
import org.lamisplus.modules.hepatitis.domain.dto.request.TreatmentDTO;
import org.lamisplus.modules.hepatitis.domain.entity.Diagnosis;
import org.lamisplus.modules.hepatitis.domain.entity.Enrollment;
import org.lamisplus.modules.hepatitis.domain.entity.Treatment;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class HepatitisMapper{
    public Enrollment mapEnrollmentDtoEntity(EnrollmentDTO dto) {
        Enrollment enrollment = new Enrollment();
        enrollment.setAge(dto.getAge());
        enrollment.setBmi(dto.getBmi());
        enrollment.setCountry(dto.getCountry());
        enrollment.setDob(dto.getDateOfBirth());
        enrollment.setAddress(dto.getResidentialAddress());
        enrollment.setEducation(LevelOfEducation.valueOf(dto.getEducation()));
        enrollment.setCountry(dto.getCountry());
        enrollment.setBreastFeeding(dto.getBreastFeeding());
        enrollment.setEntryPoint(CareEntryPoint.valueOf(dto.getCareEntryPoint()));
        enrollment.setHepatitisBhBsAg(ReactiveState.valueOf(dto.getHepatitisBhbsAg()));
        enrollment.setHistoryOfAbuse(dto.getHistoryOfUsingAbusedSubstance());
        enrollment.setHeight(dto.getHeight());
        enrollment.setHospitalNo(dto.getHospitalNumber());
        enrollment.setLandmark(dto.getLandmark());
        enrollment.setLga(dto.getLga());
        enrollment.setMaritalStatus(MaritalStatus.valueOf(dto.getMaritalStatus()));
        enrollment.setOccupation(Occupation.valueOf(dto.getOccupation()));
        enrollment.setOtherName(dto.getOtherName());
        enrollment.setPregnant(dto.getPregnancy());
        enrollment.setPhone(dto.getPhone());
        enrollment.setSex(Sex.valueOf(dto.getSex()));
        enrollment.setScreenDateOfHepB(dto.getDateOfHepatitisBPositiveScreening());
        enrollment.setScreenHepatitisC(ReactiveState.valueOf(dto.getHepatitisChcvAb()));
        enrollment.setWeight(dto.getWeight());
        enrollment.setUuid(UUID.randomUUID());
        return enrollment;

    }

    public Diagnosis mapDiagnosisDtoEntity(DiagnosisDTO dto, Enrollment enrollment) {
        Diagnosis diagnosis = new Diagnosis();
        diagnosis.setDiagnosis(BiopsyDiagnosis.valueOf(dto.getDiagnosis()));
        diagnosis.setAlt(dto.getAlt());
        diagnosis.setAfp(dto.getAfp());
        diagnosis.setAscites(dto.getAscites());
        diagnosis.setAntiHDV(ReactiveState.valueOf(dto.getAntiHdv()));
        diagnosis.setAst(dto.getAst());
        diagnosis.setComment(dto.getComment());
        diagnosis.setApriScore(dto.getApriScore());
        diagnosis.setChildPughScore(dto.getChildPughScore());
        diagnosis.setCommobidities(dto.getCommobidities());
        diagnosis.setCreatinine(dto.getCreatinine());
        diagnosis.setDateHBVDNAResultReported(dto.getDateHbvDnaResultReported());
        diagnosis.setDateHBVSampleRequested(dto.getDateHbvSampleCollected());
        diagnosis.setDateHBVTestRequested(dto.getDateHbvTestRequested());
        diagnosis.setDirectBilirubin(dto.getDirectBilirubin());
        diagnosis.setFib4(dto.getFib4());
        diagnosis.setFibroscan(dto.getFibroscan());
        diagnosis.setGradeOfEncephalopathy(dto.getGradeOfEncephalopathy());
        diagnosis.setHbeAg(ReactiveState.valueOf(dto.getHbeAg()));
        diagnosis.setHbsagQuantification(dto.getHbsAgQuantification());
        diagnosis.setHcvRNA(Detect.valueOf(dto.getHcvRna()));
        diagnosis.setHbvDNA(Detect.valueOf(dto.getHbvDnaValue()));
        diagnosis.setHepatitisCoinfection(CoInfection.valueOf(dto.getHepatitisCoInfection()));
        diagnosis.setLiverBiopsyStage(LiverBiopsyStage.valueOf(dto.getLiverBiopsyStage()));
        diagnosis.setPmtctEligible(dto.getPmtctEligible());
        diagnosis.setProthrombinTime(dto.getProthrombinTime());
        diagnosis.setPst(dto.getPlt());
        diagnosis.setTotalBilirubin(dto.getTotalBilirubin());
        diagnosis.setTreatmentEligible(dto.getTreatmentEligible());
        diagnosis.setUltrasoundScan(dto.getUltrasoundScan());
        diagnosis.setUrea(dto.getUrea());
        diagnosis.setEnrollmentId(enrollment);
        return diagnosis;
    }

    public Treatment mapTreatmentDtoEntity(TreatmentDTO dto, Enrollment enrollment) {
        Treatment treatment = new Treatment();
        treatment.setCommentHepB(dto.getHbvReasonsForTreatmentComment());
        treatment.setAdverseEffectHCV(dto.getHcvAdverseEventReported());
        treatment.setDateCompletedHepC(dto.getHcvDateCompleted());
        treatment.setDateStartedHCV(dto.getHcvDateStarted());
        treatment.setDateStartedHepB(dto.getHbvDateStarted());
        treatment.setDateStartedHepC(dto.getHcvDateStarted());
        treatment.setAdverseEffectHepC(dto.getHcvRetreatmentAdverseEffect());
        treatment.setAdverseEffectReportedHepB(dto.getHbvHistoryOfAdverseEffect());
        treatment.setDateStartedSwitchHepC(dto.getHcvRegimeSwitchDateStarted());
        treatment.setDateStoppedSwitchHepC(dto.getHcvRegimeSwitchDateStopped());
        treatment.setDateTestedSVR(dto.getSvr12TestingDateStarted());
        treatment.setExperienceHepB(dto.getHbvTreatmentExperience());
        treatment.setExperienceHepC(dto.getHcvTreatmentExperience());
        treatment.setHCVGenotype(dto.getHcvRetreatmentHcvGenotype());
        treatment.setDateStoppedHCV(dto.getHcvRetreatmentDateStopped());
        treatment.setHistoryAdverseEffectHepB(dto.getHbvHistoryOfAdverseEffect());
        treatment.setHistoryAdverseEffectHepC(dto.getHcvHistoryOfAdverseEffect());
        treatment.setHvcRnaSVR(Detect.valueOf(dto.getSvr12RetreatmentHcvRna()));
        treatment.setHvcRnaSVRValue(dto.getSvr12RetreatmentHcvRnaValue());
        treatment.setNewPrescribedDurationHCV(PrescribedDuration.valueOf(dto.getHcvPrescribedDuration()));
        treatment.setNewRegimeHCV(Detect.valueOf(dto.getHcvNewRegimen()));
        treatment.setNewRegimeSwitchHepB(Detect.valueOf(dto.getHbvRegimeSwitchNewRegimen()));
        treatment.setNewRegimeSwitchHepC(Detect.valueOf(dto.getHcvRetreatmentNewRegime()));
        treatment.setPrescribedHepC(PrescribedDuration.valueOf(dto.getHcvPrescribedDuration()));
        treatment.setPrescribedSwitchHepC(PrescribedDuration.valueOf(dto.getHcvRetreatmentPrescribedDuration()));
        treatment.setReasonForSwitchHepB(dto.getHbvRegimeSwitchReason());
        treatment.setRetreatmentDateTested(dto.getSvr12RetreatmentDateTested());
        treatment.setRetreatmentHcvRnaSVR(dto.getSvr12RetreatmentHcvRna());
        treatment.setEnrollmentId(enrollment);
        return treatment;
    }
}
