package org.lamisplus.modules.hepatitis.domain.dto.response;

import java.time.LocalDate;

public interface HepatitisEnrollmentPatientDTO {
		String getHospitalNumber();
		String getFirstName();
		String getSurname();
		String getOtherName();
		String getGender();
		String getUniqueId();
		String getBiometricStatus();
		String getEnrollmentStatus();
		String getPersonUuid();
		String getCreateBy();
		Boolean getIsEnrolled();
		Boolean getCommenced();
		Boolean getIsDobEstimated();
		Integer getAge();
		Long getId();
		Long getFacilityId();
		Long getTargetGroupId();
		Long getEnrollmentId();
		LocalDate getDateOfBirth();
		LocalDate getDateOfRegistration();
		
		
	}
