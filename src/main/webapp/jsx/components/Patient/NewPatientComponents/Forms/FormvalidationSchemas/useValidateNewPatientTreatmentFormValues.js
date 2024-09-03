import { useFormik } from "formik";
import * as yup from "yup";

export const useValidateNewPatientTreatmentFormValuesHook = (onSubmit) => {
  const requiredTextPrompt = "This field is required";

  const newPatientTreatmentValues = {
    hepatitisBTreatmentExperience: "",
    hepatitisBPastTreatmentRegimen: "",

    hepatitisBPastTreatmentExperienceDateStarted: "",
    hepatitisBPastTreatmentExperienceDateCompleted: "",
    hepatitisBPastTreatmentExperiencePrescribedDuration: "",

    hepatitisBNewTreatmentRegimen: "",
    hepatitisBNewTreatmentRegimenPrescribedDuration: "",
    hepatitisBNewTreatmentRegimenDateStarted: "",
    hepatitisBNewTreatmentRegimenDateCompleted: "",

    hepatitisBAdverseEventReported: "",

    hepatitisBRegimenSwitchNewRegimen: "",
    hepatitisBRegimenSwitchDateStarted: "",
    hepatitisBRegimenSwitchDateCompleted: "",
    hepatitisBRegimenSwitchReasonForSwitch: "",
    hepatitisBRegimenSwitchAdverseEffectReported: "",

    hepatitisBReasonForTreatment: "",
    hepatitisBReasonsForTreatmentComment: "",

    hepatitisCPastTreatmentExperience: "",
    hepatitisCPastTreatmentRegimen: "",
    hepatitisCPastTreatmentExperienceDateStarted: "",
    hepatitisCPastTreatmentExperienceDateCompleted: "",
    hepatitisCPastTreatmentExperiencePrescribedDuration: "",

    hepatitisCNewTreatmentRegimen: "",
    hepatitisCNewTreatmentRegimenPrescribedDuration: "",
    hepatitisCNewTreatmentRegimenDateStarted: "",
    hepatitisCNewTreatmentRegimenDateCompleted: "",

    hepatitisCAdverseEventReported: "",

    hepatitisCSvr12TestingDateTested: "",
    hepatitisCSvr12TestingHcvRna: "",
    hepatitisCSvr12TestingHcvRnaValue: "",

    hepatitisCHcvRetreatmentHcvGenotype: "",
    hepatitisCHcvRetreatmentNewRegimen: "",
    hepatitisCHcvRetreatmentPrescribedDuration: "",
    hepatitisCHcvRetreatmentDateStarted: "",
    hepatitisCHcvRetreatmentAdverseEffect: "",
    hepatitisCHcvRetreatmentHistoryOfAdverseEffect: "",

    hepatitisCRetreatmentSvr12TestingDateTested: "",
    hepatitisCRetreatmentSvr12TestingRetreatmentHcvRna: "",
    hepatitisCRetreatmentSvr12TestingRetreatmentHcvRnaValue: "",

  };


  const NewPatientTreatmentValidationSchema = yup.object({
    hepatitisBTreatmentExperience: yup.string().required(requiredTextPrompt),
    hepatitisBPastTreatmentRegimen: yup.string(),
    hepatitisBPastTreatmentExperienceDateStarted: yup.date(),
    hepatitisBPastTreatmentExperienceDateCompleted: yup.date(),
    hepatitisBPastTreatmentExperiencePrescribedDuration: yup.string(),
    hepatitisBNewTreatmentRegimen: yup.string(),
    hepatitisBNewTreatmentRegimenPrescribedDuration: yup.string(),
    hepatitisBNewTreatmentRegimenDateStarted: yup.date(),
    hepatitisBNewTreatmentRegimenDateCompleted: yup.date(),
    hepatitisBAdverseEventReported: yup.string(),
    hepatitisBRegimenSwitchNewRegimen: yup.string(),
    hepatitisBRegimenSwitchDateStarted: yup.date(),
    hepatitisBRegimenSwitchDateCompleted: yup.date(),
    hepatitisBRegimenSwitchReasonForSwitch: yup.string(),
    hepatitisBRegimenSwitchAdverseEffectReported: yup.string(),
    hepatitisBReasonForTreatment: yup.string(),
    hepatitisBReasonsForTreatmentComment: yup.string(),
    hepatitisCPastTreatmentExperience: yup.string(),
    hepatitisCPastTreatmentRegimen: yup.string(),
    hepatitisCPastTreatmentExperienceDateStarted: yup.date(),
    hepatitisCPastTreatmentExperienceDateCompleted: yup.date(),
    hepatitisCPastTreatmentExperiencePrescribedDuration: yup.string(),
    hepatitisCNewTreatmentRegimen: yup.string(),
    hepatitisCNewTreatmentRegimenPrescribedDuration: yup.string(),
    hepatitisCNewTreatmentRegimenDateStarted: yup.date(),
    hepatitisCNewTreatmentRegimenDateCompleted: yup.date(),
    hepatitisCAdverseEventReported: yup.string(),
    hepatitisCSvr12TestingDateTested: yup.date(),
    hepatitisCSvr12TestingHcvRna: yup.string(),
    hepatitisCSvr12TestingHcvRnaValue: yup.number(),
    hepatitisCHcvRetreatmentHcvGenotype: yup.string(),
    hepatitisCHcvRetreatmentNewRegimen: yup.string(),
    hepatitisCHcvRetreatmentPrescribedDuration: yup.string(),
    hepatitisCHcvRetreatmentDateStarted: yup.date(),
    hepatitisCHcvRetreatmentAdverseEffect: yup.string(),
    hepatitisCHcvRetreatmentHistoryOfAdverseEffect: yup.string(),
    hepatitisCRetreatmentSvr12TestingDateTested: yup.date(),
    hepatitisCRetreatmentSvr12TestingRetreatmentHcvRna: yup.string(),
    hepatitisCRetreatmentSvr12TestingRetreatmentHcvRnaValue: yup.number(),

  });

  const formik = useFormik({
    initialValues: newPatientTreatmentValues,
    onSubmit,
    validationSchema: NewPatientTreatmentValidationSchema,
  });
  return { formik };
};
