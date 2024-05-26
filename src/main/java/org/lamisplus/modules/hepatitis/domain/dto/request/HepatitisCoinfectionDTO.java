package org.lamisplus.modules.hepatitis.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Digits;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HepatitisCoinfectionDTO {
    @NotEmpty(message = " hbvHcv can not be empty")
    @Pattern(regexp = "^[0-9]*$", message = "Field must be a number")
    private String hbvHcv;
    @NotEmpty(message = " hbvHdv can not be empty")
    @Pattern(regexp = "^[0-9]*$", message = "Field must be a number")
    private String hbvHdv;
    @NotEmpty(message = "hbvHiv can not be empty")
    @Pattern(regexp = "^[0-9]*$", message = "Field must be a number")
    private String hbvHiv;
    @NotEmpty(message = "hbvHcdHiv can not be empty")
   // @Digits(message = "m")
    @Pattern(regexp = "^[0-9]*$", message = "Field must be a number")
    private String hbvHcdHiv;
}
