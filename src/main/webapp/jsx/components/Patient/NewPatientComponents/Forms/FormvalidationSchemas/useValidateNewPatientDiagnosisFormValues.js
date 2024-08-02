import { useFormik } from "formik";
import * as yup from "yup";
import { token, url } from "../../../../../../api";
import axios from "axios";

export const useValidateNewPatientDiagnosisFormValuesHook = (onSubmit) => {
  const requiredTextPrompt = "This field is required";

  const newPatientDiagnosisValues = {
    dateHbvDnaTestRequested: "",
    dateHbvSampleRequested: "",
    dateHbvDnaResultReported: "",
    hbvDna: "",
    hbvDnaValue: "",
    hbsAgQuantification: "",
    hbeAG: "",
    antiHDV: "",
    treatmentEligible: "",
    pmtctEligible: "",
    comment: "",
    hcvRNA: "",
    hcvRnaValue: "",
    hbvHcvCheckbox: "",
    hbvHivCheckbox: "",
    hcvHivCheckbox: "",
    hbvHcvCheckbox: "",
    hbvHivInputValue: "",
    hcvHivInputValue: "",
    hbvHcvInputValue: "",
    hbvHdvCheckbox: "",
    hbvHcvHivCheckbox: "",
    hbvHdvInputValue: "",
    hbvHcvHivInputValue: "",
    commobidities: "",
    multipleInfection: "",
    astCheckbox: "",
    pltCheckbox: "",
    altCheckbox: "",
    astInputValue: "",
    altInputValue: "",
    pltInputValue: "",
    totalBiliRubin: "",
    directBiliribin: "",
    albumin: "",
    apriScore: "",
    fib4: "",
    prothrombinTimeNR: "",
    urea: "",
    creatinine: "",
    ultrasoundScan: "",
    afp: "",
    fibroscan: "",
    ctScan: "",
    ascites: "",
    severityOfAscites: "",
    gradeOfEncephalopathy: "",
    childPughScore: "",
    liverBiopsyStage: "",
    stagingDateOfLiverBiopsy: "",
    diagnosisResult: "",
};

  const NewPatientDiagnosisValidationSchema = yup.object({
    dateHbvDnaTestRequested: yup.date().required(requiredTextPrompt),
    dateHbvSampleRequested: yup.date().required(requiredTextPrompt),
    dateHbvDnaResultReported: yup.date().required(requiredTextPrompt),

    hbvDna: yup.string().required(requiredTextPrompt),

    hbvDnaValue: yup.number().when("hbvDna", {
        is: (hbvDna) => hbvDna === "DETECTED",
        then: yup.number().required(requiredTextPrompt),
        otherwise: yup.number(),
      }),

    hbsAgQuantification: yup.number().when("hbvDna", {
        is: (hbvDna) => hbvDna === "DETECTED",
        then: yup.number().required(requiredTextPrompt),
        otherwise: yup.number(),
      }),
    
    
    hbeAG: yup.string().required(requiredTextPrompt),
    antiHDV: yup.string().required(requiredTextPrompt),
    treatmentEligible: yup.string().required(requiredTextPrompt),
    pmtctEligible: yup.string().required(requiredTextPrompt),
    comment: yup.string().required(requiredTextPrompt),
    hcvRNA: yup.string().required(requiredTextPrompt),

    hcvRnaValue: yup.number().when("hcvRNA", {
        is: (hcvRNA) => hcvRNA === "DETECTED",
        then: yup.number().required(requiredTextPrompt),
        otherwise: yup.number(),
      }),

    
    hbvHcvCheckbox: yup.boolean().required(requiredTextPrompt),
    hbvHivCheckbox: yup.boolean().required(requiredTextPrompt),
    hcvHivCheckbox: yup.boolean().required(requiredTextPrompt),
    hbvHcvCheckbox: yup.boolean().required(requiredTextPrompt),
    hbvHdvCheckbox: yup.boolean().required(requiredTextPrompt),
    hbvHcvHivCheckbox: yup.boolean().required(requiredTextPrompt),

    hbvHcvInputValue: yup.number().when("hbvHcvCheckbox", {
        is: (hbvHcvCheckbox) => hbvHcvCheckbox === true,
        then: yup.number().required(requiredTextPrompt),
        otherwise: yup.number(),
      }),

    hbvHivInputValue: yup.number().when("hbvHivCheckbox", {
        is: (hbvHivCheckbox) => hbvHivCheckbox === true,
        then: yup.number().required(requiredTextPrompt),
        otherwise: yup.number(),
      }),
    hcvHivInputValue: yup.number().when("hcvHivCheckbox", {
        is: (hcvHivCheckbox) => hcvHivCheckbox === true,
        then: yup.number().required(requiredTextPrompt),
        otherwise: yup.number(),
      }),


    hbvHdvInputValue: yup.number().when("hbvHdvCheckbox", {
        is: (hbvHdvCheckbox) => hbvHdvCheckbox === true,
        then: yup.number().required(requiredTextPrompt),
        otherwise: yup.number(),
      }),


    hbvHcvHivInputValue: yup.number().when("hbvHcvHivCheckbox", {
        is: (hbvHcvHivCheckbox) => hbvHcvHivCheckbox === true,
        then: yup.number().required(requiredTextPrompt),
        otherwise: yup.number(),
      }),

    commobidities: yup.string().required(requiredTextPrompt),

    multipleInfection: yup.string().when("commobidities", {
        is: (commobidities) => commobidities === "YES",
        then: yup.string().required(requiredTextPrompt),
        otherwise: yup.string(),
      }),



    astCheckbox: yup.boolean().required(requiredTextPrompt),
    altCheckbox: yup.boolean().required(requiredTextPrompt),
    pltCheckbox: yup.boolean().required(requiredTextPrompt),

    astInputValue: yup.number().when("astCheckbox", {
        is: (astCheckbox) => astCheckbox === true,
        then: yup.number().required(requiredTextPrompt),
        otherwise: yup.number(),
      }),


    altInputValue: yup.number().when("altCheckbox", {
        is: (altCheckbox) => altCheckbox === true,
        then: yup.number().required(requiredTextPrompt),
        otherwise: yup.number(),
      }),

    pltInputValue: yup.number().when("pltCheckbox", {
        is: (pltCheckbox) => pltCheckbox === true,
        then: yup.number().required(requiredTextPrompt),
        otherwise: yup.number(),
      }),

    totalBiliRubin: yup.string().required(requiredTextPrompt),
    directBiliribin: yup.string().required(requiredTextPrompt),

    albumin: yup.number().required(requiredTextPrompt),
    apriScore: yup.number().required(requiredTextPrompt),
    fib4: yup.number().required(requiredTextPrompt),

    prothrombinTimeNR: yup.number().required(requiredTextPrompt),
    urea: yup.number().required(requiredTextPrompt),
    creatinine: yup.number().required(requiredTextPrompt),
    ultrasoundScan: yup.number().required(requiredTextPrompt),
    afp: yup.number().required(requiredTextPrompt),
    fibroscan: yup.number().required(requiredTextPrompt),

    ctScan: yup.string().required(requiredTextPrompt),
    ascites: yup.string().required(requiredTextPrompt),

    severityOfAscites: yup.string().when("ascites", {
        is: (ascites) => ascites === "YES",
        then: yup.string().required(requiredTextPrompt),
        otherwise: yup.string(),
      }),

    
    gradeOfEncephalopathy: yup.string().required(requiredTextPrompt),
    childPughScore: yup.string().required(requiredTextPrompt),
    liverBiopsyStage: yup.string().required(requiredTextPrompt),
    stagingDateOfLiverBiopsy: yup.date().required(requiredTextPrompt),
    diagnosisResult: yup.string().required(requiredTextPrompt),

});

  const formik = useFormik({
    initialValues: newPatientDiagnosisValues,
    onSubmit,
    validationSchema: NewPatientDiagnosisValidationSchema,
  });
  return { formik };
};
