package org.lamisplus.modules.hepatitis.service.impl;



import org.apache.commons.lang3.StringUtils;
import org.lamisplus.modules.base.controller.apierror.EntityNotFoundException;
import org.lamisplus.modules.base.controller.apierror.IllegalTypeException;
import org.lamisplus.modules.base.controller.apierror.RecordExistException;
import org.lamisplus.modules.hepatitis.domain.dto.request.HepatitisDiagnosisDto;
import org.lamisplus.modules.hepatitis.domain.dto.request.HepatitisEnrollmentDto;
import org.lamisplus.modules.hepatitis.domain.dto.request.HepatitisTreatmentDto;
import org.lamisplus.modules.hepatitis.domain.dto.response.HepatitisEnrollmentPatientDTO;
import org.lamisplus.modules.hepatitis.domain.entity.HepatitisDiagnosis;
import org.lamisplus.modules.hepatitis.domain.entity.HepatitisEnrollment;
import org.lamisplus.modules.hepatitis.domain.entity.HepatitisTreatment;
import org.lamisplus.modules.hepatitis.repository.DiagnosisRepository;
import org.lamisplus.modules.hepatitis.repository.EnrollmentRepository;
import org.lamisplus.modules.hepatitis.repository.TreatmentRepository;
import org.lamisplus.modules.hepatitis.service.EnrollmentService;
import org.lamisplus.modules.hepatitis.service.mapper.ModelMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.patient.controller.exception.AlreadyExistException;
import org.lamisplus.modules.patient.domain.dto.PersonDto;
import org.lamisplus.modules.patient.domain.dto.PersonResponseDto;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.lamisplus.modules.patient.repository.PersonRepository;
import org.lamisplus.modules.patient.service.PersonService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class EnrollmentServiceImpl implements EnrollmentService {
    private final ModelMapper mapper = new ModelMapper();
    private final EnrollmentRepository enrollmentRepository;
    private final DiagnosisRepository diagnosisRepository;
    private final TreatmentRepository treatmentRepository;
    private final PersonRepository personRepository;
    private final PersonService personService;
    private final CurrentUserOrganizationService currentUserOrganizationService;

    @Override
    public ResponseEntity<Map<String, Object>> newHepatitisEnrollment(HepatitisEnrollmentDto enrollmentDto) {
        PersonDto personDto = enrollmentDto.getPersonDto();
        Long personId;
        PersonResponseDto personResponseDto;

        if(personDto == null) {
            personId = enrollmentDto.getPersonId();
            if(personId == null) {
                throw new EntityNotFoundException(HepatitisEnrollment.class, "Person details cannot be null. ",
                        "Either create a new patient or pass ID of existing patient.");
            }
        } else {
            personResponseDto = personService.createPerson(enrollmentDto.getPersonDto());
            personId = personResponseDto.getId();
        }
        Person person = personRepository.findById(personId)
                .orElseThrow(() -> new EntityNotFoundException(HepatitisEnrollment.class,
                        "Person with"+ personId + "does not exist"));
        personResponseDto = personService.getDtoFromPerson(person);

        HepatitisEnrollment enrollment = mapper.mapToEnrollment(enrollmentDto, person);
        long facilityId = currentUserOrganizationService.getCurrentUserOrganization();
        enrollment.setFacilityId(facilityId);
        HepatitisEnrollment savedEnrollment = enrollmentRepository.save(enrollment);

        log.info("savedEnrollment uuid: {}", savedEnrollment.getUuid());
        Map<String, Object> response = new HashMap<>();
        response.put("enrollmentId", savedEnrollment.getId());
        response.put("enrollmentUuid", savedEnrollment.getUuid());
        response.put("facilityId", savedEnrollment.getFacilityId());
        response.put("person", personResponseDto);
        return ResponseEntity.status(201).body(response);
    }

    @Override
    public ResponseEntity<String> hepatitisDiagnosis(HepatitisDiagnosisDto diagnosisDto) {
        if(diagnosisDto == null) throw new IllegalTypeException(EnrollmentServiceImpl.class, "Please fill in the required fields");
        String enrollmentId = diagnosisDto.getEnrollmentUuid();
        log.info("EnrollmentId: " + enrollmentId);
        if(StringUtils.isBlank(enrollmentId)) throw new IllegalTypeException(EnrollmentServiceImpl.class,"Please enrollmentId can not be null");
        HepatitisEnrollment enrollment = getHepatitisEnrollment(enrollmentId);
        HepatitisDiagnosis hepatitisDiagnosis = mapper.mapToDiagnosis(diagnosisDto);
        log.info("I am here 1");
        if(diagnosisRepository.existsByHepatitisEnrollment_Uuid(enrollment.getUuid())) {
            throw new RecordExistException(HepatitisEnrollment.class, "uuid",
                    enrollment.getUuid()+" Duplicate Enrollment: You have already enrolled for treatment");
        }
        hepatitisDiagnosis.setHepatitisEnrollment(enrollment);
        hepatitisDiagnosis.setFacilityId(enrollment.getFacilityId());
        diagnosisRepository.save(hepatitisDiagnosis);
        return ResponseEntity.status(201).body("Diagnosis saved");
    }
    private HepatitisEnrollment getHepatitisEnrollment(String enrollmentId) {
        return enrollmentRepository
                .findByUuid(enrollmentId)
                .orElseThrow(() -> new EntityNotFoundException(HepatitisEnrollment.class, "uuid",  enrollmentId +" Enrolled patient has no existing record"));
    }
    
    @Override
    public ResponseEntity<String> hepatitisTreatment(HepatitisTreatmentDto treatmentDto) {
        if(treatmentDto == null) throw new IllegalTypeException(EnrollmentServiceImpl.class,"empty values", "Please fill in the required fields");
        String enrollmentId = treatmentDto.getEnrollmentUuid();
        log.info("EnrollmentId: " + enrollmentId);
        HepatitisEnrollment enrollment = getHepatitisEnrollment(enrollmentId);
        HepatitisTreatment hepatitisTreatment =  mapper.mapToTreatment(treatmentDto);
        if(treatmentRepository.existsByHepatitisEnrollment_Uuid(enrollment.getUuid())) {
            throw new RecordExistException(HepatitisTreatment.class, "uuid",
                    enrollment.getUuid()+" Duplicate Enrollment: You have already enrolled for treatment");
        }
        hepatitisTreatment.setHepatitisEnrollment(enrollment);
        hepatitisTreatment.setFacilityId(enrollment.getFacilityId());
        treatmentRepository.save(hepatitisTreatment);
        return ResponseEntity.status(200).body("Treatment saved");
    }

    @Override
    public List<HepatitisEnrollmentPatientDTO> getAllHepatitisEnrollments() {
        long facilityId = currentUserOrganizationService.getCurrentUserOrganization();
        return enrollmentRepository.getEnrolledPatientsByFacility(facilityId);
    }
}
