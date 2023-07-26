package org.lamisplus.modules.hepatitis.service.mapper;

import org.lamisplus.modules.hepatitis.domain.constants.status.CareEntryPoint;
import org.lamisplus.modules.hepatitis.domain.dto.response.DiagnosisResponse;
import org.lamisplus.modules.hepatitis.domain.dto.response.EnrollmentResponse;
import org.lamisplus.modules.hepatitis.domain.dto.response.TreatmentResponse;
import org.lamisplus.modules.hepatitis.domain.entity.Diagnosis;
import org.lamisplus.modules.hepatitis.domain.entity.Enrollment;
import org.lamisplus.modules.hepatitis.domain.entity.Treatment;

public class HepatitisResponseMapper {
    public EnrollmentResponse mapEntityEnrollmentDTO(Enrollment enrollment){
        EnrollmentResponse dto = new EnrollmentResponse();
        dto.setCountry(enrollment.getCountry());
        dto.setDateOfBirth(enrollment.getDob());
        dto.setCareEntryPoint(String.valueOf(enrollment.getEntryPoint()));
        dto.setAge(enrollment.getAge());
        dto.setBmi(enrollment.getBmi());
        dto.setEducation(String.valueOf(enrollment.getEducation()));
        dto.setHeight(enrollment.getHeight());
        dto.setBreastFeeding(enrollment.getBreastFeeding());
        dto.setLga(enrollment.getLga());
        dto.setLandmark(enrollment.getLandmark());
        dto.setPhone(enrollment.getPhone());
        dto.setSex(String.valueOf(enrollment.getSex()));
        dto.setWeight(enrollment.getWeight());
        dto.setCountry(enrollment.getCountry());
        dto.setDateOfHepatitisBPositiveScreening(enrollment.getScreenDateOfHepB());
        dto.setHospitalNumber(enrollment.getHospitalNo());
        dto.setHepatitisBhbsAg(String.valueOf(enrollment.getHepatitisBhBsAg()));
        dto.setHepatitisChcvAb(String.valueOf(enrollment.getScreenHepatitisC()));
        dto.setHistoryOfUsingAbusedSubstance(enrollment.getHistoryOfAbuse());
        dto.setOccupation(String.valueOf(enrollment.getOccupation()));
        dto.setMaritalStatus(String.valueOf(enrollment.getMaritalStatus()));
        dto.setOtherName(enrollment.getOtherName());
        dto.setResidentialAddress(enrollment.getAddress());
        dto.setState(enrollment.getState());
        dto.setSurname(enrollment.getSurname());
        dto.setUuid(enrollment.getUuid());

        return dto;
    }

    public DiagnosisResponse mapEntityDiagnosisDTO(Diagnosis diagnosis){
        DiagnosisResponse dto = new DiagnosisResponse();
        dto.setAscites(diagnosis.getAscites());
        dto.setAlt(diagnosis.getAlt());
        dto.setAlbumin(diagnosis.getAlbumin());
        dto.setAfp(diagnosis.getAfp());
        dto.setAst(diagnosis.getAst());
        dto.setDiagnosis(String.valueOf(diagnosis.getDiagnosis()));
        dto.setComment(diagnosis.getComment());
        dto.setCommobidities(diagnosis.getCommobidities());
        dto.setApriScore(diagnosis.getApriScore());
        dto.setAntiHdv(String.valueOf(diagnosis.getAntiHDV()));
        dto.setCreatinine(String.valueOf(diagnosis.getCreatinine()));
        dto.setAltValue(diagnosis.getAltValue());
        dto.setCtScan(diagnosis.getCtScan());
        dto.setPlt(diagnosis.getPst());
        dto.setFibroscan(diagnosis.getFibroscan());
        dto.setUrea(diagnosis.getUrea());
        dto.setFib4(diagnosis.getFib4());
        dto.setHbeAg(String.valueOf(diagnosis.getHbeAg()));
        dto.setDirectBilirubin(diagnosis.getDirectBilirubin());
        dto.setTotalBilirubin(diagnosis.getTotalBilirubin());
        dto.setChildPughScore(diagnosis.getChildPughScore());
        dto.setUltrasoundScan(diagnosis.getUltrasoundScan());
        dto.setDateHbvDnaResultReported(diagnosis.getDateHBVDNAResultReported());
        dto.setPmtctEligible(diagnosis.getPmtctEligible());
        dto.setDateHbvSampleCollected(diagnosis.getDateHBVSampleRequested());
        dto.setDateHbvTestRequested(diagnosis.getDateHBVTestRequested());
        dto.setGradeOfEncephalopathy(diagnosis.getGradeOfEncephalopathy());
        dto.setHepatitisCoInfection(String.valueOf(diagnosis.getHepatitisCoinfection()));
        dto.setHbvDna(String.valueOf(diagnosis.getHbvDNA()));
        dto.setHbvDnaValue(diagnosis.getHbvDnaValue());
        dto.setProthrombinTime(diagnosis.getProthrombinTime());
        dto.setAstValue(diagnosis.getAstValue());
        dto.setHbsAgQuantification(diagnosis.getHbsagQuantification());
        dto.setHcvRna(String.valueOf(diagnosis.getHcvRNA()));
        dto.setLiverBiopsyStage(String.valueOf(diagnosis.getLiverBiopsyStage()));
        dto.setSeverityOfAscites(diagnosis.getSeverityOfAscites());
        dto.setSpecifyMultipleInfection(diagnosis.getSpecifyMultipleInfection());
        dto.setStagingDateForLiverBiopsy(diagnosis.getStagingDateForLiverBiopsy());
        dto.setTreatmentEligible(diagnosis.getTreatmentEligible());

        return dto;
    }

    public TreatmentResponse mapEntityTreatmentDTO(Treatment treatment){
        TreatmentResponse dto = new TreatmentResponse();
        dto.setHbvDateStarted(treatment.getDateStartedHepB());
        dto.setHbvNewRegimen(treatment.getNewRegimeHepB());
//        dto.setHbvHistoryOfAdverseEffect(treatment.get());
//        dto.setHbvPastTreatmentRegimen(treatment.getHbvPastTreatmentRegimen());

        return dto;
    }
}
