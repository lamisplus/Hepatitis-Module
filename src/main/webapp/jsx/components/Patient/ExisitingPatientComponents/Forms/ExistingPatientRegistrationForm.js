import React, { useState } from "react";
import { Form, Label, Spinner } from "reactstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckSquare,
  faCoffee,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
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
import { useValidateExistingPatientRegistrationFormValuesHook } from "./FormvalidationSchemas/useValidateExistingPatientRegistrationFormValues.hook";
import { careEntryPointPath } from "../../../../../api";
import { useFetchCodesets } from "../../../../hooks/useFetchCodesets.hook";
import { saveEnrolment } from "../../../../services/saveEnrolment";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import CustomFormGroup from "../../../CustomFormGroup/CustomFormGroup";
import { calculateBMI } from "../../../../utils";

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

const ExistingPatientEnrolmentForm = ({ step, setStep }) => {
  const history = useHistory();
  const classes = useStyles();
  const patientObj = history?.location?.state?.patientObj;
  const patientGenderId = history?.location?.state?.patientObj?.gender?.id;
  const patientId = patientObj?.id || history?.location?.state?.patientId;
  const facilityId = patientObj?.facilityId ||history?.location?.state?.facilityId;

  const [hepatitisStatus] = useState([
    { id: "Reactive", display: " Reactive" },
    { id: "Non-reactive", display: " Non-Reactive" },
  ]);

  const { mutate, isLoading } = useMutation({
    mutationFn: saveEnrolment,
    onSuccess: (data) => {
      toast.success("Enrolment created successfully");
      history.push("/register-existing-patient", {
        enrolmentData: data,
        patientId: patientId,
        patientObj: patientObj,
        facilityId: facilityId,
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
      dateOfFirstHepatitisBPositiveScreening,
      pregnancy,
      breastfeeding,
      historyOfUsingAbusedSubstance,
      careEntryPoint,
    } = values;

    const payloadData = {
      personId: patientId,
      facilityId,
      careEntryPoint,
      pregnancy,
      weight: String(weight),
      height: String(height),
      bmi,
      hepatitisB,
      breastfeeding,
      historyOfUsingAbusedSubstance,
      screening: {
        dateOfFirstHepatitisBPositiveScreening,
        hepatitisC,
      },
    };
    mutate(payloadData);
  };

  const { returnData: careEntryPointCodeset } =
    useFetchCodesets(careEntryPointPath);

  const { formik } =
    useValidateExistingPatientRegistrationFormValuesHook(handleSubmit, patientGenderId);

  React.useEffect(() => {
    const computedBMI = calculateBMI(
      formik?.values.height,
      formik?.values.weight
    );
    formik.setFieldValue("bmi", computedBMI);
  }, [formik?.values.height, formik?.values.weight, formik.setFieldValue]);

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

                  {Number(patientGenderId) === 377 && (
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

                  {Number(patientGenderId)  === 377 && (
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

export default ExistingPatientEnrolmentForm;
