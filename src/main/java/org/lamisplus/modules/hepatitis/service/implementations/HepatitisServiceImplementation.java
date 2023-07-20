//package org.lamisplus.modules.hepatitis.service.implementations;
//
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.lamisplus.modules.hepatitis.domain.constants.Enum.Detect;
//import org.lamisplus.modules.hepatitis.domain.constants.Enum.ReactiveState;
//import org.lamisplus.modules.hepatitis.domain.constants.Enum.Sex;
//import org.lamisplus.modules.hepatitis.domain.constants.status.*;
//import org.lamisplus.modules.hepatitis.domain.dto.request.DiagnosisDTO;
//import org.lamisplus.modules.hepatitis.domain.dto.request.EnrollmentDTO;
//import org.lamisplus.modules.hepatitis.domain.dto.request.HepatitisRequestDTO;
//import org.lamisplus.modules.hepatitis.domain.dto.request.TreatmentDTO;
//import org.lamisplus.modules.hepatitis.domain.entity.Diagnosis;
//import org.lamisplus.modules.hepatitis.domain.entity.Enrollment;
//import org.lamisplus.modules.hepatitis.domain.entity.Treatment;
//import org.lamisplus.modules.hepatitis.domain.mapper.HepatitisMapper;
//import org.lamisplus.modules.hepatitis.domain.mapper.HepatitisMapperImplementation;
//import org.lamisplus.modules.hepatitis.repository.DiagnosisRepository;
//import org.lamisplus.modules.hepatitis.repository.EnrollmentRepository;
//import org.lamisplus.modules.hepatitis.repository.TreatmentRepository;
//import org.lamisplus.modules.hepatitis.service.HepatitisEnrollmentService;
//import org.springframework.stereotype.Component;
//import org.springframework.stereotype.Service;
//
//import java.util.UUID;
//
//@RequiredArgsConstructor
//@Slf4j
//@Component
//public class HepatitisServiceImplementation implements HepatitisEnrollmentService {
//
//    private final EnrollmentRepository enrollmentRepository;
//    private final DiagnosisRepository diagnosisRepository;
//    private final TreatmentRepository treatmentRepository;
//    private final HepatitisMapper hepatitisMapper;
//
//    @Override
//    public String createPatient(HepatitisRequestDTO hepatitisRequestDTO) {
//        Enrollment enrollment = this.saveEnrollment(hepatitisRequestDTO.getEnrollment());
//        this.saveDiagnosis(hepatitisRequestDTO.getDiagnosis(), enrollment);
//        this.saveTreatment(hepatitisRequestDTO.getTreatment(), enrollment);
//
//        return enrollment.getUuid().toString();
//    }
//    @Override
//    public Enrollment saveEnrollment(EnrollmentDTO enrollment) {
//        Enrollment enrol = hepatitisMapper.mapEnrollmentDtoEntity(enrollment);
//        return enrollmentRepository.save(enrol);
//    }
//
//    @Override
//    public Diagnosis saveDiagnosis(DiagnosisDTO diagnosisDTO, Enrollment enrollment) {
//        Diagnosis diagnosis = hepatitisMapper.mapDiagnosisDtoEntity(diagnosisDTO, enrollment);
//        return diagnosisRepository.save(diagnosis);
//    }
//
//
//    @Override
//    public Treatment saveTreatment(TreatmentDTO treatmentDTO, Enrollment enrollment) {
//        Treatment treatment = hepatitisMapper.mapTreatmentDtoEntity(treatmentDTO, enrollment);
//        return treatmentRepository.save(treatment);
//    }
//
//
//}
