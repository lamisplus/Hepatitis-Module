package org.lamisplus.modules.hepatitis.service.implementations;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.hepatitis.domain.dto.request.DiagnosisDTO;
import org.lamisplus.modules.hepatitis.domain.dto.request.EnrollmentDTO;
import org.lamisplus.modules.hepatitis.domain.dto.request.HepatitisRequestDTO;
import org.lamisplus.modules.hepatitis.domain.dto.request.TreatmentDTO;
import org.lamisplus.modules.hepatitis.domain.entity.Diagnosis;
import org.lamisplus.modules.hepatitis.domain.entity.Enrollment;
import org.lamisplus.modules.hepatitis.domain.entity.Treatment;
import org.lamisplus.modules.hepatitis.service.mapper.HepatitisMapper;
import org.lamisplus.modules.hepatitis.repository.DiagnosisRepository;
import org.lamisplus.modules.hepatitis.repository.EnrollmentRepository;
import org.lamisplus.modules.hepatitis.repository.TreatmentRepository;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Slf4j
@Service
public class HepatitisEnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final DiagnosisRepository diagnosisRepository;
    private final TreatmentRepository treatmentRepository;
    private final HepatitisMapper hepatitisMapper;

    public String createPatient(HepatitisRequestDTO hepatitisRequestDTO) {
        Enrollment enrollment = this.saveEnrollment(hepatitisRequestDTO.getEnrollment());
        this.saveDiagnosis(hepatitisRequestDTO.getDiagnosis(), enrollment);
        this.saveTreatment(hepatitisRequestDTO.getTreatment(), enrollment);

        return enrollment.getUuid().toString();
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
}