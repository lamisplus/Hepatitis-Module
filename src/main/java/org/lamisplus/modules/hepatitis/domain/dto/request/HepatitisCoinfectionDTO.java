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
    @NotEmpty(message = " hbvHcvInputValue can not be empty")
    @Pattern(regexp = "[0-9]+", message = "Field must be a number")
    private Long hbvHcvInputValue;
    @NotEmpty(message = " hbvHdvInputValue can not be empty")
    @Pattern(regexp = "[0-9]+", message = "Field must be a number")
    private Long hbvHdvInputValue;
    @NotEmpty(message = "hbvHivInputValue can not be empty")
    @Pattern(regexp = "[0-9]+", message = "Field must be a number")
    private Long hbvHivInputValue;
    @NotEmpty(message = "hcvHivInputValue can not be empty")
    @Pattern(regexp = "[0-9]+", message = "Field must be a number")
    private Long hcvHivInputValue;
    @NotEmpty(message = "hbvHcdHivInputValue can not be empty")
    @Pattern(regexp = "[0-9]+", message = "Field must be a number")
    private Long hbvHcvHivInputValue;

    @NotEmpty(message = "hbvHcvCheckbox can not be empty")
    private Boolean hbvHcvCheckbox;

    @NotEmpty(message = "hbvHivCheckbox can not be empty")
    private Boolean hbvHivCheckbox;

    @NotEmpty(message = "hcvHivCheckbox can not be empty")
    private Boolean hcvHivCheckbox;

    @NotEmpty(message = "hbvHdvCheckbox can not be empty")
    private Boolean hbvHdvCheckbox;

    @NotEmpty(message = "hbvHcvHivCheckbox can not be empty")
    private Boolean hbvHcvHivCheckbox;



}
