import React, { useEffect, useState } from "react";
import MatButton from "@material-ui/core/Button";
import { FormGroup, Label, Spinner, Input, Form, InputGroup } from "reactstrap";
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
import { useValidateForm2ValuesHook } from "../../../formSchemas/form1ValidationSchema";
import { Collapse, IconButton } from "@material-ui/core";
import { ArrowForward, ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getCookie, setCookie } from "../../../helpers/cookieStoragehelpers";

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

const ViralHepatitisForm2 = ({ setStep }) => {
  const onSubmitHandler = (values) => {
    window.scrollTo(0, 0);
    const restructuredDiagnosisPayload = {
      hepatitisBTest: {
        dateHbvTestRequested: values.dateHbvTestRequested,
        dateHbvSampleRequested: values.dateHbvSampleRequested,
        dateHbvDnaTestRequested: values.dateHbvDnaTestRequested,
        stagingDateOfLiverBiopsy: values.stagingDateOfLiverBiopsy,
        hbvDna: values.hbvDna,
        hvbDnaValue: values.hvbDnaValue,
        hbsAgQuantification: values.hbsAgQuantification,
        ctScan: values.ctScan,
        albumin: values.albumin,
        hbeAG: values.hbeAG,
        antiHDV: values.antiHDV,
        treatmentEligible: values.treatmentEligible,
        pmtctEligible: values.pmtctEligible,
        comment: values.comment,
      },
      hepatitisCTest: {
        hcvRNA: values.hcvRNA,
        hcRnaValue: values.hcRnaValue,
        hepatitisCoinfection: values.hepatitisCoinfection,
        commobidities: values.commobidities,
        multipleInfection: values.multipleInfection,
      },
      clinicalParameters: {
        ast: values.ast,
        alt: values.alt,
        pst: values.plt,
        astValue: values.astValue,
        totalBiliRubin: values.totalBiliRubin,
        directBiliribin: values.directBiliribin,
        apriScore: "",
        fib4: values.fib4,
        prothrombinTimeNR: "",
        urea: values.urea,
        creatinine: values.creatinine,
        afp: values.afp,
        fibroscan: values.fibroscan,
        ultrasoundScan: values.ultrasoundScan,
        ascites: values.ascites,
        severityOfAscites: values.severityOfAscites,
        gradeOfEncephalopathy: values.gradeOfEncephalopathy,
        childPughScore: values.childPughScore,
        liverBiopsyStage: values.liverBiopsyStage,
        diagnosis_result: values.diagnosis_result,
      },
    };
    setCookie("hepatitis2", values, 1);
    setCookie("heaptitis2PayloadValue", restructuredDiagnosisPayload, 1);
    setStep(2);
  };
  const moveBack = () => {
    window.scrollTo(0, 0);
    setStep(0);
  };
  const classes = useStyles();
  const { formik } = useValidateForm2ValuesHook(onSubmitHandler);

  const castCookieValueToForm = () => {
    const cookieValue = getCookie("hepatitis2");
    if (cookieValue) {
      formik.setValues(cookieValue);
    }
  };

  useEffect(() => {
    castCookieValueToForm();
  }, []);

  const [isDropdownsOpen, setIsDropdownsOpen] = useState({
    hepatitisBDropdown: true,
    hepatitisCDropdown: true,
    coInfectionDropdown: true,
  });
  return (
    <>
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
                            <FormGroup>
                              <Label for="dateHbvDnaTestRequested">
                                Date HBV DNA test requested{" "}
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <input
                                className="form-control"
                                type="date"
                                name="dateHbvDnaTestRequested"
                                id="dateHbvDnaTestRequested"
                                value={formik.values.dateHbvDnaTestRequested}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />
                              {formik.errors.dateHbvDnaTestRequested !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.dateHbvDnaTestRequested}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="dateHbvTestRequested">
                                Date HBV test requested{" "}
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <input
                                className="form-control"
                                type="date"
                                name="dateHbvTestRequested"
                                id="dateHbvTestRequested"
                                value={formik.values.dateHbvTestRequested}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />
                              {formik.errors.dateHbvTestRequested !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.dateHbvTestRequested}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="dateHbvSampleRequested">
                                Date HBV sample Requested{" "}
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <input
                                className="form-control"
                                type="date"
                                name="dateHbvSampleRequested"
                                id="dateHbvSampleRequested"
                                value={formik.values.dateHbvSampleRequested}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />
                              {formik.errors.dateHbvSampleRequested !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.dateHbvSampleRequested}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="dateHbvDnaResultReported">
                                Date of HBV DNA result reported{" "}
                              </Label>
                              <input
                                className="form-control"
                                type="date"
                                name="dateHbvDnaResultReported"
                                id="dateHbvDnaResultReported"
                                value={formik.values.dateHbvDnaResultReported}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />
                              {formik.errors.dateHbvDnaResultReported !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.dateHbvDnaResultReported}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="stagingDateOfLiverBiopsy">
                                Staging date of liver biopsy{" "}
                              </Label>
                              <input
                                className="form-control"
                                type="date"
                                name="stagingDateOfLiverBiopsy"
                                id="stagingDateOfLiverBiopsy"
                                value={formik.values.stagingDateOfLiverBiopsy}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />
                              {formik.errors.stagingDateOfLiverBiopsy !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.stagingDateOfLiverBiopsy}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-2 col-md-4">
                            <FormGroup>
                              <Label>
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
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
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
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    style={{
                                      border: "1px solid #014D88",
                                      borderRadius: "0.2rem",
                                    }}
                                  />{" "}
                                  Undetected
                                </label>

                                {formik.errors.hbvDna !== "" ? (
                                  <span className={classes.error}>
                                    {formik.errors.hbvDna}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </div>
                            </FormGroup>
                          </div>
                          {formik.values.hbvDna === "DETECTED" && (
                            <div className="form-group mb-3 col-md-4">
                              <FormGroup>
                                <Label for="hvbDnaValue">
                                  Input HBV DNA value{" "}
                                  <span style={{ color: "red" }}> *</span>{" "}
                                </Label>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="hvbDnaValue"
                                  id="hvbDnaValue"
                                  value={formik.values.hvbDnaValue}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                />

                                {formik.errors.hvbDnaValue !== "" ? (
                                  <span className={classes.error}>
                                    {formik.errors.hvbDnaValue}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </FormGroup>
                            </div>
                          )}
                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="hbsAgQuantification">
                                HBsAG Quantification
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
                              {formik.errors.hbsAgQuantification ? (
                                <span className={classes.error}>
                                  {formik.errors.hbsAgQuantification}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="ctScan">CT scan</Label>
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
                              {formik.errors.ctScan ? (
                                <span className={classes.error}>
                                  {formik.errors.ctScan}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="albumin">Albumin</Label>
                              <input
                                className="form-control"
                                type="text"
                                name="albumin"
                                id="albumin"
                                value={formik.values.albumin}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />
                              {formik.errors.albumin ? (
                                <span className={classes.error}>
                                  {formik.errors.albumin}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="hbeAG">HbeAG</Label>
                              <select
                                className="form-control"
                                name="hbeAG"
                                id="hbeAG"
                                onChange={formik.handleChange}
                                value={formik.values.hbeAG}
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
                              {formik.errors.hbeAG !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.hbeAG}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="antiHDV">Anti-HDV</Label>
                              <select
                                className="form-control"
                                name="antiHDV"
                                id="antiHDV"
                                onChange={formik.handleChange}
                                value={formik.values.antiHDV}
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
                              {formik.errors.antiHDV !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.antiHDV}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="treatmentEligible">
                                Treatment Eligible
                              </Label>
                              <select
                                className="form-control"
                                name="treatmentEligible"
                                id="treatmentEligible"
                                onChange={formik.handleChange}
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
                              {formik.errors.treatmentEligible !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.treatmentEligible}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="pmtctEligible">PMTCT Eligible</Label>
                              <select
                                className="form-control"
                                name="pmtctEligible"
                                id="pmtctEligible"
                                onChange={formik.handleChange}
                                value={formik.values.pmtctEligible}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option value={""}>Select</option>
                                <option value={"YES"}>Yes</option>
                                <option value={"NO"}>No</option>
                              </select>
                              {formik.errors.pmtctEligible !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.pmtctEligible}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-4-12">
                            <FormGroup>
                              <Label for="comment">Comment</Label>
                              <textarea
                                className="form-control"
                                name="comment"
                                id="comment"
                                onChange={formik.handleChange}
                                value={formik.values.comment}
                                cols="50"
                                rows="30"
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                  height: "120px",
                                }}
                              />
                              {formik.errors.comment !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.comment}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
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
                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="hcvRNA">HCV RNA (IU/ml)</Label>
                              <select
                                className="form-control"
                                name="hcvRNA"
                                id="hcvRNA"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.hcvRNA}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option value={""}>select</option>
                                <option value={"DETECTED"}>Detected</option>
                                <option value={"UNDETECTED"}>Undetected</option>
                              </select>
                              {formik.errors.hcvRNA !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.hcvRNA}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>
                          {formik.values.hcvRNA === "DETECTED" && (
                            <div className="form-group mb-3 col-md-4">
                              <FormGroup>
                                <Label for="hcRnaValue">
                                  Input HCV RNA Value{" "}
                                  <span style={{ color: "red" }}> *</span>{" "}
                                </Label>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="hcRnaValue"
                                  id="hcRnaValue"
                                  value={formik.values.hcRnaValue}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                />
                                {formik.errors.hcRnaValue !== "" ? (
                                  <span className={classes.error}>
                                    {formik.errors.hcRnaValue}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </FormGroup>
                            </div>
                          )}

                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="hepatitisCoinfection">
                                Hepatitis Coinfection
                              </Label>
                              <select
                                className="form-control"
                                name="hepatitisCoinfection"
                                id="hepatitisCoinfection"
                                onChange={formik.handleChange}
                                value={formik.values.hepatitisCoinfection}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option value={""}>Select</option>
                                <option value={"HBV_HCV"}>HBV/HCV</option>
                                <option value={"HCV_HIV"}>HCV/HIV</option>
                                <option value={"HBV_HDV"}>HBV/HDV</option>
                                <option value={"HBV_HCD_HIV"}>
                                  HBV/HCD/HIV
                                </option>
                              </select>
                              {formik.errors.hepatitisCoinfection !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.hepatitisCoinfection}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="commobidities">
                                Commobidities{" "}
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <input
                                className="form-control"
                                type="text"
                                name="commobidities"
                                id="commobidities"
                                value={formik.values.commobidities}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />
                              {formik.errors.commobidities !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.commobidities}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="multipleInfection">
                                Specify multiple infection{" "}
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <input
                                className="form-control"
                                type="text"
                                name="multipleInfection"
                                id="multipleInfection"
                                value={formik.values.multipleInfection}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />
                              {formik.errors.multipleInfection !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.multipleInfection}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>
                        </div>
                      </div>
                    </Collapse>
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
                    Clinical Parameters
                  </h5>
                </div>

                <div className="card-body">
                  <div className="row">
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="ast">AST</Label>
                        <select
                          className="form-control"
                          name="ast"
                          id="ast"
                          onChange={formik.handleChange}
                          value={formik.values.ast}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        >
                          <option value={""}>Select</option>
                          <option value={"YES"}>Yes</option>
                          <option value={"NO"}>No</option>
                        </select>
                        {formik.errors.ast !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.ast}
                          </span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="alt">ALT</Label>
                        <select
                          className="form-control"
                          name="alt"
                          id="alt"
                          onChange={formik.handleChange}
                          value={formik.values.alt}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        >
                          <option value={""}>Select</option>
                          <option value={"YES"}>Yes</option>
                          <option value={"NO"}>No</option>
                        </select>
                        {formik.errors.alt !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.alt}
                          </span>
                        ) : null}
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="pst">PST</Label>
                        <select
                          className="form-control"
                          name="pst"
                          id="pst"
                          onChange={formik.handleChange}
                          value={formik.values.pst}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        >
                          <option value={""}>Select</option>
                          <option value={"YES"}>Yes</option>
                          <option value={"NO"}>No</option>
                        </select>
                        {formik.errors.pst !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.pst}
                          </span>
                        ) : null}
                      </FormGroup>
                    </div>
                  </div>
                  <div className="row">
                    {formik.values.ast === "YES" && (
                      <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                          <Label for="astValue">
                            Input AST value{" "}
                            <span style={{ color: "red" }}> *</span>{" "}
                          </Label>
                          <input
                            className="form-control"
                            type="text"
                            name="astValue"
                            id="astValue"
                            value={formik.values.astValue}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{
                              border: "1px solid #014D88",
                              borderRadius: "0.2rem",
                            }}
                          />
                          {formik.errors.astValue !== "" ? (
                            <span className={classes.error}>
                              {formik.errors.astValue}
                            </span>
                          ) : (
                            ""
                          )}
                        </FormGroup>
                      </div>
                    )}
                    {formik.values.alt === "YES" && (
                      <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                          <Label for="altValue">
                            Input ALT value{" "}
                            <span style={{ color: "red" }}> *</span>{" "}
                          </Label>
                          <input
                            className="form-control"
                            type="text"
                            name="altValue"
                            id="altValue"
                            value={formik.values.altValue}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{
                              border: "1px solid #014D88",
                              borderRadius: "0.2rem",
                            }}
                          />
                          {formik.errors.altValue !== "" ? (
                            <span className={classes.error}>
                              {formik.errors.altValue}
                            </span>
                          ) : (
                            ""
                          )}
                        </FormGroup>
                      </div>
                    )}
                    {formik.values.plt === "YES" && (
                      <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                          <Label for="pstValue">
                            Input PST value{" "}
                            <span style={{ color: "red" }}> *</span>{" "}
                          </Label>
                          <input
                            className="form-control"
                            type="text"
                            name="pstValue"
                            id="pstValue"
                            value={formik.values.pstValue}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{
                              border: "1px solid #014D88",
                              borderRadius: "0.2rem",
                            }}
                          />
                          {formik.errors.pstValue !== "" ? (
                            <span className={classes.error}>
                              {formik.errors.pstValue}
                            </span>
                          ) : (
                            ""
                          )}
                        </FormGroup>
                      </div>
                    )}
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="totalBiliRubin">
                          Total Bilirubin{" "}
                          <span style={{ color: "red" }}> *</span>{" "}
                        </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="totalBiliRubin"
                          id="totalBiliRubin"
                          value={formik.values.totalBiliRubin}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
                        {formik.errors.totalBiliRubin !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.totalBiliRubin}
                          </span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="directBiliribin">Direct Bilirubin </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="directBiliribin"
                          id="directBiliribin"
                          value={formik.values.directBiliribin}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
                        {formik.errors.directBiliribin !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.directBiliribin}
                          </span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>

                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="apriScore">APRI score </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="apriScore"
                          id="apriScore"
                          value={formik.values.apriScore}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
                        {formik.errors.apriScore !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.apriScore}
                          </span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="fib4">FIB-4</Label>
                        <input
                          className="form-control"
                          type="text"
                          name="fib4"
                          id="fib4"
                          value={formik.values.fib4}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
                        {formik.errors.fib4 !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.fib4}
                          </span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="prothrombinTimeNR">
                          Prothrombin time/INR
                        </Label>
                        <input
                          className="form-control"
                          type="text"
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
                        {formik.errors.prothrombinTimeNR !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.prothrombinTimeNR}
                          </span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="urea">Urea (mg/dl)</Label>
                        <input
                          className="form-control"
                          type="text"
                          name="urea"
                          id="urea"
                          value={formik.values.urea}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
                        {formik.errors.urea !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.urea}
                          </span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>

                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="creatinine">Creatinine (μmol/L)</Label>
                        <input
                          className="form-control"
                          type="text"
                          name="creatinine"
                          id="creatinine"
                          value={formik.values.creatinine}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
                        {formik.errors.creatinine !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.creatinine}
                          </span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>

                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="creatinine">AFP (ng/ml)</Label>
                        <input
                          className="form-control"
                          type="text"
                          name="afp"
                          id="afp"
                          value={formik.values.afp}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
                        {formik.errors.afp !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.afp}
                          </span>
                        ) : null}
                      </FormGroup>
                    </div>

                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="fibroscan">Fibroscan (kPa)</Label>
                        <input
                          className="form-control"
                          type="text"
                          name="fibroscan"
                          id="fibroscan"
                          value={formik.values.fibroscan}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
                        {formik.errors.fibroscan !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.fibroscan}
                          </span>
                        ) : null}
                      </FormGroup>
                    </div>

                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="ultrasoundScan">
                          Ultrasound scan (μmol/L)
                        </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="ultrasoundScan"
                          id="ultrasoundScan"
                          value={formik.values.ultrasoundScan}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
                        {formik.errors.ultrasoundScan !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.ultrasoundScan}
                          </span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>

                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="ascites">Ascites</Label>
                        <select
                          className="form-control"
                          name="ascites"
                          id="ascites"
                          onChange={formik.handleChange}
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
                        {formik.errors.ascites !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.ascites}
                          </span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>

                    {formik.values.ascites === "YES" && (
                      <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                          <Label for="severityOfAscites">
                            Severity of ascites
                          </Label>
                          <select
                            className="form-control"
                            name="severityOfAscites"
                            id="severityOfAscites"
                            onChange={formik.handleChange}
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
                          {formik.errors.severityOfAscites !== "" ? (
                            <span className={classes.error}>
                              {formik.errors.severityOfAscites}
                            </span>
                          ) : (
                            ""
                          )}
                        </FormGroup>
                      </div>
                    )}

                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="ascitesLevel">
                          Grade of Encephalopathy
                        </Label>
                        <select
                          className="form-control"
                          name="gradeOfEncephalopathy"
                          id="gradeOfEncephalopathy"
                          onChange={formik.handleChange}
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
                          <option value={5}>5</option>
                        </select>
                        {formik.errors.gradeOfEncephalopathy !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.gradeOfEncephalopathy}
                          </span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>

                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="childPughScore">Child pugh score</Label>
                        <input
                          className="form-control"
                          type="text"
                          name="childPughScore"
                          id="childPughScore"
                          value={formik.values.childPughScore}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
                        {formik.errors.childPughScore !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.childPughScore}
                          </span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>

                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="liverBiopsyStage">Liver biopsy stage</Label>
                        <select
                          className="form-control"
                          name="liverBiopsyStage"
                          id="liverBiopsyStage"
                          onChange={formik.handleChange}
                          value={formik.values.liverBiopsyStage}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        >
                          <option value={""}>Select</option>
                          <option value={"F0__NO_FIBROSIS"}>
                            {" "}
                            No Fibrosis
                          </option>
                          <option value={"F1__MILD_FIBROSIS"}>
                            Mild Fibrosis
                          </option>
                          <option value={"F2__MODERATE_FIBROSIS"}>
                            Moderate Fibrosis
                          </option>
                          <option value={"F3__SEVERE_FIBROSIS"}>
                            {" "}
                            Severe Fibrosis
                          </option>
                          <option value={"F4__CIRRHOSIS"}>Cirrhosis</option>
                          <option value={"NOT_DONE"}>Not done</option>
                        </select>
                        {formik.errors.liverBiopsyStage !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.liverBiopsyStage}
                          </span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>

                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="diagnosis_result">Diagnosis</Label>
                        <select
                          className="form-control"
                          name="diagnosis_result"
                          id="diagnosis_result"
                          onChange={formik.handleChange}
                          value={formik.values.diagnosis_result}
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
                        {formik.errors.diagnosis_result !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.diagnosis_result}
                          </span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>
                  </div>
                </div>
              </div>
              {false ? <Spinner /> : ""}
              <br />
              <div className="d-flex justify-content-between">
                <MatButton
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={moveBack}
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
    </>
  );
};

export default ViralHepatitisForm2;
