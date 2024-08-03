import React, { useState } from "react";
import { Form, Label, Spinner } from "reactstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckSquare,
  faCoffee,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import PhoneInput from "react-phone-input-2";
import * as moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";
import "react-widgets/dist/css/react-widgets.css";
import "react-phone-input-2/lib/style.css";
import "../patient.css";
import "react-widgets/dist/css/react-widgets.css";
import { useMutation } from "react-query";
import { ArrowForward } from "@material-ui/icons";
import MatButton from "@material-ui/core/Button";
import { useValidateNewPatientRegistrationFormValuesHook } from "./FormvalidationSchemas/useValidateNewPatientRegistrationFormValues.hook";
import {
  sexPath,
  maritalStatsPath,
  educationPath,
  occupationPath,
  careEntryPointPath,
} from "../../../../../api";
import { useFetchCodesets } from "../../../../hooks/useFetchCodesets.hook";
import { useFetchOranisationalUnit } from "../../../../hooks/useFetchOrganisationalUnit.hook";
import { saveEnrolment } from "../../../../services/saveEnrolment";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import CustomFormGroup from "../../../CustomFormGroup/CustomFormGroup";
import { calculateAge, calculateBMI } from "../../../../utils";

library.add(faCheckSquare, faCoffee, faEdit, faTrash);

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  cardBottom: {
    marginBottom: 20,
  },
  Select: {
    height: 45,
    width: 300,
  },
  button: {
    margin: theme.spacing(1),
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    "& .card-title": {
      color: "#fff",
      fontWeight: "bold",
    },
    "& .form-control": {
      borderRadius: "0.25rem",
      height: "41px",
    },
    "& .card-header:first-child": {
      borderRadius: "calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0",
    },
    "& .dropdown-toggle::after": {
      display: " block !important",
    },
    "& select": {
      "-webkit-appearance": "listbox !important",
    },
    "& p": {
      color: "red",
    },
    "& label": {
      fontSize: "14px",
      color: "#014d88",
      fontWeight: "bold",
    },
  },
  demo: {
    backgroundColor: theme.palette.background.default,
  },
  inline: {
    display: "inline",
  },
  error: {
    color: "#f85032",
    fontSize: "12.8px",
  },
  success: {
    color: "#4BB543 ",
    fontSize: "11px",
  },
}));

const NewPatientEnrolmentForm = ({ step, setStep }) => {
  const history = useHistory();
  const classes = useStyles();
  const [hepatitisStatus] = useState([
    { id: "Reactive", display: " Reactive" },
    { id: "Non-reactive", display: " Non-Reactive" },
  ]);

  const { mutate, isLoading } = useMutation({
    mutationFn: saveEnrolment,
    onSuccess: (data) => {
      toast.success("Enrolment created successfully");
      history.push("/register-new-patient", {
        enrolmentData: data,
      });
      setStep(step + 1);
    },
    onError: () => {
      toast.error("Enrolment creation failed");
    },
  });

  const handleSubmit = (values) => {
    const {
      bmi,
      hepatitisB,
      hepatitisC,
      height,
      weight,
      city,
      age,
      dateOfBirth,
      dateOfFirstHepatitisBPositiveScreening,
      dateOfRegistration,
      phoneNumber,
      pregnancy,
      landmark,
      breastfeeding,
      historyOfUsingAbusedSubstance,
      stateId,
      district,
      educationId,
      employmentStatusId,
      firstName,
      maritalStatusId,
      ninNumber,
      otherName,
      genderId,
      surname,
      careEntryPoint,
      hospitalNumber,
    } = values;

    const payloadData = {
      bmi,
      hepatitisB,
      height: String(height),
      careEntryPoint,
      age,
      phoneNumber: "",
      altPhonenumber: "",
      pregnancy,
      breastfeeding,
      historyOfUsingAbusedSubstance,
      screening: {
        dateOfFirstHepatitisBPositiveScreening,
        hepatitisC,
        pregnancy,
      },
      personDto: {
        active: true,
        address: [
          {
            countryId: 1,
            stateId,
            district,
            city,
          },
        ],
        contactPoint: [
          {
            type: "phone",
            value: phoneNumber,
          },
        ],
        dateOfBirth,
        dateOfRegistration,
        educationId,
        employmentStatusId,
        firstName,
        genderId,
        identifier: [
          {
            assignerId: 1,
            type: "HospitalNumber",
            value: hospitalNumber,
          },
        ],
        isDateOfBirthEstimated: "",
        maritalStatusId,
        ninNumber,
        organizationId: "",
        otherName,
        sexId: genderId,
        surname,
      },
      weight: String(weight),
      landmark,
      ninNumber,
    };

    mutate(payloadData);
  };

  const { returnData: sexCodeset } = useFetchCodesets(sexPath);
  const { returnData: maritalStatusCodeset } =
    useFetchCodesets(maritalStatsPath);
  const { returnData: educationCodeset } = useFetchCodesets(educationPath);
  const { returnData: occupationCodeset } = useFetchCodesets(occupationPath);
  const { returnData: careEntryPointCodeset } =
    useFetchCodesets(careEntryPointPath);

  const { formik } =
    useValidateNewPatientRegistrationFormValuesHook(handleSubmit);

  const { returnData: countries } = useFetchOranisationalUnit("0");
  const { returnData: states } = useFetchOranisationalUnit("1");
  const { returnData: provinces } = useFetchOranisationalUnit(
    formik?.values?.stateId
  );

  // Regex pattern to match only letters and spaces
  const regexPattern = /^[a-zA-Z\s]*$/;

  // Custom onChange handler
  const handleCustomChange = (e, fieldName) => {
    const { value } = e.target;
    if (regexPattern.test(value) || value === "") {
      formik?.setFieldValue(fieldName, value);
    }
    return;
  };

  React.useEffect(() => {
    const computedAge = calculateAge(formik?.values.dateOfBirth);
    formik.setFieldValue("age", computedAge);

    const computedBMI = calculateBMI(
      formik?.values.height,
      formik?.values.weight
    );
    formik.setFieldValue("bmi", computedBMI);
  }, [
    formik?.values?.dateOfBirth,
    formik?.values.height,
    formik?.values.weight,
    formik.setFieldValue,
  ]);

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <div className="col-xl-12 col-lg-12">
            <Form onSubmit={formik.handleSubmit}>
              <div className="card">
                <div
                  className="card-header"
                  style={{
                    backgroundColor: "#014d88",
                    color: "#fff",
                    fontWeight: "bolder",
                    borderRadius: "0.2rem",
                  }}
                >
                  <h5 className="card-title" style={{ color: "#fff" }}>
                    Demography
                  </h5>
                </div>
              </div>

              <div className="card-body">
                <div className="basic-form">
                  <div className="row">
                    <div className="form-group mb-3 col-md-4">
                      <CustomFormGroup
                        formik={formik}
                        name="dateOfRegistration"
                      >
                        <Label for="dateOfRegistration">
                          Date of registration
                          <span style={{ color: "red" }}> *</span>{" "}
                        </Label>{" "}
                        <input
                          className="form-control"
                          type="date"
                          name="dateOfRegistration"
                          id="dateOfRegistration"
                          value={formik?.values?.dateOfRegistration}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          max={moment(new Date()).format("YYYY-MM-DD")}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
                        {formik?.touched?.dateOfRegistration &&
                          formik?.errors?.dateOfRegistration !== "" && (
                            <span className={classes.error}>
                              {formik?.errors?.dateOfRegistration}
                            </span>
                          )}
                      </CustomFormGroup>
                    </div>

                    <div className="form-group mb-3 col-md-4">
                      <CustomFormGroup formik={formik} name="hospitalNumber">
                        <Label for="hospitalNumber">
                          Hospital Number{" "}
                          <span style={{ color: "red" }}> *</span>{" "}
                        </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="hospitalNumber"
                          id="hospitalNumber"
                          value={formik?.values?.hospitalNumber}
                          onChange={formik?.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
                        {formik?.touched?.hospitalNumber &&
                          formik?.errors.hospitalNumber !== "" && (
                            <span className={classes.error}>
                              {formik?.errors.hospitalNumber}
                            </span>
                          )}
                      </CustomFormGroup>
                    </div>

                    <div className="form-group mb-3 col-md-4">
                      <CustomFormGroup formik={formik} name="surname">
                        <Label for="surname">
                          Surname <span style={{ color: "red" }}> *</span>{" "}
                        </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="surname"
                          id="surname"
                          value={formik?.values?.surname}
                          onChange={(e) => handleCustomChange(e, "surname")}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
                        {formik?.touched?.surname &&
                          formik?.errors?.surname !== "" && (
                            <span className={classes.error}>
                              {formik?.errors.surname}
                            </span>
                          )}
                      </CustomFormGroup>
                    </div>

                    <div className="form-group mb-3 col-md-4">
                      <CustomFormGroup formik={formik} name="firstName">
                        <Label for="firstName">
                          Firstname <span style={{ color: "red" }}> *</span>{" "}
                        </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="firstName"
                          id="firstName"
                          value={formik?.values?.firstName}
                          onChange={(e) => handleCustomChange(e, "firstName")}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
                        {formik?.touched?.firstName &&
                          formik?.errors.firstName !== "" && (
                            <span className={classes.error}>
                              {formik?.errors.firstName}
                            </span>
                          )}
                      </CustomFormGroup>
                    </div>

                    <div className="form-group mb-3 col-md-4">
                      <CustomFormGroup formik={formik} name="otherName">
                        <Label for="otherName">Other name </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="otherName"
                          id="otherName"
                          value={formik?.values?.otherName}
                          onChange={(e) => handleCustomChange(e, "otherName")}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
                        {formik?.touched?.otherName &&
                          formik?.errors?.otherName !== "" && (
                            <span className={classes.error}>
                              {formik?.errors?.otherName}
                            </span>
                          )}
                      </CustomFormGroup>
                    </div>

                    <div className="form-group mb-3 col-md-4">
                      <CustomFormGroup formik={formik} name="phoneNumber">
                        <Label for="phoneNumber">
                          Phone Number <span style={{ color: "red" }}> *</span>
                        </Label>
                        <PhoneInput
                          containerStyle={{
                            width: "100%",
                            border: "1px solid #014D88",
                          }}
                          inputStyle={{ width: "100%", borderRadius: "0px" }}
                          country={"ng"}
                          placeholder="(234)7099999999"
                          maxLength={5}
                          name="phoneNumber"
                          id="phoneNumber"
                          masks={{
                            ng: "...-...-....",
                            at: "(....) ...-....",
                          }}
                          value={formik?.values?.phoneNumber}
                          onChange={(value) => {
                            formik.setTouched({ phoneNumber: true });
                            formik.setFieldValue("phoneNumber", value);
                          }}
                          onBlur={formik.handleBlur}
                        />
                        {formik?.touched?.phoneNumber &&
                          formik?.errors?.phoneNumber !== "" && (
                            <span className={classes.error}>
                              {formik?.errors?.phoneNumber}
                            </span>
                          )}
                      </CustomFormGroup>
                    </div>

                    <div className="form-group mb-3 col-md-4">
                      <CustomFormGroup formik={formik} name="countryId">
                        <Label for="countryId">
                          Country <span style={{ color: "red" }}> *</span>{" "}
                        </Label>
                        <select
                          className="form-control"
                          name="countryId"
                          id="countryId"
                          value={formik?.values?.countryId}
                          onChange={formik?.handleChange}
                          onBlur={formik?.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                          disabled
                        >
                          {countries?.sort().map?.((item, index) => (
                            <option value={Number(item.id)} key={index}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                        {formik?.touched?.countryId &&
                          formik?.errors?.countryId !== "" && (
                            <span className={classes.error}>
                              {formik?.errors.countryId}
                            </span>
                          )}
                      </CustomFormGroup>
                    </div>

                    <div className="form-group mb-3 col-md-4">
                      <CustomFormGroup formik={formik} name="stateId">
                        <Label for="stateId">
                          State <span style={{ color: "red" }}> *</span>{" "}
                        </Label>
                        <select
                          className="form-control"
                          name="stateId"
                          id="stateId"
                          value={formik?.values?.stateId}
                          onChange={formik.handleChange}
                          onBlur={formik?.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        >
                          <option value="">Select</option>
                          {states?.sort().map((item, index) => (
                            <option value={Number(item?.id)} key={index}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                        {formik?.touched?.stateId &&
                          formik?.errors?.stateId !== "" && (
                            <span className={classes.error}>
                              {formik?.errors?.stateId}
                            </span>
                          )}
                      </CustomFormGroup>
                    </div>

                    <div className="form-group mb-3 col-md-4">
                      <CustomFormGroup formik={formik} name="district">
                        <Label for="district">
                          Province/District/LGA{" "}
                          <span style={{ color: "red" }}> *</span>
                        </Label>
                        <select
                          className="form-control"
                          type="text"
                          name="district"
                          id="district"
                          value={formik?.values?.district}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                          onChange={formik?.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option value="">Select</option>
                          {provinces?.sort().map((value, index) => (
                            <option key={index} value={value.id}>
                              {value.name}
                            </option>
                          ))}
                        </select>
                        {formik?.touched?.district &&
                          formik?.errors?.district !== "" && (
                            <span className={classes.error}>
                              {formik?.errors?.district}
                            </span>
                          )}
                      </CustomFormGroup>
                    </div>

                    <div className="form-group col-md-4">
                      <CustomFormGroup formik={formik} name="city">
                        <Label for="city">
                          Street Address{" "}
                          <span style={{ color: "red" }}> *</span>
                        </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="city"
                          id="city"
                          value={formik?.values?.city}
                          onChange={formik?.handleChange}
                          onBlur={formik?.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
                        {formik?.touched?.city &&
                          formik?.errors?.city !== "" && (
                            <span className={classes.error}>
                              {formik?.errors?.city}
                            </span>
                          )}
                      </CustomFormGroup>
                    </div>

                    <div className="form-group mb-3 col-md-4">
                      <CustomFormGroup formik={formik} name="landmark">
                        <Label for="landmark">Landmark</Label>
                        <input
                          className="form-control"
                          type="text"
                          name="landmark"
                          id="landmark"
                          value={formik?.values?.landmark}
                          onChange={formik?.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
                        {formik?.touched?.landmark &&
                          formik?.errors?.landmark !== "" && (
                            <span className={classes.error}>
                              {formik?.errors?.landmark}
                            </span>
                          )}
                      </CustomFormGroup>
                    </div>

                    {/* new date of registration with actual/estimated date  */}
                    <div className="form-group mb-3 col-md-4">
                      <CustomFormGroup
                        formik={formik}
                        name="dateOfBirthEstimatedActual"
                      >
                        <Label for="dateOfBirthEstimatedActual">
                          Date Of Birth
                        </Label>
                        <div className="radio">
                          <label for="dateOfBirthEstimatedActual">
                            <input
                              type="radio"
                              value="Actual"
                              name="dateOfBirthEstimatedActual"
                              defaultChecked
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />{" "}
                            Actual
                          </label>
                        </div>
                        <div className="radio">
                          <label for="dateOfBirthEstimatedActual">
                            <input
                              type="radio"
                              value="Estimated"
                              name="dateOfBirthEstimatedActual"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />{" "}
                            Estimated
                          </label>
                        </div>
                      </CustomFormGroup>

                      {formik?.touched?.dateOfBirthEstimatedActual &&
                        formik?.errors.dateOfBirthEstimatedActual !== "" && (
                          <span className={classes.error}>
                            {formik?.errors?.dateOfBirthEstimatedActual}
                          </span>
                        )}
                    </div>

                    <div className="form-group mb-3 col-md-4">
                      <CustomFormGroup formik={formik} name="dateOfBirth">
                        <Label for="dateOfBirth">
                          Date of birth
                          <span style={{ color: "red" }}> *</span>{" "}
                        </Label>
                        <input
                          className="form-control"
                          type="date"
                          name="dateOfBirth"
                          id="dateOfBirth"
                          max={moment(new Date()).format("YYYY-MM-DD")}
                          value={formik?.values?.dateOfBirth}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
                        {formik?.touched?.dateOfBirth &&
                          formik?.errors.dateOfBirth !== "" && (
                            <span className={classes.error}>
                              {formik?.errors?.dateOfBirth}
                            </span>
                          )}
                      </CustomFormGroup>
                    </div>

                    <div className="form-group mb-3 col-md-4">
                      <CustomFormGroup formik={formik} name="age">
                        <Label for="age">
                          Age
                          <span style={{ color: "red" }}> *</span>{" "}
                        </Label>
                        <input
                          type="number"
                          name="age"
                          className="form-control"
                          id="age"
                          min="10"
                          max="150"
                          value={formik?.values?.age}
                          disabled
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
                        {formik?.touched?.age && formik?.errors?.age !== "" && (
                          <span className={classes.error}>
                            {formik?.errors?.age}
                          </span>
                        )}
                      </CustomFormGroup>
                    </div>

                    <div className="form-group mb-3 col-md-4">
                      <CustomFormGroup
                        formik={formik}
                        name="employmentStatusId"
                      >
                        <Label for="employmentStatusId">Occupation</Label>
                        <select
                          className="form-control"
                          name="employmentStatusId"
                          id="employmentStatusId"
                          value={formik?.values?.employmentStatusId}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        >
                          <option value="">Select</option>
                          {occupationCodeset?.sort()?.map((item, index) => (
                            <option
                              value={Number(item.id)}
                              key={Number(item.id)}
                            >
                              {item.display}
                            </option>
                          ))}
                        </select>
                        {formik?.touched?.employmentStatusId &&
                          formik?.errors?.employmentStatusId !== "" && (
                            <span className={classes.error}>
                              {formik?.errors?.employmentStatusId}
                            </span>
                          )}
                      </CustomFormGroup>
                    </div>

                    <div className="form-group mb-3 col-md-4">
                      <CustomFormGroup formik={formik} name="maritalStatusId">
                        <Label for="maritalStatusId">
                          Marital status
                          <span style={{ color: "red" }}> *</span>{" "}
                        </Label>
                        <select
                          className="form-control"
                          name="maritalStatusId"
                          id="maritalStatusId"
                          value={formik.values.maritalStatusId}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        >
                          <option value="">Select</option>
                          {maritalStatusCodeset?.sort().map((item, index) => (
                            <option value={Number(item.id)}>
                              {item.display}
                            </option>
                          ))}
                        </select>
                        {formik?.touched?.maritalStatusId &&
                        formik?.errors?.maritalStatusId !== "" ? (
                          <span className={classes.error}>
                            {formik?.errors.maritalStatusId}
                          </span>
                        ) : (
                          ""
                        )}
                      </CustomFormGroup>
                    </div>

                    <div className="form-group mb-3 col-md-4">
                      <CustomFormGroup formik={formik} name="educationId">
                        <Label for="educationId">
                          Education <span style={{ color: "red" }}> *</span>{" "}
                        </Label>
                        <select
                          className="form-control"
                          name="educationId"
                          id="educationId"
                          value={formik?.values?.educationId}
                          onChange={formik.handleChange}
                          onBlur={formik?.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        >
                          <option>Select</option>
                          {educationCodeset?.sort().map((item, index) => (
                            <option value={Number(item.id)}>
                              {item.display}
                            </option>
                          ))}
                        </select>
                        {formik?.touched?.educationId &&
                          formik?.errors?.educationId !== "" && (
                            <span className={classes.error}>
                              {formik?.errors?.educationId}
                            </span>
                          )}
                      </CustomFormGroup>
                    </div>

                    <div className="form-group mb-3 col-md-4">
                      <CustomFormGroup formik={formik} name="genderId">
                        <Label for="genderId">
                          Sex <span style={{ color: "red" }}> *</span>{" "}
                        </Label>
                        <select
                          className="form-control"
                          name="genderId"
                          id="genderId"
                          value={formik?.values?.genderId}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        >
                          <option value="">Select</option>
                          {sexCodeset?.sort().map((item, index) => (
                            <option value={Number(item.id)}>
                              {item.display}
                            </option>
                          ))}
                        </select>
                        {formik?.touched?.genderId &&
                          formik?.errors?.genderId !== "" && (
                            <span className={classes.error}>
                              {formik?.errors?.genderId}
                            </span>
                          )}
                      </CustomFormGroup>
                    </div>

                    <div className="form-group mb-3 col-md-4">
                      <CustomFormGroup formik={formik} name="ninNumber">
                        <Label for="ninNumber">NIN number </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="ninNumber"
                          id="ninNumber"
                          value={formik?.values?.ninNumber}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
                        {formik?.touched?.ninNumber &&
                          formik?.errors?.ninNumber !== "" && (
                            <span className={classes.error}>
                              {formik?.errors?.ninNumber}
                            </span>
                          )}
                      </CustomFormGroup>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div
                  className="card-header"
                  style={{
                    backgroundColor: "#014d88",
                    color: "#fff",
                    fontWeight: "bolder",
                    borderRadius: "0.2rem",
                  }}
                >
                  <h5 className="card-title" style={{ color: "#fff" }}>
                    Enrolment
                  </h5>
                </div>
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup formik={formik} name="careEntryPoint">
                      <Label for="careEntryPoint">
                        Care entry point
                        <span style={{ color: "red" }}> *</span>{" "}
                      </Label>
                      <select
                        className="form-control"
                        name="careEntryPoint"
                        id="careEntryPoint"
                        value={formik?.values?.careEntryPoint}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      >
                        <option value="">Select </option>
                        {careEntryPointCodeset.map((value) => (
                          <option key={value.id} value={value.id}>
                            {value.display}
                          </option>
                        ))}
                      </select>
                      {formik?.touched?.careEntryPoint &&
                        formik?.errors.careEntryPoint !== "" && (
                          <span className={classes.error}>
                            {formik?.errors?.careEntryPoint}
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>

                  {Number(formik?.values?.genderId) === 377 && (
                    <div className="form-group mb-3 col-md-4">
                      <CustomFormGroup formik={formik} name="pregnancy">
                        <Label for="pregnancy">
                          Pregnancy <span style={{ color: "red" }}> *</span>{" "}
                        </Label>
                        <select
                          className="form-control"
                          name="pregnancy"
                          id="pregnancy"
                          value={formik?.values?.pregnancy}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        >
                          <option value="">Select </option>
                          <option value="NO">No </option>
                          <option value="YES">Yes </option>
                        </select>
                        {formik?.touched?.pregnancy &&
                          formik?.errors?.pregnancy !== "" && (
                            <span className={classes.error}>
                              {formik?.errors?.pregnancy}
                            </span>
                          )}
                      </CustomFormGroup>
                    </div>
                  )}

                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup formik={formik} name="weight">
                      <Label for="weight">
                        Weight (in KG) <span style={{ color: "red" }}> *</span>{" "}
                      </Label>
                      <input
                        className="form-control"
                        type="number"
                        name="weight"
                        min="2"
                        id="weight"
                        value={formik?.values?.weight}
                        onChange={formik?.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {formik?.touched?.weight &&
                        formik?.errors?.weight !== "" && (
                          <span className={classes.error}>
                            {formik?.errors?.weight}
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup formik={formik} name="height">
                      <Label for="height">
                        Height (In CM) <span style={{ color: "red" }}> *</span>{" "}
                      </Label>
                      <input
                        className="form-control"
                        type="number"
                        name="height"
                        id="height"
                        value={formik?.values?.height}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {formik?.touched?.height &&
                        formik?.errors.height !== "" && (
                          <span className={classes.error}>
                            {formik?.errors?.height}
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup formik={formik} name="bmi">
                      <Label for="bmi">BMI</Label>

                      <input
                        className="form-control"
                        type="number"
                        disabled
                        name="bmi"
                        id="bmi"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik?.values?.bmi}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {formik?.touched?.bmi && formik?.errors?.bmi !== "" && (
                        <span className={classes.error}>
                          {formik?.errors?.bmi}
                        </span>
                      )}
                    </CustomFormGroup>
                  </div>

                  {Number(formik?.values?.genderId) === 377 && (
                    <div className="form-group mb-3 col-md-4">
                      <CustomFormGroup formik={formik} name="breastfeeding">
                        <Label for="breastfeeding">
                          Breastfeeding <span style={{ color: "red" }}> *</span>{" "}
                        </Label>
                        <select
                          className="form-control"
                          name="breastfeeding"
                          id="breastfeeding"
                          value={formik?.values?.breastfeeding}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        >
                          <option>Select</option>
                          <option value={"YES"}>Yes</option>
                          <option value={"NO"}>No</option>
                        </select>
                        {formik?.touched?.breastfeeding &&
                          formik?.errors.breastfeeding !== "" && (
                            <span className={classes.error}>
                              {formik?.errors.breastfeeding}
                            </span>
                          )}
                      </CustomFormGroup>
                    </div>
                  )}

                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup
                      formik={formik}
                      name="historyOfUsingAbusedSubstance"
                    >
                      <Label for="historyOfUsingAbusedSubstance">
                        History of using abused substance{" "}
                      </Label>
                      <select
                        className="form-control"
                        name="historyOfUsingAbusedSubstance"
                        id="historyOfUsingAbusedSubstance"
                        value={formik?.values?.historyOfUsingAbusedSubstance}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      >
                        <option value="">Select</option>
                        <option value={"YES"}>Yes</option>
                        <option value={"NO"}>No</option>
                      </select>
                      {formik?.touched?.historyOfUsingAbusedSubstance &&
                        formik?.errors?.historyOfUsingAbusedSubstance !==
                          "" && (
                          <span className={classes.error}>
                            {formik?.errors?.historyOfUsingAbusedSubstance}
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>
                </div>
              </div>

              <div className="card">
                <div
                  className="card-header"
                  style={{
                    backgroundColor: "#014d88",
                    color: "#fff",
                    fontWeight: "bolder",
                    borderRadius: "0.2rem",
                  }}
                >
                  <h5 className="card-title" style={{ color: "#fff" }}>
                    Screening
                  </h5>
                </div>
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup formik={formik} name="hepatitisB">
                      <Label for="hepatitisB">
                        Hepatitis B (HBsAg){" "}
                        <span style={{ color: "red" }}> *</span>{" "}
                      </Label>
                      <select
                        className="form-control"
                        name="hepatitisB"
                        id="hepatitisB"
                        value={formik?.values?.hepatitisB}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      >
                        <option value="">Select </option>
                        {hepatitisStatus.sort().map((value) => (
                          <option key={value.id} value={value.id}>
                            {value.display}
                          </option>
                        ))}
                      </select>

                      {formik?.touched?.hepatitisB &&
                        formik?.errors?.hepatitisB !== "" && (
                          <span className={classes.error}>
                            {formik?.errors?.hepatitisB}
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup
                      formik={formik}
                      name="dateOfFirstHepatitisBPositiveScreening"
                    >
                      <Label for="dateOfFirstHepatitisBPositiveScreening">
                        Date of first Hep. B positive screening{" "}
                        <span style={{ color: "red" }}> *</span>{" "}
                      </Label>
                      <input
                        className="form-control"
                        type="date"
                        name="dateOfFirstHepatitisBPositiveScreening"
                        id="dateOfFirstHepatitisBPositiveScreening"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={
                          formik.values?.dateOfFirstHepatitisBPositiveScreening
                        }
                        min={moment(
                          new Date(formik.values?.dateOfBirth)
                        ).format("YYYY-MM-DD")}
                        max={moment(new Date()).format("YYYY-MM-DD")}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {formik?.touched
                        ?.dateOfFirstHepatitisBPositiveScreening &&
                        formik?.errors
                          .dateOfFirstHepatitisBPositiveScreening !== "" && (
                          <span className={classes.error}>
                            {
                              formik?.errors
                                ?.dateOfFirstHepatitisBPositiveScreening
                            }
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup formik={formik} name="hepatitisC">
                      <Label for="hepatitisC">Hepatitis C (HCVAb) </Label>
                      <select
                        className="form-control"
                        name="hepatitisC"
                        id="hepatitisC"
                        value={formik?.values?.hepatitisC}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      >
                        <option value="">Select </option>
                        {hepatitisStatus.sort().map((value) => (
                          <option key={value.id} value={value.id}>
                            {value.display}
                          </option>
                        ))}
                      </select>

                      {formik?.touched?.hepatitisC &&
                        formik?.errors?.hepatitisC !== "" && (
                          <span className={classes.error}>
                            {formik?.errors?.hepatitisC}
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>
                </div>
              </div>

              {isLoading ? <Spinner /> : ""}

              <br />
              <div className="d-flex justify-content-end">
                <MatButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
                  className={classes.button}
                  endIcon={<ArrowForward />}
                  style={{ backgroundColor: "#014d88", fontWeight: "bolder" }}
                >
                  <span style={{ textTransform: "capitalize" }}>Next</span>
                </MatButton>
              </div>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewPatientEnrolmentForm;
