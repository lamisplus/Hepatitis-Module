package org.lamisplus.modules.hepatitis.service.mapper;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.hepatitis.domain.dto.request.ClinicalParametersDto;
import org.lamisplus.modules.hepatitis.domain.dto.request.HepatitisBTestDto;
import org.lamisplus.modules.hepatitis.domain.dto.request.HepatitisBTreatmentDto;
import org.lamisplus.modules.hepatitis.domain.dto.request.HepatitisCTestDto;
import org.lamisplus.modules.hepatitis.domain.dto.request.HepatitisCTreatmentDto;
import org.lamisplus.modules.hepatitis.domain.dto.request.HepatitisDiagnosisDto;
import org.lamisplus.modules.hepatitis.domain.dto.request.HepatitisEnrollmentDto;
import org.lamisplus.modules.hepatitis.domain.dto.request.HepatitisScreeningDto;
import org.lamisplus.modules.hepatitis.domain.dto.request.HepatitisTreatmentDto;
import org.lamisplus.modules.hepatitis.domain.entity.HepatitisDiagnosis;
import org.lamisplus.modules.hepatitis.domain.entity.HepatitisEnrollment;
import org.lamisplus.modules.hepatitis.domain.entity.HepatitisTreatment;
import org.lamisplus.modules.hepatitis.domain.enums.Sex;
import org.lamisplus.modules.hepatitis.domain.enums.Status;
import lombok.RequiredArgsConstructor;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.springframework.stereotype.Component;

import java.util.UUID;


@Slf4j
@RequiredArgsConstructor
@Component
public class ModelMapper {
    public HepatitisEnrollment mapToEnrollment(HepatitisEnrollmentDto enrollmentDto, Person person) {
        String coreEntryPoint = enrollmentDto.getCoreEntryPoint();
        String pregnancy = enrollmentDto.getPregnancy().toUpperCase();
        Status pregnancyEnum;
        if(pregnancy.equals("YES") || pregnancy.equals("NO")) {
            pregnancyEnum = Status.valueOf(pregnancy);
        } else {
            pregnancyEnum = Status.NO;
        }

        Double weight = enrollmentDto.getWeight();
        Double height = enrollmentDto.getHeight();
        Double bmi = enrollmentDto.getBmi();
        String hepatitisB = enrollmentDto.getHepatitisB();

        String breastfeeding = enrollmentDto.getBreastfeeding().toUpperCase();
        Status breastfeedingEnum;
        if(breastfeeding.equals("YES") || breastfeeding.equals("NO")) {
            breastfeedingEnum = Status.valueOf(breastfeeding);
        } else {
            breastfeedingEnum = Status.NO;
        }

        String historyOfUsingAbusedSubstance = enrollmentDto.getHistoryOfUsingAbusedSubstance();
        Status historyOfUsingAbusedSubstanceEnum;

        if(historyOfUsingAbusedSubstance.equals("NO") || historyOfUsingAbusedSubstance.equals("YES")) {
            historyOfUsingAbusedSubstanceEnum = Status.valueOf(pregnancy);
        } else {
            historyOfUsingAbusedSubstanceEnum = Status.NO;
        }

        ObjectMapper objectMapper = new ObjectMapper();
        HepatitisScreeningDto hepatitisScreeningDto = enrollmentDto.getScreening();
        JsonNode screeningNode = null;
        if(hepatitisScreeningDto != null) {
            screeningNode = objectMapper.convertValue(hepatitisScreeningDto, JsonNode.class);
        }

        HepatitisEnrollment hepatitisEnrollment = HepatitisEnrollment.builder()
                .personUuid(person.getUuid())
                .coreEntryPoint(coreEntryPoint)
                .sex(Sex.valueOf(person.getSex().toUpperCase()))
                .pregnancy(pregnancyEnum)
                .weight(weight)
                .height(height)
                .bmi(bmi)
                .hepatitisB(hepatitisB)
                .breastfeeding(breastfeedingEnum)
                .historyOfUsingAbusedSubstance(historyOfUsingAbusedSubstanceEnum)
                .screening(screeningNode)
                .build();
        hepatitisEnrollment.setUuid(UUID.randomUUID().toString());

        return hepatitisEnrollment;
    }

    public HepatitisDiagnosis mapToDiagnosis(HepatitisDiagnosisDto diagnosisDto) {
        ObjectMapper objectMapper = new ObjectMapper();

        HepatitisBTestDto hepatitisBTestDto = diagnosisDto.getHepatitisBTest();

        JsonNode hepatitisBNode = null;
        if(hepatitisBTestDto != null) {
            hepatitisBNode = objectMapper.convertValue(hepatitisBTestDto, JsonNode.class);
        }

        HepatitisCTestDto hepatitisCTestDto = diagnosisDto.getHepatitisCTest();
        JsonNode hepatitisCNode = null;
        if(hepatitisCTestDto != null) {
            hepatitisCNode = objectMapper.convertValue(hepatitisCTestDto, JsonNode.class);
        }


        ClinicalParametersDto clinicalParametersDto = diagnosisDto.getClinicalParameters();
        JsonNode clinicalParametersNode = null;
        if(clinicalParametersDto != null) {
            clinicalParametersNode = objectMapper.convertValue(clinicalParametersDto, JsonNode.class);
        }

        HepatitisDiagnosis hepatitisDiagnosis = HepatitisDiagnosis.builder()
                .hepatitisBTest(hepatitisBNode)
                .hepatitisCTest(hepatitisCNode)
                .clinicalParameters(clinicalParametersNode)
                .build();
        hepatitisDiagnosis.setUuid(UUID.randomUUID().toString());

        return hepatitisDiagnosis;
    }

    public HepatitisTreatment mapToTreatment(HepatitisTreatmentDto treatmentDto) {
        ObjectMapper objectMapper = new ObjectMapper();

        HepatitisBTreatmentDto hepatitisBTreatment = treatmentDto.getHepatitisBTreatment();
        JsonNode hepatitisBNode = null;
        if(hepatitisBTreatment != null) {
            hepatitisBNode = objectMapper.convertValue(hepatitisBTreatment, JsonNode.class);
        }

        HepatitisCTreatmentDto hepatitisCTreatment = treatmentDto.getHepatitisCTreatment();
        JsonNode hepatitisCNode = null;
        if(hepatitisCTreatment != null) {
            hepatitisCNode = objectMapper.convertValue(hepatitisCTreatment, JsonNode.class);
        }

        HepatitisTreatment hepatitisTreatment = HepatitisTreatment.builder()
                .hepatitisBTreatmentDto(hepatitisBNode)
                .hepatitisCTreatmentDto(hepatitisCNode)
                .build();
        hepatitisTreatment.setUuid(UUID.randomUUID().toString());

        return hepatitisTreatment;
    }
}
