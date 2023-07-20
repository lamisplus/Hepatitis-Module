package org.lamisplus.modules.hepatitis.service;

import org.lamisplus.modules.hepatitis.domain.dto.request.DiagnosisDTO;
import org.lamisplus.modules.hepatitis.domain.dto.request.EnrollmentDTO;
import org.lamisplus.modules.hepatitis.domain.dto.request.HepatitisRequestDTO;
import org.lamisplus.modules.hepatitis.domain.dto.request.TreatmentDTO;
import org.lamisplus.modules.hepatitis.domain.entity.Diagnosis;
import org.lamisplus.modules.hepatitis.domain.entity.Enrollment;
import org.lamisplus.modules.hepatitis.domain.entity.Treatment;
import org.springframework.stereotype.Service;

import java.sql.SQLOutput;

@Service
public class HepatitisEnrollmentService  {
//    public Enrollment saveEnrollment(EnrollmentDTO enrollment);
//    public Diagnosis saveDiagnosis(DiagnosisDTO diagnosisDTO, Enrollment enrollment);
//    public Treatment saveTreatment(TreatmentDTO treatmentDTO, Enrollment enrollment);
    public String createPatient(HepatitisRequestDTO hepatitisRequestDTO) {
        return "IN";
    };

}
