package org.lamisplus.modules.hepatitis.domain.entity;

import com.fasterxml.jackson.databind.JsonNode;
import org.lamisplus.modules.hepatitis.domain.enums.Sex;
import org.lamisplus.modules.hepatitis.domain.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.Type;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

@Entity
@Table(name = "hepatitis_enrollments")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class HepatitisEnrollment extends AbstractPersistableEntity {

    /*@JoinColumn(name = "person_uuid", referencedColumnName = "uuid", insertable = false, updatable = false)
    private Person person;*/
    @Basic
    @Column(name = "person_uuid")
    private String personUuid;

    @Column(name = "sex")
    @Enumerated(EnumType.STRING)
    private Sex sex;

    @Column(name = "pregnancy")
    private Status pregnancy;

    @Column(name = "weight")
    private Double weight;

    @Column(name = "height")
    private Double height;

    @Column(name = "bmi")
    private Double bmi;

    @Column(name = "hepatitis_b")
    private String hepatitisB;

    @Column(name = "breastfeeding")
    @Enumerated(EnumType.STRING)
    private Status breastfeeding;

    @Column(name = "history_of_using_abused_substance")
    @Enumerated(EnumType.STRING)
    private Status historyOfUsingAbusedSubstance;

    @Type(type = "jsonb-node")
    @Column(columnDefinition = "jsonb")
    private JsonNode screening;


    @Column(name = "care_entry_point")
    private String careEntryPoint;
}
