import { useFormik } from "formik";
import * as yup from "yup";
import { token, url } from "../../../../../../api";
import axios from "axios";
import { calculateAge, calculateBMI } from "../../../../../utils";

export const useValidateNewPatientRegistrationFormValuesHook = (onSubmit) => {
  const requiredTextPrompt = "This field is required";
  const numberTypeError = "Value must be a number";

  const newPatientRegistrationValues = {
    dateOfRegistration: "",

    hospitalNumber: "",
    city: "",
    surname: "",
    firstName: "",
    otherName: "",
    phoneNumber: "",
    stateId: "",
    countryId: "1",
    genderId: "",
    district: "",
    dateOfBirth: "",
    dateOfBirthEstimatedActual: "Actual",
    maritalStatusId: "",
    educationId: "",
    landmark: "",
    age: "",
    employmentStatusId: "",
    educationId: "",
    ninNumber: "",
    careEntryPoint: "",
    pregnancy: "",
    weight: "",
    height: "",
    bmi: "",
    breastfeeding: "",
    historyOfUsingAbusedSubstance: "",
    hepatitisB: "",
    dateOfFirstHepatitisBPositiveScreening: "",
    hepatitisC: "",
  };

  const checkIfHospitalNumberExists = async (hospitalNumber) => {
    const response = await axios.post(
      `${url}patient/exist/hospital-number`,
      hospitalNumber,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "text/plain",
        },
      }
    );

    return response.data;
  };

  const NewPatientRegistrationValidationSchema = yup.object({
    dateOfRegistration: yup.string().required(requiredTextPrompt),
    hospitalNumber: yup
      .string()
      .required(requiredTextPrompt)
      .test(
        "checkIfHospitalNumberExists",
        "Hosptial number already exists",
        async (value) => {
          if (!value) return true;
          const hospitalNumberExists = await checkIfHospitalNumberExists(value);
          return !hospitalNumberExists;
        }
      ),
    city: yup.string().required(requiredTextPrompt),

    surname: yup
      .string()
      .matches(/^[a-zA-Z\s]*$/, "Only letters are allowed")
      .required(requiredTextPrompt),
    firstName: yup
      .string()
      .matches(/^[a-zA-Z\s]*$/, "Only letters are allowed")
      .required(requiredTextPrompt),
    otherName: yup
      .string()
      .matches(/^[a-zA-Z\s]*$/, "Only letters are allowed"),

    phoneNumber: yup.string().required(requiredTextPrompt),
    stateId: yup.string().required(requiredTextPrompt),
    countryId: yup.string().required(requiredTextPrompt),
    genderId: yup.string().required(requiredTextPrompt),
    district: yup.string().required(requiredTextPrompt),
    dateOfBirth: yup.string().required(requiredTextPrompt),
    dateOfBirthEstimatedActual: yup.string().required(requiredTextPrompt),
    maritalStatusId: yup.string().required(requiredTextPrompt),
    educationId: yup.string().required(requiredTextPrompt),
    
    landmark: yup.string(),
    age: yup
      .number()
      .typeError(numberTypeError)
      .required(`${requiredTextPrompt} select date of birth to compute`)
      .test("calculateAge", "Age is invalid", function (value) {
        const { dateOfBirth } = this.parent;
        if (!dateOfBirth) return true; // Skip validation if no price
        const computedAge = calculateAge(dateOfBirth);
        return value === Number(computedAge);
      }),
    employmentStatusId: yup.string(),
    educationId: yup.string().required(requiredTextPrompt),
    ninNumber: yup.string(),
    careEntryPoint: yup.string().required(requiredTextPrompt),
    pregnancy: yup.string().when("genderId", {
      is: (genderId) => genderId === Number(377),
      then: yup.string().required(requiredTextPrompt),
      otherwise: yup.string(),
    }),
    breastfeeding: yup.string().when("genderId", {
      is: (genderId) => genderId === Number(377),
      then: yup.string().required(requiredTextPrompt),
      otherwise: yup.string(),
    }),
    weight: yup.string().required(requiredTextPrompt),
    height: yup.string().required(requiredTextPrompt),
    bmi: yup
      .number()
      .typeError(numberTypeError)
      .required(`${requiredTextPrompt}. Input weight and height to compute`)
      .test("calculateBMI", "BMI is invalid", function (value) {
        const { height, weight } = this.parent;
        if (!height || !weight) return true;
        const BMI = calculateBMI(height, weight);
        return value === Number(BMI);
      }),

    historyOfUsingAbusedSubstance: yup.string(),
    hepatitisB: yup.string().required(requiredTextPrompt),
    dateOfFirstHepatitisBPositiveScreening: yup
      .string()
      .required(requiredTextPrompt),
    hepatitisC: yup.string(),
  });

  const formik = useFormik({
    initialValues: newPatientRegistrationValues,
    onSubmit,
    validationSchema: NewPatientRegistrationValidationSchema,
  });
  return { formik };
};
