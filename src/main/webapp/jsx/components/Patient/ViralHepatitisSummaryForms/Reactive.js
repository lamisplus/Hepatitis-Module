import React, { useState } from "react";
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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

const Reactive = () => {
  const classes = useStyles();
  const { formik } = useValidateForm2ValuesHook();
  const [isDropdownsOpen, setIsDropdownsOpen] = useState({
    hepatitisBDropdown: false,
    hepatitisCDropdown: false,
    coInfectionDropdown: false,
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
                    Reactive
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
                      Men
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
                              <Label for="dateHbvSampleCollected">
                                Date HBV sample Requested{" "}
                                <span style={{ color: "red" }}> *</span>{" "}
                              </Label>
                              <input
                                className="form-control"
                                type="date"
                                name="dateHbvSampleCollected"
                                id="dateHbvSampleCollected"
                                value={formik.values.dateHbvSampleCollected}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />
                              {formik.errors.dateHbvSampleCollected !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.dateHbvSampleCollected}
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
                        </div>
                        <div className="row">
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
                                    value="detected"
                                    name="hbvDna"
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
                                    value="undetected"
                                    name="hbvDna"
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
                          {formik.values.hbvDna === "detected" && (
                            <div className="form-group mb-3 col-md-4">
                              <FormGroup>
                                <Label for="hbvDnaValue">
                                  Input HBV DNA value{" "}
                                  <span style={{ color: "red" }}> *</span>{" "}
                                </Label>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="hbvDnaValue"
                                  id="hbvDnaValue"
                                  value={formik.values.hbvDnaValue}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                />

                                {formik.errors.hbvDnaValue !== "" ? (
                                  <span className={classes.error}>
                                    {formik.errors.hbvDnaValue}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </FormGroup>
                            </div>
                          )}
                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="landmark">HBsAG Quantification</Label>
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
                              <Label for="hbeAg">HbeAG</Label>
                              <select
                                className="form-control"
                                name="hbeAg"
                                id="hbeAg"
                                onChange={formik.handleChange}
                                value={formik.values.hbeAg}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option value={""}>Select</option>
                                <option value={"reactive"}>Reactive</option>
                                <option value={"non-reactive"}>
                                  Non Reactive
                                </option>
                              </select>
                              {formik.errors.hbeAg !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.hbeAg}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>
                          
                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="antiHdv">Anti-HDV</Label>
                              <select
                                className="form-control"
                                name="antiHdv"
                                id="antiHdv"
                                onChange={formik.handleChange}
                                value={formik.values.antiHdv}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option value={""}>Select</option>
                                <option value={"reactive"}>Reactive</option>
                                <option value={"non-reactive"}>
                                  Non Reactive
                                </option>
                                <option value={"not done"}>Not Done</option>
                              </select>
                              {formik.errors.antiHdv !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.antiHdv}
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
                                <option value={"yes"}>Yes</option>
                                <option value={"no"}>No</option>
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
                                <option value={"reactive"}>Reactive</option>
                                <option value={"non-reactive"}>
                                  Non Reactive
                                </option>
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
                      Women
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
                              <Label for="hcvRna">HCV RNA (IU/ml)</Label>
                              <select
                                className="form-control"
                                name="hcvRna"
                                id="hcvRna"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.hcvRna}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option value={""}>select</option>
                                <option value={"detected"}>Detected</option>
                                <option value={"undetected"}>Undetected</option>
                              </select>
                              {formik.errors.hcvRna !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.hcvRna}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>
                          {formik.values.hcvRna === "detected" && (
                            <div className="form-group mb-3 col-md-4">
                              <FormGroup>
                                <Label for="hcvValue">
                                  Input HCV RNA Value{" "}
                                  <span style={{ color: "red" }}> *</span>{" "}
                                </Label>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="hcvValue"
                                  id="hcvValue"
                                  value={formik.values.hcvValue}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                />
                                {formik.errors.hcvValue !== "" ? (
                                  <span className={classes.error}>
                                    {formik.errors.hcvValue}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </FormGroup>
                            </div>
                          )}

                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="hepatitisCoInfection">
                                Hepatitis Coinfection
                              </Label>
                              <select
                                className="form-control"
                                name="hepatitisCoInfection"
                                id="hepatitisCoInfection"
                                onChange={formik.handleChange}
                                value={formik.values.hepatitisCoInfection}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                                multiple
                              >
                                <option value={""}>Select</option>
                                <option value={"hbv/hcv"}>HBV/HCV</option>
                                <option value={"hcv/hiv"}>HCV/HIV</option>
                                <option value={"hbv/hdv"}>HBV/HDV</option>
                                <option value={"hbv/hcd/hiv"}>
                                  HBV/HCD/HIV
                                </option>
                              </select>
                              {formik.errors.hepatitisCoInfection !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.hepatitisCoInfection}
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
                      Special Population
                    </p>
                    <IconButton
                      onClick={() =>
                        setIsDropdownsOpen((prevState) => {
                          return {
                            ...prevState,
                            hepatitisCDropdown: !prevState.hepatitisCDropdown,
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
                    <Collapse in={isDropdownsOpen.hepatitisCDropdown}>
                      <div
                        className="basic-form"
                        style={{ padding: "0 50px 0 50px" }}
                      >
                        <div className="row">
                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="hcvRna">HCV RNA (IU/ml)</Label>
                              <select
                                className="form-control"
                                name="hcvRna"
                                id="hcvRna"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.hcvRna}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option value={""}>select</option>
                                <option value={"detected"}>Detected</option>
                                <option value={"undetected"}>Undetected</option>
                              </select>
                              {formik.errors.hcvRna !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.hcvRna}
                                </span>
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </div>
                          {formik.values.hcvRna === "detected" && (
                            <div className="form-group mb-3 col-md-4">
                              <FormGroup>
                                <Label for="hcvValue">
                                  Input HCV RNA Value{" "}
                                  <span style={{ color: "red" }}> *</span>{" "}
                                </Label>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="hcvValue"
                                  id="hcvValue"
                                  value={formik.values.hcvValue}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                />
                                {formik.errors.hcvValue !== "" ? (
                                  <span className={classes.error}>
                                    {formik.errors.hcvValue}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </FormGroup>
                            </div>
                          )}

                          <div className="form-group mb-3 col-md-4">
                            <FormGroup>
                              <Label for="hepatitisCoInfection">
                                Hepatitis Coinfection
                              </Label>
                              <select
                                className="form-control"
                                name="hepatitisCoInfection"
                                id="hepatitisCoInfection"
                                onChange={formik.handleChange}
                                value={formik.values.hepatitisCoInfection}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                                multiple
                              >
                                <option value={""}>Select</option>
                                <option value={"hbv/hcv"}>HBV/HCV</option>
                                <option value={"hcv/hiv"}>HCV/HIV</option>
                                <option value={"hbv/hdv"}>HBV/HDV</option>
                                <option value={"hbv/hcd/hiv"}>
                                  HBV/HCD/HIV
                                </option>
                              </select>
                              {formik.errors.hepatitisCoInfection !== "" ? (
                                <span className={classes.error}>
                                  {formik.errors.hepatitisCoInfection}
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
                        </div>
                      </div>
                    </Collapse>
                  </div>
                </div>
              </div>

              {false ? <Spinner /> : ""}
              <br />
              <div className="d-flex justify-content-end">
                
                <MatButton
                  type="button"
                  variant="contained"
                  color="primary"
                  className={classes.button}
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

export default Reactive;
