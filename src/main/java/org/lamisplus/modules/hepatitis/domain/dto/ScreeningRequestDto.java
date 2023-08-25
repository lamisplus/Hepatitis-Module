package org.lamisplus.modules.hepatitis.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import liquibase.datatype.DataTypeInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.lamisplus.modules.patient.domain.entity.Person;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScreeningRequestDto {

    private LocalDate dateOfHepatitisBPositiveScreening;

    @NotNull(message = "hepatitisHcvAb should not be empty")
    private String hepatitisCHcvAb;
}
