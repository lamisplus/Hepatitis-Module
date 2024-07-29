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
import { useValidateFollowupFormValuesHook } from "../../../formSchemas/followupFormValidation";
import moment from "moment";
import { useQuery } from "react-query";
import { FETCH_ENROLMENT_KEY } from "../../../utils/queryKeys";
import { fetchEnrolment } from "../../../services/fetchEnrolment";
import { useSaveFollowup } from "../../../hooks/useSaveFollowup";
import axios from "axios";
import { url as baseUrl, token } from "../../../../api";
import { fetchHBsAG } from "./Form2";

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
    marginTop: "10px",
  },
  success: {
    color: "#4BB543 ",
    fontSize: "11px",
  },
}));

const FollowupCreate = (props) => {
  const classes = useStyles();
  const [enrolmentData, setEnrolmentData] = useState(null);
  const [childPughData, setChildPughData] = useState([]);
  const [hbsagResult, setHbsagResult] = useState(null);
  const fetchChildPughScore = async () => {
    const response = await axios.get(
      `${baseUrl}application-codesets/v2/CHILD_PUGH`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = response.data;
    setChildPughData(data);
  };

  const onSubmit = (values) => {
    const {
      fuGenotype,
      fuTreatmentRegimen,
      fuNextAppointment,
      fuClinicalName,
      fuRemark,
      fuAlt,
      fuAst,
      fuPlt,
      fuTotalBilirubin,
      fuDirectBilirubin,
      fuAlbumin,
      fuApriScore,
      fuFib4,
      fuProthrombinTime,
      fuUrea,
      fuCreatinine,
      fuUltrasoundScan,
      fuAfp,
      fuFibroscan,
      fuCtScan,
      fuAscites,
      fuSeverityOfAscites,
      fuGradeOfEncephalopathy,
      fuChildPughScore,
      fuLiverBiopsyStage,
      fuStagingDateLiverBiopsy,
      fuDiagnosis,
      fuDateOfVisit,
      fuWeight,
      fuHeight,
      fuBmi,
      fuBloodPressure,
      fuHbsagQuantification,
      fuHbeag,
      fuHbvDna,
      fuOutcome,
      fuHbvDnaStatus,
      fuHbsag,
    } = values;
    const formattedData = {
      enrollmentUuid: enrolmentData?.uuid,
      followupAppointment: {
        fuTreatmentRegimen,
        fuNextAppointment,
        fuClinicalName,
        fuRemark,
        fuOutcome,
      },
      followupPreliminary: {
        fuDateOfVisit,
        fuWeight,
        fuHeight,
        fuBmi,
        fuBloodPressure,
        fuHbsagQuantification,
        fuHbeag,
        fuHbvDna,
        fuHbvDnaStatus,
        fuHbsag,
        fuOutcome,
      },
      followupClinicalParameters: {
        fuAlt,
        fuAst,
        fuPlt,
        fuTotalBilirubin,
        fuDirectBilirubin,
        fuAlbumin,
        fuApriScore,
        fuFib4,
        fuProthrombinTime,
        fuUrea,
        fuCreatinine,
        fuUltrasoundScan,
        fuAfp,
        fuFibroscan,
        fuCtScan,
        fuAscites,
        fuSeverityOfAscites,
        fuGradeOfEncephalopathy,
        fuChildPughScore,
        fuLiverBiopsyStage,
        fuStagingDateLiverBiopsy,
        fuDiagnosis,
        fuOutcome,
      },
    };
    mutate(formattedData);
  };
  const { formik } = useValidateFollowupFormValuesHook(onSubmit, "create");
  const clientDateOfBirth =
    props?.patientObj?.dateOfBirth || props?.patientObj?.dob;

  useQuery(
    [FETCH_ENROLMENT_KEY, props?.patientObj?.personUuid],
    () => fetchEnrolment(props?.patientObj?.personUuid),
    {
      onSuccess: (data) => {
        setEnrolmentData(data);
      },
    }
  );

  const { mutate, isLoading } = useSaveFollowup(formik, props);
  const actionType = props?.activeContent?.actionType || "create";

  useEffect(() => {
    fetchHBsAG().then(({ data }) => {
      setHbsagResult(data);
    });
    fetchChildPughScore();
  }, []);

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <div className="col-xl-12 col-lg-12">
            <form onSubmit={formik.handleSubmit}>
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
                    Preliminary {`(${actionType})`}
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
                            <Label for="fuHbeag">HCV Genotype</Label>
                            <Input
                              className="form-control"
                              type="number"
                              name="fuHbeag"
                              id="fuHbeag"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik?.values?.fuGenotype}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />
                            {formik.touched?.fuGenotype &&
                              formik?.errors?.fuGenotype !== "" && (
                                <span className={classes.error}>
                                  {formik?.errors?.fuGenotype}
                                </span>
                              )}
                          </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="fuDateOfVisit">Date of Visit</Label>
                            <span style={{ color: "red" }}> *</span>{" "}
                            <Input
                              className="form-control"
                              type="date"
                              name="fuDateOfVisit"
                              id="fuDateOfVisit"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik?.values?.fuDateOfVisit}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                              {...{
                                max: moment(new Date()).format("YYYY-MM-DD"),
                              }}
                              {...{
                                min: moment(new Date(clientDateOfBirth)).format(
                                  "YYYY-MM-DD"
                                ),
                              }}
                            />
                            {formik.touched?.fuDateOfVisit &&
                              formik?.errors?.fuDateOfVisit !== "" && (
                                <span className={classes.error}>
                                  {formik?.errors?.fuDateOfVisit}
                                </span>
                              )}
                          </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="fuWeight">Weight</Label>
                            {/* <span style={{ color: "red" }}> *</span>{" "} */}
                            <Input
                              className="form-control"
                              type="number"
                              name="fuWeight"
                              id="fuWeight"
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik?.values?.fuWeight}
                            />

                            {formik.touched?.fuWeight &&
                              formik?.errors?.fuWeight !== "" && (
                                <span className={classes.error}>
                                  {formik?.errors?.fuWeight}
                                </span>
                              )}
                          </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="fuHeight">Height</Label>

                            <Input
                              className="form-control"
                              type="number"
                              name="fuHeight"
                              id="fuHeight"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik?.values?.fuHeight}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />

                            {formik.touched?.fuHeight &&
                              formik?.errors?.fuHeight !== "" && (
                                <span className={classes.error}>
                                  {formik?.errors?.fuHeight}
                                </span>
                              )}
                          </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="fuBmi">BMI</Label>
                            <Input
                              className="form-control"
                              type="number"
                              name="fuBmi"
                              id="fuBmi"
                              value={Math.round(
                                Number(formik?.values?.fuHeight) /
                                  Math.pow(
                                    Number(formik?.values?.fuHeight) / 100,
                                    2
                                  )
                              )}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                              disabled
                            />

                            {formik.touched?.fuBmi &&
                              formik?.errors?.fuBmi !== "" && (
                                <span className={classes.error}>
                                  {formik?.errors?.fuBmi}
                                </span>
                              )}
                          </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="fuBloodPressure">
                              Blood Pressure (mmHg)
                            </Label>

                            <Input
                              className="form-control"
                              type="number"
                              name="fuBloodPressure"
                              id="fuBloodPressure"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik?.values?.fuBloodPressure}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />

                            {formik.touched?.fuBloodPressure &&
                              formik?.errors?.fuBloodPressure !== "" && (
                                <span className={classes.error}>
                                  {formik?.errors?.fuBloodPressure}
                                </span>
                              )}
                          </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="fuHbsag">HBsAg</Label>
                            {/* <span style={{ color: "red" }}> *</span>{" "} */}
                            <select
                              className="form-control"
                              name="fuHbsag"
                              id="fuHbsag"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik?.values?.fuHbsag}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            >
                              <option value="">Select</option>
                              {hbsagResult?.map?.(({ display }) => (
                                <option key={display} value={display}>
                                  {display}
                                </option>
                              ))}
                            </select>
                            {formik.touched?.fuHbsag &&
                              formik?.errors?.fuHbsag !== "" && (
                                <span className={classes.error}>
                                  {formik?.errors?.fuHbsag}
                                </span>
                              )}
                          </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="fuHbsagQuantification">
                              HBsAg quantification
                            </Label>
                            <Input
                              className="form-control"
                              type="number"
                              name="fuHbsagQuantification"
                              id="fuHbsagQuantification"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik?.values?.fuHbsagQuantification}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />
                            {formik.touched?.fuHbsagQuantification &&
                              formik?.errors?.fuHbsagQuantification !== "" && (
                                <span className={classes.error}>
                                  {formik?.errors?.fuHbsagQuantification}
                                </span>
                              )}
                          </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="fuHbeag">HBeAg</Label>
                            {/* <span style={{ color: "red" }}> *</span>{" "} */}
                            <select
                              className="form-control"
                              name="fuHbeag"
                              id="fuHbeag"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik?.values?.fuHbeag}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            >
                              <option value="">Select</option>
                              {hbsagResult?.map(({ display }) => (
                                <option key={display} value={display}>
                                  {display}
                                </option>
                              ))}
                            </select>

                            {formik.touched?.fuHbeag &&
                              formik?.errors?.fuHbeag && (
                                <span className={classes.error}>
                                  {formik?.errors?.fuHbeag}
                                </span>
                              )}
                          </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="fuHbvDna">HBV DNA (IU/ml)</Label>
                            {/* <span style={{ color: "red" }}> *</span>{" "} */}
                            <Input
                              className="form-control"
                              type="number"
                              name="fuHbvDna"
                              id="fuHbvDna"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik?.values?.fuHbvDna}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />

                            {formik.touched?.fuHbvDna &&
                              formik?.errors?.fuHbvDna && (
                                <span className={classes.error}>
                                  {formik?.errors?.fuHbvDna}
                                </span>
                              )}
                          </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="fuHbvDnaStatus">HBV DNA Status</Label>
                            {/* <span style={{ color: "red" }}> *</span>{" "} */}
                            <select
                              className="form-control"
                              name="fuHbvDnaStatus"
                              id="fuHbvDnaStatus"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik?.values?.fuHbvDnaStatus}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            >
                              <option value="">Select</option>
                              <option value={"UNDETECTED"}>UNDETECTED</option>
                              <option value={"SUPPRESSED"}>SUPPRESSED</option>
                              <option value={"NOT SUPPRESSED"}>
                                NOT SUPPRESSED
                              </option>
                              <option value={"NOT DONE"}>NOT DONE</option>
                            </select>

                            {formik.touched?.fuHbvDnaStatus &&
                              formik?.errors?.fuHbvDnaStatus && (
                                <span className={classes.error}>
                                  {formik?.errors?.fuHbvDnaStatus}
                                </span>
                              )}
                          </FormGroup>
                        </div>
                      </div>
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
                    Ancillary testing/Clinical parameters
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
                            <Label for="fuAlt">ALT (IU/mL)</Label>
                            {/* <span style={{ color: "red" }}> *</span>{" "} */}
                            <Input
                              className="form-control"
                              type="number"
                              name="fuAlt"
                              id="fuAlt"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik?.values?.fuAlt}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />
                            {formik.touched?.fuAlt && formik?.errors?.fuAlt && (
                              <span className={classes.error}>
                                {formik?.errors?.fuAlt}
                              </span>
                            )}
                          </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="fuAst">AST (IU/mL)</Label>
                            {/* <span style={{ color: "red" }}> *</span>{" "} */}
                            <Input
                              className="form-control"
                              type="number"
                              name="fuAst"
                              id="fuAst"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik?.values?.fuAst}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />
                            {formik.touched?.fuAst && formik?.errors?.fuAst && (
                              <span className={classes.error}>
                                {formik?.errors?.fuAst}
                              </span>
                            )}
                          </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="fuPlt">
                              Platelet (mm<sup>3</sup>)
                            </Label>
                            <Input
                              className="form-control"
                              type="number"
                              name="fuPlt"
                              id="fuPlt"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik?.values?.fuPlt}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />

                            {formik.touched?.fuPlt &&
                              formik?.errors?.fuPlt !== "" && (
                                <span className={classes.error}>
                                  {formik?.errors?.fuPlt}
                                </span>
                              )}
                          </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="fuTotalBilirubin">
                              Total Bilirubin (µmol/L)
                            </Label>
                            {/* <span style={{ color: "red" }}> *</span>{" "} */}
                            <Input
                              className="form-control"
                              type="number"
                              name="fuTotalBilirubin"
                              id="fuTotalBilirubin"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik?.values?.fuTotalBilirubin}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />

                            {formik.touched?.fuTotalBilirubin &&
                              formik?.errors?.fuTotalBilirubin !== "" && (
                                <span className={classes.error}>
                                  {formik?.errors?.fuTotalBilirubin}
                                </span>
                              )}
                          </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="fuDirectBilirubin">
                              Direct Bilirubin (mm<sup>3</sup>)
                            </Label>
                            {/* <span style={{ color: "red" }}> *</span>{" "} */}
                            <Input
                              className="form-control"
                              type="number"
                              name="fuDirectBilirubin"
                              id="fuDirectBilirubin"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik?.values?.fuDirectBilirubin}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />

                            {formik.touched?.fuDirectBilirubin &&
                              formik?.errors?.fuDirectBilirubin !== "" && (
                                <span className={classes.error}>
                                  {formik?.errors?.fuDirectBilirubin}
                                </span>
                              )}
                          </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="fuAlbumin">Albumin (g/dl)</Label>
                            {/* <span style={{ color: "red" }}> *</span>{" "} */}
                            <Input
                              className="form-control"
                              type="number"
                              name="fuAlbumin"
                              id="fuAlbumin"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik?.values?.fuAlbumin}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />
                            {formik.touched?.fuAlbumin &&
                              formik?.errors?.fuAlbumin !== "" && (
                                <span className={classes.error}>
                                  {formik?.errors?.fuAlbumin}
                                </span>
                              )}
                          </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="fuApriScore">APRI Score</Label>
                            {/* <span style={{ color: "red" }}> *</span>{" "} */}
                            <Input
                              className="form-control"
                              type="number"
                              name="fuApriScore"
                              id="fuApriScore"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik?.values?.fuApriScore}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />

                            {formik.touched?.fuApriScore &&
                              formik?.errors?.fuApriScore !== "" && (
                                <span className={classes.error}>
                                  {formik?.errors?.fuApriScore}
                                </span>
                              )}
                          </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="fuFib4">FIB-4</Label>
                            {/* <span style={{ color: "red" }}> *</span>{" "} */}
                            <Input
                              className="form-control"
                              type="number"
                              name="fuFib4"
                              id="fuFib4"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik?.values?.fuFib4}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />

                            {formik.touched?.fuFib4 &&
                              formik?.errors?.fuFib4 !== "" && (
                                <span className={classes.error}>
                                  {formik?.errors?.fuFib4}
                                </span>
                              )}
                          </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="fuProthrombinTime">
                              Prothrombin time/INR
                            </Label>
                            {/* <span style={{ color: "red" }}> *</span>{" "} */}
                            <Input
                              className="form-control"
                              type="number"
                              name="fuProthrombinTime"
                              id="fuProthrombinTime"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik?.values?.fuProthrombinTime}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />

                            {formik.touched?.fuProthrombinTime &&
                              formik?.errors?.fuProthrombinTime !== "" && (
                                <span className={classes.error}>
                                  {formik?.errors?.fuProthrombinTime}
                                </span>
                              )}
                          </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="fuUrea">Urea (mg/dl)</Label>
                            {/* <span style={{ color: "red" }}> *</span>{" "} */}
                            <Input
                              className="form-control"
                              type="number"
                              name="fuUrea"
                              id="fuUrea"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik?.values?.fuUrea}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />

                            {formik.touched?.fuUrea &&
                              formik?.errors?.fuUrea !== "" && (
                                <span className={classes.error}>
                                  {formik?.errors?.fuUrea}
                                </span>
                              )}
                          </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="fuCreatinine">
                              Creatinine (µmol/L)
                            </Label>

                            <Input
                              className="form-control"
                              type="number"
                              name="fuCreatinine"
                              id="fuCreatinine"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik?.values?.fuCreatinine}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />

                            {formik.touched?.fuCreatinine &&
                              formik?.errors?.fuCreatinine !== "" && (
                                <span className={classes.error}>
                                  {formik?.errors?.fuCreatinine}
                                </span>
                              )}
                          </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="fuUltrasoundScan">
                              Ultrasound Scan
                            </Label>
                            {/* <span style={{ color: "red" }}> *</span>{" "} */}
                            <Input
                              className="form-control"
                              type="text"
                              name="fuUltrasoundScan"
                              id="fuUltrasoundScan"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik?.values?.fuUltrasoundScan}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />

                            {formik.touched?.fuUltrasoundScan &&
                              formik?.errors?.fuUltrasoundScan !== "" && (
                                <span className={classes.error}>
                                  {formik?.errors?.fuUltrasoundScan}
                                </span>
                              )}
                          </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="fuAfp">AFP (ng/ml)</Label>
                            {/* <span style={{ color: "red" }}> *</span>{" "} */}
                            <Input
                              className="form-control"
                              type="number"
                              name="fuAfp"
                              id="fuAfp"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik?.values?.fuAfp}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />

                            {formik.touched?.fuAfp &&
                              formik?.errors?.fuAfp !== "" && (
                                <span className={classes.error}>
                                  {formik?.errors?.fuAfp}
                                </span>
                              )}
                          </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="fuFibroscan">Fibroscan (kPa)</Label>
                            {/* <span style={{ color: "red" }}> *</span>{" "} */}
                            <Input
                              className="form-control"
                              type="number"
                              name="fuFibroscan"
                              id="fuFibroscan"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik?.values?.fuFibroscan}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />

                            {formik.touched?.fuFibroscan &&
                              formik?.errors?.fuFibroscan !== "" && (
                                <span className={classes.error}>
                                  {formik?.errors?.fuFibroscan}
                                </span>
                              )}
                          </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="fuCtScan">CT Scan</Label>
                            {/* <span style={{ color: "red" }}> *</span>{" "} */}
                            <Input
                              className="form-control"
                              type="text"
                              name="fuCtScan"
                              id="fuCtScan"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik?.values?.fuCtScan}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />

                            {formik.touched?.fuCtScan &&
                              formik?.errors?.fuCtScan !== "" && (
                                <span className={classes.error}>
                                  {formik?.errors?.fuCtScan}
                                </span>
                              )}
                          </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="fuAscites">Ascites</Label>
                            {/* <span style={{ color: "red" }}> *</span>{" "} */}
                            <Input
                              className="form-control"
                              type="select"
                              name="fuAscites"
                              id="fuAscites"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik?.values?.fuAscites}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            >
                              <option>Select</option>
                              <option value="YES">Yes</option>
                              <option value="NO">No</option>
                            </Input>

                            {formik.touched?.fuAscites &&
                              formik?.errors?.fuAscites !== "" && (
                                <span className={classes.error}>
                                  {formik?.errors?.fuAscites}
                                </span>
                              )}
                          </FormGroup>
                        </div>
                        {formik?.values?.fuAscites === "YES" && (
                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="fuSeverityOfAscites">
                                Severity of Ascites
                              </Label>
                              {/* <span style={{ color: "red" }}> *</span>{" "} */}
                              <select
                                className="form-control"
                                name="fuSeverityOfAscites"
                                id="fuSeverityOfAscites"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik?.values?.fuSeverityOfAscites}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option value="">Select</option>
                                <option value={"Mild"}>Mild</option>
                                <option value={"Moderate"}>Moderate</option>
                                <option value={"Massive/Gross"}>
                                  Massive/Gross
                                </option>
                              </select>

                              {formik.touched?.fuSeverityOfAscites &&
                                formik?.errors?.fuSeverityOfAscites !== "" && (
                                  <span className={classes.error}>
                                    {formik?.errors?.fuSeverityOfAscites}
                                  </span>
                                )}
                            </FormGroup>
                          </div>
                        )}

                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="fuGradeOfEncephalopathy">
                              Grade of encephalopathy
                            </Label>
                            {/* <span style={{ color: "red" }}> *</span>{" "} */}
                            <select
                              className="form-control"
                              name="fuGradeOfEncephalopathy"
                              id="fuGradeOfEncephalopathy"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik?.values?.fuGradeOfEncephalopathy}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            >
                              <option value="">Select</option>
                              <option value={"0"}>0</option>
                              <option value={"1"}>1</option>
                              <option value={"2"}>2</option>
                              <option value={"3"}>3</option>
                              <option value={"4"}>4</option>
                            </select>

                            {formik.touched?.fuGradeOfEncephalopathy &&
                              formik?.errors?.fuGradeOfEncephalopathy !==
                                "" && (
                                <span className={classes.error}>
                                  {formik?.errors?.fuGradeOfEncephalopathy}
                                </span>
                              )}
                          </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="fuChildPughScore">
                              Child pugh score
                            </Label>
                            {/* <span style={{ color: "red" }}> *</span>{" "} */}
                            <select
                              className="form-control"
                              name="fuChildPughScore"
                              id="fuChildPughScore"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik?.values?.fuChildPughScore}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            >
                              <option>Select</option>

                              {childPughData?.map((item) => (
                                <option key={item?.code} value={item?.code}>
                                  {item?.display}
                                </option>
                              ))}
                            </select>

                            {formik.touched?.fuChildPughScore &&
                              formik?.errors?.fuChildPughScore !== "" && (
                                <span className={classes.error}>
                                  {formik?.errors?.fuChildPughScore}
                                </span>
                              )}
                          </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="fuLiverBiopsyStage">
                              Liver Biopsy stage
                            </Label>
                            {/* <span style={{ color: "red" }}> *</span>{" "} */}
                            <select
                              className="form-control"
                              type="number"
                              name="fuLiverBiopsyStage"
                              id="fuLiverBiopsyStage"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik?.values?.fuLiverBiopsyStage}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            >
                              <option value="">Select</option>
                              <option value={"YES"}>Yes</option>
                              <option value={"NO"}>No</option>
                            </select>

                            {formik.touched?.fuLiverBiopsyStage &&
                              formik?.errors?.fuLiverBiopsyStage !== "" && (
                                <span className={classes.error}>
                                  {formik?.errors?.fuLiverBiopsyStage}
                                </span>
                              )}
                          </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="fuStagingDateLiverBiopsy">
                              Staging date for liver biopsy
                            </Label>
                            {/* <span style={{ color: "red" }}> *</span>{" "} */}
                            <Input
                              className="form-control"
                              type="date"
                              name="fuStagingDateLiverBiopsy"
                              id="fuStagingDateLiverBiopsy"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik?.values?.fuStagingDateLiverBiopsy}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />

                            {formik.touched?.fuStagingDateLiverBiopsy &&
                              formik?.errors?.fuStagingDateLiverBiopsy !==
                                "" && (
                                <span className={classes.error}>
                                  {formik?.errors?.fuStagingDateLiverBiopsy}
                                </span>
                              )}
                          </FormGroup>
                        </div>
                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="fuDiagnosis">Diagnosis</Label>
                            {/* <span style={{ color: "red" }}> *</span>{" "} */}
                            <select
                              className="form-control"
                              type="date"
                              name="fuDiagnosis"
                              id="fuDiagnosis"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik?.values?.fuDiagnosis}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            >
                              <option value="">Select</option>
                              <option value={"FIBROSIS"}>FIBROSIS</option>
                              <option value={"CIRRHOSIS"}>CIRRHOSIS</option>
                              <option value={"HCC"}>HCC</option>
                            </select>

                            {formik.touched?.fuDiagnosis &&
                              formik?.errors?.fuDiagnosis !== "" && (
                                <span className={classes.error}>
                                  {formik?.errors?.fuDiagnosis}
                                </span>
                              )}
                          </FormGroup>
                        </div>
                      </div>
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
                    Appointment
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
                            <Label for="fuTreatmentRegimen">
                              Treatment Regimen
                            </Label>
                            <span style={{ color: "red" }}> *</span>{" "}
                            <Input
                              className="form-control"
                              type="text"
                              name="fuTreatmentRegimen"
                              id="fuTreatmentRegimen"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik?.values?.fuTreatmentRegimen}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />
                            {formik.touched?.fuTreatmentRegimen &&
                              formik?.errors?.fuTreatmentRegimen !== "" && (
                                <span className={classes.error}>
                                  {formik?.errors?.fuTreatmentRegimen}
                                </span>
                              )}
                          </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="fuNextAppointment">
                              Next Appointment
                            </Label>
                            {/* <span style={{ color: "red" }}> *</span>{" "} */}
                            <Input
                              className="form-control"
                              type="date"
                              name="fuNextAppointment"
                              id="fuNextAppointment"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik?.values?.fuNextAppointment}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />

                            {formik.touched?.fuNextAppointment &&
                              formik?.errors?.fuNextAppointment !== "" && (
                                <span className={classes.error}>
                                  {formik?.errors?.fuNextAppointment}
                                </span>
                              )}
                          </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="fuClinicalName">Clinical name</Label>
                            <Input
                              className="form-control"
                              type="text"
                              name="fuClinicalName"
                              id="fuClinicalName"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik?.values?.fuClinicalName}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />

                            {formik.touched?.fuClinicalName &&
                              formik?.errors?.fuClinicalName !== "" && (
                                <span className={classes.error}>
                                  {formik?.errors?.fuClinicalName}
                                </span>
                              )}
                          </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="fuOutcome">Outcome</Label>
                            <select
                              className="form-control"
                              name="fuOutcome"
                              id="fuOutcome"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik?.values?.fuOutcome}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            >
                              <option value="">Select</option>
                              <option value={"LT"}>Lost to follow up</option>
                              <option value={"D"}>Death</option>
                              <option value={"C"}>Cured</option>
                              <option value={"R"}>Referred</option>
                              <option value={"U"}>Undetected Viral Load</option>
                              <option value={"NS"}>NOT SUPPRESSED</option>
                            </select>

                            {formik.touched?.fuOutcome &&
                              formik?.errors?.fuOutcome !== "" && (
                                <span className={classes.error}>
                                  {formik?.errors?.fuOutcome}
                                </span>
                              )}
                          </FormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <FormGroup>
                            <Label for="fuRemark">Remark</Label>
                            {/* <span style={{ color: "red" }}> *</span>{" "} */}
                            <textarea
                              className="form-control"
                              type="text"
                              name="fuRemark"
                              id="fuRemark"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik?.values?.fuRemark}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />

                            {formik.touched?.fuRemark &&
                              formik?.errors?.fuRemark !== "" && (
                                <span className={classes.error}>
                                  {formik?.errors?.fuRemark}
                                </span>
                              )}
                          </FormGroup>
                        </div>
                      </div>
                    </div>
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
                  className={classes.button}
                  // onClick={handleSubmit}
                  style={{ backgroundColor: "#014d88", fontWeight: "bolder" }}
                >
                  <span style={{ textTransform: "capitalize" }}>
                    {isLoading ? "Please wait" : "Submit"}
                  </span>
                </MatButton>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default FollowupCreate;
