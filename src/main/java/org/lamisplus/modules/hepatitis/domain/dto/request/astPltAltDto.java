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
    private String ast;
    @NotEmpty(message = " Plt can not be empty")
    @Pattern(regexp = "[0-9]+", message = "Field must be a number")
    private String plt;
    @NotEmpty(message = "hbvHiv can not be empty")
    @Pattern(regexp = "[0-9]+", message = "Field must be a number")
    private String alt;
}