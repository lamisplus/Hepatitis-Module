import { useFormik } from "formik";
import * as yup from "yup";

const invalidTextPrompt = "Invalid input type";
const requiredTextPrompt = "field is required";

export const useValidateForm1ValuesHook = (onSubmit) => {
  const form1InitialValues = {
    stateId: "",
    otherName: "",
    countryId: "",
    coreEntryPoint: "",
    pregnancy: "",
    weight: "",
    height: "",
    hepatitisB: "",
    breastfeeding: "",
    historyOfUsingAbusedSubstance: "",
    dateOfFirstHepatitisBPositiveScreening: "",
    hepatitisC: "",
    surname: "",
    firstName: "",
    dateOfBirth: "",
    maritalStatusId: "",
    phone: "",
    ninNumber: "",
    isDateOfBirthEstimated: "",
    educationId: "",
    employmentStatusId: "",
    dateOfRegistration: "",
  };

  const Form1ValidationSchema = yup.object({
    stateId: yup.number(),
    countryId: yup.number(),
    educationId: yup.number(),
    employmentStatusId: yup.number(),
    coreEntryPoint: yup.number(),
    pregnancy: yup.number(),
    weight: yup.number(),
    height: yup.number(),
    hepatitisB: yup.number(),
    breastfeeding: yup.number(),
    historyOfUsingAbusedSubstance: yup.number(),
    dateOfFirstHepatitisBPositiveScreening: yup.date(),
    hepatitisC: yup.number(),
    surname: yup.number(),
    firstName: yup.number(),
    otherName: yup.number(),
    dateOfBirth: yup.date(),
    dateOfRegistration: yup.date(),
    maritalStatusId: yup.number(),
    sexId: yup.number(),
    phone: yup.number(),
    ninNumber: yup.number(),
    isDateOfBirthEstimated: yup.boolean(),
  });

  const formik = useFormik({
    initialValues: form1InitialValues,
    onSubmit,
    validationSchema: Form1ValidationSchema,
  });
  return { formik };
};

export const useValidateFollowupFormValuesHook = (onSubmit) => {
  const followupFormIntialValue = {
    fuDateOfVisit: "",
    fuWeight: "",
    fuHeight: "",
    // fuBmi: "",
    fuBloodPressure: "",
    fuHbsagQuantification: "",
    fuHbeag: "",
    fuHbvDna: "",
    fuAlt: "",
    fuAst: "",
    fuPlt: "",
    fuTotalBilirubin: "",
    fuDirectBilirubin: "",
    fuAlbumin: "",
    fuApriScore: "",
    fuFib4: "",
    fuProthrombinTime: "",
    fuUrea: "",
    fuCreatinine: "",
    fuUltrasoundScan: "",
    fuAfp: "",
    fuFibroscan: "",
    fuCtScan: "",
    fuAscites: "",
    fuSeverityOfAscites: "",
    fuGradeOfEncephalopathy: "",
    fuChildPughScore: "",
    fuLiverBiopsyStage: "",
    fuStagingDateLiverBiopsy: "",
    fuDiagnosis: "",
    fuTreatmentRegimen: "",
    fuNextAppointment: "",
    fuClinicalName: "",
    fuRemark: "",
  };

  const FollowupFormValidationSchema = yup.object({
    fuDateOfVisit: yup.date().required("Date of visit is required"),
    fuWeight: yup.number(),
    fuHeight: yup.number(),
    // fuBmi: yup.number(),
    fuBloodPressure: yup.number(),
    fuHbsagQuantification: yup.number(),
    fuHbeag: yup.number(),
    fuHbvDna: yup.number(),
    fuAlt: yup.number(),
    fuAst: yup.number(),
    fuPlt: yup.number(),
    fuTotalBilirubin: yup.number(),
    fuDirectBilirubin: yup.number(),
    fuAlbumin: yup.number(),
    fuApriScore: yup.number(),
    fuFib4: yup.number(),
    fuProthrombinTime: yup.number(),
    fuUrea: yup.number(),
    fuCreatinine: yup.number(),
    fuUltrasoundScan: yup.string(),
    fuAfp: yup.number(),
    fuFibroscan: yup.string(),
    fuCtScan: yup.string(),
    fuAscites: yup.string(),
    fuSeverityOfAscites: yup.string(),
    fuGradeOfEncephalopathy: yup.string(),
    fuChildPughScore: yup.number(),
    fuLiverBiopsyStage: yup.string(),
    fuStagingDateLiverBiopsy: yup.date(),
    fuDiagnosis: yup.string(),
    fuTreatmentRegimen: yup.string(),
    fuNextAppointment: yup.date(),
    fuClinicalName: yup.string(),
    fuRemark: yup.string(),
  });

  const formik = useFormik({
    initialValues: followupFormIntialValue,
    onSubmit,
    validationSchema: FollowupFormValidationSchema,
  });
  return { formik };
};


