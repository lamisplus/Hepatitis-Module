package org.lamisplus.modules.hepatitis.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class astPltAltDto {

    @NotEmpty(message = "Ast can not be empty")
    @Pattern(regexp = "[0-9]+", message = "Field must be a number")
    private Long astInputValue;

    @NotEmpty(message = " Plt can not be empty")
    @Pattern(regexp = "[0-9]+", message = "Field must be a number")
    private Long pltInputValue;

    @NotEmpty(message = "hbvHiv can not be empty")
    @Pattern(regexp = "[0-9]+", message = "Field must be a number")
    private Long altInputValue;

    @NotEmpty(message = "astCheckbox can not be empty")
    private Boolean astCheckbox;

    @NotEmpty(message = "altCheckbox can not be empty")
    private Boolean altCheckbox;

    @NotEmpty(message = "pltCheckbox can not be empty")
    private Boolean pltCheckbox;


}