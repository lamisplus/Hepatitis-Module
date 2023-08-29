package org.lamisplus.modules.hepatitis.utils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.lamisplus.modules.hepatitis.domain.dto.ClinicalParametersDto;
import org.lamisplus.modules.hepatitis.domain.dto.HepatitisBTestDto;
import org.lamisplus.modules.hepatitis.domain.dto.HepatitisBTreatmentDto;
import org.lamisplus.modules.hepatitis.domain.dto.HepatitisCTestDto;
import org.lamisplus.modules.hepatitis.domain.dto.HepatitisCTreatmentDto;
import org.lamisplus.modules.hepatitis.domain.dto.HepatitisDiagnosisDto;
import org.lamisplus.modules.hepatitis.domain.dto.HepatitisEnrollmentDto;
import org.lamisplus.modules.hepatitis.domain.dto.HepatitisScreeningDto;
import org.lamisplus.modules.hepatitis.domain.dto.HepatitisTreatmentDto;
import org.lamisplus.modules.hepatitis.domain.entity.HepatitisDiagnosis;
import org.lamisplus.modules.hepatitis.domain.entity.HepatitisEnrollment;
import org.lamisplus.modules.hepatitis.domain.entity.HepatitisTreatment;
import org.lamisplus.modules.hepatitis.domain.enums.Sex;
import org.lamisplus.modules.hepatitis.domain.enums.Status;
import lombok.RequiredArgsConstructor;
import org.lamisplus.modules.patient.domain.entity.Person;


@RequiredArgsConstructor
//@Component
public class ModelMapper {
//    private final PersonRepository personRepository;

    public HepatitisEnrollment mapToEnrollment(HepatitisEnrollmentDto enrollmentDto, Person person) {
        String coreEntryPoint = enrollmentDto.getCoreEntryPoint();
        Sex sex = enrollmentDto.getSex();
        Status pregnancy = enrollmentDto.getPregnancy();

        Double weight = enrollmentDto.getWeight();
        Double height = enrollmentDto.getHeight();
        Double bmi = enrollmentDto.getBmi();

        String hepatitisB = enrollmentDto.getHepatitisB();
        Status breastfeeding = enrollmentDto.getBreastfeeding();
        Status historyOfUsingAbusedSubstance = enrollmentDto.getHistoryOfUsingAbusedSubstance();

        ObjectMapper objectMapper = new ObjectMapper();
        HepatitisScreeningDto hepatitisScreeningDto = enrollmentDto.getScreening();
        JsonNode screeningNode = null;
        if(hepatitisScreeningDto != null) {
            screeningNode = objectMapper.convertValue(hepatitisScreeningDto, JsonNode.class);
        }

        return HepatitisEnrollment.builder()
                .person(person)
                .coreEntryPoint(coreEntryPoint)
                .sex(sex)
                .pregnancy(pregnancy)
                .weight(weight)
                .height(height)
                .bmi(bmi)
                .hepatitisB(hepatitisB)
                .breastfeeding(breastfeeding)
                .historyOfUsingAbusedSubstance(historyOfUsingAbusedSubstance)
                .screening(screeningNode)
                .build();
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

        return HepatitisDiagnosis.builder()
                .hepatitisBTest(hepatitisBNode)
                .hepatitisCTest(hepatitisCNode)
                .clinicalParameters(clinicalParametersNode)
                .build();
    }

    public HepatitisTreatment mapToTreatment(HepatitisTreatmentDto treatmentDto) {
        ObjectMapper objectMapper = new ObjectMapper();

        HepatitisBTreatmentDto hepatitisBTreatmentDto = treatmentDto.getHepatitisBTreatmentDto();
        JsonNode hepatitisBNode = null;
        if(hepatitisBTreatmentDto != null) {
            hepatitisBNode = objectMapper.convertValue(hepatitisBTreatmentDto, JsonNode.class);
        }

        HepatitisCTreatmentDto hepatitisCTreatmentDto = treatmentDto.getHepatitisCTreatmentDto();
        JsonNode hepatitisCNode = null;
        if(hepatitisCTreatmentDto != null) {
            hepatitisCNode = objectMapper.convertValue(hepatitisCTreatmentDto, JsonNode.class);
        }

        return HepatitisTreatment.builder()
                .hepatitisBTreatmentDto(hepatitisBNode)
                .hepatitisCTreatmentDto(hepatitisCNode)
                .build();
    }
}
