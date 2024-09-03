import { useFormik } from "formik";
import * as yup from "yup";


export const useValidatePatientDashboardDiagnosisFormValuesHook = (onSubmit, userGender) => {
  const requiredTextPrompt = "This field is required";
  const numberTypeError = "Value must be a number";

  const patientDashboardDiagnosisValues = {
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

  const patientDashboardDiagnosisValidationSchema = yup.object({
    dateHbvDnaTestRequested: yup.date().required(requiredTextPrompt),//done
    dateHbvSampleRequested: yup.date().required(requiredTextPrompt),//done
    dateHbvDnaResultReported: yup.date().required(requiredTextPrompt),//done

    hbvDna: yup.string(),//done

    hbvDnaValue: yup.number().when("hbvDna", {
        is: (hbvDna) => hbvDna === "DETECTED",
        then: yup.number().typeError(numberTypeError).required(requiredTextPrompt),
        otherwise: yup.number().typeError(numberTypeError),
      }),//done

    hbsAgQuantification: yup.number().when("hbvDna", {
        is: (hbvDna) => hbvDna === "DETECTED",
        then: yup.number().required(requiredTextPrompt),
        otherwise: yup.number(),
      }),//done
    
    
    hbeAG: yup.string(),//done
    antiHDV: yup.string().required(requiredTextPrompt),//done
    treatmentEligible: yup.string().required(requiredTextPrompt),
    pmtctEligible: userGender?.toLowerCase() === "female" ? yup.string().required(requiredTextPrompt) : yup.string(),//done
    comment: yup.string(),//done
    hcvRNA: yup.string().required(requiredTextPrompt),//done

    hcvRnaValue: yup.number().when("hcvRNA", {
        is: (hcvRNA) => hcvRNA === "DETECTED",
        then: yup.number().typeError(numberTypeError).required(requiredTextPrompt),
        otherwise: yup.number().typeError(numberTypeError),
      }),//done

    
    hbvHcvCheckbox: yup.boolean(),//done
    hbvHivCheckbox: yup.boolean(),//done
    hcvHivCheckbox: yup.boolean(),//done
    hbvHcvCheckbox: yup.boolean(),//done
    hbvHdvCheckbox: yup.boolean(),//done
    hbvHcvHivCheckbox: yup.boolean(),//done

    hbvHcvInputValue: yup.number().when("hbvHcvCheckbox", {
        is: (hbvHcvCheckbox) => hbvHcvCheckbox === true,
        then: yup.number().typeError(numberTypeError).required(requiredTextPrompt),
        otherwise: yup.number().typeError(numberTypeError),
      }),//done

    hbvHivInputValue: yup.number().when("hbvHivCheckbox", {
        is: (hbvHivCheckbox) => hbvHivCheckbox === true,
        then: yup.number().typeError(numberTypeError).required(requiredTextPrompt),
        otherwise: yup.number().typeError(numberTypeError),
      }),//done
    
    hcvHivInputValue: yup.number().when("hcvHivCheckbox", {
        is: (hcvHivCheckbox) => hcvHivCheckbox === true,
        then: yup.number().typeError(numberTypeError).required(requiredTextPrompt),
        otherwise: yup.number().typeError(numberTypeError),
      }),//done


    hbvHdvInputValue: yup.number().when("hbvHdvCheckbox", {
        is: (hbvHdvCheckbox) => hbvHdvCheckbox === true,
        then: yup.number().typeError(numberTypeError).required(requiredTextPrompt),
        otherwise: yup.number().typeError(numberTypeError),
      }),//done


    hbvHcvHivInputValue: yup.number().when("hbvHcvHivCheckbox", {
        is: (hbvHcvHivCheckbox) => hbvHcvHivCheckbox === true,
        then: yup.number().typeError(numberTypeError).required(requiredTextPrompt),
        otherwise: yup.number().typeError(numberTypeError),
      }),//done

    commobidities: yup.string(),

    multipleInfection: yup.string().when("commobidities", {
        is: (commobidities) => commobidities === "YES",
        then: yup.string().required(requiredTextPrompt),
        otherwise: yup.string(),
      }),//done



    astCheckbox: yup.boolean(),//done
    altCheckbox: yup.boolean(),//done
    pltCheckbox: yup.boolean(),//done

    astInputValue: yup.number().when("astCheckbox", {
        is: (astCheckbox) => astCheckbox === true,
        then: yup.number().typeError(numberTypeError).required(requiredTextPrompt),
        otherwise: yup.number().typeError(numberTypeError),
      }),//done


    altInputValue: yup.number().when("altCheckbox", {
        is: (altCheckbox) => altCheckbox === true,
        then: yup.number().typeError(numberTypeError).required(requiredTextPrompt),
        otherwise: yup.number().typeError(numberTypeError),
      }),//done

    pltInputValue: yup.number().when("pltCheckbox", {
        is: (pltCheckbox) => pltCheckbox === true,
        then: yup.number().typeError(numberTypeError).required(requiredTextPrompt),
        otherwise: yup.number().typeError(numberTypeError),
      }),//done

    totalBiliRubin: yup.string(),//done
    directBiliribin: yup.string(),//done

    albumin: yup.number().typeError(numberTypeError),//done
    apriScore: yup.number().typeError(`${numberTypeError}. Ensure there are numeric values for AST and PLT`).required(requiredTextPrompt),//done
    fib4: yup.number().typeError(`${numberTypeError}. Ensure there are numeric values for AST, ALT and PLT`).required(requiredTextPrompt),//done

    prothrombinTimeNR: yup.number().typeError(numberTypeError),//done
    urea: yup.number().typeError(numberTypeError), //done
    creatinine: yup.number().typeError(numberTypeError),//done
    ultrasoundScan: yup.number().typeError(numberTypeError),
    afp: yup.number().typeError(numberTypeError),//done
    fibroscan: yup.number().typeError(numberTypeError),//done

    ctScan: yup.string(),//done
    ascites: yup.string(),//done

    severityOfAscites: yup.string().when("ascites", {
        is: (ascites) => ascites === "YES",
        then: yup.string().required(requiredTextPrompt),
        otherwise: yup.string(),
      }),//done

    
    gradeOfEncephalopathy: yup.number().typeError(numberTypeError),//done
    childPughScore: yup.string(),//done
    liverBiopsyStage: yup.string(), //done,
    stagingDateOfLiverBiopsy: yup.date(),//done
    diagnosisResult: yup.string(),//done

});

  const formik = useFormik({
    initialValues: patientDashboardDiagnosisValues,
    onSubmit,
    validationSchema: patientDashboardDiagnosisValidationSchema,
  });
  return { formik };
};
