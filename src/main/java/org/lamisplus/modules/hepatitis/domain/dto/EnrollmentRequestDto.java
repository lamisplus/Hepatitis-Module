package org.lamisplus.modules.hepatitis.domain.dto;

import lombok.*;
import org.lamisplus.modules.hepatitis.domain.enums.Status;
import org.lamisplus.modules.patient.domain.dto.PersonDto;
import org.lamisplus.modules.patient.domain.entity.Person;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class EnrollmentRequestDto {
    private String careEntryPoint;
    private String weight;
    private String height;
    private String bmi;
    private Status pregnancy;
    private Status breastFeeding;


}
