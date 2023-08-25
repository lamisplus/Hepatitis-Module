package org.lamisplus.modules.hepatitis.domain.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.Hibernate;
import org.lamisplus.modules.patient.domain.entity.Person;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Screening",uniqueConstraints = @UniqueConstraint(columnNames = {"uuid"}))
public class Screening extends AbstractPersistableEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "uuid", nullable = false,updatable = false)
    private String uuid;

    @OneToOne
    @JoinColumn(name = "person_uuid", referencedColumnName = "uuid", insertable = false, updatable = false)
    private Person person;


    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name = "date_of_hepatitis_b_positive_screening",nullable = false)
    private LocalDate dateOfHepatitisBPositiveScreening;

    @Column(name = "hepatitis_c_hcvAb",nullable = false )
    private String hepatitisCHcvAb;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Screening screening = (Screening) o;
        return getId() != null && Objects.equals(getId(), screening.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
