package org.lamisplus.modules.hepatitis.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.lamisplus.modules.hepatitis.domain.enums.Status;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnrollmentResponseDto {

    private Long id;

    private String careEntryPoint;

    private String weight;

    private String height;

    private String bmi;

    private Status pregnancy;

    private Status breastFeeding;
}
