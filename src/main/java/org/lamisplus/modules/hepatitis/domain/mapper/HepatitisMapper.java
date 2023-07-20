package org.lamisplus.modules.hepatitis.domain.mapper;

import org.lamisplus.modules.hepatitis.domain.dto.request.DiagnosisDTO;
import org.lamisplus.modules.hepatitis.domain.dto.request.EnrollmentDTO;
import org.lamisplus.modules.hepatitis.domain.dto.request.TreatmentDTO;
import org.lamisplus.modules.hepatitis.domain.entity.Diagnosis;
import org.lamisplus.modules.hepatitis.domain.entity.Enrollment;
import org.lamisplus.modules.hepatitis.domain.entity.Treatment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface HepatitisMapper {
    public Enrollment mapEnrollmentDtoEntity(EnrollmentDTO dto);
    public Diagnosis mapDiagnosisDtoEntity(DiagnosisDTO dto, Enrollment enrollment);
    public Treatment mapTreatmentDtoEntity(TreatmentDTO dto, Enrollment enrollment);


}
