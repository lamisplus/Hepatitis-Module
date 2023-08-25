package org.lamisplus.modules.hepatitis.domain.entities;

import lombok.*;
import org.lamisplus.modules.hepatitis.domain.enums.Status;
import org.lamisplus.modules.patient.domain.entity.Person;

import javax.persistence.*;

@Builder
@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "enrollment",uniqueConstraints = @UniqueConstraint(columnNames = {"uuid"}))
public class Enrollment extends AbstractPersistableEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "person_uuid", referencedColumnName = "uuid", insertable = false, updatable = false)
    private Person person;

    @Column(name = "uuid", nullable = false,updatable = false)
    private String uuid;

    @Column(name = "care_entry_point")
    private String careEntryPoint;

    @Column(name = "weight")
    private String weight;

    @Column(name ="height")
    private String height;

    @Column(name = "bmi")
    private String bmi;

    @Column(name = "pregnancy")
    private Status pregnancy;

    @Column(name ="breast_feeding")
    private Status breastFeeding;
}
