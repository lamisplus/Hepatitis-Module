package org.lamisplus.modules.hepatitis.service.implementations;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.hepatitis.domain.dto.request.DiagnosisDTO;
import org.lamisplus.modules.hepatitis.domain.dto.request.EnrollmentDTO;
import org.lamisplus.modules.hepatitis.domain.dto.request.HepatitisRequestDTO;
import org.lamisplus.modules.hepatitis.domain.dto.request.TreatmentDTO;
import org.lamisplus.modules.hepatitis.domain.dto.response.DiagnosisResponse;
import org.lamisplus.modules.hepatitis.domain.dto.response.EnrollmentResponse;
import org.lamisplus.modules.hepatitis.domain.dto.response.HepatitisResponseDTO;
import org.lamisplus.modules.hepatitis.domain.dto.response.TreatmentResponse;
import org.lamisplus.modules.hepatitis.domain.entity.Diagnosis;
import org.lamisplus.modules.hepatitis.domain.entity.Enrollment;
import org.lamisplus.modules.hepatitis.domain.entity.Treatment;
import org.lamisplus.modules.hepatitis.repository.DiagnosisRepository;
import org.lamisplus.modules.hepatitis.repository.EnrollmentRepository;
import org.lamisplus.modules.hepatitis.repository.TreatmentRepository;
import org.lamisplus.modules.hepatitis.service.mapper.HepatitisMapper;
import org.lamisplus.modules.hepatitis.service.mapper.HepatitisResponseMapper;
import org.springframework.stereotype.Service;

import javax.persistence.Id;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Slf4j
@Service
public class HepatitisEnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final DiagnosisRepository diagnosisRepository;
    private final TreatmentRepository treatmentRepository;
    private final HepatitisMapper hepatitisMapper;
    private final HepatitisResponseMapper hepatitisResponseMapper;

    public String createPatient(HepatitisRequestDTO hepatitisRequestDTO) {
        Enrollment enrollment = this.saveEnrollment(hepatitisRequestDTO.getEnrollment());
        this.saveDiagnosis(hepatitisRequestDTO.getDiagnosis(), enrollment);
        this.saveTreatment(hepatitisRequestDTO.getTreatment(), enrollment);

        return enrollment.getUuid().toString();
    }

    public List<HepatitisResponseDTO> getAllEnrollment() {
        List<Enrollment> enrollmentList = enrollmentRepository.findAll();

        List<HepatitisResponseDTO> hepatitisResponseDTOList = new ArrayList<>();
        for (Enrollment enrollment : enrollmentList) {
            EnrollmentResponse mappedEnrollment = hepatitisResponseMapper.mapEntityEnrollmentDTO(enrollment);
            DiagnosisResponse mappedDiagnosis = hepatitisResponseMapper.mapEntityDiagnosisDTO(enrollment.getDiagnosis());
            TreatmentResponse mappedTreatment = hepatitisResponseMapper.mapEntityTreatmentDTO(enrollment.getTreatment());

            hepatitisResponseDTOList.add(new HepatitisResponseDTO(mappedEnrollment, mappedDiagnosis, mappedTreatment));
        }

        return hepatitisResponseDTOList;
    }

    public Enrollment saveEnrollment(EnrollmentDTO enrollment) {
        Enrollment enrol = hepatitisMapper.mapEnrollmentDtoEntity(enrollment);
        return enrollmentRepository.save(enrol);
    }

    public void saveDiagnosis(DiagnosisDTO diagnosisDTO, Enrollment enrollment) {
        Diagnosis diagnosis = hepatitisMapper.mapDiagnosisDtoEntity(diagnosisDTO, enrollment);
        diagnosisRepository.save(diagnosis);
    }

    public void saveTreatment(TreatmentDTO treatmentDTO, Enrollment enrollment) {
        Treatment treatment = hepatitisMapper.mapTreatmentDtoEntity(treatmentDTO, enrollment);
        treatmentRepository.save(treatment);
    }

//    public List<HepatitisResponseDTO> getHepatitisEnrollmentById(Long id) {
//        List<Enrollment> enrollmentlistById = enrollmentRepository.findAllById(Long id);
//    }
}