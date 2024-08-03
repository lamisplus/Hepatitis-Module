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

    hepatitisBPastTreatmentRegimen: yup.string().when("hepatitisBTreatmentExperience", {
        is: (hepatitisBTreatmentExperience) => hepatitisBTreatmentExperience === "YES",
        then: yup.string().required(requiredTextPrompt),
        otherwise: yup.string(),
      }),

    hepatitisBPastTreatmentExperienceDateStarted: yup.date().when("hepatitisBTreatmentExperience", {
        is: (hepatitisBTreatmentExperience) => hepatitisBTreatmentExperience === "YES",
        then: yup.date().required(requiredTextPrompt),
        otherwise: yup.date(),
      }),


    hepatitisBPastTreatmentExperienceDateCompleted: yup.date().when("hepatitisBTreatmentExperience", {
        is: (hepatitisBTreatmentExperience) => hepatitisBTreatmentExperience === "YES",
        then: yup.date().required(requiredTextPrompt),
        otherwise: yup.date(),
      }),


    hepatitisBPastTreatmentExperiencePrescribedDuration: yup.string().when("hepatitisBTreatmentExperience", {
        is: (hepatitisBTreatmentExperience) => hepatitisBTreatmentExperience ==="YES",
        then: yup.string().required(requiredTextPrompt),
        otherwise: yup.string(),
      }),


    hepatitisBNewTreatmentRegimen: yup.string().required(requiredTextPrompt),

    hepatitisBNewTreatmentRegimenPrescribedDuration: yup.string().when("hepatitisBNewTreatmentRegimen", {
        is: (hepatitisBNewTreatmentRegimen) => hepatitisBNewTreatmentRegimen !== "",
        then: yup.string().required(requiredTextPrompt),
        otherwise: yup.string(),
      }),


    hepatitisBNewTreatmentRegimenDateStarted: yup.date().when("hepatitisBNewTreatmentRegimen", {
        is: (hepatitisBNewTreatmentRegimen) => hepatitisBNewTreatmentRegimen !== "",
        then: yup.date().required(requiredTextPrompt),
        otherwise: yup.date(),
      }),

    hepatitisBNewTreatmentRegimenDateCompleted: yup.date().when("hepatitisBNewTreatmentRegimen", {
        is: (hepatitisBNewTreatmentRegimen) => hepatitisBNewTreatmentRegimen !== "",
        then: yup.date().required(requiredTextPrompt),
        otherwise: yup.date(),
      }),


    hepatitisBAdverseEventReported: yup.string().required(requiredTextPrompt),

    hepatitisBRegimenSwitchNewRegimen: yup.string().required(requiredTextPrompt),

    hepatitisBRegimenSwitchDateStarted: yup.date().required(requiredTextPrompt),

    hepatitisBRegimenSwitchDateCompleted: yup.date().required(requiredTextPrompt),

    hepatitisBRegimenSwitchReasonForSwitch: yup.string().required(requiredTextPrompt),

    hepatitisBRegimenSwitchAdverseEffectReported: yup.string().required(requiredTextPrompt),
//done all this


    hepatitisBReasonForTreatment: yup.string().required(requiredTextPrompt),

    hepatitisBReasonsForTreatmentComment: yup.string(),

    hepatitisCPastTreatmentExperience: yup.string().required(requiredTextPrompt),

    hepatitisCPastTreatmentRegimen: yup.string().when("hepatitisCPastTreatmentExperience", {
        is: (hepatitisCPastTreatmentExperience) => hepatitisCPastTreatmentExperience === "YES",
        then: yup.string().required(requiredTextPrompt),
        otherwise: yup.string(),
      }),

    hepatitisCPastTreatmentExperienceDateStarted: yup.date().when("hepatitisCPastTreatmentExperience", {
        is: (hepatitisCPastTreatmentExperience) => hepatitisCPastTreatmentExperience === "YES",
        then: yup.date().required(requiredTextPrompt),
        otherwise: yup.date(),
      }),

    hepatitisCPastTreatmentExperienceDateCompleted: yup.date().when("hepatitisCPastTreatmentExperience", {
        is: (hepatitisCPastTreatmentExperience) => hepatitisCPastTreatmentExperience === "YES",
        then: yup.date().required(requiredTextPrompt),
        otherwise: yup.date(),
      }),

    hepatitisCPastTreatmentExperiencePrescribedDuration: yup.string().when("hepatitisCPastTreatmentExperience", {
        is: (hepatitisCPastTreatmentExperience) => hepatitisCPastTreatmentExperience === "YES",
        then: yup.string().required(requiredTextPrompt),
        otherwise: yup.string(),
      }),

    hepatitisCNewTreatmentRegimen: yup.string().required(requiredTextPrompt),

    hepatitisCNewTreatmentRegimenPrescribedDuration: yup.string().when("hepatitisCNewTreatmentRegimen", {
        is: (hepatitisCNewTreatmentRegimen) => hepatitisCNewTreatmentRegimen !== "",
        then: yup.string().required(requiredTextPrompt),
        otherwise: yup.string(),
      }),

    hepatitisCNewTreatmentRegimenDateStarted: yup.date().when("hepatitisCNewTreatmentRegimen", {
        is: (hepatitisCNewTreatmentRegimen) => hepatitisCNewTreatmentRegimen !== "",
        then: yup.date().required(requiredTextPrompt),
        otherwise: yup.date(),
      }),


    hepatitisCNewTreatmentRegimenDateCompleted: yup.date().when("hepatitisCNewTreatmentRegimen", {
        is: (hepatitisCNewTreatmentRegimen) => hepatitisCNewTreatmentRegimen !== "",
        then: yup.date().required(requiredTextPrompt),
        otherwise: yup.date(),
      }),



    hepatitisCAdverseEventReported: yup.string().required(requiredTextPrompt),

    hepatitisCSvr12TestingDateTested: yup.date().required(requiredTextPrompt),

    hepatitisCSvr12TestingHcvRna: yup.string().required(requiredTextPrompt),

    hepatitisCSvr12TestingHcvRnaValue:  yup.number().when("hepatitisCSvr12TestingHcvRna", {
        is: (hepatitisCSvr12TestingHcvRna) => hepatitisCSvr12TestingHcvRna === "DETECTED",
        then: yup.number().required(requiredTextPrompt),
        otherwise: yup.number(),
      }),


    hepatitisCHcvRetreatmentHcvGenotype: yup.string().required(requiredTextPrompt),

    hepatitisCHcvRetreatmentNewRegimen: yup.string().required(requiredTextPrompt),

    hepatitisCHcvRetreatmentPrescribedDuration: yup.string().required(requiredTextPrompt),

    hepatitisCHcvRetreatmentDateStarted: yup.date().required(requiredTextPrompt),

    hepatitisCHcvRetreatmentAdverseEffect: yup.string().required(requiredTextPrompt),

    hepatitisCHcvRetreatmentHistoryOfAdverseEffect: yup.string().required(requiredTextPrompt),

    hepatitisCRetreatmentSvr12TestingDateTested: yup.date().required(requiredTextPrompt),

    hepatitisCRetreatmentSvr12TestingRetreatmentHcvRna: yup.string().required(requiredTextPrompt),

    hepatitisCRetreatmentSvr12TestingRetreatmentHcvRnaValue:  yup.number().when("hepatitisCRetreatmentSvr12TestingRetreatmentHcvRna", {
        is: (hepatitisCRetreatmentSvr12TestingRetreatmentHcvRna) => hepatitisCRetreatmentSvr12TestingRetreatmentHcvRna === "DETECTED",
        then: yup.number().required(requiredTextPrompt),
        otherwise: yup.number(),
      }),

  });

  const formik = useFormik({
    initialValues: newPatientTreatmentValues,
    onSubmit,
    validationSchema: NewPatientTreatmentValidationSchema,
  });
  return { formik };
};
