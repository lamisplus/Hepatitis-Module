package org.lamisplus.modules.hepatitis.service.impl;



import org.lamisplus.modules.base.controller.apierror.EntityNotFoundException;
import org.lamisplus.modules.hepatitis.domain.dto.request.HepatitisDiagnosisDto;
import org.lamisplus.modules.hepatitis.domain.dto.request.HepatitisEnrollmentDto;
import org.lamisplus.modules.hepatitis.domain.dto.request.HepatitisTreatmentDto;
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
import org.lamisplus.modules.patient.domain.dto.PersonDto;
import org.lamisplus.modules.patient.domain.dto.PersonResponseDto;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.lamisplus.modules.patient.repository.PersonRepository;
import org.lamisplus.modules.patient.service.PersonService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

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
        HepatitisEnrollment savedEnrollment = enrollmentRepository.save(enrollment);
        log.info("savedEnrollment: {}", savedEnrollment);
        Map<String, Object> response = new HashMap<>();
        response.put("enrollmentId", savedEnrollment.getId());
        response.put("enrollmentUuid", savedEnrollment.getUuid());
        response.put("person", personResponseDto);

        return ResponseEntity.status(201).body(response);
    }

    @Override
    public ResponseEntity<String> hepatitisDiagnosis(HepatitisDiagnosisDto diagnosisDto) {
        if(diagnosisDto == null) throw new IllegalArgumentException("Please fill in the required fields");
        String enrollmentId = diagnosisDto.getEnrollmentUuid();
        HepatitisEnrollment enrollment = enrollmentRepository.findByUuid(enrollmentId == null ? "noId" : enrollmentId)
                .orElseThrow(() -> new EntityNotFoundException(HepatitisDiagnosis.class, "Enrolled patient has no existing record"));
        HepatitisDiagnosis hepatitisDiagnosis = mapper.mapToDiagnosis(diagnosisDto);
        hepatitisDiagnosis.setHepatitisEnrollment(enrollment);

        diagnosisRepository.save(hepatitisDiagnosis);
        return ResponseEntity.status(201).body("Diagnosis saved");
    }

    @Override
    public ResponseEntity<String> hepatitisTreatment(HepatitisTreatmentDto treatmentDto) {
        if(treatmentDto == null) throw new IllegalArgumentException("Please fill in the required fields");
        String enrollmentId = treatmentDto.getEnrollmentUuid();
        HepatitisEnrollment enrollment = enrollmentRepository.findByUuid(enrollmentId == null ? "noId" : enrollmentId)
                .orElseThrow(() -> new EntityNotFoundException(HepatitisTreatment.class, "Enrolled patient has no existing record"));
        HepatitisTreatment hepatitisTreatment =  mapper.mapToTreatment(treatmentDto);

        hepatitisTreatment.setHepatitisEnrollment(enrollment);
        treatmentRepository.save(hepatitisTreatment);
        return ResponseEntity.status(200).body("Treatment saved");
    }

    @Override
    public ResponseEntity<?> getAllHepatitisEnrollments() {
        return null;
    }
}
