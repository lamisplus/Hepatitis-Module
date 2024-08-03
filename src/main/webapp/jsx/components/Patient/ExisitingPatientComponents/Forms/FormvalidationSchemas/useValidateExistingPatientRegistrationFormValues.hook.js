import { useFormik } from "formik";
import * as yup from "yup";
import { calculateBMI } from "../../../../../utils";

export const useValidateExistingPatientRegistrationFormValuesHook = (
  onSubmit,
  patientGenderId
) => {
  const requiredTextPrompt = "This field is required";

  const existingPatientRegistrationValues = {
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

  const existingPatientRegistrationValidationSchema = yup.object({
    careEntryPoint: yup.string().required(requiredTextPrompt),
    pregnancy:
      //if patient is female, make this field required
      Number(patientGenderId) === 377
        ? yup.string().required(requiredTextPrompt)
        : yup.string(),

    breastfeeding:
      Number(patientGenderId) === 377
        ? yup.string().required(requiredTextPrompt)
        : yup.string(),

    weight: yup.string().required(requiredTextPrompt),
    height: yup.string().required(requiredTextPrompt),
    bmi: yup
      .number()
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
    initialValues: existingPatientRegistrationValues,
    onSubmit,
    validationSchema: existingPatientRegistrationValidationSchema,
  });
  return { formik };
};
