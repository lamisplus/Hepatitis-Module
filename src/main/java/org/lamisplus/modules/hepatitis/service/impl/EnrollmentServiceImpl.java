package org.lamisplus.modules.hepatitis.service.impl;



import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.lang3.StringUtils;
import org.lamisplus.modules.base.controller.apierror.EntityNotFoundException;
import org.lamisplus.modules.base.controller.apierror.IllegalTypeException;
import org.lamisplus.modules.base.controller.apierror.RecordExistException;
import org.lamisplus.modules.base.domain.entities.User;
import org.lamisplus.modules.base.service.UserService;
import org.lamisplus.modules.hepatitis.domain.dto.PatientPerson;
import org.lamisplus.modules.hepatitis.domain.dto.request.HepatitisDiagnosisDto;
import org.lamisplus.modules.hepatitis.domain.dto.request.HepatitisEnrollmentDto;
import org.lamisplus.modules.hepatitis.domain.dto.request.HepatitisTreatmentDto;
import org.lamisplus.modules.hepatitis.domain.dto.response.ActivityTracker;
import org.lamisplus.modules.hepatitis.domain.dto.response.HepatitisEnrollmentPatientDTO;
import org.lamisplus.modules.hepatitis.domain.dto.response.HepatitisEnrollmentResponse;
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
import org.lamisplus.modules.patient.domain.dto.PersonMetaDataDto;
import org.lamisplus.modules.patient.domain.dto.PersonResponseDto;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.lamisplus.modules.patient.repository.PersonRepository;
import org.lamisplus.modules.patient.service.PersonService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.beans.BeanUtils;

import java.io.IOException;
import java.util.*;
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
    private final UserService userService;
    private ObjectMapper objectMapper = new ObjectMapper();

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
//        if(diagnosisRepository.existsHepatitisDiagnosisByHepatitisEnrollmentUuid(enrollment.getUuid())) {
//            throw new RecordExistException(HepatitisEnrollment.class, "uuid",
//                    enrollment.getUuid()+" Duplicate Enrollment: You have already enrolled for treatment");
//        }
        hepatitisDiagnosis.setHepatitisEnrollment(enrollment);
        hepatitisDiagnosis.setFacilityId(enrollment.getFacilityId());
        hepatitisDiagnosis.setArchived(0);
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
//        if(treatmentRepository.existsByHepatitisEnrollment_Uuid(enrollment.getUuid())) {
//            throw new RecordExistException(HepatitisTreatment.class, "uuid",
//                    enrollment.getUuid()+" Duplicate Enrollment: You have already enrolled for treatment");
//        }
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

    public PersonMetaDataDto getAllPatientsEligibleForHepatitisEnrollment(String searchValue, int pageNo, int pageSize) {
        Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by("id").descending());
        Optional<User> currentUser = this.userService.getUserWithRoles();
        Long currentOrganisationUnitId = 0L;
        if (currentUser.isPresent()) {
            User user = (User) currentUser.get();
            currentOrganisationUnitId = user.getCurrentOrganisationUnitId();

        }
        Page<PatientPerson> persons = null;
        if (!((searchValue == null) || (searchValue.equals("*")))) {
            searchValue = searchValue.replaceAll("\\s", "");
            searchValue = searchValue.replaceAll(",", "");
            String queryParam = "%" + searchValue + "%";
            persons = enrollmentRepository.findPatientPersonByParameters(queryParam, 0, currentOrganisationUnitId, paging);
        } else {
            persons = enrollmentRepository.findPatientPerson(0, currentOrganisationUnitId, paging);
        }

        PersonMetaDataDto personMetaDataDto = new PersonMetaDataDto();
        personMetaDataDto.setTotalRecords(persons.getTotalElements());
        personMetaDataDto.setPageSize(persons.getSize());
        personMetaDataDto.setTotalPages(persons.getTotalPages());
        personMetaDataDto.setCurrentPage(persons.getNumber());
        //personMetaDataDto.setRecords(personResponseDtos);
        personMetaDataDto.setRecords(persons.getContent().stream().map(this::getDtoFromPerson).collect(Collectors.toList()));
        return personMetaDataDto;
    }

    public PersonResponseDto getDtoFromPerson(PatientPerson person) {
        //Log.info("person {}", person);
        PersonResponseDto personResponseDto = new PersonResponseDto();
        personResponseDto.setId(person.getId());
        personResponseDto.setNinNumber(person.getNinNumber());
        personResponseDto.setEmrId(person.getEmrId());
        personResponseDto.setFacilityId(person.getFacilityId());
        personResponseDto.setIsDateOfBirthEstimated(person.getIsDateOfBirthEstimated());
        personResponseDto.setDateOfBirth(person.getDateOfBirth());
        personResponseDto.setFirstName("");
        personResponseDto.setSurname(this.getFullName(person.getFirstName(), person.getOtherName(), person.getSurname()));
        personResponseDto.setOtherName("");
        personResponseDto.setContactPoint(parseJsonString(person.getContactPoint()));
        personResponseDto.setAddress(parseJsonString(person.getAddress()));
        personResponseDto.setContact(parseJsonString(person.getContact()));
        personResponseDto.setIdentifier(parseJsonString(person.getIdentifier()));
        personResponseDto.setEducation(parseJsonString(person.getEducation()));
        personResponseDto.setEmploymentStatus(parseJsonString(person.getEmploymentStatus()));
        personResponseDto.setMaritalStatus(parseJsonString(person.getMaritalStatus()));
        personResponseDto.setSex(person.getSex());
        personResponseDto.setGender(parseJsonString(person.getGender()));
//        personResponseDto.setDeceased(person.getDeceased());
        personResponseDto.setDateOfRegistration(person.getDateOfRegistration());
        personResponseDto.setActive(person.getActive());
        personResponseDto.setDeceasedDateTime(person.getDeceasedDateTime());
        personResponseDto.setOrganization(parseJsonString(person.getOrganization()));
        personResponseDto.setUuid(person.getUuid());
        return personResponseDto;
    }

    private JsonNode parseJsonString(String jsonString) {
        try {
            if (jsonString != null) {
                return objectMapper.readTree(jsonString);
            }
            return null;
        } catch (IOException e) {
            System.err.println("Error parsing JSON string: " + e);
            return null;
        }
    }

    private String getFullName(String fn, String on, String sn) {
        String fullName = "";
        if (fn == null) fn = "";
        if (sn == null) sn = "";
        if (on == null) on = "";
        fullName = fn + " " + on + " " + sn;
        return fullName;
    }

    public HepatitisEnrollment viewHepatitisEnrollmentByPersonUuid(String personUuid) {
        HepatitisEnrollment enrollment = enrollmentRepository.findHepatitisEnrollmentByPersonUuidAndArchived(personUuid, 0);
        return enrollment;
//        return enrollmentEntityToDTO(enrollment);
    }

    public HepatitisDiagnosis viewHepatitisDiagnosisByEnrollmentUuid(String enrollmentUuid) {
        HepatitisDiagnosis hepatitisDiagnosis = diagnosisRepository.findHepatitisDiagnosisByHepatitisEnrollmentUuidAndArchived(enrollmentUuid, 0);
        return hepatitisDiagnosis;
    }

    public HepatitisTreatment viewHepatitisTreatmentByEnrollmentUuid(String enrollmentUuid) {
        HepatitisEnrollment enrollment = enrollmentRepository.findHepatitisEnrollmentByUuidAndArchived(enrollmentUuid, 0);
//                .orElseThrow(() -> new EntityNotFoundException(HepatitisEnrollment.class,
//                        "Hepatitis with" + enrollmentUuid + "does not exist"));
//        HepatitisEnrollment enrollment;
        if(enrollment == null) {
            throw new EntityNotFoundException(HepatitisEnrollment.class, "Hepatitis with" + enrollmentUuid + "does not exist");
        }
        HepatitisTreatment hepatitisTreatment = treatmentRepository.findHepatitisTreatmentByHepatitisEnrollmentAndArchived(enrollment, 0);
        return hepatitisTreatment;
    }



    private HepatitisEnrollmentResponse enrollmentEntityToDTO(HepatitisEnrollment enrollment) {
        HepatitisEnrollmentResponse hepatitisResponseDto = new HepatitisEnrollmentResponse();
        BeanUtils.copyProperties(enrollment, hepatitisResponseDto);
        return hepatitisResponseDto;
    }

    public HepatitisEnrollmentDto updateHepatitisEnrollment(Long id, HepatitisEnrollmentDto enrollmentDto) {
        PersonDto personDto = enrollmentDto.getPersonDto();
        Long personId;
        PersonResponseDto personResponseDto;
        personId = enrollmentDto.getPersonId();
        if(personId == null) {
            throw new EntityNotFoundException(HepatitisEnrollment.class, "Person id cannot be null. ",
                    "pass ID of existing patient.");
        }
        if(personDto != null) {
            PersonResponseDto personResponseDto1;
            personResponseDto1 = personService.updatePerson(personId, personDto);
            log.info("update person details: {}", personResponseDto1);

        }
        Person person = personRepository.findById(personId)
                .orElseThrow(() -> new EntityNotFoundException(HepatitisEnrollment.class,
                        "Person with"+ personId + "does not exist"));
        personResponseDto = personService.getDtoFromPerson(person);
        log.info("PersonResponseDto details: {}", personResponseDto);

        HepatitisEnrollment existingEnrollment = enrollmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(HepatitisEnrollment.class, "Hepatitis Enrollment not found with id: " + id));
        HepatitisEnrollment enrollment = mapper.updateHepatitisEnrollmentMapper(existingEnrollment, enrollmentDto);
        HepatitisEnrollment savedEnrollment = enrollmentRepository.save(enrollment);
        return enrollmentDto;
    }

    public HepatitisDiagnosisDto updateHepatitisDiagnosis(Long id, HepatitisDiagnosisDto diagnosisDto) {
        HepatitisDiagnosis existingHepatitisDiagnosis = diagnosisRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(HepatitisDiagnosis.class, "Hepatitis Diagnosis not found with id: " + id));
        HepatitisDiagnosis hepatitisDiagnosis = mapper.updateHepatitisDiagnosisMapper(existingHepatitisDiagnosis, diagnosisDto);
        HepatitisDiagnosis savedDiagnosis = diagnosisRepository.save(hepatitisDiagnosis);
        return diagnosisDto;
    }

    public HepatitisTreatmentDto updateHepatitisTreatment(Long id, HepatitisTreatmentDto treatmentDto) {
        HepatitisTreatment existingHepatitisTreatment = treatmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(HepatitisTreatment.class, "Hepatitis Treatment not found with id: " + id));
        HepatitisTreatment hepatitisTreatment = mapper.updateHepatitisTreatmentMapper(existingHepatitisTreatment, treatmentDto);
        treatmentRepository.save(hepatitisTreatment);
        return treatmentDto;
    }

    public List<ActivityTracker> getActivityTracker(String personUuid) {
        ArrayList<ActivityTracker> activityTrackers = new ArrayList<>();

        HepatitisEnrollment hepatitisEnrollment = this.enrollmentRepository.findHepatitisEnrollmentByPersonUuidAndArchived(personUuid, 0);

        if (hepatitisEnrollment != null) {
            ActivityTracker activityTracker = new ActivityTracker();

            activityTracker.setActivityName("Hepatitis Enrollment");
            activityTracker.setPath("hepatitis_enrollment");
            activityTracker.setEditable(true);
            activityTracker.setDeletable(true);
            activityTracker.setViewable(true);
            activityTracker.setRecordId(hepatitisEnrollment.getId());
            activityTracker.setActivityDate(hepatitisEnrollment.getCreatedDate().toLocalDate());
            activityTrackers.add(activityTracker);
        }

        HepatitisDiagnosis hepatitisDiagnosis;
        HepatitisTreatment hepatitisTreatment;
        List<HepatitisDiagnosis> hepatitisDiagnosises;
        List<HepatitisTreatment> hepatitisTreatments;
        if(hepatitisEnrollment != null) {
            hepatitisDiagnosises = this.diagnosisRepository.findHepatitisDiagnosesByHepatitisEnrollmentUuidAndArchived(hepatitisEnrollment.getUuid(), 0);

            if(!(hepatitisDiagnosises.isEmpty())) {
                hepatitisDiagnosises.forEach(hepatitisDiagnosis1 -> {
                    ActivityTracker activityTracker = new ActivityTracker();
                    activityTracker.setActivityName("Hepatitis Diagnosis");
                    activityTracker.setPath("hepatitis_diagnosis");
                    activityTracker.setEditable(true);
                    activityTracker.setDeletable(true);
                    activityTracker.setViewable(true);
                    activityTracker.setRecordId(hepatitisDiagnosis1.getId());
                    activityTracker.setActivityDate(hepatitisDiagnosis1.getCreatedDate().toLocalDate());
                    activityTrackers.add(activityTracker);
                });
            }

//            hepatitisDiagnosis = this.diagnosisRepository.findHepatitisDiagnosisByHepatitisEnrollmentUuidAndArchived(hepatitisEnrollment.getUuid(), 0);
//            if(hepatitisDiagnosis != null) {
//                ActivityTracker activityTracker = new ActivityTracker();
//
//                activityTracker.setActivityName("Hepatitis Diagnosis");
//                activityTracker.setPath("hepatitis_diagnosis");
//                activityTracker.setEditable(true);
//                activityTracker.setDeletable(true);
//                activityTracker.setViewable(true);
//                activityTracker.setRecordId(hepatitisDiagnosis.getId());
//                activityTracker.setActivityDate(hepatitisDiagnosis.getCreatedDate().toLocalDate());
//                activityTrackers.add(activityTracker);
//            }

            hepatitisTreatments = this.treatmentRepository.findHepatitisTreatmentsByHepatitisEnrollmentAndArchived(hepatitisEnrollment, 0);

            if(!(hepatitisTreatments.isEmpty())) {
                hepatitisTreatments.forEach(hepatitisTreatment1 -> {
                    ActivityTracker activityTracker = new ActivityTracker();
                    activityTracker.setActivityName("Hepatitis Treatment");
                    activityTracker.setPath("hepatitis_treatment");
                    activityTracker.setEditable(true);
                    activityTracker.setDeletable(true);
                    activityTracker.setViewable(true);
                    activityTracker.setRecordId(hepatitisTreatment1.getId());
                    activityTracker.setActivityDate(hepatitisTreatment1.getCreatedDate().toLocalDate());
                    activityTrackers.add(activityTracker);
                });
            }

//            hepatitisTreatment = this.treatmentRepository.findHepatitisTreatmentByHepatitisEnrollmentAndArchived(hepatitisEnrollment, 0);
//
//            if(hepatitisTreatment != null) {
//                ActivityTracker activityTracker = new ActivityTracker();
//
//                activityTracker.setActivityName("Hepatitis Treatment");
//                activityTracker.setPath("hepatitis_treatment");
//                activityTracker.setEditable(true);
//                activityTracker.setDeletable(true);
//                activityTracker.setViewable(true);
//                activityTracker.setRecordId(hepatitisTreatment.getId());
//                activityTracker.setActivityDate(hepatitisTreatment.getCreatedDate().toLocalDate());
//                activityTrackers.add(activityTracker);
//            }
        }
        return activityTrackers;
    }

    public HepatitisDiagnosis viewHepatitisDiagnosisById(Long id) {
        HepatitisDiagnosis hepatitisDiagnosis = diagnosisRepository.findHepatitisDiagnosisByIdAndArchived(id, 0);
        if(hepatitisDiagnosis == null) {
            throw new EntityNotFoundException(HepatitisDiagnosis.class, "Hepatitis diagnosis could not be found. ",
                    "pass ID of hepatitis diagnosis");
        }
        return hepatitisDiagnosis;
    }

    public HepatitisTreatment viewHepatitisTreatmentById(Long id) {
        HepatitisTreatment hepatitisTreatment = this.treatmentRepository.findHepatitisTreatmentsByIdAndArchived(id, 0);
        if(hepatitisTreatment == null) {
            throw new EntityNotFoundException(HepatitisTreatment.class, "Hepatitis treatment could not be found. ",
                    "pass ID of hepatitis Treatment");
        }
        return hepatitisTreatment;
    }

}
