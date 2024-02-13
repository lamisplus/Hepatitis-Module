import React, { useEffect, useState } from "react";
import MatButton from "@material-ui/core/Button";
import { FormGroup, Label, Spinner, Input, Form, InputGroup } from "reactstrap";
import moment from "moment";
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

const ViralHepatitisForm2 = ({ setStep }) => {
  const [userId, setUserId] = useState(getCookie("enrollmentIds"));
  console.log(getCookie("enrollmentIds"));
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
    enrollmentUuid: userId?.enrollmentUuid,
    hepatitisBTest: {
      albumin: "",
      antiHDV: "",
      comment: "",
      ctScan: "",
      dateHbvDnaTestRequested: "",
      dateHbvSampleRequested: "",
      dateHbvTestRequested: "",
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
    //   if (e.target.name === "dateHbvTestRequested" && e.target.value !== "") {
    //     setBasicInfo({
    //       ...basicInfo,
    //       hepatitisBTest: {
    //         ...basicInfo.hepatitisBTest,
    //         [e.target.name]: e.target.value,
    //       },
    //     });
    //   }
    //   if (e.target.name === "dateHbvDnaResultReported" && e.target.value !== "") {
    //     setBasicInfo({
    //       ...basicInfo,
    //       hepatitisBTest: {
    //         ...basicInfo.hepatitisBTest,
    //         [e.target.name]: e.target.value,
    //       },
    //     });
    //   }
    //   if (e.target.name === "stagingDateOfLiverBiopsy" && e.target.value !== "") {
    //     setBasicInfo({
    //       ...basicInfo,
    //       hepatitisBTest: {
    //         ...basicInfo.hepatitisBTest,
    //         [e.target.name]: e.target.value,
    //       },
    //     });
    //   }
    //   if (e.target.name === "hbvDna" && e.target.value !== "") {
    //     setBasicInfo({
    //       ...basicInfo,
    //       hepatitisBTest: {
    //         ...basicInfo.hepatitisBTest,
    //         [e.target.name]: e.target.value,
    //       },
    //     });
    //   }
    //   if (e.target.name === "hvbDnaValue" && e.target.value !== "") {
    //     setBasicInfo({
    //       ...basicInfo,
    //       hepatitisBTest: {
    //         ...basicInfo.hepatitisBTest,
    //         [e.target.name]: e.target.value,
    //       },
    //     });
    //   }

    //   if (e.target.name === "hbsAgQuantification" && e.target.value !== "") {
    //     setBasicInfo({
    //       ...basicInfo,
    //       hepatitisBTest: {
    //         ...basicInfo.hepatitisBTest,
    //         [e.target.name]: e.target.value,
    //       },
    //     });
    //   }

    //   if (e.target.name === "hbsAgQuantification" && e.target.value !== "") {
    //     setBasicInfo({
    //       ...basicInfo,
    //       hepatitisBTest: {
    //         ...basicInfo.hepatitisBTest,
    //         [e.target.name]: e.target.value,
    //       },
    //     });
    //   }
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

    temp.dateHbvDnaResultReported = basicInfo.hepatitisBTest
      .dateHbvDnaResultReported
      ? ""
      : "Date of HBV DNA result reported is required";

    temp.hbsAgQuantification = basicInfo.hepatitisBTest.hbsAgQuantification
      ? ""
      : "HBsAG Quantification is required";

    temp.hbeAG = basicInfo.hepatitisBTest.hbeAG ? "" : "HbeAG is required";

    temp.antiHDV = basicInfo.hepatitisBTest.antiHDV
      ? ""
      : "Anti-HDV is required";

    temp.treatmentEligible = basicInfo.hepatitisBTest.treatmentEligible
      ? ""
      : " Treatment Eligible is required";

    temp.pmtctEligible = basicInfo.hepatitisBTest.pmtctEligible
      ? ""
      : " PMTCT Eligible is required";

    // temp.comment = basicInfo.hepatitisBTest.pmtctEligible
    //   ? ""
    //   : " PMTCT Eligible is required";

    temp.ast = basicInfo.hepatitisBTest.pmtctEligible ? "" : " AST is required";
    temp.alt = basicInfo.clinicalParameters.alt ? "" : " ALT is required";
    temp.hcvRNA = basicInfo.hepatitisCTest.hcvRNA ? "" : "HCV RNA is required";
    temp.hepatitisCoinfection = basicInfo.hepatitisCTest.hepatitisCoinfection
      ? ""
      : "Hepatitis Coinfection is required";

    temp.pst = basicInfo.clinicalParameters.pst ? "" : " PST is required";
    temp.totalBiliRubin = basicInfo.clinicalParameters.totalBiliRubin
      ? ""
      : " ALT is required";
    temp.directBiliribin = basicInfo.clinicalParameters.directBiliribin
      ? ""
      : "Direct Bilirubin is required";

    temp.albumin = basicInfo.hepatitisBTest.albumin
      ? ""
      : "Albumin is required";

    temp.apriScore = basicInfo.clinicalParameters.apriScore
      ? ""
      : "APRI score is required";

    temp.fib4 = basicInfo.clinicalParameters.fib4 ? "" : "FIB-4 is required";

    temp.prothrombinTimeNR = basicInfo.clinicalParameters.prothrombinTimeNR
      ? ""
      : "Prothrombin time/INR is required";

    temp.urea = basicInfo.clinicalParameters.urea ? "" : "Urea is required";

    temp.creatinine = basicInfo.clinicalParameters.creatinine
      ? ""
      : "Creatinine is required";

    temp.ultrasoundScan = basicInfo.clinicalParameters.ultrasoundScan
      ? ""
      : "Ultrasound scan is required";

    temp.afp = basicInfo.clinicalParameters.afp ? "" : "AFP  is required";
    temp.fibroscan = basicInfo.clinicalParameters.fibroscan
      ? ""
      : "Fibroscan  is required";

    temp.ctScan = basicInfo.hepatitisBTest.ctScan ? "" : "CT scan  is required";
    temp.ascites = basicInfo.clinicalParameters.ascites
      ? ""
      : "Acites  is required";
    temp.gradeOfEncephalopathy = basicInfo.clinicalParameters
      .gradeOfEncephalopathy
      ? ""
      : "Grade of Encephalopathy  is required";

    temp.childPughScore = basicInfo.clinicalParameters.childPughScore
      ? ""
      : "Child pugh score  is required";

    temp.liverBiopsyStage = basicInfo.clinicalParameters.liverBiopsyStage
      ? ""
      : "Liver biopsy stage  is required";

    temp.stagingDateOfLiverBiopsy = basicInfo.hepatitisBTest
      .stagingDateOfLiverBiopsy
      ? ""
      : "Staging date of liver biopsy is required";

    temp.diagnosis_result = basicInfo.clinicalParameters.diagnosis_result
      ? ""
      : "Diagnosis is required";
    //

    //

    temp.commobidities = basicInfo.hepatitisCTest.commobidities
      ? ""
      : "Commobiditie is required";
    temp.multipleInfection = basicInfo.clinicalParameters.ast
      ? ""
      : "Multiple Infection required";

    // set the temp errors to error
    console.log(temp);
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x == "");
  };

  const postDataWithToken = async (data, key) => {
    try {
      const response = await axios.post(`${apiUrl}${key}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Post successful:", response.data);
      toast.success("Diagnosis submitted successfully");
      setStep(2);
      return response.data;
    } catch (error) {
      toast.error("Diagnosis failed");
      console.error("Error posting data:", error.message);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validating the input
    window.scrollTo(0, 0);

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
  //      disabled={action === "view" ? true : false}
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
                              max={moment(new Date()).format("YYYY-MM-DD")}
                              id="dateHbvDnaTestRequested"
                              value={
                                basicInfo.hepatitisBTest.dateHbvDnaTestRequested
                              }
                              onChange={handleInputChangeBasic}
                              // onBlur={formik.handleBlur}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
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
                              max={moment(new Date()).format("YYYY-MM-DD")}
                              name="dateHbvTestRequested"
                              id="dateHbvTestRequested"
                              value={
                                basicInfo.hepatitisBTest.dateHbvTestRequested
                              }
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
                              max={moment(new Date()).format("YYYY-MM-DD")}
                              id="dateHbvSampleRequested"
                              value={
                                basicInfo.hepatitisBTest.dateHbvSampleRequested
                              }
                              onChange={handleInputChangeBasic}
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
                              <span style={{ color: "red" }}> *</span>{" "}
                            </Label>
                            <input
                              className="form-control"
                              type="date"
                              name="dateHbvDnaResultReported"
                              max={moment(new Date()).format("YYYY-MM-DD")}
                              id="dateHbvDnaResultReported"
                              value={
                                basicInfo.hepatitisBTest
                                  .dateHbvDnaResultReported
                              }
                              onChange={handleInputChangeBasic}
                              // onBlur={formik.handleBlur}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />
                            {errors.dateHbvDnaResultReported !== "" ? (
                              <span className={classes.error}>
                                {errors.dateHbvDnaResultReported}
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
                                Undetected{" "}
                                <span style={{ color: "red" }}> *</span>{" "}
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
                              HBsAG Quantification (IU/ml){" "}
                              <span style={{ color: "red" }}> *</span>{" "}
                            </Label>
                            <input
                              className="form-control"
                              type="text"
                              name="hbsAgQuantification"
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
                            {errors.hbsAgQuantification !== "" ? (
                              <span className={classes.error}>
                                {errors.hbsAgQuantification}
                              </span>
                            ) : (
                              ""
                            )}
                          </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="hbeAG">HbeAG</Label>{" "}
                            <span style={{ color: "red" }}> *</span>{" "}
                            <select
                              className="form-control"
                              name="hbeAG"
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
                            {errors.hbeAG !== "" ? (
                              <span className={classes.error}>
                                {errors.hbeAG}
                              </span>
                            ) : (
                              ""
                            )}
                          </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="antiHDV">Anti-HDV</Label>
                            <span style={{ color: "red" }}> *</span>{" "}
                            <select
                              className="form-control"
                              name="antiHDV"
                              id="antiHDV"
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
                            {errors.antiHDV !== "" ? (
                              <span className={classes.error}>
                                {errors.antiHDV}
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
                            <span style={{ color: "red" }}> *</span>{" "}
                            <select
                              className="form-control"
                              name="treatmentEligible"
                              id="treatmentEligible"
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
                            {errors.treatmentEligible !== "" ? (
                              <span className={classes.error}>
                                {errors.treatmentEligible}
                              </span>
                            ) : (
                              ""
                            )}
                          </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="pmtctEligible">PMTCT Eligible</Label>
                            <span style={{ color: "red" }}> *</span>{" "}
                            <select
                              className="form-control"
                              name="pmtctEligible"
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
                            {errors.pmtctEligible !== "" ? (
                              <span className={classes.error}>
                                {errors.pmtctEligible}
                              </span>
                            ) : (
                              ""
                            )}
                          </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4-12">
                          <FormGroup>
                            <Label for="comment">Comment</Label>
                            {/* <span style={{ color: "red" }}> *</span>{" "} */}
                            <textarea
                              className="form-control"
                              name="comment"
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
                            {/* {errors.comment !== "" ? (
                              <span className={classes.error}>
                                {errors.comment}
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
                            <span style={{ color: "red" }}> *</span>{" "}
                            <select
                              className="form-control"
                              name="hcvRNA"
                              id="hcvRNA"
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
                            {errors.hcvRNA !== "" ? (
                              <span className={classes.error}>
                                {errors.hcvRNA}
                              </span>
                            ) : (
                              ""
                            )}
                          </FormGroup>
                        </div>
                        {basicInfo.hepatitisCTest.hcvRNA === "DETECTED" && (
                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="hcRnaValue">
                                Input HCV RNA Value{" "}
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <span style={{ color: "red" }}> *</span>{" "}
                              <input
                                className="form-control"
                                type="text"
                                name="hcRnaValue"
                                id="hcRnaValue"
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
                            <span style={{ color: "red" }}> *</span>{" "}
                            <select
                              className="form-control"
                              name="hepatitisCoinfection"
                              id="hepatitisCoinfection"
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
                            {errors.hepatitisCoinfection !== "" ? (
                              <span className={classes.error}>
                                {errors.hepatitisCoinfection}
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
                      <Label for="ast">AST (IU/ml)</Label>
                      <span style={{ color: "red" }}> *</span>{" "}
                      <select
                        className="form-control"
                        name="ast"
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
                      {errors.ast !== "" ? (
                        <span className={classes.error}>{errors.ast}</span>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                  </div>
                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label for="alt">ALT (IU/ml)</Label>
                      <span style={{ color: "red" }}> *</span>{" "}
                      <select
                        className="form-control"
                        name="alt"
                        id="alt"
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
                      {errors.alt !== "" ? (
                        <span className={classes.error}>{errors.alt}</span>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                  </div>
                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label for="pst">PST (mm3)</Label>
                      <span style={{ color: "red" }}> *</span>{" "}
                      <select
                        className="form-control"
                        name="pst"
                        id="pst"
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
                      {errors.pst !== "" ? (
                        <span className={classes.error}>{errors.pst}</span>
                      ) : (
                        ""
                      )}
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
                          id="astValue"
                          value={basicInfo.clinicalParameters.astValue}
                          onChange={handleInputChangeBasicForClinic}
                          // onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
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
                          id="altValue"
                          value={basicInfo.clinicalParameters.altValue}
                          onChange={handleInputChangeBasicForClinic}
                          // onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
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
                          id="pstValue"
                          value={basicInfo.clinicalParameters.pstValue}
                          onChange={handleInputChangeBasicForClinic}
                          // onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
                      </FormGroup>
                    </div>
                  )}
                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label for="totalBiliRubin">
                        Total Bilirubin (μmol/L){" "}
                        <span style={{ color: "red" }}> *</span>{" "}
                      </Label>
                      <input
                        className="form-control"
                        type="text"
                        name="totalBiliRubin"
                        id="totalBiliRubin"
                        value={basicInfo.clinicalParameters.totalBiliRubin}
                        onChange={handleInputChangeBasicForClinic}
                        // onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {errors.totalBiliRubin !== "" ? (
                        <span className={classes.error}>
                          {errors.totalBiliRubin}
                        </span>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                  </div>
                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label for="directBiliribin">
                        Direct Bilirubin (μmol/L)
                      </Label>
                      <span style={{ color: "red" }}> *</span>{" "}
                      <input
                        className="form-control"
                        type="text"
                        name="directBiliribin"
                        id="directBiliribin"
                        value={basicInfo.clinicalParameters.directBiliribin}
                        onChange={handleInputChangeBasicForClinic}
                        // onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {errors.directBiliribin !== "" ? (
                        <span className={classes.error}>
                          {errors.directBiliribin}
                        </span>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                  </div>
                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label for="albumin">Albumin (g/dl)</Label>
                      <span style={{ color: "red" }}> *</span>{" "}
                      <input
                        className="form-control"
                        type="text"
                        name="albumin"
                        id="albumin"
                        value={basicInfo.hepatitisBTest.albumin}
                        onChange={handleInputChangeBasic}
                        // onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {errors.albumin !== "" ? (
                        <span className={classes.error}>{errors.albumin}</span>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label for="apriScore">APRI score </Label>
                      <span style={{ color: "red" }}> *</span>{" "}
                      <input
                        className="form-control"
                        type="text"
                        name="apriScore"
                        id="apriScore"
                        value={basicInfo.clinicalParameters.apriScore}
                        onChange={handleInputChangeBasicForClinic}
                        // onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {errors.apriScore !== "" ? (
                        <span className={classes.error}>
                          {errors.apriScore}
                        </span>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                  </div>
                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label for="fib4">FIB-4</Label>
                      <span style={{ color: "red" }}> *</span>{" "}
                      <input
                        className="form-control"
                        type="text"
                        name="fib4"
                        id="fib4"
                        value={basicInfo.clinicalParameters.fib4}
                        onChange={handleInputChangeBasicForClinic}
                        // onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {errors.fib4 !== "" ? (
                        <span className={classes.error}>{errors.fib4}</span>
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
                      <span style={{ color: "red" }}> *</span>{" "}
                      <input
                        className="form-control"
                        type="text"
                        name="prothrombinTimeNR"
                        id="prothrombinTimeNR"
                        value={basicInfo.clinicalParameters.prothrombinTimeNR}
                        onChange={handleInputChangeBasicForClinic}
                        // onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {errors.prothrombinTimeNR !== "" ? (
                        <span className={classes.error}>
                          {errors.prothrombinTimeNR}
                        </span>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                  </div>
                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label for="urea">Urea (mg/dl)</Label>
                      <span style={{ color: "red" }}> *</span>{" "}
                      <input
                        className="form-control"
                        type="text"
                        name="urea"
                        id="urea"
                        value={basicInfo.clinicalParameters.urea}
                        onChange={handleInputChangeBasicForClinic}
                        // onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {errors.urea !== "" ? (
                        <span className={classes.error}>{errors.urea}</span>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label for="creatinine">Creatinine (μmol/L)</Label>
                      <span style={{ color: "red" }}> *</span>{" "}
                      <input
                        className="form-control"
                        type="text"
                        name="creatinine"
                        id="creatinine"
                        value={basicInfo.clinicalParameters.creatinine}
                        onChange={handleInputChangeBasicForClinic}
                        // onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {errors.creatinine !== "" ? (
                        <span className={classes.error}>
                          {errors.creatinine}
                        </span>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label for="ultrasoundScan">
                        Ultrasound scan (μmol/L)
                      </Label>
                      <span style={{ color: "red" }}> *</span>{" "}
                      <input
                        className="form-control"
                        type="text"
                        name="ultrasoundScan"
                        id="ultrasoundScan"
                        value={basicInfo.clinicalParameters.ultrasoundScan}
                        onChange={handleInputChangeBasicForClinic}
                        // onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {errors.ultrasoundScan !== "" ? (
                        <span className={classes.error}>
                          {errors.ultrasoundScan}
                        </span>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label for="creatinine">AFP (ng/ml)</Label>
                      <span style={{ color: "red" }}> *</span>{" "}
                      <input
                        className="form-control"
                        type="text"
                        name="afp"
                        id="afp"
                        value={basicInfo.clinicalParameters.afp}
                        onChange={handleInputChangeBasicForClinic}
                        // onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {errors.afp !== "" ? (
                        <span className={classes.error}>{errors.afp}</span>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label for="fibroscan">Fibroscan (ng/ml)</Label>
                      <span style={{ color: "red" }}> *</span>{" "}
                      <input
                        className="form-control"
                        type="text"
                        name="fibroscan"
                        id="fibroscan"
                        value={basicInfo.clinicalParameters.fibroscan}
                        onChange={handleInputChangeBasicForClinic}
                        // onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {errors.fibroscan !== "" ? (
                        <span className={classes.error}>
                          {errors.fibroscan}
                        </span>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                  </div>
                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label for="ctScan">CT scan</Label>
                      <span style={{ color: "red" }}> *</span>{" "}
                      <input
                        className="form-control"
                        type="text"
                        name="ctScan"
                        id="ctScan"
                        value={basicInfo.hepatitisBTest.ctScan}
                        onChange={handleInputChangeBasic}
                        // onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {errors.ctScan !== "" ? (
                        <span className={classes.error}>{errors.ctScan}</span>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label for="ascites">Acites</Label>
                      <span style={{ color: "red" }}> *</span>{" "}
                      <select
                        className="form-control"
                        name="ascites"
                        id="ascites"
                        onChange={handleInputChangeBasicForClinic}
                        value={basicInfo.clinicalParameters.ascites}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      >
                        <option value={""}>Select</option>
                        <option value={"YES"}>Yes</option>
                        <option value={"NO"}>No</option>
                      </select>
                      {errors.ascites !== "" ? (
                        <span className={classes.error}>{errors.ascites}</span>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                  </div>

                  {basicInfo.clinicalParameters.ascites === "YES" && (
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="severityOfAscites">
                          Severity of ascites
                        </Label>
                        <span style={{ color: "red" }}> *</span>{" "}
                        <select
                          className="form-control"
                          name="severityOfAscites"
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
                        {/* {errors.fib4 !== "" ? (
                          <span className={classes.error}>{errors.fib4}</span>
                        ) : (
                          ""
                        )} */}
                      </FormGroup>
                    </div>
                  )}

                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label for="ascitesLevel">Grade of Encephalopathy</Label>
                      <span style={{ color: "red" }}> *</span>{" "}
                      <select
                        className="form-control"
                        name="gradeOfEncephalopathy"
                        id="gradeOfEncephalopathy"
                        onChange={handleInputChangeBasicForClinic}
                        value={
                          basicInfo.clinicalParameters.gradeOfEncephalopathy
                        }
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
                      {errors.gradeOfEncephalopathy !== "" ? (
                        <span className={classes.error}>
                          {errors.gradeOfEncephalopathy}
                        </span>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label for="childPughScore">Child pugh score</Label>
                      <span style={{ color: "red" }}> *</span>{" "}
                      <input
                        className="form-control"
                        type="text"
                        name="childPughScore"
                        id="childPughScore"
                        value={basicInfo.clinicalParameters.childPughScore}
                        onChange={handleInputChangeBasicForClinic}
                        // onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {errors.childPughScore !== "" ? (
                        <span className={classes.error}>
                          {errors.childPughScore}
                        </span>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label for="liverBiopsyStage">Liver biopsy stage</Label>
                      <span style={{ color: "red" }}> *</span>{" "}
                      <select
                        className="form-control"
                        name="liverBiopsyStage"
                        id="liverBiopsyStage"
                        onChange={handleInputChangeBasicForClinic}
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
                      {errors.liverBiopsyStage !== "" ? (
                        <span className={classes.error}>
                          {errors.liverBiopsyStage}
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
                      <span style={{ color: "red" }}> *</span>{" "}
                      <input
                        className="form-control"
                        type="date"
                        name="stagingDateOfLiverBiopsy"
                        max={moment(new Date()).format("YYYY-MM-DD")}
                        id="stagingDateOfLiverBiopsy"
                        value={
                          basicInfo.hepatitisBTest.stagingDateOfLiverBiopsy
                        }
                        onChange={handleInputChangeBasic}
                        // onBlur={formik.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                      {errors.stagingDateOfLiverBiopsy !== "" ? (
                        <span className={classes.error}>
                          {errors.stagingDateOfLiverBiopsy}
                        </span>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                  </div>

                  <div className="form-group mb-3 col-md-4">
                    <FormGroup>
                      <Label for="diagnosis_result">Diagnosis</Label>
                      <span style={{ color: "red" }}> *</span>{" "}
                      <select
                        className="form-control"
                        name="diagnosis_result"
                        id="diagnosis_result"
                        onChange={handleInputChangeBasicForClinic}
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
                      {errors.diagnosis_result !== "" ? (
                        <span className={classes.error}>
                          {errors.diagnosis_result}
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
                onClick={handleSubmit}
                style={{ backgroundColor: "#014d88", fontWeight: "bolder" }}
              >
                <span style={{ textTransform: "capitalize" }}>Next</span>
              </MatButton>
            </div>
            {/* </Form> */}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ViralHepatitisForm2;
