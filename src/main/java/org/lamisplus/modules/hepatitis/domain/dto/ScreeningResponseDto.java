package org.lamisplus.modules.hepatitis.domain.dto;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

public class ScreeningResponseDto {
    private Long id;

    private LocalDate dateOfHepatitisBPositiveScreening;

    @NotNull(message = "hepatitisHcvAb should not be empty")
    private String hepatitisCHcvAb;
}
