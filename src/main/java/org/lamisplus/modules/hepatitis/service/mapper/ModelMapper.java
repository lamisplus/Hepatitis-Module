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
        String careEntryPoint = enrollmentDto.getCareEntryPoint();
        String pregnancy = enrollmentDto.getPregnancy().toUpperCase();
        Status pregnancyEnum;
//        if(pregnancy.equals("YES") || pregnancy.equals("NO")) {
//            pregnancyEnum = Status.valueOf(pregnancy);
//        } else {
//            pregnancyEnum = Status.NO;
//        }
        if (pregnancy.equals("YES")) {
            pregnancyEnum = Status.YES;
        } else if (pregnancy.equals("NO")) {
            pregnancyEnum = Status.NO;
        } else {
            pregnancyEnum = Status.NO;
        }

        Double weight = enrollmentDto.getWeight();
        Double height = enrollmentDto.getHeight();
        Double bmi = enrollmentDto.getBmi();
        String hepatitisB = enrollmentDto.getHepatitisB();

        String breastfeeding = enrollmentDto.getBreastfeeding().toUpperCase();
        Status breastfeedingEnum;
//        if(breastfeeding.equals("YES") || breastfeeding.equals("NO")) {
//            breastfeedingEnum = Status.valueOf(breastfeeding);
//        } else {
//            breastfeedingEnum = Status.NO;
//        }

        if (breastfeeding.equals("YES")) {
            breastfeedingEnum = Status.YES;
        } else if (breastfeeding.equals("NO")) {
            breastfeedingEnum = Status.NO;
        } else {
            breastfeedingEnum = Status.NO;
        }

        String historyOfUsingAbusedSubstance = enrollmentDto.getHistoryOfUsingAbusedSubstance();
        Status historyOfUsingAbusedSubstanceEnum;

        if(historyOfUsingAbusedSubstance.equals("NO")) {
            historyOfUsingAbusedSubstanceEnum = Status.NO;
        } else if(historyOfUsingAbusedSubstance.equals("YES")) {
            historyOfUsingAbusedSubstanceEnum =  Status.YES;
        }
        else {
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
                .careEntryPoint(careEntryPoint)
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
        hepatitisEnrollment.setArchived(0);
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
        System.out.println("got here chief");
        System.out.println(diagnosisDto.getEnrollmentUuid());
        HepatitisDiagnosis hepatitisDiagnosis = HepatitisDiagnosis.builder()
                .hepatitisBTest(hepatitisBNode)
                .hepatitisCTest(hepatitisCNode)
                .clinicalParameters(clinicalParametersNode)
                .hepatitisEnrollmentUuid(diagnosisDto.getEnrollmentUuid())
                .build();
        hepatitisDiagnosis.setUuid(UUID.randomUUID().toString());
        hepatitisDiagnosis.setArchived(0);
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
        hepatitisTreatment.setArchived(0);
        return hepatitisTreatment;
    }

    public HepatitisEnrollment updateHepatitisEnrollmentMapper(HepatitisEnrollment existingEnrollment, HepatitisEnrollmentDto enrollmentDto) {
        String careEntryPoint = enrollmentDto.getCareEntryPoint();
        String pregnancy = enrollmentDto.getPregnancy().toUpperCase();
        Status pregnancyEnum = mapToStatusEnum(pregnancy);

        Double weight = enrollmentDto.getWeight();
        Double height = enrollmentDto.getHeight();
        Double bmi = enrollmentDto.getBmi();
        String hepatitisB = enrollmentDto.getHepatitisB();

        String breastfeeding = enrollmentDto.getBreastfeeding().toUpperCase();
        Status breastfeedingEnum = mapToStatusEnum(breastfeeding);

        String historyOfUsingAbusedSubstance = enrollmentDto.getHistoryOfUsingAbusedSubstance();
        Status historyOfUsingAbusedSubstanceEnum = mapToStatusEnum(historyOfUsingAbusedSubstance);

        ObjectMapper objectMapper = new ObjectMapper();
        HepatitisScreeningDto hepatitisScreeningDto = enrollmentDto.getScreening();
        JsonNode screeningNode = null;
        if (hepatitisScreeningDto != null) {
            screeningNode = objectMapper.convertValue(hepatitisScreeningDto, JsonNode.class);
        }

        // Update the fields of the existing entity
        existingEnrollment.setCareEntryPoint(careEntryPoint);
        existingEnrollment.setPregnancy(pregnancyEnum);
        existingEnrollment.setWeight(weight);
        existingEnrollment.setHeight(height);
        existingEnrollment.setBmi(bmi);
        existingEnrollment.setHepatitisB(hepatitisB);
        existingEnrollment.setBreastfeeding(breastfeedingEnum);
        existingEnrollment.setHistoryOfUsingAbusedSubstance(historyOfUsingAbusedSubstanceEnum);
        existingEnrollment.setScreening(screeningNode);

        // Optionally, update other fields if needed

        return existingEnrollment;
    }

    public HepatitisDiagnosis updateHepatitisDiagnosisMapper(HepatitisDiagnosis existingDiagnosis, HepatitisDiagnosisDto diagnosisDto) {
        ObjectMapper objectMapper = new ObjectMapper();

        HepatitisBTestDto hepatitisBTestDto = diagnosisDto.getHepatitisBTest();
        JsonNode hepatitisBNode = (hepatitisBTestDto != null) ? objectMapper.convertValue(hepatitisBTestDto, JsonNode.class) : null;

        HepatitisCTestDto hepatitisCTestDto = diagnosisDto.getHepatitisCTest();
        JsonNode hepatitisCNode = (hepatitisCTestDto != null) ? objectMapper.convertValue(hepatitisCTestDto, JsonNode.class) : null;

        ClinicalParametersDto clinicalParametersDto = diagnosisDto.getClinicalParameters();
        JsonNode clinicalParametersNode = (clinicalParametersDto != null) ? objectMapper.convertValue(clinicalParametersDto, JsonNode.class) : null;

        // Update the fields of the existing entity
        existingDiagnosis.setHepatitisBTest(hepatitisBNode);
        existingDiagnosis.setHepatitisCTest(hepatitisCNode);
        existingDiagnosis.setClinicalParameters(clinicalParametersNode);

        // Optionally, update other fields if needed

        return existingDiagnosis;
    }

    public HepatitisTreatment updateHepatitisTreatmentMapper(HepatitisTreatment existingTreatment, HepatitisTreatmentDto treatmentDto) {
        ObjectMapper objectMapper = new ObjectMapper();

        HepatitisBTreatmentDto hepatitisBTreatmentDto = treatmentDto.getHepatitisBTreatment();
        JsonNode hepatitisBNode = (hepatitisBTreatmentDto != null) ? objectMapper.convertValue(hepatitisBTreatmentDto, JsonNode.class) : null;

        HepatitisCTreatmentDto hepatitisCTreatmentDto = treatmentDto.getHepatitisCTreatment();
        JsonNode hepatitisCNode = (hepatitisCTreatmentDto != null) ? objectMapper.convertValue(hepatitisCTreatmentDto, JsonNode.class) : null;

        // Update the fields of the existing entity
        existingTreatment.setHepatitisBTreatmentDto(hepatitisBNode);
        existingTreatment.setHepatitisCTreatmentDto(hepatitisCNode);


        return existingTreatment;
    }



    private Status mapToStatusEnum(String status) {
        if ("YES".equalsIgnoreCase(status) || "NO".equalsIgnoreCase(status)) {
            return Status.valueOf(status);
        } else {
            return Status.NO;
        }
    }

}
