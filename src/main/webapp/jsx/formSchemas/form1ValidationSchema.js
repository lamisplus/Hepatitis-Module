import { useFormik } from "formik";
import * as yup from "yup";

const invalidTextPrompt = "Invalid input type";
const requiredTextPrompt = "field is required"
export const useValidateForm1ValuesHook = (onSubmit) => {
  const form1InitialValues = {
    "age": "",
    "bmi": "",
    "breastFeeding": "",
    "careEntryPoint": "",
    "country": "",
    "dateOfBirth": "",
    "dateOfHepatitisBPositiveScreening": "",
    "education": "",
    "height": "",
    "hepatitisBhbsAg": "",
    "hepatitisChcvAb": "",
    "historyOfUsingAbusedSubstance": "",
    "hospitalNumber": "",
    "landmark": "",
    "lga": "",
    "maritalStatus": "",
    "occupation": "",
    "otherName": "",
    "phone": "",
    "pregnancy": "",
    "residentialAddress": "",
    "sex": "",
    "state": "",
    "surname": "",
    "weight": ""
  };

  const Form1ValidationSchema = yup.object({
    "age": yup.number(invalidTextPrompt).required(requiredTextPrompt),
    "bmi": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "breastFeeding": yup.boolean(invalidTextPrompt).required(requiredTextPrompt),
    "careEntryPoint": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "country": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "dateOfBirth": yup.date(invalidTextPrompt).required(requiredTextPrompt),
    "dateOfHepatitisBPositiveScreening": yup.date(invalidTextPrompt).required(requiredTextPrompt),
    "education": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "height": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "hepatitisBhbsAg": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "hepatitisChcvAb": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "historyOfUsingAbusedSubstance": yup.boolean(invalidTextPrompt).required(requiredTextPrompt),
    "hospitalNumber": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "landmark": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "lga": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "maritalStatus": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "occupation": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "otherName": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "phone": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "pregnancy": yup.boolean(invalidTextPrompt).required(requiredTextPrompt),
    "residentialAddress": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "sex": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "state": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "surname": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "weight": yup.string(invalidTextPrompt).required(requiredTextPrompt)
  });

  const formik = useFormik({
    initialValues: form1InitialValues,
    onSubmit,
    validationSchema: Form1ValidationSchema,
  });
   return { formik };;
};


export const useValidateForm2ValuesHook = (onSubmit) => {
  const form2InitialValues = {
    "afp": "",
    "albumin": "",
    "alt": "",
    "altValue": "",
    "antiHdv": "",
    "apriScore": "",
    "ascites": "",
    "ast": "",
    "astValue": "",
    "childPughScore": "",
    "comment": "",
    "commobidities": "",
    "creatinine": "",
    "ctScan": "",
    "dateHbvDnaResultReported": "",
    "dateHbvSampleCollected": "",
    "dateHbvTestRequested": "",
    "diagnosis": "",
    "directBilirubin": "",
    "fib4": "",
    "fibroscan": "",
    "gradeOfEncephalopathy": "",
    "hbeAg": "",
    "hbsAgQuantification": "",
    "hbvDna": "",
    "hbvDnaValue": "",
    "hcvRna": "",
    "hcvValue": "",
    "hepatitisCoInfection": "",
    "liverBiopsyStage": "",
    "plt": "",
    "pltValue": "",
    "pmtctEligible": "",
    "prothrombinTime": "",
    "severityOfAscites": "",
    "specifyMulitipleInfection": "",
    "stagingDateForLiverBiopsy": "",
    "totalBilirubin": "",
    "treatmentEligible": "",
    "ultrasoundScan": "",
    "urea": ""
  };

  const Form2ValidationSchema = yup.object({
    "afp": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "albumin": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "alt": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "altValue": yup.string(invalidTextPrompt),
    "antiHdv": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "apriScore": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "ascites": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "ast": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "astValue": yup.string(invalidTextPrompt),
    "childPughScore": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "comment": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "commobidities": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "creatinine": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "ctScan": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "dateHbvDnaResultReported": yup.date(invalidTextPrompt).required(requiredTextPrompt),
    "dateHbvSampleCollected": yup.date(invalidTextPrompt).required(requiredTextPrompt),
    "dateHbvTestRequested": yup.date(invalidTextPrompt).required(requiredTextPrompt),
    "diagnosis": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "directBilirubin": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "fib4": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "fibroscan": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "gradeOfEncephalopathy": yup.number(invalidTextPrompt).required(requiredTextPrompt),
    "hbeAg": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "hbsAgQuantification": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "hbvDna": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "hbvDnaValue": yup.string(invalidTextPrompt),
    "hcvRna": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "hcvValue": yup.string(invalidTextPrompt),
    "hepatitisCoInfection": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "liverBiopsyStage": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "plt": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "pltValue": yup.string(invalidTextPrompt),
    "pmtctEligible": yup.boolean(invalidTextPrompt).required(requiredTextPrompt),
    "prothrombinTime": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "severityOfAscites": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "specifyMulitipleInfection": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "stagingDateForLiverBiopsy": yup.date(invalidTextPrompt).required(requiredTextPrompt),
    "totalBilirubin": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "treatmentEligible": yup.boolean(invalidTextPrompt).required(requiredTextPrompt),
    "ultrasoundScan": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "urea": yup.string(invalidTextPrompt).required(requiredTextPrompt)
  });

  const formik = useFormik({
    initialValues: form2InitialValues,
    onSubmit,
    validationSchema: Form2ValidationSchema,
  });
   return { formik };;
};


export const useValidateForm3ValuesHook = (onSubmit) => {
  const form3InitialValues = {
    "hbvDateStarted": "",
    "hbvHistoryOfAdverseEffect": "",
    "hbvNewRegimen": "",
    "hbvPastTreatmentRegimen": "",
    "hbvReasonForTreatmentEligibility": "",
    "hbvReasonsForTreatmentComment": "",
    "hbvRegimeSwitchDateStarted": "",
    "hbvRegimeSwitchDateStopped": "",
    "hbvRegimeSwitchHistoryOfAdverseEffect": "",
    "hbvRegimeSwitchNewRegimen": "",
    "hbvRegimeSwitchReason": "",
    "hbvTreatmentExperience": false,
    "hcvAdverseEventReported": "",
    "hcvDateCompleted": "",
    "hcvDateStarted": "",
    "hcvHistoryOfAdverseEffect": "",
    "hcvNewRegimen": "",
    "hcvPastTreatmentExperience": "",
    "hcvPrescribedDuration": "",
    "hcvRegimeSwitchDateStarted": "",
    "hcvRegimeSwitchDateStopped": "",
    "hcvRegimeSwitchHistoryOfAdverseEffect": "",
    "hcvRetreatmentAdverseEffect": false,
    "hcvRetreatmentDateStarted": "",
    "hcvRetreatmentDateStopped": "",
    "hcvRetreatmentHcvGenotype": "",
    "hcvRetreatmentNewRegime": "",
    "hcvRetreatmentPrescribedDuration": "",
    "hcvTreatmentExperience": "",
    "svr12RetreatmentDateTested": "",
    "svr12RetreatmentHcvRna": "",
    "svr12RetreatmentHcvRnaValue": "",
    "svr12TestingDateStarted": "",
    "svr12TestingHcvRna": "",
    "svr12TestingHcvRnaValue": ""
  };

  const Form3ValidationSchema = yup.object({
    "hbvDateStarted": yup.date(invalidTextPrompt).required(requiredTextPrompt),
    "hbvHistoryOfAdverseEffect": yup.boolean(invalidTextPrompt).required(requiredTextPrompt),
    "hbvNewRegimen": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "hbvPastTreatmentRegimen": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "hbvReasonForTreatmentEligibility": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "hbvReasonsForTreatmentComment": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "hbvRegimeSwitchDateStarted": yup.date(invalidTextPrompt).required(requiredTextPrompt),
    "hbvRegimeSwitchDateStopped": yup.date(invalidTextPrompt).required(requiredTextPrompt),
    "hbvRegimeSwitchHistoryOfAdverseEffect": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "hbvRegimeSwitchNewRegimen": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "hbvRegimeSwitchReason": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "hbvTreatmentExperience": yup.boolean(invalidTextPrompt).required(requiredTextPrompt),
    "hcvAdverseEventReported": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "hcvDateCompleted": yup.date(invalidTextPrompt).required(requiredTextPrompt),
    "hcvDateStarted": yup.date(invalidTextPrompt).required(requiredTextPrompt),
    "hcvHistoryOfAdverseEffect": yup.boolean(invalidTextPrompt).required(requiredTextPrompt),
    "hcvNewRegimen": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "hcvPastTreatmentExperience": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "hcvPrescribedDuration": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "hcvRegimeSwitchDateStarted": yup.date(invalidTextPrompt).required(requiredTextPrompt),
    "hcvRegimeSwitchDateStopped": yup.date(invalidTextPrompt).required(requiredTextPrompt),
    "hcvRegimeSwitchHistoryOfAdverseEffect": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "hcvRetreatmentAdverseEffect": yup.boolean(invalidTextPrompt).required(requiredTextPrompt),
    "hcvRetreatmentDateStarted": yup.date(invalidTextPrompt).required(requiredTextPrompt),
    "hcvRetreatmentDateStopped": yup.date(invalidTextPrompt).required(requiredTextPrompt),
    "hcvRetreatmentHcvGenotype": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "hcvRetreatmentNewRegime": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "hcvRetreatmentPrescribedDuration": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "hcvTreatmentExperience": yup.boolean(invalidTextPrompt).required(requiredTextPrompt),
    "svr12RetreatmentDateTested": yup.date(invalidTextPrompt).required(requiredTextPrompt),
    "svr12RetreatmentHcvRna": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "svr12RetreatmentHcvRnaValue": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "svr12TestingDateStarted": yup.date(invalidTextPrompt).required(requiredTextPrompt),
    "svr12TestingHcvRna": yup.string(invalidTextPrompt).required(requiredTextPrompt),
    "svr12TestingHcvRnaValue": yup.string(invalidTextPrompt).required(requiredTextPrompt)
  });

  const formik = useFormik({
    initialValues: form3InitialValues,
    onSubmit,
    validationSchema: Form3ValidationSchema,
  });
   return { formik };
};

export const useValidateFollowupFormValuesHook = (onSubmit) => {
  const followupFormIntialValue = {
    dateOfVisit: "",
    weight: "",
    height: "",
    bmi: "",
    bloodPressure: "",
    hbsAgQuantification: "",
    hbeAg: "",
    hbvDna: "",

    alt: "",
    ast: "",
    plt: "",
    totalBilirubin: "",
    directBilirubin: "",
    albumin: "",
    apriScore: "",
    fib4: "",
    prothrombinTime: "",
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
    stagingDateForLiverBiopsy: "",
    diagnosis: "",
    treatmentRegimen: "",
    clinicalName: "",
    nextAppointment: "",
    remark: "",

  };

  const FollowupFormValidationSchema = yup.object({
    dateOfVisit: yup.string(),
    weight: yup.string(),
    height: yup.string(),
    bmi: yup.string(),
    bloodPressure: yup.string(),
    hbsAgQuantification: yup.string(),
    hbeAg: yup.string(),
    hbvDna: yup.string(),

    alt: yup.string(),
    ast: yup.string(),
    plt: yup.string(),
    totalBilirubin: yup.string(),
    directBilirubin: yup.string(),
    albumin: yup.string(),
    apriScore: yup.string(),
    fib4: yup.string(),
    prothrombinTime: yup.string(),
    urea: yup.string(),
    creatinine: yup.string(),
    ultrasoundScan: yup.string(),
    afp: yup.string(),
    fibroscan: yup.string(),
    ctScan: yup.string(),
    ascites: yup.string(),
    severityOfAscites: yup.string(),
    gradeOfEncephalopathy: yup.string(),
    childPughScore: yup.string(),
    liverBiopsyStage: yup.string(),
    stagingDateForLiverBiopsy: yup.string(),
    diagnosis: yup.string()

  });

  const formik = useFormik({
    initialValues: followupFormIntialValue,
    onSubmit,
    validationSchema: FollowupFormValidationSchema,
  });
   return { formik };;
};



