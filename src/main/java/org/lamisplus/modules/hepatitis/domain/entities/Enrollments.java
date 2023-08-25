package org.lamisplus.modules.hepatitis.domain.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.lamisplus.modules.patient.domain.entity.Person;

import javax.persistence.OneToOne;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class Enrollments {
    @OneToOne
    private Person person;
    @OneToOne
    private Enrollment enrollment;
    @OneToOne
    private Screening screening;
}
