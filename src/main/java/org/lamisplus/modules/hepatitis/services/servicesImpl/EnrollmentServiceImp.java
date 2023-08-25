package org.lamisplus.modules.hepatitis.services.servicesImpl;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.lamisplus.modules.hepatitis.domain.dto.*;
import org.lamisplus.modules.hepatitis.domain.entities.Enrollment;
import org.lamisplus.modules.hepatitis.repositories.EnrollmentRepository;
import org.lamisplus.modules.hepatitis.repositories.EnrollmentsRepository;
import org.lamisplus.modules.hepatitis.repositories.ScreeningRepository;
import org.lamisplus.modules.hepatitis.services.EnrollmentService;
import org.lamisplus.modules.patient.domain.dto.PersonResponseDto;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.lamisplus.modules.patient.repository.PersonRepository;
import org.lamisplus.modules.patient.service.PersonService;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class EnrollmentServiceImp implements EnrollmentService {

    private final PersonRepository personRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final EnrollmentsRepository enrollmentsRepository;
    private final ScreeningRepository screeningRepository;
    private final PersonService personService;


    @Override
    public EnrollmentsResponseDto createEnrollment(EnrollmentsRequestDto enrollmentRequestDto) {
        //saving patient record
        PersonResponseDto personResponseDto = personService.createPerson(enrollmentRequestDto.getPersonDto());

        Person person = personRepository.findById(personResponseDto.getId()).get();
        person.setUuid(personResponseDto.getUuid());
        Enrollment enrollment = new Enrollment();
        enrollment.setCareEntryPoint(enrollment.getCareEntryPoint());
        enrollment.setPerson(person);
        enrollment.setBmi(enrollment.getBmi());















    }
}
