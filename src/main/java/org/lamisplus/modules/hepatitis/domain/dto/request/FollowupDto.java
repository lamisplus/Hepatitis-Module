package org.lamisplus.modules.hepatitis.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotEmpty;
import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class FollowupDto implements Serializable {

    @NotEmpty(message = "Hepatitis Enrolment UUID cannot be null or empty")
    private String enrollmentUuid;
    private FollowupAppointmentDto followupAppointment;
    private FollowupPreliminaryDto followupPreliminary;
    private FollowupClinicalParametersDto followupClinicalParameters;
}
