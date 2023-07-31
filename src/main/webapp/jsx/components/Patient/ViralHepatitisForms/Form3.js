import React, { useState, useEffect } from "react";
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
import { useValidateForm3ValuesHook } from "../../../formSchemas/form1ValidationSchema";
import { Collapse, IconButton } from "@material-ui/core";
import { ArrowForward, ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getCookie, setCookie } from "../../../helpers/cookieStoragehelpers";
import axios from "axios";
import { url as apiUrl, token } from "../../../../api";
import { toast } from "react-toastify";

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

const postDataWithToken = async (data) => {
  try {
    const response = await axios.post(`${apiUrl}enrollment`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    // Handle the response if needed
    console.log("Post successful:", response.data);
    toast.success("Enrolment submitted successfully");
    return response.data;
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error("Error posting data:", error.message);
    throw error;
  }
};

function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function convertStringBooleanValues(originalObj) {
  const newObj = {};

  for (const key in originalObj) {
    if (originalObj.hasOwnProperty(key)) {
      const value = originalObj[key];
      if (typeof value === 'string') {
        newObj[key] = value.toLowerCase() === 'true'|| value.toLowerCase() === 'yes' ? true : value.toLowerCase() === 'false' || value.toLowerCase() === 'no'? false : value;
      } else {
        newObj[key] = value;
      }
    }
  }

  return newObj;
}
const ViralHepatitisForm3 = ({ setStep }) => {
  const onSubmitHandler = (values) => {
    setCookie("hepatitis3", values, 1);
    const enrolment = getCookie("hepatitis1");
    const diagnosis = getCookie("hepatitis2");
    const treatment = getCookie("hepatitis3");


    const postData = {
      diagnosis: convertStringBooleanValues(diagnosis),
      enrollment: convertStringBooleanValues(enrolment),
      treatment: convertStringBooleanValues(treatment)
    };
    postDataWithToken(postData)
      .then((responseData) => {
        toast.success("Enrolment successful");
        deleteCookie("hepatitis1");
        deleteCookie("hepatitis2");
        deleteCookie("hepatitis3");
        setStep(0);
      })
      .catch((error) => {
        toast.error("enrolment failed")
      });
  };
  const moveBack = () => {
    window.scrollTo(0, 0);
    setStep(1);
  };

  const classes = useStyles();
  const { formik } = useValidateForm3ValuesHook(onSubmitHandler);


  

  const castCookieValueToForm = () => {
    const cookieValue = getCookie("hepatitis3");
    if (cookieValue) {
      // convertStringBooleanValues(cookieValue)
      formik.setValues(cookieValue);
    }
  };

  useEffect(() => {
    castCookieValueToForm();
  }, []);

  const [isDropdownsOpen, setIsDropdownsOpen] = useState({
    hbvTreatmentRegimenSwitch: true,
    hbvTreatmentReasonforTreatment: true,
    hcvTreatmentRegimenSwitch: true,
    hcvTreatmentRegimenHcvRetreatment: true,
    hcvTreatmentSvr12Testing: true,
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
                    Hepatitis B Treatment
                  </h5>
                </div>
                <div>
                  <div className="card-body">
                    <div
                      className="basic-form"
                      style={{ padding: "0 50px 0 50px" }}
                    >
                      <div className="row">
                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="hbvTreatmentExperience">
                              Treatment experience
                              <span style={{ color: "red" }}> *</span>{" "}
                            </Label>
                            <select
                              className="form-control"
                              name="hbvTreatmentExperience"
                              id="hbvTreatmentExperience"
                              value={formik.values.hbvTreatmentExperience}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            >
                              <option>Select</option>
                              <option value={true}>Yes</option>
                              <option value={false}>No</option>
                            </select>
                            {formik.errors.hbvTreatmentExperience !== "" ? (
                              <span className={classes.error}>
                                {formik.errors.hbvTreatmentExperience}
                              </span>
                            ) : (
                              ""
                            )}
                          </FormGroup>
                        </div>

                        {formik.values.hbvTreatmentExperience && (
                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="hbvPastTreatmentRegimen">
                                Past treatment regime
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <input
                                className="form-control"
                                type="text"
                                name="hbvPastTreatmentRegimen"
                                id="hbvPastTreatmentRegimen"
                                value={formik.values.hbvPastTreatmentRegimen}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />
                              {formik.errors.hbvPastTreatmentRegimen !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.hbvPastTreatmentRegimen}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>
                        )}
                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="hbvNewRegimen">New regime</Label>
                            <input
                              className="form-control"
                              type="text"
                              name="hbvNewRegimen"
                              id="hbvNewRegimen"
                              value={formik.values.hbvNewRegimen}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />
                            {formik.errors.hbvNewRegimen !== "" ? (
                              <span className={classes.error}>
                                {formik.errors.hbvNewRegimen}
                              </span>
                            ) : (
                              ""
                            )}
                          </FormGroup>
                        </div>

                        {formik.values.hbvNewRegimen !== "" && (
                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="hbvDateStarted">Date started</Label>
                              <input
                                className="form-control"
                                type="date"
                                name="hbvDateStarted"
                                id="hbvDateStarted"
                                value={formik.values.hbvDateStarted}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />
                              {formik.errors.hbvDateStarted !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.hbvDateStarted}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>
                        )}

                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="hbvHistoryOfAdverseEffect">
                              History of adverse effect
                            </Label>
                            <select
                              className="form-control"
                              name="hbvHistoryOfAdverseEffect"
                              id="hbvHistoryOfAdverseEffect"
                              value={formik.values.hbvHistoryOfAdverseEffect}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            >
                              <option>Select</option>
                              <option value={true}>Yes</option>
                              <option value={false}>No</option>
                            </select>
                            {formik.errors.hbvHistoryOfAdverseEffect !== "" ? (
                              <span className={classes.error}>
                                {formik.errors.hbvHistoryOfAdverseEffect}
                              </span>
                            ) : (
                              ""
                            )}
                          </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="hbvPastTreatmentRegimen">
                              Hbv Past treatment regimen
                            </Label>
                            <input
                              className="form-control"
                              type="text"
                              name="hbvPastTreatmentRegimen"
                              id="hbvPastTreatmentRegimen"
                              value={formik.values.hbvPastTreatmentRegimen}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />

                            {formik.errors.hbvPastTreatmentRegimen !== "" ? (
                              <span className={classes.error}>
                                {formik.errors.hbvPastTreatmentRegimen}
                              </span>
                            ) : (
                              ""
                            )}
                          </FormGroup>
                        </div>
                      </div>
                    </div>
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
                      Regimen Switch
                    </p>
                    <IconButton
                      onClick={() =>
                        setIsDropdownsOpen((prevState) => {
                          return {
                            ...prevState,
                            hbvTreatmentRegimenSwitch:
                              !prevState.hbvTreatmentRegimenSwitch,
                          };
                        })
                      }
                      aria-expanded={isDropdownsOpen.hbvTreatmentRegimenSwitch}
                      aria-label="Expand"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </div>
                  <div className="card-body">
                    <Collapse in={isDropdownsOpen.hbvTreatmentRegimenSwitch}>
                      <div
                        className="basic-form"
                        style={{ padding: "0 50px 0 50px" }}
                      >
                        <div className="row">
                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="hbvRegimeSwitchNewRegimen">
                                New Regimen
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <input
                                className="form-control"
                                type="text"
                                name="hbvRegimeSwitchNewRegimen"
                                id="hbvRegimeSwitchNewRegimen"
                                value={formik.values.hbvRegimeSwitchNewRegimen}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />
                              {formik.errors.hbvRegimeSwitchNewRegimen !==
                              "" ? (
                                <span className={classes.error}>
                                  {formik.errors.hbvRegimeSwitchNewRegimen}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="hbvRegimeSwitchDateStarted">
                                Date Started{" "}
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <input
                                className="form-control"
                                type="date"
                                name="hbvRegimeSwitchDateStarted"
                                id="hbvRegimeSwitchDateStarted"
                                value={formik.values.hbvRegimeSwitchDateStarted}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />
                              {formik.errors.hbvRegimeSwitchDateStarted !==
                              "" ? (
                                <span className={classes.error}>
                                  {formik.errors.hbvRegimeSwitchDateStarted}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="hbvRegimeSwitchHistoryOfAdverseEffect">
                                Adverse effect reported
                              </Label>
                              <select
                                className="form-control"
                                name="hbvRegimeSwitchHistoryOfAdverseEffect"
                                id="hbvRegimeSwitchHistoryOfAdverseEffect"
                                value={
                                  formik.values
                                    .hbvRegimeSwitchHistoryOfAdverseEffect
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option>Select</option>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                              </select>
                              {formik.errors
                                .hbvRegimeSwitchHistoryOfAdverseEffect !==
                              "" ? (
                                <span className={classes.error}>
                                  {
                                    formik.errors
                                      .hbvRegimeSwitchHistoryOfAdverseEffect
                                  }
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="hbvRegimeSwitchReason">
                                Reason for switch
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <input
                                className="form-control"
                                type="text"
                                name="hbvRegimeSwitchReason"
                                id="hbvRegimeSwitchReason"
                                value={formik.values.hbvRegimeSwitchReason}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />
                              {formik.errors.hbvRegimeSwitchReason !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.hbvRegimeSwitchReason}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="hbvRegimeSwitchDateStopped">
                                Date Stopped{" "}
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <input
                                className="form-control"
                                type="date"
                                name="hbvRegimeSwitchDateStopped"
                                id="hbvRegimeSwitchDateStopped"
                                value={formik.values.hbvRegimeSwitchDateStopped}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />
                              {formik.errors.hbvRegimeSwitchDateStopped !==
                              "" ? (
                                <span className={classes.error}>
                                  {formik.errors.hbvRegimeSwitchDateStopped}
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
                      Reason for treatment
                    </p>
                    <IconButton
                      onClick={() =>
                        setIsDropdownsOpen((prevState) => {
                          return {
                            ...prevState,
                            hbvTreatmentReasonforTreatment:
                              !prevState.hbvTreatmentReasonforTreatment,
                          };
                        })
                      }
                      aria-expanded={isDropdownsOpen.hbvTreatmentRegimenSwitch}
                      aria-label="Expand"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </div>
                  <div className="card-body">
                    <Collapse
                      in={isDropdownsOpen.hbvTreatmentReasonforTreatment}
                    >
                      <div
                        className="basic-form"
                        style={{ padding: "0 50px 0 50px" }}
                      >
                        <div className="row">
                          <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                              <Label for="hbvReasonForTreatmentEligibility">
                                Reasons for treatment
                              </Label>
                              <select
                                className="form-control"
                                name="hbvReasonForTreatmentEligibility"
                                id="hbvReasonForTreatmentEligibility"
                                onChange={formik.handleChange}
                                value={
                                  formik.values.hbvReasonForTreatmentEligibility
                                }
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option value={"treatment eligible"}>
                                  Treatment Eligible
                                </option>
                                <option value={"hbv pmtct"}>HBV PMTCT</option>
                              </select>
                              {formik.errors
                                .hbvReasonForTreatmentEligibility !== "" ? (
                                <span className={classes.error}>
                                  {
                                    formik.errors
                                      .hbvReasonForTreatmentEligibility
                                  }
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-6">
                            <FormGroup>
                              <Label for="hbvReasonsForTreatmentComment">
                                Comment
                              </Label>
                              <textarea
                                className="form-control"
                                name="hbvReasonsForTreatmentComment"
                                id="hbvReasonsForTreatmentComment"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={
                                  formik.values.hbvReasonsForTreatmentComment
                                }
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                  height: "80px",
                                }}
                              />

                              {formik.errors.hbvReasonsForTreatmentComment !==
                              "" ? (
                                <span className={classes.error}>
                                  {formik.errors.hbvReasonsForTreatmentComment}
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
                    Hepatitis C Treatment
                  </h5>
                </div>

                <div>
                  <div className="card-body">
                    <div
                      className="basic-form"
                      style={{ padding: "0 50px 0 50px" }}
                    >
                      <div className="row">
                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="hcvTreatmentExperience">
                              Treatment experience
                              <span style={{ color: "red" }}> *</span>{" "}
                            </Label>
                            <select
                              className="form-control"
                              type="date"
                              name="hcvTreatmentExperience"
                              id="hcvTreatmentExperience"
                              value={formik.values.hcvTreatmentExperience}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            >
                              <option>Select</option>
                              <option value={true}>Yes</option>
                              <option value={false}>No</option>
                            </select>
                            {formik.errors.hcvTreatmentExperience !== "" ? (
                              <span className={classes.error}>
                                {formik.errors.hcvTreatmentExperience}
                              </span>
                            ) : (
                              ""
                            )}
                          </FormGroup>
                        </div>

                        {formik.values.hcvTreatmentExperience && (
                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="hcvPastTreatmentExperience">
                                Past treatment experience
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <input
                                className="form-control"
                                type="text"
                                name="hcvPastTreatmentExperience"
                                id="hcvPastTreatmentExperience"
                                value={formik.values.hcvPastTreatmentExperience}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />
                              {formik.errors.hcvPastTreatmentExperience !==
                              "" ? (
                                <span className={classes.error}>
                                  {formik.errors.hcvPastTreatmentExperience}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>
                        )}

                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="hcvDateStarted">Date started</Label>
                            <input
                              className="form-control"
                              type="date"
                              name="hcvDateStarted"
                              id="hcvDateStarted"
                              value={formik.values.hcvDateStarted}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />
                            {formik.errors.hcvDateStarted !== "" ? (
                              <span className={classes.error}>
                                {formik.errors.hcvDateStarted}
                              </span>
                            ) : (
                              ""
                            )}
                          </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="hcvDateCompleted">Date completed</Label>
                            <input
                              className="form-control"
                              type="date"
                              name="hcvDateCompleted"
                              id="hcvDateCompleted"
                              value={formik.values.hcvDateCompleted}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />
                            {formik.errors.hcvDateCompleted !== "" ? (
                              <span className={classes.error}>
                                {formik.errors.hcvDateCompleted}
                              </span>
                            ) : (
                              ""
                            )}
                          </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="hcvPrescribedDuration">
                              Prescribed duration
                            </Label>
                            <select
                              className="form-control"
                              name="hcvPrescribedDuration"
                              id="hcvPrescribedDuration"
                              value={formik.values.hcvPrescribedDuration}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            >
                              <option value="">Select</option>
                              <option value="8 weeks">8 weeks</option>
                              <option value="12 weeks">12 weeks</option>
                              <option value="24 weeks">24 weeks</option>
                            </select>
                            {formik.errors.hcvPrescribedDuration !== "" ? (
                              <span className={classes.error}>
                                {formik.errors.hcvPrescribedDuration}
                              </span>
                            ) : (
                              ""
                            )}
                          </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="hcvAdverseEventReported">
                              Adverse Effect reported
                            </Label>
                            <select
                              className="form-control"
                              name="hcvAdverseEventReported"
                              id="hcvAdverseEventReported"
                              value={formik.values.hcvAdverseEventReported}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            >
                              <option value="">Select</option>
                              <option value="yes">Yes</option>
                              <option value="no">12 weeks</option>
                            </select>
                            {formik.errors.hcvAdverseEventReported !== "" ? (
                              <span className={classes.error}>
                                {formik.errors.hcvAdverseEventReported}
                              </span>
                            ) : (
                              ""
                            )}
                          </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="hcvNewRegimen">HCV new regimen</Label>
                            <select
                              className="form-control"
                              name="hcvNewRegimen"
                              id="hcvNewRegimen"
                              value={formik.values.hcvNewRegimen}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            >
                              <option>Select</option>
                              <option value={true}>Yes</option>
                              <option value={false}>No</option>
                            </select>
                            {formik.errors.hcvNewRegimen !== "" ? (
                              <span className={classes.error}>
                                {formik.errors.hcvNewRegimen}
                              </span>
                            ) : (
                              ""
                            )}
                          </FormGroup>
                        </div>
                      </div>
                    </div>
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
                      Regimen Switch
                    </p>
                    <IconButton
                      onClick={() =>
                        setIsDropdownsOpen((prevState) => {
                          return {
                            ...prevState,
                            hbvTreatmentRegimenSwitch:
                              !prevState.hbvTreatmentRegimenSwitch,
                          };
                        })
                      }
                      aria-expanded={isDropdownsOpen.hbvTreatmentRegimenSwitch}
                      aria-label="Expand"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </div>
                  <div className="card-body">
                    <Collapse in={isDropdownsOpen.hbvTreatmentRegimenSwitch}>
                      <div
                        className="basic-form"
                        style={{ padding: "0 50px 0 50px" }}
                      >
                        <div className="row">
                          {/* <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="hcvRegimeSwitchNewRegimen">
                                New regime
                              </Label>
                              <input
                                className="form-control"
                                type="text"
                                name="hcvRegimeSwitchNewRegimen"
                                id="hcvRegimeSwitchNewRegimen"
                                value={formik.values.hcvRegimeSwitchNewRegimen}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />
                              {formik.errors.hcvRegimeSwitchNewRegimen !==
                              "" ? (
                                <span className={classes.error}>
                                  {formik.errors.hcvRegimeSwitchNewRegimen}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div> */}

                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="hcvRegimeSwitchDateStarted">
                                Date started
                              </Label>
                              <input
                                className="form-control"
                                type="date"
                                name="hcvRegimeSwitchDateStarted"
                                id="hcvRegimeSwitchDateStarted"
                                value={formik.values.hcvRegimeSwitchDateStarted}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />
                              {formik.errors.hcvRegimeSwitchDateStarted !==
                              "" ? (
                                <span className={classes.error}>
                                  {formik.errors.hcvRegimeSwitchDateStarted}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="hcvRegimeSwitchDateStopped">
                                Date stopped
                              </Label>
                              <input
                                className="form-control"
                                type="date"
                                name="hcvRegimeSwitchDateStopped"
                                id="hcvRegimeSwitchDateStopped"
                                value={formik.values.hcvRegimeSwitchDateStopped}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />
                              {formik.errors.hcvRegimeSwitchDateStopped !==
                              "" ? (
                                <span className={classes.error}>
                                  {formik.errors.hcvRegimeSwitchDateStopped}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          {/* <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="hcvRegimeSwitchPrescribedDuration">
                                Prescribed duration
                              </Label>
                              <select
                                className="form-control"
                                name="hcvRegimeSwitchPrescribedDuration"
                                id="hcvRegimeSwitchPrescribedDuration"
                                value={
                                  formik.values
                                    .hcvRegimeSwitchPrescribedDuration
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option value="">Select</option>
                                <option value="8 weeks">8 weeks</option>
                                <option value="12 weeks">12 weeks</option>
                                <option value="24 weeks">24 weeks</option>
                              </select>
                              {formik.errors
                                .hcvRegimeSwitchPrescribedDuration !== "" ? (
                                <span className={classes.error}>
                                  {
                                    formik.errors
                                      .hcvRegimeSwitchPrescribedDuration
                                  }
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div> */}

                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="hcvRegimeSwitchHistoryOfAdverseEffect">
                                Adverse effect
                              </Label>
                              <select
                                className="form-control"
                                type="text"
                                name="hcvRegimeSwitchHistoryOfAdverseEffect"
                                id="hcvRegimeSwitchHistoryOfAdverseEffect"
                                value={
                                  formik.values
                                    .hcvRegimeSwitchHistoryOfAdverseEffect
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                              </select>

                              {formik.errors
                                .hcvRegimeSwitchHistoryOfAdverseEffect !==
                              "" ? (
                                <span className={classes.error}>
                                  {
                                    formik.errors
                                      .hcvRegimeSwitchHistoryOfAdverseEffect
                                  }
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
                      SVR 12 Testing
                    </p>
                    <IconButton
                      onClick={() =>
                        setIsDropdownsOpen((prevState) => {
                          return {
                            ...prevState,
                            hcvTreatmentSvr12Testing:
                              !prevState.hcvTreatmentSvr12Testing,
                          };
                        })
                      }
                      aria-expanded={isDropdownsOpen.hcvTreatmentSvr12Testing}
                      aria-label="Expand"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </div>
                  <div className="card-body">
                    <Collapse in={isDropdownsOpen.hcvTreatmentSvr12Testing}>
                      <div
                        className="basic-form"
                        style={{ padding: "0 50px 0 50px" }}
                      >
                        <div className="row">
                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="svr12TestingDateStarted">
                                Date tested
                              </Label>
                              <input
                                className="form-control"
                                name="svr12TestingDateStarted"
                                id="svr12TestingDateStarted"
                                type="date"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.svr12TestingDateStarted}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />

                              {formik.errors.svr12TestingDateStarted !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.svr12TestingDateStarted}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="svr12TestingHcvRna">
                                HCV RNA <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <select
                                className="form-control"
                                name="svr12TestingHcvRna"
                                id="svr12TestingHcvRna"
                                value={formik.values.svr12TestingHcvRna}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option value="">Select</option>
                                <option value="DETECTED">Detected</option>
                                <option value="UNDETECTED">Undetected</option>
                              </select>
                              {formik.errors.svr12TestingHcvRna !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.svr12TestingHcvRna}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          {formik.values.svr12TestingHcvRna === "DETECTED" && (
                            <div className="form-group mb-3 col-md-4">
                              <FormGroup>
                                <Label for="svr12TestingHcvRnaValue">
                                  Input HCV RNA value
                                </Label>
                                <input
                                  className="form-control"
                                  name="svr12TestingHcvRnaValue"
                                  id="svr12TestingHcvRnaValue"
                                  type="text"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.svr12TestingHcvRnaValue}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                />

                                {formik.errors.svr12TestingHcvRnaValue !==
                                "" ? (
                                  <span className={classes.error}>
                                    {formik.errors.svr12TestingHcvRnaValue}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </FormGroup>
                            </div>
                          )}

                          {/* <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="svr12TestingHcvRnaValue">
                                Input HCV RNA value
                              </Label>
                              <input
                                className="form-control"
                                name="svr12TestingHcvRnaValue"
                                id="svr12TestingHcvRnaValue"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.svr12TestingHcvRnaValue}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />

                              {formik.errors.svr12TestingHcvRnaValue !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.svr12TestingHcvRnaValue}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div> */}

                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="svr12RetreatmentDateTested">
                                Retreatment date tested
                              </Label>
                              <input
                                className="form-control"
                                name="svr12RetreatmentDateTested"
                                id="svr12RetreatmentDateTested"
                                onChange={formik.handleChange}
                                value={formik.values.svr12RetreatmentDateTested}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                                type="date"
                              />

                              {formik.errors.svr12RetreatmentDateTested !==
                              "" ? (
                                <span className={classes.error}>
                                  {formik.errors.svr12RetreatmentDateTested}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="svr12RetreatmentHcvRna">
                                Retreatment HCV RNA(IU/ml)
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <select
                                className="form-control"
                                name="svr12RetreatmentHcvRna"
                                id="svr12RetreatmentHcvRna"
                                value={formik.values.svr12RetreatmentHcvRna}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option value="">Select</option>
                                <option value="DETECTED">Detected</option>
                                <option value="UNDETECTED">Undetected</option>
                              </select>
                              {formik.errors.svr12RetreatmentHcvRna !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.svr12RetreatmentHcvRna}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          {formik.values.svr12RetreatmentHcvRna ===
                            "DETECTED" && (
                            <div className="form-group mb-3 col-md-4">
                              <FormGroup>
                                <Label for="svr12RetreatmentHcvRnaValue">
                                  Input Retreatment HCV RNA value(IU/ml)
                                  <span style={{ color: "red" }}> *</span>{" "}
                                </Label>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="svr12RetreatmentHcvRnaValue"
                                  id="svr12RetreatmentHcvRnaValue"
                                  value={
                                    formik.values.svr12RetreatmentHcvRnaValue
                                  }
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                />

                                {formik.errors.svr12RetreatmentHcvRnaValue !==
                                "" ? (
                                  <span className={classes.error}>
                                    {formik.errors.svr12RetreatmentHcvRnaValue}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </FormGroup>
                            </div>
                          )}
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
                      HCV Retreatment
                    </p>
                    <IconButton
                      onClick={() =>
                        setIsDropdownsOpen((prevState) => {
                          return {
                            ...prevState,
                            hcvTreatmentRegimenHcvRetreatment:
                              !prevState.hcvTreatmentRegimenHcvRetreatment,
                          };
                        })
                      }
                      aria-expanded={
                        isDropdownsOpen.hcvTreatmentRegimenHcvRetreatment
                      }
                      aria-label="Expand"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </div>
                  <div className="card-body">
                    <Collapse
                      in={isDropdownsOpen.hcvTreatmentRegimenHcvRetreatment}
                    >
                      <div
                        className="basic-form"
                        style={{ padding: "0 50px 0 50px" }}
                      >
                        <div className="row">
                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="hcvRetreatmentNewRegime">
                                New regime
                              </Label>
                              <input
                                className="form-control"
                                name="hcvRetreatmentNewRegime"
                                id="hcvRetreatmentNewRegime"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.hcvRetreatmentNewRegime}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />

                              {formik.errors.hcvRetreatmentNewRegime !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.hcvRetreatmentNewRegime}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="hcvRetreatmentPrescribedDuration">
                                Prescribed Duration
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <select
                                className="form-control"
                                name="hcvRetreatmentPrescribedDuration"
                                id="hcvRetreatmentPrescribedDuration"
                                value={
                                  formik.values.hcvRetreatmentPrescribedDuration
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option value="">Select</option>
                                <option value="8 weeks">8 weeks</option>
                                <option value="12 weeks">12 weeks</option>
                                <option value="24 weeks">24 weeks</option>
                              </select>
                              {formik.errors
                                .hcvRetreatmentPrescribedDuration !== "" ? (
                                <span className={classes.error}>
                                  {
                                    formik.errors
                                      .hcvRetreatmentPrescribedDuration
                                  }
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="hcvRetreatmentDateStarted">
                                Date started
                              </Label>
                              <input
                                className="form-control"
                                name="hcvRetreatmentDateStarted"
                                id="hcvRetreatmentDateStarted"
                                type="date"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.hcvRetreatmentDateStarted}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />

                              {formik.errors.hcvRetreatmentDateStarted !==
                              "" ? (
                                <span className={classes.error}>
                                  {formik.errors.hcvRetreatmentDateStarted}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="hcvRetreatmentDateStopped">
                                Date stopped
                              </Label>
                              <input
                                className="form-control"
                                name="hcvRetreatmentDateStopped"
                                id="hcvRetreatmentDateStopped"
                                type="date"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.hcvRetreatmentDateStopped}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />

                              {formik.errors.hcvRetreatmentDateStopped !==
                              "" ? (
                                <span className={classes.error}>
                                  {formik.errors.hcvRetreatmentDateStopped}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="hcvRetreatmentAdverseEffect">
                                Retreatment Adverse effect
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <select
                                className="form-control"
                                name="hcvRetreatmentAdverseEffect"
                                id="hcvRetreatmentAdverseEffect"
                                value={
                                  formik.values.hcvRetreatmentAdverseEffect
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option>Select</option>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                              </select>
                              {formik.errors.hcvRetreatmentAdverseEffect !==
                              "" ? (
                                <span className={classes.error}>
                                  {formik.errors.hcvRetreatmentAdverseEffect}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="hcvHistoryOfAdverseEffect">
                                History of adverse effect
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <select
                                className="form-control"
                                name="hcvHistoryOfAdverseEffect"
                                id="hcvHistoryOfAdverseEffect"
                                value={formik.values.hcvHistoryOfAdverseEffect}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option>Select</option>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                              </select>
                              {formik.errors.hcvHistoryOfAdverseEffect !==
                              "" ? (
                                <span className={classes.error}>
                                  {formik.errors.hcvHistoryOfAdverseEffect}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="hcvRetreatmentHcvGenotype">
                                HCV Genotype
                              </Label>
                              <input
                                className="form-control"
                                name="hcvRetreatmentHcvGenotype"
                                id="hcvRetreatmentHcvGenotype"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.hcvRetreatmentHcvGenotype}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />

                              {formik.errors.hcvRetreatmentHcvGenotype !==
                              "" ? (
                                <span className={classes.error}>
                                  {formik.errors.hcvRetreatmentHcvGenotype}
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
              {false ? <Spinner /> : ""}
              <br />
              <div className="d-flex justify-content-between">
                <MatButton
                  type="button"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<ArrowBackIcon />}
                  onClick={moveBack}
                  style={{ backgroundColor: "#014d88", fontWeight: "bolder" }}
                >
                  <span style={{ textTransform: "capitalize" }}>Previous</span>
                </MatButton>
                <MatButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  // endIcon={<ArrowForward />}
                  style={{ backgroundColor: "#014d88", fontWeight: "bolder" }}
                >
                  <span style={{ textTransform: "capitalize" }}>Submit</span>
                </MatButton>
              </div>
            </Form>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ViralHepatitisForm3;
