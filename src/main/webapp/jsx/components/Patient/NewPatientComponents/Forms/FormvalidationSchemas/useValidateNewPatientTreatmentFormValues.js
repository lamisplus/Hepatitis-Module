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

    hepatitisCSvr12TestingDateStarted: "",
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
    hepatitisBPastTreatmentRegimen: yup.string().required(requiredTextPrompt),

    hepatitisBPastTreatmentExperienceDateStarted: yup.string().required(requiredTextPrompt),
    hepatitisBPastTreatmentExperienceDateCompleted: yup.string().required(requiredTextPrompt),
    hepatitisBPastTreatmentExperiencePrescribedDuration: yup.string().required(requiredTextPrompt),

    hepatitisBNewTreatmentRegimen: yup.string().required(requiredTextPrompt),
    hepatitisBNewTreatmentRegimenPrescribedDuration: yup.string().required(requiredTextPrompt),
    hepatitisBNewTreatmentRegimenDateStarted: yup.string().required(requiredTextPrompt),
    hepatitisBNewTreatmentRegimenDateCompleted: yup.string().required(requiredTextPrompt),

    hepatitisBAdverseEventReported: yup.string().required(requiredTextPrompt),

    hepatitisBRegimenSwitchNewRegimen: yup.string().required(requiredTextPrompt),
    hepatitisBRegimenSwitchDateStarted: yup.string().required(requiredTextPrompt),
    hepatitisBRegimenSwitchDateCompleted: yup.string().required(requiredTextPrompt),
    hepatitisBRegimenSwitchReasonForSwitch: yup.string().required(requiredTextPrompt),
    hepatitisBRegimenSwitchAdverseEffectReported: yup.string().required(requiredTextPrompt),

    hepatitisBReasonForTreatment: yup.string().required(requiredTextPrompt),
    hepatitisBReasonsForTreatmentComment: yup.string().required(requiredTextPrompt),

    hepatitisCPastTreatmentExperience: yup.string().required(requiredTextPrompt),
    hepatitisCPastTreatmentRegimen: yup.string().required(requiredTextPrompt),
    hepatitisCPastTreatmentExperienceDateStarted: yup.string().required(requiredTextPrompt),
    hepatitisCPastTreatmentExperienceDateCompleted: yup.string().required(requiredTextPrompt),
    hepatitisCPastTreatmentExperiencePrescribedDuration: yup.string().required(requiredTextPrompt),

    hepatitisCNewTreatmentRegimen: yup.string().required(requiredTextPrompt),
    hepatitisCNewTreatmentRegimenPrescribedDuration: yup.string().required(requiredTextPrompt),
    hepatitisCNewTreatmentRegimenDateStarted: yup.string().required(requiredTextPrompt),
    hepatitisCNewTreatmentRegimenDateCompleted: yup.string().required(requiredTextPrompt),

    hepatitisCAdverseEventReported: yup.string().required(requiredTextPrompt),

    hepatitisCSvr12TestingDateStarted: yup.string().required(requiredTextPrompt),
    hepatitisCSvr12TestingHcvRna: yup.string().required(requiredTextPrompt),
    hepatitisCSvr12TestingHcvRnaValue: yup.string().required(requiredTextPrompt),

    hepatitisCHcvRetreatmentHcvGenotype: yup.string().required(requiredTextPrompt),
    hepatitisCHcvRetreatmentNewRegimen: yup.string().required(requiredTextPrompt),
    hepatitisCHcvRetreatmentPrescribedDuration: yup.string().required(requiredTextPrompt),
    hepatitisCHcvRetreatmentDateStarted: yup.string().required(requiredTextPrompt),
    hepatitisCHcvRetreatmentAdverseEffect: yup.string().required(requiredTextPrompt),
    hepatitisCHcvRetreatmentHistoryOfAdverseEffect: yup.string().required(requiredTextPrompt),

    hepatitisCRetreatmentSvr12TestingDateTested: yup.string().required(requiredTextPrompt),
    hepatitisCRetreatmentSvr12TestingRetreatmentHcvRna: yup.string().required(requiredTextPrompt),
    hepatitisCRetreatmentSvr12TestingRetreatmentHcvRnaValue: yup.string().required(requiredTextPrompt),
  });

  const formik = useFormik({
    initialValues: newPatientTreatmentValues,
    onSubmit,
    validationSchema: NewPatientTreatmentValidationSchema,
  });
  return { formik };
};
