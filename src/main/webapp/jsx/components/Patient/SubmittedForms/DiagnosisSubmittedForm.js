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
import axios from "axios";
import { url as apiUrl, token } from "../../../../api";
import { toast } from "react-toastify";
library.add(faCheckSquare, faCoffee, faEdit, faTrash);

// hcRnaValue
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

const DiagnosisSubmitedForm = ({
  action,
  setStep,
  userStatus,
  patientObj,
  diagnosisInfo,
  enrollmentUuid,
}) => {
  const [userId, setUserId] = useState(getCookie("enrollmentIds"));

  const [basicInfo, setBasicInfo] = useState({
    clinicalParameters: {
      afp: "",
      alt: "",
      apriScore: "",
      ascites: "",
      ast: "",
      astValue: "",
      childPughScore: "",
      creatinine: "",
      diagnosis_result: "",
      directBiliribin: "",
      fib4: "",
      fibroscan: "",
      gradeOfEncephalopathy: "",
      liverBiopsyStage: "",
      prothrombinTimeNR: "",
      pst: "",
      severityOfAscites: "MILD",
      totalBiliRubin: "",
      ultrasoundScan: "",
      urea: "",
    },
    enrollmentUuid: enrollmentUuid,
    hepatitisBTest: {
      albumin: "",
      antiHDV: "",
      comment: "",
      ctScan: "",
      dateHbvDnaTestRequested: `${diagnosisInfo?.hepatitisBTest?.dateHbvDnaTestRequested.year}-${diagnosisInfo?.hepatitisBTest?.dateHbvDnaTestRequested.monthValue}-${diagnosisInfo?.hepatitisBTest?.dateHbvDnaTestRequested.dayOfMonth}`,
      dateHbvSampleRequested: `${diagnosisInfo?.hepatitisBTest?.dateHbvSampleRequested.year}-${diagnosisInfo?.hepatitisBTest?.dateHbvSampleRequested.monthValue}-${diagnosisInfo?.hepatitisBTest?.dateHbvSampleRequested.dayOfMonth}`,
      dateHbvTestRequested: `${diagnosisInfo?.hepatitisBTest?.dateHbvTestRequested.year}-${diagnosisInfo?.hepatitisBTest?.dateHbvTestRequested.monthValue}-${diagnosisInfo?.hepatitisBTest?.dateHbvTestRequested.dayOfMonth}`,
      hbeAG: "",
      // attaching missing props
      dateHbvDnaResultReported: "",
      hbsAgQuantification: "",
      hbvDna: "DETECTED",
      hvbDnaValue: "",
      pmtctEligible: "",
      stagingDateOfLiverBiopsy: "",
      treatmentEligible: "",
    },
    hepatitisCTest: {
      commobidities: "",
      hcRnaValue: "",
      hcvRNA: "",
      hepatitisCoinfection: "",
      multipleInfection: "",
    },
  });
  //   console.log(diagnosisInfo?.hepatitisBTest?.dateHbvDnaTestRequested);

  const [errors, setErrors] = useState({});

  // handle input changes
  const handleInputChangeBasic = (e) => {
    setErrors({ ...temp, [e.target.name]: "" });

    setBasicInfo({
      ...basicInfo,
      hepatitisBTest: {
        ...basicInfo.hepatitisBTest,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleInputChangeBasicForHC = (e) => {
    setErrors({ ...temp, [e.target.name]: "" });

    setBasicInfo({
      ...basicInfo,
      hepatitisCTest: {
        ...basicInfo.hepatitisCTest,
        [e.target.name]: e.target.value,
      },
    });
  };
  const handleInputChangeBasicForClinic = (e) => {
    setErrors({ ...temp, [e.target.name]: "" });

    setBasicInfo({
      ...basicInfo,
      clinicalParameters: {
        ...basicInfo.clinicalParameters,
        [e.target.name]: e.target.value,
      },
    });
  };

  // to capture the error
  let temp = { ...errors };
  const validate = () => {
    temp.dateHbvDnaTestRequested = basicInfo.hepatitisBTest
      .dateHbvDnaTestRequested
      ? ""
      : "Date HBV DNA test requested is required ";
    temp.dateHbvTestRequested = basicInfo.hepatitisBTest.dateHbvTestRequested
      ? ""
      : "Date HBV test requested is required";

    temp.dateHbvSampleRequested = basicInfo.hepatitisBTest
      .dateHbvSampleRequested
      ? ""
      : "Date HBV Sample requested is required";

    temp.hvbDnaValue =
      basicInfo.hepatitisBTest.hvbDnaValue &&
      basicInfo.hepatitisBTest.hbvDna === "DETECTED"
        ? ""
        : " Input HBV DNA value is required";

    temp.commobidities = basicInfo.hepatitisCTest.commobidities
      ? ""
      : "Commobiditiesis required";
    temp.multipleInfection = basicInfo.hepatitisCTest.multipleInfection
      ? ""
      : "Multiple Infection required";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x == "");
  };

  const postDataWithToken = async (data) => {
    try {
      const response = await axios.put(
        `${apiUrl}hepatitis/update-hepatitis-diagnosis/${enrollmentUuid}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // Handle the response if needed
      console.log("Post successful:", response.data);
      toast.success("Enrolment submitted successfully");

      setCookie(
        "enrollmentIds",
        {
          enrollmentId: response.data?.enrollmentId,
          enrollmentUuid: response.data?.enrollmentUuid,
        },
        1
      );
      //   setStep(1);
      return response.data;
    } catch (error) {
      // Handle any errors that occurred during the request
      toast.error("Enrolment failed");
      console.error("Error posting data:", error.message);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validating the input
    // window.scrollTo(0, 0);

    console.log(basicInfo);
    // console.log(errors);

    if (validate()) {
      console.log("good to go", basicInfo);
      postDataWithToken(basicInfo, "hepatitis/diagnosis");
    }
  };
  const onSubmitHandler = (values) => {
    window.scrollTo(0, 0);
    const enrollmentIds = getCookie("enrollmentIds");
    const restructuredDiagnosisPayload = {
      enrollmentUuid: enrollmentIds?.enrollmentUuid,
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
        apriScore: values.apriScore,
        fib4: values.fib4,
        prothrombinTimeNR: values.prothrombinTimeNR,
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
    postDataWithToken(restructuredDiagnosisPayload, "hepatitis/diagnosis");
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

  console.log(" userId?.enrollmentUuid", enrollmentUuid);
  useEffect(() => {
    castCookieValueToForm();
    setBasicInfo({
      clinicalParameters: {
        afp: diagnosisInfo?.clinicalParameters?.afp,
        alt: diagnosisInfo?.clinicalParameters?.alt,
        apriScore: diagnosisInfo?.clinicalParameters?.apriScore,
        ascites: diagnosisInfo?.clinicalParameters?.ascites,
        ast: diagnosisInfo?.clinicalParameters?.ast,
        astValue: diagnosisInfo?.clinicalParameters?.astValue,
        childPughScore: diagnosisInfo?.clinicalParameters?.childPughScore,
        creatinine: diagnosisInfo?.clinicalParameters?.creatinine,
        diagnosis_result: diagnosisInfo?.clinicalParameters?.diagnosis_result,
        directBiliribin: diagnosisInfo?.clinicalParameters?.directBiliribin,
        fib4: diagnosisInfo?.clinicalParameters?.fib4,
        fibroscan: diagnosisInfo?.clinicalParameters?.fibroscan,
        gradeOfEncephalopathy:
          diagnosisInfo?.clinicalParameters?.gradeOfEncephalopathy,
        liverBiopsyStage: diagnosisInfo?.clinicalParameters?.liverBiopsyStage,
        prothrombinTimeNR: diagnosisInfo?.clinicalParameters?.prothrombinTimeNR,
        pst: diagnosisInfo?.clinicalParameters?.pst,
        severityOfAscites: diagnosisInfo?.clinicalParameters?.severityOfAscites,
        totalBiliRubin: diagnosisInfo?.clinicalParameters?.totalBiliRubin,
        ultrasoundScan: diagnosisInfo?.clinicalParameters?.ultrasoundScan,
        urea: diagnosisInfo?.clinicalParameters?.urea,
      },
      enrollmentUuid: enrollmentUuid,
      hepatitisBTest: {
        albumin: diagnosisInfo?.hepatitisBTest?.albumin,
        antiHDV: diagnosisInfo?.hepatitisBTest?.antiHDV,
        comment: diagnosisInfo?.hepatitisBTest?.comment,
        ctScan: diagnosisInfo?.hepatitisBTest?.ctScan,
        dateHbvDnaTestRequested: `${
          diagnosisInfo?.hepatitisBTest?.dateHbvDnaTestRequested.year
        }-${
          diagnosisInfo?.hepatitisBTest?.dateHbvDnaTestRequested.monthValue
        }-${
          diagnosisInfo?.hepatitisBTest?.dateHbvDnaTestRequested.dayOfMonth.toString()
            .length > 1
            ? diagnosisInfo?.hepatitisBTest?.dateHbvDnaTestRequested.dayOfMonth
            : "0" +
              diagnosisInfo?.hepatitisBTest?.dateHbvDnaTestRequested.dayOfMonth
        }`,
        dateHbvSampleRequested: `${
          diagnosisInfo?.hepatitisBTest?.dateHbvSampleRequested.year
        }-${diagnosisInfo?.hepatitisBTest?.dateHbvSampleRequested.monthValue}-${
          diagnosisInfo?.hepatitisBTest?.dateHbvSampleRequested.dayOfMonth.toString()
            .length > 1
            ? diagnosisInfo?.hepatitisBTest?.dateHbvSampleRequested.dayOfMonth
            : "0" +
              diagnosisInfo?.hepatitisBTest?.dateHbvSampleRequested.dayOfMonth
        }`,
        dateHbvTestRequested: `${
          diagnosisInfo?.hepatitisBTest?.dateHbvTestRequested.year
        }-${diagnosisInfo?.hepatitisBTest?.dateHbvTestRequested.monthValue}-${
          diagnosisInfo?.hepatitisBTest?.dateHbvTestRequested.dayOfMonth.toString()
            .length > 1
            ? diagnosisInfo?.hepatitisBTest?.dateHbvTestRequested.dayOfMonth
            : "0" +
              diagnosisInfo?.hepatitisBTest?.dateHbvTestRequested.dayOfMonth
        }`,
        hbeAG: diagnosisInfo?.hepatitisBTest?.hbeAG,
        // attaching missing props
        dateHbvDnaResultReported: `${
          diagnosisInfo?.hepatitisBTest?.dateHbvDnaResultReported.year
        }-${
          diagnosisInfo?.hepatitisBTest?.dateHbvDnaResultReported.monthValue
        }-${
          diagnosisInfo?.hepatitisBTest?.dateHbvDnaResultReported.dayOfMonth.toString()
            .length > 1
            ? diagnosisInfo?.hepatitisBTest?.dateHbvDnaResultReported.dayOfMonth
            : "0" +
              diagnosisInfo?.hepatitisBTest?.dateHbvDnaResultReported.dayOfMonth
        }`,
        hbsAgQuantification: diagnosisInfo?.hepatitisBTest?.hbsAgQuantification,
        hbvDna: diagnosisInfo?.hepatitisBTest?.hbvDna,
        hvbDnaValue: diagnosisInfo?.hepatitisBTest?.hvbDnaValue,
        pmtctEligible: diagnosisInfo?.hepatitisBTest?.pmtctEligible,
        stagingDateOfLiverBiopsy: `${
          diagnosisInfo?.hepatitisBTest?.stagingDateOfLiverBiopsy.year
        }-${
          diagnosisInfo?.hepatitisBTest?.stagingDateOfLiverBiopsy.monthValue
        }-${
          diagnosisInfo?.hepatitisBTest?.stagingDateOfLiverBiopsy.dayOfMonth.toString()
            .length > 1
            ? diagnosisInfo?.hepatitisBTest?.stagingDateOfLiverBiopsy.dayOfMonth
            : "0" +
              diagnosisInfo?.hepatitisBTest?.stagingDateOfLiverBiopsy.dayOfMonth
        }`,
        treatmentEligible: diagnosisInfo?.hepatitisBTest?.treatmentEligible,
      },
      hepatitisCTest: {
        commobidities: diagnosisInfo?.hepatitisCTest?.commobidities,
        hcRnaValue: diagnosisInfo?.hepatitisCTest?.hcRnaValue,
        hcvRNA: diagnosisInfo?.hepatitisCTest?.hcvRNA,
        hepatitisCoinfection:
          diagnosisInfo?.hepatitisCTest?.hepatitisCoinfection,
        multipleInfection: diagnosisInfo?.hepatitisCTest?.multipleInfection,
      },
    });
  }, [diagnosisInfo, enrollmentUuid]);

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
            {/* <Form onSubmit={formik.handleSubmit}> */}
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
                              //   value={
                              //     basicInfo.hepatitisBTest.dateHbvDnaTestRequested
                              //   }
                              value={
                                basicInfo.hepatitisBTest.dateHbvDnaTestRequested
                              }
                              onChange={handleInputChangeBasic}
                              // onBlur={formik.handleBlur}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                              disabled={action === "view" ? true : false}
                            />

                            {errors.dateHbvDnaTestRequested !== "" ? (
                              <span className={classes.error}>
                                {errors.dateHbvDnaTestRequested}
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
                              value={
                                basicInfo.hepatitisBTest.dateHbvTestRequested
                              }
                              disabled={action === "view" ? true : false}
                              onChange={handleInputChangeBasic}
                              // onBlur={formik.handleBlur}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />
                            {errors.dateHbvTestRequested !== "" ? (
                              <span className={classes.error}>
                                {errors.dateHbvTestRequested}
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
                              value={
                                basicInfo.hepatitisBTest.dateHbvSampleRequested
                              }
                              onChange={handleInputChangeBasic}
                              disabled={action === "view" ? true : false}
                              // onBlur={formik.handleBlur}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />

                            {errors.dateHbvSampleRequested !== "" ? (
                              <span className={classes.error}>
                                {errors.dateHbvSampleRequested}
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
                              value={
                                basicInfo.hepatitisBTest
                                  .dateHbvDnaResultReported
                              }
                              disabled={action === "view" ? true : false}
                              onChange={handleInputChangeBasic}
                              // onBlur={formik.handleBlur}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />
                            {/* {errors.dateHbvDnaResultReported !== "" ? (
                              <span className={classes.error}>
                                {errors.dateHbvDnaResultReported}
                              </span>
                            ) : (
                              ""
                            )} */}
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
                              disabled={action === "view" ? true : false}
                              value={
                                basicInfo.hepatitisBTest
                                  .stagingDateOfLiverBiopsy
                              }
                              onChange={handleInputChangeBasic}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />
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
                                  disabled={action === "view" ? true : false}
                                  checked={
                                    basicInfo.hepatitisBTest.hbvDna ===
                                    "DETECTED"
                                  }
                                  // onBlur={formik.handleBlur}
                                  onChange={handleInputChangeBasic}
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
                                  disabled={action === "view" ? true : false}
                                  checked={
                                    basicInfo.hepatitisBTest.hbvDna ===
                                    "UNDETECTED"
                                  }
                                  // onBlur={formik.handleBlur}
                                  onChange={handleInputChangeBasic}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                />{" "}
                                Undetected
                              </label>
                              {/* 
                              {errors.stagingDateOfLiverBiopsy !== "" ? (
                                <span className={classes.error}>
                                  {errors.stagingDateOfLiverBiopsy}
                                </span>
                              ) : (
                                ""
                              )} */}
                            </div>
                          </FormGroup>
                        </div>
                        {basicInfo.hepatitisBTest.hbvDna === "DETECTED" && (
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
                                disabled={action === "view" ? true : false}
                                id="hvbDnaValue"
                                value={basicInfo.hepatitisBTest.hvbDnaValue}
                                onChange={handleInputChangeBasic}
                                // onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />
                              {errors.hvbDnaValue !== "" ? (
                                <span className={classes.error}>
                                  {errors.hvbDnaValue}
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
                              disabled={action === "view" ? true : false}
                              id="hbsAgQuantification"
                              value={
                                basicInfo.hepatitisBTest.hbsAgQuantification
                              }
                              onChange={handleInputChangeBasic}
                              // onBlur={formik.handleBlur}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />
                            {/* {errors.hbsAgQuantification !== "" ? (
                              <span className={classes.error}>
                                {errors.hbsAgQuantification}
                              </span>
                            ) : (
                              ""
                            )} */}
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
                              value={basicInfo.hepatitisBTest.ctScan}
                              disabled={action === "view" ? true : false}
                              onChange={handleInputChangeBasic}
                              // onBlur={formik.handleBlur}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />
                            {/* {formik.errors.ctScan ? (
                              <span className={classes.error}>
                                {formik.errors.ctScan}
                              </span>
                            ) : (
                              ""
                            )} */}
                          </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="albumin">Albumin</Label>
                            <input
                              className="form-control"
                              type="text"
                              name="albumin"
                              disabled={action === "view" ? true : false}
                              id="albumin"
                              value={basicInfo.hepatitisBTest.albumin}
                              onChange={handleInputChangeBasic}
                              // onBlur={formik.handleBlur}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />
                            {/* {formik.errors.albumin ? (
                              <span className={classes.error}>
                                {formik.errors.albumin}
                              </span>
                            ) : (
                              ""
                            )} */}
                          </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="hbeAG">HbeAG</Label>
                            <select
                              className="form-control"
                              name="hbeAG"
                              disabled={action === "view" ? true : false}
                              id="hbeAG"
                              onChange={handleInputChangeBasic}
                              value={basicInfo.hepatitisBTest.hbeAG}
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
                            {/* {formik.errors.hbeAG !== "" ? (
                              <span className={classes.error}>
                                {formik.errors.hbeAG}
                              </span>
                            ) : (
                              ""
                            )} */}
                          </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="antiHDV">Anti-HDV</Label>
                            <select
                              className="form-control"
                              name="antiHDV"
                              id="antiHDV"
                              disabled={action === "view" ? true : false}
                              onChange={handleInputChangeBasic}
                              value={basicInfo.hepatitisBTest.antiHDV}
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
                            {/* {formik.errors.antiHDV !== "" ? (
                              <span className={classes.error}>
                                {formik.errors.antiHDV}
                              </span>
                            ) : (
                              ""
                            )} */}
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
                              disabled={action === "view" ? true : false}
                              onChange={handleInputChangeBasic}
                              value={basicInfo.hepatitisBTest.treatmentEligible}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            >
                              <option value={""}>Select</option>
                              <option value={"YES"}>Yes</option>
                              <option value={"NO"}>No</option>
                            </select>
                            {/* {formik.errors.treatmentEligible !== "" ? (
                              <span className={classes.error}>
                                {formik.errors.treatmentEligible}
                              </span>
                            ) : (
                              ""
                            )} */}
                          </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="pmtctEligible">PMTCT Eligible</Label>
                            <select
                              className="form-control"
                              name="pmtctEligible"
                              disabled={action === "view" ? true : false}
                              id="pmtctEligible"
                              onChange={handleInputChangeBasic}
                              value={basicInfo.hepatitisBTest.pmtctEligible}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            >
                              <option value={""}>Select</option>
                              <option value={"YES"}>Yes</option>
                              <option value={"NO"}>No</option>
                            </select>
                            {/* {formik.errors.pmtctEligible !== "" ? (
                              <span className={classes.error}>
                                {formik.errors.pmtctEligible}
                              </span>
                            ) : (
                              ""
                            )} */}
                          </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4-12">
                          <FormGroup>
                            <Label for="comment">Comment</Label>
                            <textarea
                              className="form-control"
                              name="comment"
                              disabled={action === "view" ? true : false}
                              id="comment"
                              onChange={handleInputChangeBasic}
                              value={basicInfo.hepatitisBTest.comment}
                              cols="50"
                              rows="30"
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                                height: "120px",
                              }}
                            />
                            {/* {formik.errors.comment !== "" ? (
                              <span className={classes.error}>
                                {formik.errors.comment}
                              </span>
                            ) : (
                              ""
                            )} */}
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
                              disabled={action === "view" ? true : false}
                              onChange={handleInputChangeBasicForHC}
                              // onBlur={formik.handleBlur}
                              value={basicInfo.hepatitisCTest.hcvRNA}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            >
                              <option value={""}>select</option>
                              <option value={"DETECTED"}>Detected</option>
                              <option value={"UNDETECTED"}>Undetected</option>
                            </select>
                            {/* {formik.errors.hcvRNA !== "" ? (
                              <span className={classes.error}>
                                {formik.errors.hcvRNA}
                              </span>
                            ) : (
                              ""
                            )} */}
                          </FormGroup>
                        </div>
                        {basicInfo.hepatitisCTest.hcvRNA === "DETECTED" && (
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
                                disabled={action === "view" ? true : false}
                                value={basicInfo.hepatitisCTest.hcRnaValue}
                                onChange={handleInputChangeBasicForHC}
                                // onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />
                              {/* {errors.hcRnaValue !== "" ? (
                                <span className={classes.error}>
                                  {errors.hcRnaValue}
                                </span>
                              ) : (
                                ""
                              )} */}
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
                              disabled={action === "view" ? true : false}
                              onChange={handleInputChangeBasicForHC}
                              value={
                                basicInfo.hepatitisCTest.hepatitisCoinfection
                              }
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            >
                              <option value={""}>Select</option>
                              <option value={"HBV_HCV"}>HBV/HCV</option>
                              <option value={"HCV_HIV"}>HCV/HIV</option>
                              <option value={"HBV_HDV"}>HBV/HDV</option>
                              <option value={"HBV_HCD_HIV"}>HBV/HCD/HIV</option>
                            </select>
                            {/* {formik.errors.hepatitisCoinfection !== "" ? (
                              <span className={classes.error}>
                                {formik.errors.hepatitisCoinfection}
                              </span>
                            ) : (
                              ""
                            )} */}
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
                              disabled={action === "view" ? true : false}
                              value={basicInfo.hepatitisCTest.commobidities}
                              onChange={handleInputChangeBasicForHC}
                              // onBlur={formik.handleBlur}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />
                            {errors.commobidities !== "" ? (
                              <span className={classes.error}>
                                {errors.commobidities}
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
                              disabled={action === "view" ? true : false}
                              value={basicInfo.hepatitisCTest.multipleInfection}
                              onChange={handleInputChangeBasicForHC}
                              // onBlur={formik.handleBlur}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />
                            {errors.multipleInfection !== "" ? (
                              <span className={classes.error}>
                                {errors.multipleInfection}
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
                        disabled={action === "view" ? true : false}
                        id="ast"
                        onChange={handleInputChangeBasicForClinic}
                        value={basicInfo.clinicalParameters.ast}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      >
                        <option value={""}>Select</option>
                        <option value={"YES"}>Yes</option>
                        <option value={"NO"}>No</option>
                      </select>
                      {/* {formik.errors.ast !== "" ? (
                        <span className={classes.error}>
                          {formik.errors.ast}
                        </span>
                      ) : (
                        ""
                      )} */}
                    </FormGroup>
                  </div>
                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label for="alt">ALT</Label>
                      <select
                        className="form-control"
                        name="alt"
                        id="alt"
                        disabled={action === "view" ? true : false}
                        onChange={handleInputChangeBasicForClinic}
                        value={basicInfo.clinicalParameters.alt}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      >
                        <option value={""}>Select</option>
                        <option value={"YES"}>Yes</option>
                        <option value={"NO"}>No</option>
                      </select>
                      {/* {formik.errors.alt !== "" ? (
                        <span className={classes.error}>
                          {formik.errors.alt}
                        </span>
                      ) : null} */}
                    </FormGroup>
                  </div>
                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label for="pst">PST</Label>
                      <select
                        className="form-control"
                        name="pst"
                        id="pst"
                        disabled={action === "view" ? true : false}
                        onChange={handleInputChangeBasicForClinic}
                        value={basicInfo.clinicalParameters.pst}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      >
                        <option value={""}>Select</option>
                        <option value={"YES"}>Yes</option>
                        <option value={"NO"}>No</option>
                      </select>
                      {/* {formik.errors.pst !== "" ? (
                        <span className={classes.error}>
                          {formik.errors.pst}
                        </span>
                      ) : null} */}
                    </FormGroup>
                  </div>
                </div>
                <div className="row">
                  {basicInfo.ast === "YES" && (
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
                          disabled={action === "view" ? true : false}
                          id="astValue"
                          value={basicInfo.clinicalParameters.astValue}
                          onChange={handleInputChangeBasicForClinic}
                          // onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
                        {/* {formik.errors.astValue !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.astValue}
                          </span>
                        ) : (
                          ""
                        )} */}
                      </FormGroup>
                    </div>
                  )}
                  {basicInfo.alt === "YES" && (
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
                          disabled={action === "view" ? true : false}
                          id="altValue"
                          value={basicInfo.clinicalParameters.altValue}
                          onChange={handleInputChangeBasicForClinic}
                          // onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
                        {/* {formik.errors.altValue !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.altValue}
                          </span>
                        ) : (
                          ""
                        )} */}
                      </FormGroup>
                    </div>
                  )}
                  {basicInfo.plt === "YES" && (
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
                          disabled={action === "view" ? true : false}
                          id="pstValue"
                          value={basicInfo.clinicalParameters.pstValue}
                          onChange={handleInputChangeBasicForClinic}
                          // onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
                        {/* {formik.errors.pstValue !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.pstValue}
                          </span>
                        ) : (
                          ""
                        )} */}
                      </FormGroup>
                    </div>
                  )}
                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label for="totalBiliRubin">
                        Total Bilirubin <span style={{ color: "red" }}> *</span>{" "}
                      </Label>
                      <input
                        className="form-control"
                        type="text"
                        name="totalBiliRubin"
                        id="totalBiliRubin"
                        disabled={action === "view" ? true : false}
                        value={basicInfo.clinicalParameters.totalBiliRubin}
                        onChange={handleInputChangeBasicForClinic}
                        // onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {/* {formik.errors.totalBiliRubin !== "" ? (
                        <span className={classes.error}>
                          {formik.errors.totalBiliRubin}
                        </span>
                      ) : (
                        ""
                      )} */}
                    </FormGroup>
                  </div>
                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label for="directBiliribin">Direct Bilirubin </Label>
                      <input
                        className="form-control"
                        type="text"
                        name="directBiliribin"
                        disabled={action === "view" ? true : false}
                        id="directBiliribin"
                        value={basicInfo.clinicalParameters.directBiliribin}
                        onChange={handleInputChangeBasicForClinic}
                        // onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {/* {formik.errors.directBiliribin !== "" ? (
                        <span className={classes.error}>
                          {formik.errors.directBiliribin}
                        </span>
                      ) : (
                        ""
                      )} */}
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
                        disabled={action === "view" ? true : false}
                        value={basicInfo.clinicalParameters.apriScore}
                        onChange={handleInputChangeBasicForClinic}
                        // onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {/* {formik.errors.apriScore !== "" ? (
                        <span className={classes.error}>
                          {formik.errors.apriScore}
                        </span>
                      ) : (
                        ""
                      )} */}
                    </FormGroup>
                  </div>
                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label for="fib4">FIB-4</Label>
                      <input
                        className="form-control"
                        type="text"
                        name="fib4"
                        disabled={action === "view" ? true : false}
                        id="fib4"
                        value={basicInfo.clinicalParameters.fib4}
                        onChange={handleInputChangeBasicForClinic}
                        // onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {/* {formik.errors.fib4 !== "" ? (
                        <span className={classes.error}>
                          {formik.errors.fib4}
                        </span>
                      ) : (
                        ""
                      )} */}
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
                        disabled={action === "view" ? true : false}
                        id="prothrombinTimeNR"
                        value={basicInfo.clinicalParameters.prothrombinTimeNR}
                        onChange={handleInputChangeBasicForClinic}
                        // onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {/* {formik.errors.prothrombinTimeNR !== "" ? (
                        <span className={classes.error}>
                          {formik.errors.prothrombinTimeNR}
                        </span>
                      ) : (
                        ""
                      )} */}
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
                        disabled={action === "view" ? true : false}
                        value={basicInfo.clinicalParameters.urea}
                        onChange={handleInputChangeBasicForClinic}
                        // onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {/* {formik.errors.urea !== "" ? (
                        <span className={classes.error}>
                          {formik.errors.urea}
                        </span>
                      ) : (
                        ""
                      )} */}
                    </FormGroup>
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label for="creatinine">Creatinine (μmol/L)</Label>
                      <input
                        className="form-control"
                        type="text"
                        name="creatinine"
                        disabled={action === "view" ? true : false}
                        id="creatinine"
                        value={basicInfo.clinicalParameters.creatinine}
                        onChange={handleInputChangeBasicForClinic}
                        // onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {/* {formik.errors.creatinine !== "" ? (
                        <span className={classes.error}>
                          {formik.errors.creatinine}
                        </span>
                      ) : (
                        ""
                      )} */}
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
                        value={basicInfo.clinicalParameters.afp}
                        onChange={handleInputChangeBasicForClinic}
                        // onBlur={formik.handleBlur}
                        disabled={action === "view" ? true : false}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {/* {formik.errors.afp !== "" ? (
                        <span className={classes.error}>
                          {formik.errors.afp}
                        </span>
                      ) : null} */}
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
                        value={basicInfo.clinicalParameters.fibroscan}
                        disabled={action === "view" ? true : false}
                        onChange={handleInputChangeBasicForClinic}
                        // onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {/* {formik.errors.fibroscan !== "" ? (
                        <span className={classes.error}>
                          {formik.errors.fibroscan}
                        </span>
                      ) : null} */}
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
                        disabled={action === "view" ? true : false}
                        value={basicInfo.clinicalParameters.ultrasoundScan}
                        onChange={handleInputChangeBasicForClinic}
                        // onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {/* {formik.errors.ultrasoundScan !== "" ? (
                        <span className={classes.error}>
                          {formik.errors.ultrasoundScan}
                        </span>
                      ) : (
                        ""
                      )} */}
                    </FormGroup>
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label for="ascites">Ascites</Label>
                      <select
                        className="form-control"
                        name="ascites"
                        id="ascites"
                        onChange={handleInputChangeBasicForClinic}
                        value={basicInfo.clinicalParameters.ascites}
                        disabled={action === "view" ? true : false}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      >
                        <option value={""}>Select</option>
                        <option value={"YES"}>Yes</option>
                        <option value={"NO"}>No</option>
                      </select>
                      {/* {formik.errors.ascites !== "" ? (
                        <span className={classes.error}>
                          {formik.errors.ascites}
                        </span>
                      ) : (
                        ""
                      )} */}
                    </FormGroup>
                  </div>

                  {basicInfo.clinicalParameters.ascites === "YES" && (
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="severityOfAscites">
                          Severity of ascites
                        </Label>
                        <select
                          className="form-control"
                          name="severityOfAscites"
                          disabled={action === "view" ? true : false}
                          id="severityOfAscites"
                          onChange={handleInputChangeBasicForClinic}
                          value={basicInfo.clinicalParameters.severityOfAscites}
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
                        {/* {formik.errors.severityOfAscites !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.severityOfAscites}
                          </span>
                        ) : (
                          ""
                        )} */}
                      </FormGroup>
                    </div>
                  )}

                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label for="ascitesLevel">Grade of Encephalopathy</Label>
                      <select
                        className="form-control"
                        name="gradeOfEncephalopathy"
                        id="gradeOfEncephalopathy"
                        onChange={handleInputChangeBasicForClinic}
                        value={
                          basicInfo.clinicalParameters.gradeOfEncephalopathy
                        }
                        disabled={action === "view" ? true : false}
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
                      {/* {formik.errors.gradeOfEncephalopathy !== "" ? (
                        <span className={classes.error}>
                          {formik.errors.gradeOfEncephalopathy}
                        </span>
                      ) : (
                        ""
                      )} */}
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
                        value={basicInfo.clinicalParameters.childPughScore}
                        onChange={handleInputChangeBasicForClinic}
                        disabled={action === "view" ? true : false}
                        // onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {/* {formik.errors.childPughScore !== "" ? (
                        <span className={classes.error}>
                          {formik.errors.childPughScore}
                        </span>
                      ) : (
                        ""
                      )} */}
                    </FormGroup>
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label for="liverBiopsyStage">Liver biopsy stage</Label>
                      <select
                        className="form-control"
                        name="liverBiopsyStage"
                        id="liverBiopsyStage"
                        onChange={handleInputChangeBasicForClinic}
                        disabled={action === "view" ? true : false}
                        value={basicInfo.clinicalParameters.liverBiopsyStage}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      >
                        <option value={""}>Select</option>
                        <option value={"FIBROSIS"}> Fibrosis</option>
                        <option value={"CIRRHOSIS"}>Cirrhosis</option>
                        <option value={"NO_FIBROSIS"}> No Fibrosis</option>
                        {/* <option value={"CIRRHOSIS"}>Cirrhosis</option> */}
                        <option value={"HIGH_CC"}>High CC </option>
                      </select>
                      {/* {formik.errors.liverBiopsyStage !== "" ? (
                        <span className={classes.error}>
                          {formik.errors.liverBiopsyStage}
                        </span>
                      ) : (
                        ""
                      )} */}
                    </FormGroup>
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label for="diagnosis_result">Diagnosis</Label>
                      <select
                        className="form-control"
                        name="diagnosis_result"
                        id="diagnosis_result"
                        onChange={handleInputChangeBasicForClinic}
                        disabled={action === "view" ? true : false}
                        value={basicInfo.clinicalParameters.diagnosis_result}
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
                      {/* {formik.errors.diagnosis_result !== "" ? (
                        <span className={classes.error}>
                          {formik.errors.diagnosis_result}
                        </span>
                      ) : (
                        ""
                      )} */}
                    </FormGroup>
                  </div>
                </div>
              </div>
            </div>
            {false ? <Spinner /> : ""}
            <br />
            {action === "update" && (
              <div className="d-flex justify-content-end">
                {/* <MatButton
                type="button"
                variant="contained"
                color="primary"
                onClick={moveBack}
                className={classes.button}
                startIcon={<ArrowBackIcon />}
                style={{ backgroundColor: "#014d88", fontWeight: "bolder" }}
              >
                <span style={{ textTransform: "capitalize" }}>Previous</span>
              </MatButton> */}
                <MatButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  endIcon={<ArrowForward />}
                  onClick={handleSubmit}
                  style={{ backgroundColor: "#014d88", fontWeight: "bolder" }}
                >
                  <span style={{ textTransform: "capitalize" }}>Update</span>
                </MatButton>
              </div>
            )}
            {/* </Form> */}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default DiagnosisSubmitedForm;
