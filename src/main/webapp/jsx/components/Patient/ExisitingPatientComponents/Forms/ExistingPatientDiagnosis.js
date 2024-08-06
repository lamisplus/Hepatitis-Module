import React, { useState } from "react";
import { Form, Label, Spinner } from "reactstrap";
import moment from "moment";
import MatButton from "@material-ui/core/Button";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckSquare,
  faCoffee,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import "react-phone-input-2/lib/style.css";
import "../patient.css";
import "react-widgets/dist/css/react-widgets.css";
import { Collapse, IconButton } from "@material-ui/core";
import { ArrowForward, ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useValidateExistingPatientDiagnosisFormValuesHook } from "./FormvalidationSchemas/useValidateExistingPatientDiagnosisFormValues";
import CustomFormGroup from "../../../CustomFormGroup/CustomFormGroup";
import { useFetchCodesets } from "../../../../hooks/useFetchCodesets.hook";
import {
  calculateAge,
  calculateApriScore,
  calculateFib4,
} from "../../../../utils";
import { useMutation } from "react-query";
import { saveDiagnosis } from "../../../../services/saveDiagnosis";
import { toast } from "react-toastify";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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

const ExistingPatientDiagnosis = ({ step, setStep }) => {
  const history = useHistory();
  const enrolmentData = history?.location?.state?.enrolmentData;
  const [enrollmentUuid] = useState(enrolmentData?.enrollmentUuid);
  const [userGender] = useState(
    history?.location?.state?.patientObj?.gender?.display
  );
  const patientObj = history?.location?.state?.patientObj;
  const patientId = patientObj?.id || history?.location?.state?.patientId;
  const facilityId =
    patientObj?.facilityId || history?.location?.state?.facilityId;

  const classes = useStyles();

  const [isDropdownsOpen, setIsDropdownsOpen] = useState({
    hepatitisBDropdown: true,
    hepatitisCDropdown: true,
    coInfectionDropdown: true,
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: saveDiagnosis,
    onSuccess: (data) => {
      toast.success("Diagnosis created successfully");
      history.push("/register-existing-patient", {
        enrolmentData: enrolmentData,
        diagnosisData: data,
        patientId: patientId,
        patientObj: patientObj,
        facilityId: facilityId,
      });
      setStep(step + 1);
    },
    onError: () => {
      toast.error("Diagnosis creation failed");
    },
  });

  const handleSubmit = (values) => {
    const {
      dateHbvDnaTestRequested,
      dateHbvSampleRequested,
      dateHbvDnaResultReported,
      hbvDna,
      hbvDnaValue,
      hbsAgQuantification,
      hbeAG,
      antiHDV,
      treatmentEligible,
      pmtctEligible,
      comment,
      hcvRNA,
      hcvRnaValue,
      hbvHivCheckbox,
      hcvHivCheckbox,
      hbvHcvCheckbox,
      hbvHivInputValue,
      hcvHivInputValue,
      hbvHcvInputValue,
      hbvHdvCheckbox,
      hbvHcvHivCheckbox,
      hbvHdvInputValue,
      hbvHcvHivInputValue,
      commobidities,
      multipleInfection,
      astCheckbox,
      pltCheckbox,
      altCheckbox,
      astInputValue,
      altInputValue,
      pltInputValue,
      totalBiliRubin,
      directBiliribin,
      albumin,
      apriScore,
      fib4,
      prothrombinTimeNR,
      urea,
      creatinine,
      ultrasoundScan,
      afp,
      fibroscan,
      ctScan,
      ascites,
      severityOfAscites,
      gradeOfEncephalopathy,
      childPughScore,
      liverBiopsyStage,
      stagingDateOfLiverBiopsy,
      diagnosisResult,
    } = values;

    const payload = {
      enrollmentUuid: enrollmentUuid,
      clinicalParameters: {
        apriScore: apriScore,
        ascites: ascites,
        childPughScore: childPughScore,
        creatinine: creatinine,
        diagnosisResult: diagnosisResult,
        directBiliribin: directBiliribin,
        fib4: fib4,
        fibroscan: fibroscan,
        gradeOfEncephalopathy: Number(gradeOfEncephalopathy),
        liverBiopsyStage: liverBiopsyStage,
        prothrombinTimeNR: prothrombinTimeNR,
        severityOfAscites: severityOfAscites,
        totalBiliRubin: totalBiliRubin,
        ultrasoundScan: ultrasoundScan,
        urea: urea,
        afp: afp,
      },
      hepatitisBTest: {
        albumin: albumin,
        antiHDV: antiHDV,
        comment: comment,
        ctScan: ctScan,
        dateHbvDnaTestRequested: dateHbvDnaTestRequested,
        dateHbvSampleRequested: dateHbvSampleRequested,
        hbeAG: hbeAG,
        hepatitisCoinfection: {
          hbvHcvInputValue: hbvHcvInputValue,
          hbvHivInputValue: hbvHivInputValue,
          hcvHivInputValue: hcvHivInputValue,
          hbvHdvInputValue: hbvHdvInputValue,
          hbvHcvHivInputValue: hbvHcvHivInputValue,
          hbvHcvCheckbox: hbvHcvCheckbox,
          hbvHivCheckbox: hbvHivCheckbox,
          hcvHivCheckbox: hcvHivCheckbox,
          hbvHdvCheckbox: hbvHdvCheckbox,
          hbvHcvHivCheckbox: hbvHcvHivCheckbox,
        },
        dateHbvDnaResultReported: dateHbvDnaResultReported,
        hbsAgQuantification: hbsAgQuantification,
        hbvDna: hbvDna,
        hvbDnaValue: hbvDnaValue,
        pmtctEligible: pmtctEligible,
        stagingDateOfLiverBiopsy: stagingDateOfLiverBiopsy,
        treatmentEligible: treatmentEligible,
      },
      hepatitisCTest: {
        selectedClinicalParamsOptions: {
          astCheckbox: astCheckbox,
          altCheckbox: altCheckbox,
          pltCheckbox: pltCheckbox,
          astInputValue: astInputValue,
          altInputValue: altInputValue,
          pltInputValue: pltInputValue,
        },
        commobidities: commobidities,
        hcvRnaValue: hcvRnaValue,
        hcvRNA: hcvRNA,
        multipleInfection: multipleInfection,
        hepatitisCoinfection: {
          hbvHcvInputValue: hbvHcvInputValue,
          hbvHivInputValue: hbvHivInputValue,
          hcvHivInputValue: hcvHivInputValue,
          hbvHdvInputValue: hbvHdvInputValue,
          hbvHcvHivInputValue: hbvHcvHivInputValue,
          hbvHcvCheckbox: hbvHcvCheckbox,
          hbvHivCheckbox: hbvHivCheckbox,
          hcvHivCheckbox: hcvHivCheckbox,
          hbvHdvCheckbox: hbvHdvCheckbox,
          hbvHcvHivCheckbox: hbvHcvHivCheckbox,
        },
      },
    };

    mutate(payload);
  };

  const { formik } = useValidateExistingPatientDiagnosisFormValuesHook(
    handleSubmit,
    userGender
  );
  const { returnData: childPughScoreOptions } = useFetchCodesets("CHILD_PUGH");

  React.useEffect(() => {
    if (
      typeof formik?.values?.astInputValue === "number" &&
      typeof formik?.values?.pltInputValue === "number"
    ) {
      const computedApriScore = calculateApriScore(
        Number(formik?.values?.astInputValue) || 0,
        Number(formik?.values?.pltInputValue) || 0
      );
     formik.setFieldValue("apriScore", 
     typeof computedApriScore === "number" ? computedApriScore : 0
     
     );
    } else {
      formik.setFieldValue("apriScore", null);
    }

    if (
      typeof formik?.values?.astInputValue === "number" &&
      typeof formik?.values?.pltInputValue === "number" &&
      typeof formik?.values?.altInputValue === "number"
    ) {
      const computedFib4 = calculateFib4(
        Number(formik?.values?.astInputValue) || 0,
        Number(formik?.values?.pltInputValue) || 0,
        Number(formik?.values.altInputValue) || 0,
        calculateAge(enrolmentData?.person?.dateOfBirth) //patient age here
      );
      formik.setFieldValue("fib4", 
      typeof computedFib4 === "number" ? computedFib4 : 0
      );
    } else {
      formik.setFieldValue("fib4", null);
    }
  }, [
    formik?.values?.astInputValue,
    formik?.values.pltInputValue,
    formik?.values.altInputValue,
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
                    Diagnosis
                  </h5>
                </div>

                <div>
                  <div
                    style={{
                      backgroundColor: "#d8f6ff",
                      width: "95%",
                      margin: "auto",
                      marginTop: "5rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        color: "black",
                        fontSize: "15px",
                        fontWeight: "600",
                        marginLeft: "10px",
                        marginTop: "10px",
                      }}
                    >
                      Hepatitis B
                    </p>
                    <IconButton
                      onClick={() =>
                        setIsDropdownsOpen((prevState) => {
                          return {
                            ...prevState,
                            hepatitisBDropdown: !prevState.hepatitisBDropdown,
                          };
                        })
                      }
                      aria-expanded={isDropdownsOpen.hepatitisBDropdown}
                      aria-label="Expand"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </div>

                  <div className="card-body">
                    <Collapse in={isDropdownsOpen.hepatitisBDropdown}>
                      <div
                        className="basic-form"
                        style={{ padding: "0 50px 0 50px" }}
                      >
                        <div className="row">
                          <div className="form-group mb-3 col-md-4">
                            <CustomFormGroup
                              formik={formik}
                              name="dateHbvDnaTestRequested"
                            >
                              <Label for="dateHbvDnaTestRequested">
                                Date HBV DNA test requested{" "}
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <input
                                className="form-control"
                                type="date"
                                name="dateHbvDnaTestRequested"
                                max={moment(new Date()).format("YYYY-MM-DD")}
                                id="dateHbvDnaTestRequested"
                                value={formik?.values?.dateHbvDnaTestRequested}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />
                              {formik?.touched?.dateHbvDnaTestRequested &&
                                formik?.errors.dateHbvDnaTestRequested !==
                                  "" && (
                                  <span className={classes.error}>
                                    {formik?.errors.dateHbvDnaTestRequested}
                                  </span>
                                )}
                            </CustomFormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-4">
                            <CustomFormGroup
                              formik={formik}
                              name="dateHbvSampleRequested"
                            >
                              <Label for="dateHbvSampleRequested">
                                Date HBV DNA sample collected{" "}
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <input
                                className="form-control"
                                type="date"
                                name="dateHbvSampleRequested"
                                id="dateHbvSampleRequested"
                                max={moment(new Date()).format("YYYY-MM-DD")}
                                min={moment(
                                  new Date(
                                    formik?.values?.dateHbvDnaTestRequested
                                  )
                                ).format("YYYY-MM-DD")}
                                value={formik?.values?.dateHbvSampleRequested}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />
                              {formik?.touched.dateHbvSampleRequested &&
                                formik?.errors.dateHbvSampleRequested !==
                                  "" && (
                                  <span className={classes.error}>
                                    {formik?.errors?.dateHbvSampleRequested}
                                  </span>
                                )}
                            </CustomFormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-4">
                            <CustomFormGroup
                              formik={formik}
                              name="dateHbvDnaResultReported"
                            >
                              <Label for="dateHbvDnaResultReported">
                                Date of HBV DNA result reported{" "}
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <input
                                className="form-control"
                                type="date"
                                name="dateHbvDnaResultReported"
                                max={moment(new Date()).format("YYYY-MM-DD")}
                                min={moment(
                                  new Date(
                                    formik?.values?.dateHbvSampleRequested
                                  )
                                ).format("YYYY-MM-DD")}
                                id="dateHbvDnaResultReported"
                                value={formik?.values?.dateHbvDnaResultReported}
                                onChange={formik?.handleChange}
                                onBlur={formik?.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />
                              {formik?.touched?.dateHbvDnaResultReported &&
                                formik?.errors.dateHbvDnaResultReported !==
                                  "" && (
                                  <span className={classes.error}>
                                    {formik?.errors.dateHbvDnaResultReported}
                                  </span>
                                )}
                            </CustomFormGroup>
                          </div>

                          <div className="form-group mb-2 col-md-4">
                            <CustomFormGroup formik={formik} name="hbvDna">
                              <Label for="hbvDna">
                                HBV DNA(UI/ml){" "}
                                <span style={{ color: "red" }}> *</span>
                              </Label>
                              <div className="radio">
                                <label>
                                  <input
                                    type="radio"
                                    value="DETECTED"
                                    name="hbvDna"
                                    checked={
                                      formik?.values?.hbvDna === "DETECTED"
                                    }
                                    onChange={formik.handleChange}
                                    onBlur={formik?.handleBlur}
                                    style={{
                                      border: "1px solid #014D88",
                                      borderRadius: "0.2rem",
                                    }}
                                  />{" "}
                                  Detected
                                </label>
                              </div>
                              <div className="radio">
                                <label>
                                  <input
                                    type="radio"
                                    value="UNDETECTED"
                                    name="hbvDna"
                                    checked={
                                      formik?.values?.hbvDna === "UNDETECTED"
                                    }
                                    onChange={formik.handleChange}
                                    onBlur={formik?.handleBlur}
                                    style={{
                                      border: "1px solid #014D88",
                                      borderRadius: "0.2rem",
                                    }}
                                  />{" "}
                                  Undetected{" "}
                                </label>
                              </div>

                              {formik?.touched?.hbvDna &&
                                formik?.errors.hbvDna !== "" && (
                                  <span className={classes.error}>
                                    {formik?.errors.hbvDna}
                                  </span>
                                )}
                            </CustomFormGroup>
                          </div>

                          {formik?.values?.hbvDna === "DETECTED" && (
                            <>
                              <div className="form-group mb-3 col-md-4">
                                <CustomFormGroup
                                  formik={formik}
                                  name="hbvDnaValue"
                                >
                                  <Label for="hbvDnaValue">
                                    Input HBV DNA value{" "}
                                    <span style={{ color: "red" }}> *</span>{" "}
                                  </Label>
                                  <input
                                    className="form-control"
                                    type="number"
                                    name="hbvDnaValue"
                                    id="hbvDnaValue"
                                    value={formik.values.hbvDnaValue}
                                    onChange={formik.handleChange}
                                    onBlur={formik?.handleBlur}
                                    style={{
                                      border: "1px solid #014D88",
                                      borderRadius: "0.2rem",
                                    }}
                                  />
                                  {formik?.touched?.hbvDnaValue &&
                                    formik?.errors.hbvDnaValue !== "" && (
                                      <span className={classes.error}>
                                        {formik?.errors.hbvDnaValue}
                                      </span>
                                    )}
                                </CustomFormGroup>
                              </div>

                              <div className="form-group mb-3 col-md-4">
                                <CustomFormGroup
                                  formik={formik}
                                  name="hbsAgQuantification"
                                >
                                  <Label for="hbsAgQuantification">
                                    HBsAG Quantification (IU/ml){" "}
                                    <span style={{ color: "red" }}> *</span>{" "}
                                  </Label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="hbsAgQuantification"
                                    id="hbsAgQuantification"
                                    value={formik.values.hbsAgQuantification}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={{
                                      border: "1px solid #014D88",
                                      borderRadius: "0.2rem",
                                    }}
                                  />
                                  {formik?.touched?.hbsAgQuantification &&
                                    formik?.errors.hbsAgQuantification !==
                                      "" && (
                                      <span className={classes.error}>
                                        {formik?.errors.hbsAgQuantification}
                                      </span>
                                    )}
                                </CustomFormGroup>
                              </div>
                            </>
                          )}

                          <div className="form-group mb-3 col-md-4">
                            <CustomFormGroup formik={formik} name="hbeAG">
                              <Label for="hbeAG">HbeAG</Label>{" "}
                              <span style={{ color: "red" }}> *</span>{" "}
                              <select
                                className="form-control"
                                name="hbeAG"
                                id="hbeAG"
                                onChange={formik.handleChange}
                                onBlur={formik?.handleBlur}
                                value={formik?.values?.hbeAG}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option value={""}>Select</option>
                                <option value={"REACTIVE"}>Reactive</option>
                                <option value={"NON_REACTIVE"}>
                                  Non Reactive
                                </option>
                              </select>
                              {formik?.touched?.hbeAG &&
                                formik?.errors.hbeAG !== "" && (
                                  <span className={classes.error}>
                                    {formik?.errors?.hbeAG}
                                  </span>
                                )}
                            </CustomFormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-4">
                            <CustomFormGroup formik={formik} name="antiHDV">
                              <Label for="antiHDV">Anti-HDV</Label>
                              <span style={{ color: "red" }}> *</span>{" "}
                              <select
                                className="form-control"
                                name="antiHDV"
                                id="antiHDV"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik?.values?.antiHDV}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option value={""}>Select</option>
                                <option value={"REACTIVE"}>Reactive</option>
                                <option value={"NON_REACTIVE"}>
                                  Non Reactive
                                </option>
                                <option value={"NOT_DONE"}>Not Done</option>
                              </select>
                              {formik?.touched?.antiHDV &&
                                formik?.errors?.antiHDV !== "" && (
                                  <span className={classes.error}>
                                    {formik?.errors?.antiHDV}
                                  </span>
                                )}
                            </CustomFormGroup>
                          </div>

                          {formik?.values.hbvDna === "UNDETECTED" &&
                          formik?.values.hbeAG === "NON_REACTIVE" &&
                          formik?.values?.antiHDV === "NON_REACTIVE" ? null : (
                            <div className="form-group mb-3 col-md-4">
                              <CustomFormGroup
                                formik={formik}
                                name="treatmentEligible"
                              >
                                <Label for="treatmentEligible">
                                  Treatment Eligible
                                </Label>
                                <span style={{ color: "red" }}> *</span>{" "}
                                <select
                                  className="form-control"
                                  name="treatmentEligible"
                                  id="treatmentEligible"
                                  onChange={formik.handleChange}
                                  onBlur={formik?.handleBlur}
                                  value={formik.values.treatmentEligible}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                >
                                  <option value={""}>Select</option>
                                  <option value={"YES"}>Yes</option>
                                  <option value={"NO"}>No</option>
                                </select>
                                {formik?.touched?.treatmentEligible &&
                                  formik?.errors.treatmentEligible !== "" && (
                                    <span className={classes.error}>
                                      {formik?.errors?.treatmentEligible}
                                    </span>
                                  )}
                              </CustomFormGroup>
                            </div>
                          )}

                          {userGender?.toLowerCase() === "female" && (
                            <div className="form-group mb-3 col-md-4">
                              <CustomFormGroup
                                formik={formik}
                                name="pmtctEligible"
                              >
                                <Label for="pmtctEligible">
                                  PMTCT Eligible
                                </Label>
                                <span style={{ color: "red" }}> *</span>{" "}
                                <select
                                  className="form-control"
                                  name="pmtctEligible"
                                  id="pmtctEligible"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik?.values?.pmtctEligible}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                >
                                  <option value={""}>Select</option>
                                  <option value={"YES"}>Yes</option>
                                  <option value={"NO"}>No</option>
                                </select>
                                {formik?.touched?.pmtctEligible &&
                                  formik?.errors.pmtctEligible !== "" && (
                                    <span className={classes.error}>
                                      {formik?.errors?.pmtctEligible}
                                    </span>
                                  )}
                              </CustomFormGroup>
                            </div>
                          )}

                          <div className="form-group mb-3 col-md-4-12">
                            <CustomFormGroup formik={formik} name="comment">
                              <Label for="comment">Comment</Label>
                              <textarea
                                className="form-control"
                                name="comment"
                                id="comment"
                                onChange={formik.handleChange}
                                onBlur={formik?.handleBlur}
                                value={formik.values.comment}
                                cols="50"
                                rows="30"
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                  height: "120px",
                                }}
                              />

                              {formik?.touched?.comment &&
                                formik?.errors?.comment !== "" && (
                                  <span className={classes.error}>
                                    {formik?.errors.comment}
                                  </span>
                                )}
                            </CustomFormGroup>
                          </div>
                        </div>
                      </div>
                    </Collapse>
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      backgroundColor: "#d8f6ff",
                      width: "95%",
                      margin: "auto",
                      marginTop: "5rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        color: "black",
                        fontSize: "15px",
                        fontWeight: "600",
                        marginLeft: "10px",
                        marginTop: "10px",
                      }}
                    >
                      Hepatitis C
                    </p>

                    <IconButton
                      onClick={() =>
                        setIsDropdownsOpen((prevState) => {
                          return {
                            ...prevState,
                            coInfectionDropdown: !prevState.coInfectionDropdown,
                          };
                        })
                      }
                      aria-expanded={isDropdownsOpen.coInfectionDropdown}
                      aria-label="Expand"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </div>

                  <div className="card-body">
                    <Collapse in={isDropdownsOpen.coInfectionDropdown}>
                      <div
                        className="basic-form"
                        style={{ padding: "0 50px 0 50px" }}
                      >
                        <div className="row">
                          <div className="form-group mb-2 col-md-4">
                            <CustomFormGroup formik={formik} name="hcvRNA">
                              <Label for="hcvRNA">
                                HCV RNA{" "}
                                <span style={{ color: "red" }}> *</span>
                              </Label>
                              <div className="radio">
                                <label>
                                  <input
                                    type="radio"
                                    value="DETECTED"
                                    name="hcvRNA"
                                    checked={
                                      formik?.values?.hcvRNA === "DETECTED"
                                    }
                                    onChange={formik?.handleChange}
                                    onBlur={formik?.handleBlur}
                                    style={{
                                      border: "1px solid #014D88",
                                      borderRadius: "0.2rem",
                                    }}
                                  />{" "}
                                  Detected
                                </label>
                              </div>
                              <div className="radio">
                                <label>
                                  <input
                                    type="radio"
                                    value="UNDETECTED"
                                    name="hcvRNA"
                                    onChange={formik?.handleChange}
                                    onBlur={formik?.handleBlur}
                                    checked={
                                      formik.values.hcvRNA === "UNDETECTED"
                                    }
                                    style={{
                                      border: "1px solid #014D88",
                                      borderRadius: "0.2rem",
                                    }}
                                  />{" "}
                                  Undetected{" "}
                                </label>
                              </div>

                              {formik?.touched?.hcvRNA &&
                                formik?.errors.hcvRNA !== "" && (
                                  <span className={classes.error}>
                                    {formik?.errors.hcvRNA}
                                  </span>
                                )}
                            </CustomFormGroup>
                          </div>

                          {formik?.values?.hcvRNA === "DETECTED" && (
                            <div className="form-group mb-3 col-md-4">
                              <CustomFormGroup
                                formik={formik}
                                name="hcvRnaValue"
                              >
                                <Label for="hcvRnaValue">
                                  Input HCV RNA Value{" "}
                                  <span style={{ color: "red" }}> *</span>{" "}
                                </Label>
                                <input
                                  className="form-control"
                                  type="number"
                                  name="hcvRnaValue"
                                  id="hcvRnaValue"
                                  value={formik?.values?.hcvRnaValue}
                                  onChange={formik.handleChange}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                />
                              </CustomFormGroup>
                              {formik?.touched?.hcvRnaValue &&
                                formik?.errors.hcvRnaValue !== "" && (
                                  <span className={classes.error}>
                                    {formik?.errors.hcvRnaValue}
                                  </span>
                                )}
                            </div>
                          )}

                          <div className="form-group mb-3 col-md-12">
                            <div className="row">
                              <Label for="hepatitisCoinfection">
                                Hepatitis Coinfection
                              </Label>
                              <br />

                              <div className="form-group mb-3 col-md-4">
                                <CustomFormGroup
                                  formik={formik}
                                  name="hbvHcvCheckbox"
                                >
                                  <input
                                    className="form-control"
                                    type="checkbox"
                                    name="hbvHcvCheckbox"
                                    id="hbvHcvCheckbox"
                                    value={formik?.values?.hbvHcvCheckbox}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={{
                                      border: "1px solid #014D88",
                                      borderRadius: "0.2rem",
                                      width: 15,
                                      height: 15,
                                      display: "inline-flex",
                                      marginTop: 5,
                                      marginRight: 5,
                                    }}
                                  />
                                  <Label for="hbvHcvCheckbox">
                                    HBV/HCV (IU/ml)
                                    <span style={{ color: "red" }}>
                                      {" "}
                                      *
                                    </span>{" "}
                                  </Label>
                                </CustomFormGroup>
                                {formik?.touched?.hbvHcvCheckbox &&
                                  formik?.errors.hbvHcvCheckbox !== "" && (
                                    <span className={classes.error}>
                                      {formik?.errors.hbvHcvCheckbox}
                                    </span>
                                  )}
                              </div>

                              <div className="form-group mb-3 col-md-4">
                                <CustomFormGroup
                                  formik={formik}
                                  name="hbvHivCheckbox"
                                >
                                  <input
                                    className="form-control"
                                    type="checkbox"
                                    name="hbvHivCheckbox"
                                    id="hbvHivCheckbox"
                                    value={formik?.values?.hbvHivCheckbox}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={{
                                      border: "1px solid #014D88",
                                      borderRadius: "0.2rem",
                                      width: 15,
                                      height: 15,
                                      display: "inline-flex",
                                      marginTop: 5,
                                      marginRight: 5,
                                    }}
                                  />
                                  <Label for="hbvHivCheckbox">
                                    HBV/HIV (IU/ml)
                                    <span style={{ color: "red" }}>
                                      {" "}
                                      *
                                    </span>{" "}
                                  </Label>
                                </CustomFormGroup>
                                {formik?.touched?.hbvHivCheckbox &&
                                  formik?.errors.hbvHivCheckbox !== "" && (
                                    <span className={classes.error}>
                                      {formik?.errors.hbvHivCheckbox}
                                    </span>
                                  )}
                              </div>

                              <div className="form-group mb-3 col-md-4">
                                <CustomFormGroup
                                  formik={formik}
                                  name="hcvHivCheckbox"
                                >
                                  <input
                                    className="form-control"
                                    type="checkbox"
                                    name="hcvHivCheckbox"
                                    id="hcvHivCheckbox"
                                    value={formik?.values?.hcvHivCheckbox}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={{
                                      border: "1px solid #014D88",
                                      borderRadius: "0.2rem",
                                      width: 15,
                                      height: 15,
                                      display: "inline-flex",
                                      marginTop: 5,
                                      marginRight: 5,
                                    }}
                                  />
                                  <Label for="hcvHivCheckbox">
                                    HCV/HIV (IU/ml)
                                    <span style={{ color: "red" }}>
                                      {" "}
                                      *
                                    </span>{" "}
                                  </Label>
                                </CustomFormGroup>
                                {formik?.touched?.hcvHivCheckbox &&
                                  formik?.errors.hcvHivCheckbox !== "" && (
                                    <span className={classes.error}>
                                      {formik?.errors.hcvHivCheckbox}
                                    </span>
                                  )}
                              </div>

                              <div className="form-group col-md-12"></div>
                              {formik?.values?.hbvHcvCheckbox && (
                                <div className="form-group mb-3 col-md-4">
                                  <CustomFormGroup
                                    formik={formik}
                                    name="hbvHcvInputValue"
                                  >
                                    <Label for="hbvHcvInputValue">
                                      Input HBV/HCV (IU/ml){" "}
                                      <span style={{ color: "red" }}> *</span>{" "}
                                    </Label>
                                    <input
                                      className="form-control"
                                      type="number"
                                      name="hbvHcvInputValue"
                                      id="hbvHcvInputValue"
                                      value={formik?.values?.hbvHcvInputValue}
                                      onChange={formik.handleChange}
                                      style={{
                                        border: "1px solid #014D88",
                                        borderRadius: "0.2rem",
                                      }}
                                    />
                                  </CustomFormGroup>
                                  {formik?.touched?.hbvHcvInputValue &&
                                    formik?.errors.hbvHcvInputValue !== "" && (
                                      <span className={classes.error}>
                                        {formik?.errors.hbvHcvInputValue}
                                      </span>
                                    )}
                                </div>
                              )}

                              {formik?.values?.hbvHivCheckbox && (
                                <div className="form-group mb-3 col-md-4">
                                  <CustomFormGroup
                                    formik={formik}
                                    name="hbvHivInputValue"
                                  >
                                    <Label for="hbvHivInputValue">
                                      Input HBV/HIV (IU/ml){" "}
                                      <span style={{ color: "red" }}> *</span>{" "}
                                    </Label>
                                    <input
                                      className="form-control"
                                      type="number"
                                      name="hbvHivInputValue"
                                      id="hbvHivInputValue"
                                      value={formik?.values?.hbvHivInputValue}
                                      onChange={formik.handleChange}
                                      style={{
                                        border: "1px solid #014D88",
                                        borderRadius: "0.2rem",
                                      }}
                                    />
                                  </CustomFormGroup>
                                  {formik?.touched?.hbvHivInputValue &&
                                    formik?.errors.hbvHivInputValue !== "" && (
                                      <span className={classes.error}>
                                        {formik?.errors.hbvHivInputValue}
                                      </span>
                                    )}
                                </div>
                              )}

                              {formik?.values?.hcvHivCheckbox && (
                                <div className="form-group mb-3 col-md-4">
                                  <CustomFormGroup
                                    formik={formik}
                                    name="hcvHivInputValue"
                                  >
                                    <Label for="hcvHivInputValue">
                                      Input HCV/HIV (IU/ml){" "}
                                      <span style={{ color: "red" }}> *</span>{" "}
                                    </Label>
                                    <input
                                      className="form-control"
                                      type="number"
                                      name="hcvHivInputValue"
                                      id="hcvHivInputValue"
                                      value={formik?.values?.hcvHivInputValue}
                                      onChange={formik.handleChange}
                                      style={{
                                        border: "1px solid #014D88",
                                        borderRadius: "0.2rem",
                                      }}
                                    />
                                  </CustomFormGroup>
                                  {formik?.touched?.hcvHivInputValue &&
                                    formik?.errors.hcvHivInputValue !== "" && (
                                      <span className={classes.error}>
                                        {formik?.errors.hcvHivInputValue}
                                      </span>
                                    )}
                                </div>
                              )}

                              <div className="form-group col-md-12"></div>

                              <div className="form-group mb-3 col-md-4">
                                <CustomFormGroup
                                  formik={formik}
                                  name="hbvHdvCheckbox"
                                >
                                  <input
                                    className="form-control"
                                    type="checkbox"
                                    name="hbvHdvCheckbox"
                                    id="hbvHdvCheckbox"
                                    value={formik?.values?.hbvHdvCheckbox}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={{
                                      border: "1px solid #014D88",
                                      borderRadius: "0.2rem",
                                      width: 15,
                                      height: 15,
                                      display: "inline-flex",
                                      marginTop: 5,
                                      marginRight: 5,
                                    }}
                                  />
                                  <Label for="hbvHdvCheckbox">
                                    HBV/HDV (IU/ml)
                                    <span style={{ color: "red" }}>
                                      {" "}
                                      *
                                    </span>{" "}
                                  </Label>
                                </CustomFormGroup>
                                {formik?.touched?.hbvHdvCheckbox &&
                                  formik?.errors.hbvHdvCheckbox !== "" && (
                                    <span className={classes.error}>
                                      {formik?.errors.hbvHdvCheckbox}
                                    </span>
                                  )}
                              </div>

                              <div className="form-group mb-3 col-md-4">
                                <CustomFormGroup
                                  formik={formik}
                                  name="hbvHcvHivCheckbox"
                                >
                                  <input
                                    className="form-control"
                                    type="checkbox"
                                    name="hbvHcvHivCheckbox"
                                    id="hbvHcvHivCheckbox"
                                    value={formik?.values?.hbvHcvHivCheckbox}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={{
                                      border: "1px solid #014D88",
                                      borderRadius: "0.2rem",
                                      width: 15,
                                      height: 15,
                                      display: "inline-flex",
                                      marginTop: 5,
                                      marginRight: 5,
                                    }}
                                  />
                                  <Label for="hbvHcvHivCheckbox">
                                    HBV/HCV/HIV (IU/ml)
                                    <span style={{ color: "red" }}>
                                      {" "}
                                      *
                                    </span>{" "}
                                  </Label>
                                </CustomFormGroup>
                                {formik?.touched?.hbvHcvHivCheckbox &&
                                  formik?.errors.hbvHcvHivCheckbox !== "" && (
                                    <span className={classes.error}>
                                      {formik?.errors.hbvHcvHivCheckbox}
                                    </span>
                                  )}
                              </div>

                              <div className="form-group col-md-12"></div>

                              {formik?.values?.hbvHdvCheckbox && (
                                <div className="form-group mb-3 col-md-4">
                                  <CustomFormGroup
                                    formik={formik}
                                    name="hbvHdvInputValue"
                                  >
                                    <Label for="hbvHdvInputValue">
                                      Input HBV/HDV (IU/ml){" "}
                                      <span style={{ color: "red" }}> *</span>{" "}
                                    </Label>
                                    <input
                                      className="form-control"
                                      type="number"
                                      name="hbvHdvInputValue"
                                      id="hbvHdvInputValue"
                                      value={formik?.values?.hbvHdvInputValue}
                                      onChange={formik.handleChange}
                                      style={{
                                        border: "1px solid #014D88",
                                        borderRadius: "0.2rem",
                                      }}
                                    />
                                  </CustomFormGroup>
                                  {formik?.touched?.hbvHdvInputValue &&
                                    formik?.errors.hbvHdvInputValue !== "" && (
                                      <span className={classes.error}>
                                        {formik?.errors.hbvHdvInputValue}
                                      </span>
                                    )}
                                </div>
                              )}

                              {formik?.values?.hbvHcvHivCheckbox && (
                                <div className="form-group mb-3 col-md-4">
                                  <CustomFormGroup
                                    formik={formik}
                                    name="hbvHcvHivInputValue"
                                  >
                                    <Label for="hbvHcvHivInputValue">
                                      Input HBV/HCV/HIV (IU/ml){" "}
                                      <span style={{ color: "red" }}> *</span>{" "}
                                    </Label>
                                    <input
                                      className="form-control"
                                      type="number"
                                      name="hbvHcvHivInputValue"
                                      id="hbvHcvHivInputValue"
                                      value={
                                        formik?.values?.hbvHcvHivInputValue
                                      }
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      style={{
                                        border: "1px solid #014D88",
                                        borderRadius: "0.2rem",
                                      }}
                                    />
                                  </CustomFormGroup>
                                  {formik?.touched?.hbvHcvHivInputValue &&
                                    formik?.errors.hbvHcvHivInputValue !==
                                      "" && (
                                      <span className={classes.error}>
                                        {formik?.errors.hbvHcvHivInputValue}
                                      </span>
                                    )}
                                </div>
                              )}

                              <div className="form-group col-md-12"></div>

                              <div className="form-group mb-3 col-md-4">
                                <CustomFormGroup
                                  formik={formik}
                                  name="commobidities"
                                >
                                  <Label for="commobidities">
                                    Commobidities
                                  </Label>
                                  <select
                                    className="form-control"
                                    name="commobidities"
                                    id="commobidities"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik?.values?.commobidities}
                                    style={{
                                      border: "1px solid #014D88",
                                      borderRadius: "0.2rem",
                                    }}
                                  >
                                    <option>Select</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                  </select>

                                  {formik?.touched?.commobidities &&
                                    formik?.errors.commobidities !== "" && (
                                      <span className={classes.error}>
                                        {formik?.errors.commobidities}
                                      </span>
                                    )}
                                </CustomFormGroup>
                              </div>

                              {formik.values.commobidities === "YES" && (
                                <div className="form-group mb-3 col-md-4">
                                  <CustomFormGroup
                                    formik={formik}
                                    name="multipleInfection"
                                  >
                                    <Label for="multipleInfection">
                                      Specify multiple infection{" "}
                                      <span style={{ color: "red" }}> *</span>{" "}
                                    </Label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      name="multipleInfection"
                                      id="multipleInfection"
                                      value={formik?.values?.multipleInfection}
                                      onChange={formik.handleChange}
                                      onBlur={formik?.handleBlur}
                                      style={{
                                        border: "1px solid #014D88",
                                        borderRadius: "0.2rem",
                                      }}
                                    />
                                    {formik?.touched?.multipleInfection &&
                                      formik?.values?.multipleInfection !==
                                        "" && (
                                        <span className={classes.error}>
                                          {formik?.errors?.multipleInfection}
                                        </span>
                                      )}
                                  </CustomFormGroup>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Collapse>
                  </div>
                </div>
              </div>

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
                  Clinical Parameters
                </h5>
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup formik={formik} name="astCheckbox">
                      <input
                        className="form-control"
                        type="checkbox"
                        name="astCheckbox"
                        id="astCheckbox"
                        value={formik?.values?.astCheckbox}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                          width: 15,
                          height: 15,
                          display: "inline-flex",
                          marginTop: 5,
                          marginRight: 5,
                        }}
                      />
                      <Label for="astCheckbox">
                        AST (IU/ml)
                        <span style={{ color: "red" }}> *</span>{" "}
                      </Label>
                    </CustomFormGroup>
                    {formik?.touched?.astCheckbox &&
                      formik?.errors.astCheckbox !== "" && (
                        <span className={classes.error}>
                          {formik?.errors.astCheckbox}
                        </span>
                      )}
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup formik={formik} name="pltCheckbox">
                      <input
                        className="form-control"
                        type="checkbox"
                        name="pltCheckbox"
                        id="pltCheckbox"
                        value={formik?.values?.pltCheckbox}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                          width: 15,
                          height: 15,
                          display: "inline-flex",
                          marginTop: 5,
                          marginRight: 5,
                        }}
                      />
                      <Label for="pltCheckbox">
                        PLT (mm3)
                        <span style={{ color: "red" }}> *</span>{" "}
                      </Label>
                    </CustomFormGroup>
                    {formik?.touched?.pltCheckbox &&
                      formik?.errors.pltCheckbox !== "" && (
                        <span className={classes.error}>
                          {formik?.errors.pltCheckbox}
                        </span>
                      )}
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup formik={formik} name="altCheckbox">
                      <input
                        className="form-control"
                        type="checkbox"
                        name="altCheckbox"
                        id="altCheckbox"
                        value={formik?.values?.altCheckbox}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                          width: 15,
                          height: 15,
                          display: "inline-flex",
                          marginTop: 5,
                          marginRight: 5,
                        }}
                      />
                      <Label for="altCheckbox">
                        ALT (IU/ml)
                        <span style={{ color: "red" }}> *</span>{" "}
                      </Label>
                    </CustomFormGroup>
                    {formik?.touched?.altCheckbox &&
                      formik?.errors.altCheckbox !== "" && (
                        <span className={classes.error}>
                          {formik?.errors.altCheckbox}
                        </span>
                      )}
                  </div>

                  <div className="form-group col-md-12"></div>

                  {formik?.values.astCheckbox && (
                    <div className="form-group mb-3 col-md-4">
                      <CustomFormGroup formik={formik} name="astInputValue">
                        <Label for="astInputValue">
                          Input AST value{" "}
                          <span style={{ color: "red" }}> *</span>{" "}
                        </Label>
                        <input
                          className="form-control"
                          type="number"
                          name="astInputValue"
                          id="astInputValue"
                          value={formik?.values.astInputValue}
                          onChange={formik.handleChange}
                          onBlur={formik?.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
                        {formik?.touched?.astInputValue &&
                          formik?.errors.astInputValue !== "" && (
                            <span className={classes.error}>
                              {formik?.errors.astInputValue}
                            </span>
                          )}
                      </CustomFormGroup>
                    </div>
                  )}

                  {formik?.values?.pltCheckbox && (
                    <div className="form-group mb-3 col-md-4">
                      <CustomFormGroup formik={formik} name="pltInputValue">
                        <Label for="pltInputValue">
                          Input PLT value{" "}
                          <span style={{ color: "red" }}> *</span>{" "}
                        </Label>
                        <input
                          className="form-control"
                          type="number"
                          name="pltInputValue"
                          id="pltInputValue"
                          value={formik?.values?.pltInputValue}
                          onChange={formik?.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />

                        {formik?.touched?.pltInputValue &&
                          formik?.errors.pltInputValue !== "" && (
                            <span className={classes.error}>
                              {formik?.errors.pltInputValue}
                            </span>
                          )}
                      </CustomFormGroup>
                    </div>
                  )}

                  {formik?.values?.altCheckbox && (
                    <div className="form-group mb-3 col-md-4">
                      <CustomFormGroup formik={formik} name="altInputValue">
                        <Label for="altInputValue">
                          Input ALT value{" "}
                          <span style={{ color: "red" }}> *</span>{" "}
                        </Label>
                        <input
                          className="form-control"
                          type="number"
                          name="altInputValue"
                          id="altInputValue"
                          value={formik.values.altInputValue}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />

                        {formik?.touched?.altInputValue &&
                          formik?.errors.altInputValue !== "" && (
                            <span className={classes.error}>
                              {formik?.errors.altInputValue}
                            </span>
                          )}
                      </CustomFormGroup>
                    </div>
                  )}

                  <div className="form-group col-md-12"></div>

                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup formik={formik} name="totalBiliRubin">
                      <Label for="totalBiliRubin">
                        Total Bilirubin (μmol/L){" "}
                        <span style={{ color: "red" }}> *</span>{" "}
                      </Label>
                      <input
                        className="form-control"
                        type="text"
                        name="totalBiliRubin"
                        id="totalBiliRubin"
                        value={formik?.values?.totalBiliRubin}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {formik?.touched?.totalBiliRubin &&
                        formik?.errors.totalBiliRubin !== "" && (
                          <span className={classes.error}>
                            {formik?.errors.totalBiliRubin}
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup formik={formik} name="directBiliribin">
                      <Label for="directBiliribin">
                        Direct Bilirubin (μmol/L)
                      </Label>
                      <span style={{ color: "red" }}> *</span>{" "}
                      <input
                        className="form-control"
                        type="text"
                        name="directBiliribin"
                        id="directBiliribin"
                        value={formik?.values?.directBiliribin}
                        onChange={formik.handleChange}
                        onBlur={formik?.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {formik?.touched?.directBiliribin &&
                        formik?.errors.directBiliribin !== "" && (
                          <span className={classes.error}>
                            {formik?.errors.directBiliribin}
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup formik={formik} name="albumin">
                      <Label for="albumin">Albumin (g/dl)</Label>
                      <span style={{ color: "red" }}> *</span>{" "}
                      <input
                        className="form-control"
                        type="number"
                        name="albumin"
                        id="albumin"
                        value={formik?.values?.albumin}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {formik?.touched.albumin &&
                        formik?.errors.albumin !== "" && (
                          <span className={classes.error}>
                            {formik?.errors?.albumin}
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup formik={formik} name="apriScore">
                      <Label for="apriScore">APRI score </Label>
                      <span style={{ color: "red" }}> *</span>{" "}
                      <input
                        disabled
                        className="form-control"
                        type="text"
                        name="apriScore"
                        id="apriScore"
                        value={formik?.values?.apriScore}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {formik?.touched.apriScore &&
                        formik?.errors.apriScore !== "" && (
                          <span className={classes.error}>
                            {formik?.errors?.apriScore}
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup formik={formik} name="fib4">
                      <Label for="fib4">FIB-4</Label>
                      <span style={{ color: "red" }}> *</span>{" "}
                      <input
                        disabled
                        className="form-control"
                        type="text"
                        name="fib4"
                        id="fib4"
                        value={formik?.values?.fib4}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {formik?.touched.fib4 && formik?.errors.fib4 !== "" && (
                        <span className={classes.error}>
                          {formik?.errors?.fib4}
                        </span>
                      )}
                    </CustomFormGroup>
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup formik={formik} name="prothrombinTimeNR">
                      <Label for="prothrombinTimeNR">
                        Prothrombin time/INR
                      </Label>
                      <span style={{ color: "red" }}> *</span>{" "}
                      <input
                        className="form-control"
                        type="number"
                        name="prothrombinTimeNR"
                        id="prothrombinTimeNR"
                        value={formik.values.prothrombinTimeNR}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {formik?.touched?.prothrombinTimeNR &&
                        formik?.errors?.prothrombinTimeNR !== "" && (
                          <span className={classes.error}>
                            {formik?.errors.prothrombinTimeNR}
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup formik={formik} name="urea">
                      <Label for="urea">Urea (mg/dl)</Label>
                      <span style={{ color: "red" }}> *</span>{" "}
                      <input
                        className="form-control"
                        type="number"
                        name="urea"
                        id="urea"
                        value={formik?.values?.urea}
                        onChange={formik.handleChange}
                        onBlur={formik?.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {formik?.touched?.urea && formik?.errors.urea !== "" && (
                        <span className={classes.error}>
                          {formik?.errors.urea}
                        </span>
                      )}
                    </CustomFormGroup>
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup formik={formik} name="creatinine">
                      <Label for="creatinine">Creatinine (μmol/L)</Label>
                      <span style={{ color: "red" }}> *</span>{" "}
                      <input
                        className="form-control"
                        type="number"
                        name="creatinine"
                        id="creatinine"
                        value={formik.values.creatinine}
                        onChange={formik.handleChange}
                        onBlur={formik?.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {formik?.touched?.creatinine &&
                        formik?.errors.creatinine !== "" && (
                          <span className={classes.error}>
                            {formik?.errors?.creatinine}
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup formik={formik} name="ultrasoundScan">
                      <Label for="ultrasoundScan">Ultrasound scan</Label>
                      <span style={{ color: "red" }}> *</span>{" "}
                      <input
                        className="form-control"
                        type="number"
                        name="ultrasoundScan"
                        id="ultrasoundScan"
                        value={formik.values.ultrasoundScan}
                        onChange={formik.handleChange}
                        onBlur={formik?.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {formik?.touched?.ultrasoundScan &&
                        formik?.errors.ultrasoundScan !== "" && (
                          <span className={classes.error}>
                            {formik?.errors.ultrasoundScan}
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup formik={formik} name="afp">
                      <Label for="afp">AFP (ng/ml)</Label>
                      <span style={{ color: "red" }}> *</span>{" "}
                      <input
                        className="form-control"
                        type="number"
                        name="afp"
                        id="afp"
                        value={formik?.values.afp}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {formik?.touched?.afp && formik?.errors.afp !== "" && (
                        <span className={classes.error}>
                          {formik?.errors.afp}
                        </span>
                      )}
                    </CustomFormGroup>
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup formik={formik} name="fibroscan">
                      <Label for="fibroscan">Fibroscan (Kpa)</Label>
                      <span style={{ color: "red" }}> *</span>{" "}
                      <input
                        className="form-control"
                        type="number"
                        name="fibroscan"
                        id="fibroscan"
                        value={formik?.values?.fibroscan}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {formik?.touched?.fibroscan &&
                        formik?.errors.fibroscan !== "" && (
                          <span className={classes.error}>
                            {formik?.errors.fibroscan}
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup formik={formik} name="ctScan">
                      <Label for="ctScan">CT scan</Label>
                      <span style={{ color: "red" }}> *</span>{" "}
                      <input
                        className="form-control"
                        type="text"
                        name="ctScan"
                        id="ctScan"
                        value={formik.values.ctScan}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {formik?.touched?.ctScan &&
                        formik?.errors.ctScan !== "" && (
                          <span className={classes.error}>
                            {formik?.errors.ctScan}
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup formik={formik} name="ascites">
                      <Label for="ascites">Ascites</Label>
                      <span style={{ color: "red" }}> *</span>{" "}
                      <select
                        className="form-control"
                        name="ascites"
                        id="ascites"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.ascites}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      >
                        <option value={""}>Select</option>
                        <option value={"YES"}>Yes</option>
                        <option value={"NO"}>No</option>
                      </select>
                      {formik?.touched?.ascites &&
                        formik?.errors?.ascites !== "" && (
                          <span className={classes.error}>
                            {formik?.errors.ascites}
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>

                  {formik?.values?.ascites === "YES" && (
                    <div className="form-group mb-3 col-md-4">
                      <CustomFormGroup formik={formik} name="severityOfAscites">
                        <Label for="severityOfAscites">
                          Severity of ascites
                        </Label>
                        <span style={{ color: "red" }}> *</span>{" "}
                        <select
                          className="form-control"
                          name="severityOfAscites"
                          id="severityOfAscites"
                          onChange={formik.handleChange}
                          onBlur={formik?.handleBlur}
                          value={formik.values.severityOfAscites}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        >
                          <option value={""}>Select</option>
                          <option value={"MILD"}>Mild</option>
                          <option value={"MODERATE"}>Moderate</option>
                          <option value={"MASSIVE_OR_GROSS"}>
                            Massive/Gross
                          </option>
                        </select>
                        {formik?.touched?.severityOfAscites &&
                          formik?.errors?.severityOfAscites !== "" && (
                            <span className={classes.error}>
                              {formik?.errors.severityOfAscites}
                            </span>
                          )}
                      </CustomFormGroup>
                    </div>
                  )}

                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup
                      formik={formik}
                      name="gradeOfEncephalopathy"
                    >
                      <Label for="gradeOfEncephalopathy">
                        Grade of Encephalopathy
                      </Label>
                      <span style={{ color: "red" }}> *</span>{" "}
                      <select
                        className="form-control"
                        name="gradeOfEncephalopathy"
                        id="gradeOfEncephalopathy"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.gradeOfEncephalopathy}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      >
                        <option value={""}>Select</option>
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                      </select>
                      {formik?.touched.gradeOfEncephalopathy &&
                        formik?.errors.gradeOfEncephalopathy !== "" && (
                          <span className={classes.error}>
                            {formik?.errors.gradeOfEncephalopathy}
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup formik={formik} name="childPughScore">
                      <Label for="childPughScore">Child pugh score</Label>
                      <span style={{ color: "red" }}> *</span>{" "}
                      <select
                        className="form-control"
                        name="childPughScore"
                        id="childPughScore"
                        value={formik?.values.childPughScore}
                        onChange={formik.handleChange}
                        onBlur={formik?.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      >
                        <option>Select</option>

                        {childPughScoreOptions?.map?.((item) => (
                          <option key={item?.code} value={item?.code}>
                            {item?.display}
                          </option>
                        ))}
                      </select>
                      {formik?.touched?.childPughScore &&
                        formik?.errors?.childPughScore !== "" && (
                          <span className={classes.error}>
                            {formik?.errors.childPughScore}
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup formik={formik} name="liverBiopsyStage">
                      <Label for="liverBiopsyStage">Liver biopsy stage</Label>
                      <span style={{ color: "red" }}> *</span>{" "}
                      <select
                        className="form-control"
                        name="liverBiopsyStage"
                        id="liverBiopsyStage"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik?.values.liverBiopsyStage}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      >
                        <option>Select</option>
                        <option value={"NO_FIBROSIS"}>No Fibrosis</option>
                        <option value={"MILD_FIBROSIS"}>Mild Fibrosis</option>
                        <option value={"MODERATE_FIBROSIS"}>
                          Moderate Fibrosis
                        </option>
                        <option value={"FIBROSIS"}>Fibrosis</option>
                        <option value={"SEVERE_FIBROSIS"}>
                          Severe Fibrosis
                        </option>
                        <option value={"Cirrhosis"}>Cirrhosis</option>
                      </select>
                      {formik?.touched?.liverBiopsyStage &&
                        formik?.errors.liverBiopsyStage && (
                          <span className={classes.error}>
                            {formik?.errors.liverBiopsyStage}
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>

                  {[
                    "NO_FIBROSIS",
                    "MILD_FIBROSIS",
                    "MODERATE_FIBROSIS",
                    "FIBROSIS",
                    "SEVERE_FIBROSIS",
                    "CIRRHOSIS",
                  ]?.includes(formik?.values?.liverBiopsyStage) && (
                    <>
                      <div className="form-group mb-3 col-md-4">
                        <CustomFormGroup
                          formik={formik}
                          name="stagingDateOfLiverBiopsy"
                        >
                          <Label for="stagingDateOfLiverBiopsy">
                            Staging date of liver biopsy{" "}
                          </Label>
                          <span style={{ color: "red" }}> *</span>{" "}
                          <input
                            className="form-control"
                            type="date"
                            name="stagingDateOfLiverBiopsy"
                            max={moment(new Date()).format("YYYY-MM-DD")}
                            id="stagingDateOfLiverBiopsy"
                            value={formik?.values?.stagingDateOfLiverBiopsy}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{
                              border: "1px solid #014D88",
                              borderRadius: "0.2rem",
                            }}
                          />
                          {formik?.touched?.stagingDateOfLiverBiopsy &&
                            formik?.errors.stagingDateOfLiverBiopsy !== "" && (
                              <span className={classes.error}>
                                {formik?.errors.stagingDateOfLiverBiopsy}
                              </span>
                            )}
                        </CustomFormGroup>
                      </div>

                      <div className="form-group mb-3 col-md-4">
                        <CustomFormGroup formik={formik} name="diagnosisResult">
                          <Label for="diagnosisResult">Diagnosis</Label>
                          <span style={{ color: "red" }}> *</span>{" "}
                          <select
                            className="form-control"
                            name="diagnosisResult"
                            id="diagnosisResult"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik?.values.diagnosisResult}
                            style={{
                              border: "1px solid #014D88",
                              borderRadius: "0.2rem",
                            }}
                          >
                            <option value={""}>Select</option>
                            <option value={"NO_FIBROSIS"}> No Fibrosis</option>
                            <option value={"FIBROSIS"}>Fibrosis</option>
                            <option value={"CIRRHOSIS"}>Cirrhosis</option>
                            <option value={"HIGH_CC"}>HCC</option>
                          </select>
                          {formik?.touched?.diagnosisResult &&
                            formik?.errors?.diagnosisResult !== "" && (
                              <span className={classes.error}>
                                {formik?.errors.diagnosisResult}
                              </span>
                            )}
                        </CustomFormGroup>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {false && <Spinner />}
              <br />

              <div className="d-flex justify-content-between">
                <MatButton
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={() => setStep(step - 1)}
                  className={classes.button}
                  startIcon={<ArrowBackIcon />}
                  style={{ backgroundColor: "#014d88", fontWeight: "bolder" }}
                >
                  <span style={{ textTransform: "capitalize" }}>Previous</span>
                </MatButton>

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

export default ExistingPatientDiagnosis;
