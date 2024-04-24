package org.lamisplus.modules.hepatitis.domain.entity;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.Type;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "hepatitis_followups")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder

public class HepatitisFollowup extends AbstractPersistableEntity {

    @ManyToOne
    @JoinColumn(name = "enrollment_uuid", referencedColumnName = "uuid")
    private HepatitisEnrollment hepatitisEnrollment;

    @Type(type = "jsonb-node")
    @Column(name = "appointment", columnDefinition = "jsonb", nullable = true)
    private JsonNode followupAppointmentDto;

    @Type(type = "jsonb-node")
    @Column(name = "clinical_parameters", columnDefinition = "jsonb", nullable = true)
    private JsonNode followupClinicalParametersDto;

    @Type(type = "jsonb-node")
    @Column(name = "preliminary", columnDefinition = "jsonb", nullable = true)
    private JsonNode followupPreliminaryDto;




}
