import { useFormik } from "formik";
import * as yup from "yup";


export const useValidateExistingPatientDiagnosisFormValuesHook = (onSubmit, userGender) => {
  const requiredTextPrompt = "This field is required";
  const numberTypeError = "Value must be a number";

  const existingPatientDiagnosisValues = {
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

  const ExistingPatientDiagnosisValidationSchema = yup.object({
    dateHbvDnaTestRequested: yup.date().required(requiredTextPrompt),//done
    dateHbvSampleRequested: yup.date().required(requiredTextPrompt),//done
    dateHbvDnaResultReported: yup.date().required(requiredTextPrompt),//done

    hbvDna: yup.string(),//done

    hbvDnaValue: yup.number().when("hbvDna", {
        is: (hbvDna) => hbvDna === "DETECTED",
        then: yup.number().required(requiredTextPrompt),
        otherwise: yup.number(),
      }),//done

    hbsAgQuantification: yup.number().when("hbvDna", { 
        is: (hbvDna) => hbvDna === "DETECTED",
        then: yup.number().required(requiredTextPrompt),
        otherwise: yup.number(),
      }),//done
    
    
    hbeAG: yup.string().required(requiredTextPrompt),//done
    antiHDV: yup.string().required(requiredTextPrompt),//done
    treatmentEligible: yup.string().required(requiredTextPrompt),
    pmtctEligible: userGender?.toLowerCase() === "female" ? yup.string().required(requiredTextPrompt) : yup.string(),//done
    comment: yup.string(),//done
    hcvRNA: yup.string().required(requiredTextPrompt),//done

    hcvRnaValue: yup.number().when("hcvRNA", {
        is: (hcvRNA) => hcvRNA === "DETECTED",
        then: yup.number().required(requiredTextPrompt),
        otherwise: yup.number(),
      }),//done

    
    hbvHcvCheckbox: yup.boolean(),//done
    hbvHivCheckbox: yup.boolean(),//done
    hcvHivCheckbox: yup.boolean(),//done
    hbvHcvCheckbox: yup.boolean(),//done
    hbvHdvCheckbox: yup.boolean(),//done
    hbvHcvHivCheckbox: yup.boolean(),//done

    hbvHcvInputValue: yup.number().when("hbvHcvCheckbox", {
        is: (hbvHcvCheckbox) => hbvHcvCheckbox === true,
        then: yup.number().required(requiredTextPrompt),
        otherwise: yup.number(),
      }),//done

    hbvHivInputValue: yup.number().when("hbvHivCheckbox", {
        is: (hbvHivCheckbox) => hbvHivCheckbox === true,
        then: yup.number().required(requiredTextPrompt),
        otherwise: yup.number(),
      }),//done
    hcvHivInputValue: yup.number().when("hcvHivCheckbox", {
        is: (hcvHivCheckbox) => hcvHivCheckbox === true,
        then: yup.number().required(requiredTextPrompt),
        otherwise: yup.number(),
      }),//done


    hbvHdvInputValue: yup.number().when("hbvHdvCheckbox", {
        is: (hbvHdvCheckbox) => hbvHdvCheckbox === true,
        then: yup.number().required(requiredTextPrompt),
        otherwise: yup.number(),
      }),//done


    hbvHcvHivInputValue: yup.number().when("hbvHcvHivCheckbox", {
        is: (hbvHcvHivCheckbox) => hbvHcvHivCheckbox === true,
        then: yup.number().required(requiredTextPrompt),
        otherwise: yup.number(),
      }),//done

    commobidities: yup.string(),

    multipleInfection: yup.string().when("commobidities", {
        is: (commobidities) => commobidities === "YES",
        then: yup.string().required(requiredTextPrompt),
        otherwise: yup.string(),
      }),//done



    astCheckbox: yup.boolean().required(requiredTextPrompt),//done
    altCheckbox: yup.boolean().required(requiredTextPrompt),//done
    pltCheckbox: yup.boolean().required(requiredTextPrompt),//done

    astInputValue: yup.number().when("astCheckbox", {
        is: (astCheckbox) => astCheckbox === true,
        then: yup.number().required(requiredTextPrompt),
        otherwise: yup.number(),
      }),//done


    altInputValue: yup.number().when("altCheckbox", {
        is: (altCheckbox) => altCheckbox === true,
        then: yup.number().required(requiredTextPrompt),
        otherwise: yup.number(),
      }),//done

    pltInputValue: yup.number().when("pltCheckbox", {
        is: (pltCheckbox) => pltCheckbox === true,
        then: yup.number().required(requiredTextPrompt),
        otherwise: yup.number(),
      }),//done

    totalBiliRubin: yup.string(),//done
    directBiliribin: yup.string(),//done

    albumin: yup.number(),//done
    apriScore: yup.number().typeError(`${numberTypeError}. Ensure there are numeric values for AST and PLT`).required(requiredTextPrompt),//done
    fib4: yup.number().typeError(`${numberTypeError}. Ensure there are numeric values for AST, ALT and PLT`).required(requiredTextPrompt),//done

    prothrombinTimeNR: yup.number(),//done
    urea: yup.number(), //done
    creatinine: yup.number(),//done
    ultrasoundScan: yup.number(),
    afp: yup.number(),//done
    fibroscan: yup.number(),//done

    ctScan: yup.string(),//done
    ascites: yup.string(),//done

    severityOfAscites: yup.string().when("ascites", {
        is: (ascites) => ascites === "YES",
        then: yup.string().required(requiredTextPrompt),
        otherwise: yup.string(),
      }),//done

    
    gradeOfEncephalopathy: yup.number(),//done
    childPughScore: yup.string(),//done
    liverBiopsyStage: yup.string(), //done,
    stagingDateOfLiverBiopsy: yup.date(),//done
    diagnosisResult: yup.string(),//done

});

  const formik = useFormik({
    initialValues: existingPatientDiagnosisValues,
    onSubmit,
    validationSchema: ExistingPatientDiagnosisValidationSchema,
  });
  return { formik };
};
