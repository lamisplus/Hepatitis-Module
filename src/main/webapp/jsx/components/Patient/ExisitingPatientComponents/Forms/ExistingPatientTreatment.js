import React, { useState } from "react";
import { Form, Label, Spinner } from "reactstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckSquare,
  faCoffee,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Collapse,
  IconButton,
  Button as MatButton,
} from "@material-ui/core";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import "react-phone-input-2/lib/style.css";
import "../patient.css";
import "react-widgets/dist/css/react-widgets.css";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import { toast } from "react-toastify";
import { useValidateExistingPatientTreatmentFormValuesHook } from "./FormvalidationSchemas/useValidateExistingPatientTreatmentFormValues";
import { useFetchCodesets } from "../../../../hooks/useFetchCodesets.hook";
import { useHistory } from "react-router-dom";
import CustomFormGroup from "../../../CustomFormGroup/CustomFormGroup";
import { useMutation, useQuery } from "react-query";
import { saveTreatment } from "../../../../services/saveTreatment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getRecentActivties } from "../../../../services/getRecentActivities";

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

const ExistingPatientTreatment = ({ step, setStep }) => {
  const history = useHistory();
  const enrolmentData = history?.location?.state?.enrolmentData;
  const [patientDateOfBirth] = useState(enrolmentData?.person?.dateOfBirth);
  const [enrollmentUuid] = useState(enrolmentData?.enrollmentUuid);
  const patientObj = history?.location?.state?.patientObj;

  const [isRecordOnSameDateExists, setIsRecordOnSameDateExists] = useState(false)

  const classes = useStyles();

  const _hcvGenotypeData = [
    {
      "id": 1724,
      "code": "HCV_GENOTYPE_1",
      "version": "1.0",
      "codeset_group": "HCV_GENOTYPE",
      "display": "1",
      "language": "en",
      "archived": 0,
      "date_created": "2024-08-15T10:36:53.118",
      "created_by": "Nonye",
      "date_modified": "2024-08-15T10:36:53.118",
      "modified_by": "Nonye"
    },
    {
      "id": 1725,
      "code": "HCV_GENOTYPE_2",
      "version": "1.0",
      "codeset_group": "HCV_GENOTYPE",
      "display": "2",
      "language": "en",
      "archived": 0,
      "date_created": "2024-08-15T10:37:07.060",
      "created_by": "Nonye",
      "date_modified": "2024-08-15T10:37:07.060",
      "modified_by": "Nonye"
    },
    {
      "id": 1726,
      "code": "HCV_GENOTYPE_3",
      "version": "1.0",
      "codeset_group": "HCV_GENOTYPE",
      "display": "3",
      "language": "en",
      "archived": 0,
      "date_created": "2024-08-15T10:37:23.822",
      "created_by": "Nonye",
      "date_modified": "2024-08-15T10:37:23.822",
      "modified_by": "Nonye"
    },
    {
      "id": 1727,
      "code": "HCV_GENOTYPE_4",
      "version": "1.0",
      "codeset_group": "HCV_GENOTYPE",
      "display": "4",
      "language": "en",
      "archived": 0,
      "date_created": "2024-08-15T10:37:44.155",
      "created_by": "Nonye",
      "date_modified": "2024-08-15T10:37:44.155",
      "modified_by": "Nonye"
    },
    {
      "id": 1728,
      "code": "HCV_GENOTYPE_5",
      "version": "1.0",
      "codeset_group": "HCV_GENOTYPE",
      "display": "5",
      "language": "en",
      "archived": 0,
      "date_created": "2024-08-15T10:37:57.054",
      "created_by": "Nonye",
      "date_modified": "2024-08-15T10:37:57.054",
      "modified_by": "Nonye"
    },
    {
      "id": 1729,
      "code": "HCV_GENOTYPE_6",
      "version": "1.0",
      "codeset_group": "HCV_GENOTYPE",
      "display": "6",
      "language": "en",
      "archived": 0,
      "date_created": "2024-08-15T10:38:10.841",
      "created_by": "Nonye",
      "date_modified": "2024-08-15T10:38:10.841",
      "modified_by": "Nonye"
    }
  ]

  const { returnData: hcvTreatmentRegimenOptions } = useFetchCodesets(
    "HCV_TREATMENT_REGIMEN"
  );
  const { returnData: hbvTreatmentRegimenOptions } = useFetchCodesets(
    "HBV_TREATMENT_REGIMEN"
  );

  const { returnData: hcvGenotypeData } = useFetchCodesets(
    "HCV_GENOTYPE"
  );

  const [isDropdownsOpen, setIsDropdownsOpen] = useState({
    hbvTreatmentRegimenSwitch: true,
    hbvTreatmentReasonforTreatment: true,
    hcvTreatmentRegimenSwitch: true,
    hcvTreatmentRegimenHcvRetreatment: true,
    hcvTreatmentSvr12Testing: true,
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: saveTreatment,
    onSuccess: (data) => {
      toast.success("Treatment created successfully");
      history.push("/", null);
    },
    onError: () => {
      toast.error("Treatment creation failed");
    },
  });

  const handleSubmit = (values) => {


    const hepatitisBTreatment = {};
    const hepatitisCTreatment = {};

    for (const key in values) {
      //extract all key-value pair that starts wuth "hepatitisB"
      if (key.startsWith("hepatitisB")) {
        hepatitisBTreatment[key] = values[key];
      }
      //extract all key-value pair that starts wuth "hepatitisC"
      if (key.startsWith("hepatitisC")) {
        hepatitisCTreatment[key] = values[key];
      }
    }

    const payload = {
      enrollmentUuid: enrollmentUuid,
      hepatitisBTreatment,
      hepatitisCTreatment,
    };
    mutate(payload);
  };

  const { formik } =
    useValidateExistingPatientTreatmentFormValuesHook(handleSubmit);

    function getTodayDate() {
      const today = new Date();
  
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so we add 1
      const day = String(today.getDate()).padStart(2, '0');
  
      return `${year}-${month}-${day}`;
  }

    useQuery(
      ["FECTH_RECENT_ACTIVITIES", patientObj?.uuid || patientObj?.personUuid],
      () => getRecentActivties(patientObj?.uuid || patientObj?.personUuid),
      {
        // onSuccess: (data) => {
        //   if (data && Array.isArray(data) && data?.length !== 0) {
        //     const allRecentDiagnosis = data.filter((activity) => activity.path === "hepatitis_treatment" && activity?.activityDate === getTodayDate())
        //     if (allRecentDiagnosis.length !== 0) {
        //       setIsRecordOnSameDateExists(true)
        //     }
        //     else {
        //       setIsRecordOnSameDateExists(false)
        //     }
        //   }
        // },
      }
    );

  console.log(formik.errors)

  return (
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
                        <CustomFormGroup
                          formik={formik}
                          name="hepatitisBTreatmentExperience"
                        >
                          <Label for="hepatitisBTreatmentExperience">
                            Treatment experience
                            <span style={{ color: "red" }}> *</span>
                            {" "}
                          </Label>
                          <select
                            className="form-control"
                            name="hepatitisBTreatmentExperience"
                            id="hepatitisBTreatmentExperience"
                            value={
                              formik?.values?.hepatitisBTreatmentExperience
                            }
                            onChange={formik?.handleChange}
                            onBlur={formik?.handleBlur}
                            style={{
                              border: "1px solid #014D88",
                              borderRadius: "0.2rem",
                            }}
                          >
                            <option>Select</option>
                            <option value={"YES"}>Yes</option>
                            <option value={"NO"}>No</option>
                          </select>
                          {formik?.touched?.hepatitisBTreatmentExperience &&
                            formik?.errors.hepatitisBTreatmentExperience && (
                              <span className={classes.error}>
                                {formik?.errors.hepatitisBTreatmentExperience}
                              </span>
                            )}
                        </CustomFormGroup>
                      </div>

                      {formik?.values?.hepatitisBTreatmentExperience?.toLowerCase() ===
                        "yes" && (
                          <div className="form-group mb-3 col-md-4">
                            <CustomFormGroup
                              formik={formik}
                              name="hepatitisBPastTreatmentRegimen"
                            >
                              <Label for="hepatitisBPastTreatmentRegimen">
                                HBV Past treatment regimen

                              </Label>
                              <select
                                className="form-control"
                                name="hepatitisBPastTreatmentRegimen"
                                id="hepatitisBPastTreatmentRegimen"
                                value={
                                  formik?.values?.hepatitisBPastTreatmentRegimen
                                }
                                onChange={formik?.handleChange}
                                onBlur={formik?.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option value="">Select</option>
                                {hbvTreatmentRegimenOptions?.map?.(
                                  ({ display }) => (
                                    <option key={display} value={display}>
                                      {display}
                                    </option>
                                  )
                                )}
                              </select>
                              {formik?.touched?.hepatitisBPastTreatmentRegimen &&
                                formik?.errors.hepatitisBPastTreatmentRegimen && (
                                  <span className={classes.error}>
                                    {
                                      formik?.errors
                                        .hepatitisBPastTreatmentRegimen
                                    }
                                  </span>
                                )}
                            </CustomFormGroup>
                          </div>
                        )}

                      {formik?.values?.hepatitisBTreatmentExperience?.toLowerCase() ===
                        "yes" && (
                          <>
                            <div className="form-group mb-3 col-md-4">
                              <CustomFormGroup
                                formik={formik}
                                name="hepatitisBPastTreatmentExperienceDateStarted"
                              >
                                <Label for="hepatitisBPastTreatmentExperienceDateStarted">
                                  Date started
                                </Label>

                                <input
                                  className="form-control"
                                  type="date"
                                  name="hepatitisBPastTreatmentExperienceDateStarted"
                                  id="hepatitisBPastTreatmentExperienceDateStarted"
                                  max={moment(new Date()).format("YYYY-MM-DD")}
                                  min={moment(
                                    new Date(patientDateOfBirth)
                                  ).format("YYYY-MM-DD")}
                                  value={
                                    formik.values
                                      ?.hepatitisBPastTreatmentExperienceDateStarted
                                  }
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                />
                                {formik?.touched
                                  ?.hepatitisBPastTreatmentExperienceDateStarted &&
                                  formik?.errors
                                    .hepatitisBPastTreatmentExperienceDateStarted && (
                                    <span className={classes.error}>
                                      {
                                        formik?.errors
                                          .hepatitisBPastTreatmentExperienceDateStarted
                                      }
                                    </span>
                                  )}
                              </CustomFormGroup>
                            </div>

                            <div className="form-group mb-3 col-md-4">
                              <CustomFormGroup
                                formik={formik}
                                name="hepatitisBPastTreatmentExperienceDateCompleted"
                              >
                                <Label for="hepatitisBPastTreatmentExperienceDateCompleted">
                                  Date Completed{" "}

                                </Label>
                                <input
                                  className="form-control"
                                  type="date"
                                  name="hepatitisBPastTreatmentExperienceDateCompleted"
                                  id="hepatitisBPastTreatmentExperienceDateCompleted"
                                  max={moment(new Date()).format("YYYY-MM-DD")}
                                  min={
                                    formik.values
                                      .hepatitisBPastTreatmentExperienceDateStarted
                                  }
                                  value={
                                    formik.values
                                      ?.hepatitisBPastTreatmentExperienceDateCompleted
                                  }
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                />
                                {formik?.touched
                                  ?.hepatitisBPastTreatmentExperienceDateCompleted &&
                                  formik?.errors
                                    ?.hepatitisBPastTreatmentExperienceDateCompleted && (
                                    <span className={classes.error}>
                                      {
                                        formik?.errors
                                          ?.hepatitisBPastTreatmentExperienceDateCompleted
                                      }
                                    </span>
                                  )}
                              </CustomFormGroup>
                            </div>

                            <div className="form-group mb-3 col-md-4">
                              <CustomFormGroup
                                formik={formik}
                                name="hepatitisBPastTreatmentExperiencePrescribedDuration"
                              >
                                <Label for="hepatitisBPastTreatmentExperiencePrescribedDuration">
                                  Prescribed duration
                                </Label>

                                <select
                                  className="form-control"
                                  name="hepatitisBPastTreatmentExperiencePrescribedDuration"
                                  id="hepatitisBPastTreatmentExperiencePrescribedDuration"
                                  value={
                                    formik?.values
                                      ?.hepatitisBPastTreatmentExperiencePrescribedDuration
                                  }
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                >
                                  <option>Select</option>
                                  <option value={"8"}>8 weeks</option>
                                  <option value={"12"}>12 weeks</option>
                                  <option value={"24"}>24 weeks</option>
                                </select>
                                {formik?.touched
                                  ?.hepatitisBPastTreatmentExperiencePrescribedDuration &&
                                  formik?.errors
                                    .hepatitisBPastTreatmentExperiencePrescribedDuration && (
                                    <span className={classes.error}>
                                      {
                                        formik?.errors
                                          .hepatitisBPastTreatmentExperiencePrescribedDuration
                                      }
                                    </span>
                                  )}
                              </CustomFormGroup>
                            </div>
                          </>
                        )}

                      <div className="form-group mb-3 col-md-4">
                        <CustomFormGroup
                          formik={formik}
                          name="hepatitisBNewTreatmentRegimen"
                        >
                          <Label for="hepatitisBNewTreatmentRegimen">
                            New regimen
                          </Label>

                          <select
                            className="form-control"
                            name="hepatitisBNewTreatmentRegimen"
                            id="hepatitisBNewTreatmentRegimen"
                            value={formik.values?.hepatitisBNewTreatmentRegimen}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{
                              border: "1px solid #014D88",
                              borderRadius: "0.2rem",
                            }}
                          >
                            <option value="" selected>
                              Select
                            </option>
                            {hbvTreatmentRegimenOptions?.map(({ display }) => (
                              <option key={display} value={display}>
                                {display}
                              </option>
                            ))}
                          </select>
                          {formik?.touched?.hepatitisBNewTreatmentRegimen &&
                            formik?.errors.hepatitisBNewTreatmentRegimen && (
                              <span className={classes.error}>
                                {formik?.errors.hepatitisBNewTreatmentRegimen}
                              </span>
                            )}
                        </CustomFormGroup>
                      </div>

                      {formik?.values?.hepatitisBNewTreatmentRegimen && (
                        <>
                          <div className="form-group mb-3 col-md-4">
                            <CustomFormGroup
                              formik={formik}
                              name="hepatitisBNewTreatmentRegimenPrescribedDuration"
                            >
                              <Label for="hepatitisBNewTreatmentRegimenPrescribedDuration">
                                Prescribed duration
                              </Label>



                              <select
                                className="form-control"
                                name="hepatitisBNewTreatmentRegimenPrescribedDuration"
                                id="hepatitisBNewTreatmentRegimenPrescribedDuration"
                                value={
                                  formik?.values
                                    ?.hepatitisBNewTreatmentRegimenPrescribedDuration
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <option>Select</option>
                                <option value={"8"}>8 weeks</option>
                                <option value={"12"}>12 weeks</option>
                                <option value={"24"}>24 weeks</option>
                              </select>
                              {formik?.touched
                                .hepatitisBNewTreatmentRegimenPrescribedDuration &&
                                formik?.errors
                                  .hepatitisBNewTreatmentRegimenPrescribedDuration && (
                                  <span className={classes.error}>
                                    {
                                      formik?.errors
                                        ?.hepatitisBNewTreatmentRegimenPrescribedDuration
                                    }
                                  </span>
                                )}
                            </CustomFormGroup>
                          </div>

                          <div className="form-group mb-3 col-md-4">
                            <CustomFormGroup
                              formik={formik}
                              name="hepatitisBNewTreatmentRegimenDateStarted"
                            >
                              <Label for="hepatitisBNewTreatmentRegimenDateStarted">
                                Date started
                              </Label>
                              {" "}
                              <input
                                className="form-control"
                                type="date"
                                name="hepatitisBNewTreatmentRegimenDateStarted"
                                id="hepatitisBNewTreatmentRegimenDateStarted"
                                max={moment(new Date()).format("YYYY-MM-DD")}
                                min={moment(
                                  new Date(patientDateOfBirth)
                                ).format("YYYY-MM-DD")}
                                value={
                                  formik?.values
                                    ?.hepatitisBNewTreatmentRegimenDateStarted
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />
                            </CustomFormGroup>
                            {formik?.touched
                              ?.hepatitisBNewTreatmentRegimenDateStarted &&
                              formik?.errors
                                .hepatitisBNewTreatmentRegimenDateStarted && (
                                <span className={classes.error}>
                                  {
                                    formik?.errors
                                      .hepatitisBNewTreatmentRegimenDateStarted
                                  }
                                </span>
                              )}
                          </div>

                          <div className="form-group mb-3 col-md-4">
                            <CustomFormGroup
                              formik={formik}
                              name="hepatitisBNewTreatmentRegimenDateCompleted"
                            >
                              <Label for="hepatitisBNewTreatmentRegimenDateCompleted">
                                Date Completed{" "}

                              </Label>
                              <input
                                className="form-control"
                                type="date"
                                name="hepatitisBNewTreatmentRegimenDateCompleted"
                                id="hepatitisBNewTreatmentRegimenDateCompleted"
                                max={moment(new Date()).format("YYYY-MM-DD")}
                                min={
                                  formik.values
                                    ?.hepatitisBNewTreatmentRegimenDateStarted
                                }
                                value={
                                  formik.values
                                    ?.hepatitisBNewTreatmentRegimenDateCompleted
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />
                              {formik?.touched
                                ?.hepatitisBNewTreatmentRegimenDateCompleted &&
                                formik?.errors
                                  .hepatitisBNewTreatmentRegimenDateCompleted && (
                                  <span className={classes.error}>
                                    {
                                      formik?.errors
                                        .hepatitisBNewTreatmentRegimenDateCompleted
                                    }
                                  </span>
                                )}
                            </CustomFormGroup>
                          </div>
                        </>
                      )}

                      <div className="form-group mb-3 col-md-4">
                        <CustomFormGroup
                          formik={formik}
                          name="hepatitisBAdverseEventReported"
                        >
                          <Label for="hepatitisBAdverseEventReported">
                            Adverse event reported
                          </Label>
                          {" "}
                          <select
                            className="form-control"
                            name="hepatitisBAdverseEventReported"
                            id="hepatitisBAdverseEventReported"
                            value={
                              formik?.values?.hepatitisBAdverseEventReported
                            }
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
                          {formik?.touched?.hepatitisBAdverseEventReported &&
                            formik?.errors.hepatitisBAdverseEventReported && (
                              <span className={classes.error}>
                                {formik?.errors.hepatitisBAdverseEventReported}
                              </span>
                            )}
                        </CustomFormGroup>
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
                          <CustomFormGroup
                            formik={formik}
                            name="hepatitisBRegimenSwitchNewRegimen"
                          >
                            <Label for="hepatitisBRegimenSwitchNewRegimen">
                              New Regimen
                            </Label>
                            <select
                              className="form-control"
                              type="text"
                              name="hepatitisBRegimenSwitchNewRegimen"
                              id="hepatitisBRegimenSwitchNewRegimen"
                              value={formik.values?.newRegimen}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            >
                              <option value="">Select</option>
                              {hbvTreatmentRegimenOptions?.map(
                                ({ display }) => (
                                  <option key={display} value={display}>
                                    {display}
                                  </option>
                                )
                              )}
                            </select>
                            {formik?.touched
                              ?.hepatitisBRegimenSwitchNewRegimen &&
                              formik?.errors
                                .hepatitisBRegimenSwitchNewRegimen && (
                                <span className={classes.error}>
                                  {
                                    formik?.errors
                                      .hepatitisBRegimenSwitchNewRegimen
                                  }
                                </span>
                              )}
                          </CustomFormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <CustomFormGroup
                            formik={formik}
                            name="hepatitisBRegimenSwitchDateStarted"
                          >
                            <Label for="hepatitisBRegimenSwitchDateStarted">
                              Date Started{" "}

                            </Label>
                            <input
                              className="form-control"
                              type="date"
                              name="hepatitisBRegimenSwitchDateStarted"
                              id="hepatitisBRegimenSwitchDateStarted"
                              max={moment(new Date()).format("YYYY-MM-DD")}
                              min={moment(
                                new Date(patientDateOfBirth)
                              ).format()}
                              value={
                                formik?.values
                                  ?.hepatitisBRegimenSwitchDateStarted
                              }
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />
                            {formik?.touched
                              ?.hepatitisBRegimenSwitchDateStarted &&
                              formik?.errors
                                .hepatitisBRegimenSwitchDateStarted && (
                                <span className={classes.error}>
                                  {
                                    formik?.errors
                                      .hepatitisBRegimenSwitchDateStarted
                                  }
                                </span>
                              )}
                          </CustomFormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <CustomFormGroup
                            formik={formik}
                            name="hepatitisBRegimenSwitchDateCompleted"
                          >
                            <Label for="hepatitisBRegimenSwitchDateCompleted">
                              Date Completed{" "}

                            </Label>
                            <input
                              className="form-control"
                              type="date"
                              name="hepatitisBRegimenSwitchDateCompleted"
                              id="hepatitisBRegimenSwitchDateCompleted"
                              max={moment(new Date()).format("YYYY-MM-DD")}
                              min={
                                formik?.values
                                  .hepatitisBRegimenSwitchDateStarted
                              }
                              value={
                                formik.values
                                  ?.hepatitisBRegimenSwitchDateCompleted
                              }
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />
                            {formik?.touched
                              ?.hepatitisBRegimenSwitchDateCompleted &&
                              formik?.errors
                                .hepatitisBRegimenSwitchDateCompleted !==
                              "" && (
                                <span className={classes.error}>
                                  {
                                    formik?.errors
                                      .hepatitisBRegimenSwitchDateCompleted
                                  }
                                </span>
                              )}
                          </CustomFormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <CustomFormGroup
                            formik={formik}
                            name="hepatitisBRegimenSwitchReasonForSwitch"
                          >
                            <Label for="hepatitisBRegimenSwitchReasonForSwitch">
                              Reason for switch

                            </Label>
                            <input
                              className="form-control"
                              type="text"
                              name="hepatitisBRegimenSwitchReasonForSwitch"
                              id="hepatitisBRegimenSwitchReasonForSwitch"
                              value={
                                formik?.values
                                  ?.hepatitisBRegimenSwitchReasonForSwitch
                              }
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />
                            {formik?.touched
                              ?.hepatitisBRegimenSwitchReasonForSwitch &&
                              formik?.errors
                                .hepatitisBRegimenSwitchReasonForSwitch !==
                              "" && (
                                <span className={classes.error}>
                                  {
                                    formik?.errors
                                      .hepatitisBRegimenSwitchReasonForSwitch
                                  }
                                </span>
                              )}
                          </CustomFormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <CustomFormGroup
                            formik={formik}
                            name="hepatitisBRegimenSwitchAdverseEffectReported"
                          >
                            <Label for="hepatitisBRegimenSwitchAdverseEffectReported">
                              Adverse event reported{" "}

                            </Label>{" "}
                            <select
                              className="form-control"
                              name="hepatitisBRegimenSwitchAdverseEffectReported"
                              id="hepatitisBRegimenSwitchAdverseEffectReported"
                              value={
                                formik?.values
                                  ?.hepatitisBRegimenSwitchAdverseEffectReported
                              }
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
                            {formik?.touched
                              ?.hepatitisBRegimenSwitchAdverseEffectReported &&
                              formik?.errors
                                .hepatitisBRegimenSwitchAdverseEffectReported !==
                              "" && (
                                <span className={classes.error}>
                                  {
                                    formik?.errors
                                      .hepatitisBRegimenSwitchAdverseEffectReported
                                  }
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
                  <Collapse in={isDropdownsOpen.hbvTreatmentReasonforTreatment}>
                    <div
                      className="basic-form"
                      style={{ padding: "0 50px 0 50px" }}
                    >
                      <div className="row">
                        <div className="form-group mb-3 col-md-6">
                          <CustomFormGroup
                            formik={formik}
                            name="hepatitisBReasonForTreatment"
                          >
                            <Label for="hepatitisBReasonForTreatment">
                              Reasons for treatment
                            </Label>
                            {" "}
                            <select
                              className="form-control"
                              name="hepatitisBReasonForTreatment"
                              id="hepatitisBReasonForTreatment"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={
                                formik.values?.hepatitisBReasonForTreatment
                              }
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            >
                              <option value={""}>Select</option>
                              <option value={"treatment eligible"}>
                                Treatment Eligible
                              </option>
                              <option value={"hbv pmtct"}>HBV PMTCT</option>
                            </select>
                            {formik?.touched?.hepatitisBReasonForTreatment &&
                              formik.errors.hepatitisBReasonForTreatment !==
                              "" && (
                                <span className={classes.error}>
                                  {formik?.errors.hepatitisBReasonForTreatment}
                                </span>
                              )}
                          </CustomFormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-6">
                          <CustomFormGroup
                            formik={formik}
                            name="hepatitisBReasonsForTreatmentComment"
                          >
                            <Label for="hepatitisBReasonsForTreatmentComment">
                              Comment
                            </Label>
                            <textarea
                              className="form-control"
                              name="hepatitisBReasonsForTreatmentComment"
                              id="hepatitisBReasonsForTreatmentComment"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={
                                formik.values
                                  ?.hepatitisBReasonsForTreatmentComment
                              }
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                                height: "80px",
                              }}
                            />

                            {formik?.touched
                              ?.hepatitisBReasonsForTreatmentComment &&
                              formik.errors
                                .hepatitisBReasonsForTreatmentComment !==
                              "" && (
                                <span className={classes.error}>
                                  {
                                    formik?.errors
                                      .hepatitisBReasonsForTreatmentComment
                                  }
                                </span>
                              )}
                          </CustomFormGroup>
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
                <div>
                  <div className="card-body">
                    <div
                      className="basic-form"
                      style={{ padding: "0 50px 0 50px" }}
                    >
                      <div className="row">
                        <div className="form-group mb-3 col-md-4">
                          <CustomFormGroup
                            formik={formik}
                            name="hepatitisCPastTreatmentExperience"
                          >
                            <Label for="hepatitisCPastTreatmentExperience">
                              Treatment experience
                              {" "}
                            </Label>
                            <select
                              className="form-control"
                              name="hepatitisCPastTreatmentExperience"
                              id="hepatitisCPastTreatmentExperience"
                              value={
                                formik?.values
                                  ?.hepatitisCPastTreatmentExperience
                              }
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
                            {formik?.touched
                              ?.hepatitisCPastTreatmentExperience &&
                              formik?.errors
                                ?.hepatitisCPastTreatmentExperience && (
                                <span className={classes.error}>
                                  {
                                    formik?.errors
                                      .hepatitisCPastTreatmentExperience
                                  }
                                </span>
                              )}
                          </CustomFormGroup>
                        </div>
                        {formik.values?.hepatitisCPastTreatmentExperience?.toLowerCase() ===
                          "yes" && (
                            <div className="form-group mb-3 col-md-4">
                              <CustomFormGroup
                                formik={formik}
                                name="hepatitisCPastTreatmentRegimen"
                              >
                                <Label for="hepatitisCPastTreatmentRegimen">
                                  HCV Past treatment regimen
                                </Label>
                                {" "}
                                <select
                                  className="form-control"
                                  name="hepatitisCPastTreatmentRegimen"
                                  id="hepatitisCPastTreatmentRegimen"
                                  value={
                                    formik?.values?.hepatitisCPastTreatmentRegimen
                                  }
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                >
                                  <option value="">Select</option>
                                  {hcvTreatmentRegimenOptions?.map(
                                    ({ display }) => (
                                      <option key={display} value={display}>
                                        {display}
                                      </option>
                                    )
                                  )}
                                </select>
                                {formik?.touched
                                  ?.hepatitisCPastTreatmentRegimen &&
                                  formik?.errors
                                    .hepatitisCPastTreatmentRegimen && (
                                    <span className={classes.error}>
                                      {
                                        formik?.errors
                                          ?.hepatitisCPastTreatmentRegimen
                                      }
                                    </span>
                                  )}
                              </CustomFormGroup>
                            </div>
                          )}

                        {formik?.values?.hepatitisCPastTreatmentExperience?.toLowerCase() ===
                          "yes" && (
                            <>
                              <div className="form-group mb-3 col-md-4">
                                <CustomFormGroup
                                  formik={formik}
                                  name="hepatitisCPastTreatmentExperienceDateStarted"
                                >
                                  <Label for="hepatitisCPastTreatmentExperienceDateStarted">
                                    Date started
                                  </Label>
                                  {" "}
                                  <input
                                    className="form-control"
                                    type="date"
                                    name="hepatitisCPastTreatmentExperienceDateStarted"
                                    id="hepatitisCPastTreatmentExperienceDateStarted"
                                    max={moment(new Date()).format("YYYY-MM-DD")}
                                    min={moment(
                                      new Date(patientDateOfBirth)
                                    ).format("YYYY-MM-DD")}
                                    value={
                                      formik.values
                                        ?.hepatitisCPastTreatmentExperienceDateStarted
                                    }
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={{
                                      border: "1px solid #014D88",
                                      borderRadius: "0.2rem",
                                    }}
                                  />
                                  {formik?.touched
                                    ?.hepatitisCPastTreatmentExperienceDateStarted &&
                                    formik?.errors
                                      .hepatitisCPastTreatmentExperienceDateStarted && (
                                      <span className={classes.error}>
                                        {
                                          formik?.errors
                                            ?.hepatitisCPastTreatmentExperienceDateStarted
                                        }
                                      </span>
                                    )}
                                </CustomFormGroup>
                              </div>

                              <div className="form-group mb-3 col-md-4">
                                <CustomFormGroup
                                  formik={formik}
                                  name="hepatitisCPastTreatmentExperienceDateCompleted"
                                >
                                  <Label for="hepatitisCPastTreatmentExperienceDateCompleted">
                                    Date Completed{" "}

                                  </Label>
                                  <input
                                    className="form-control"
                                    type="date"
                                    name="hepatitisCPastTreatmentExperienceDateCompleted"
                                    id="hepatitisCPastTreatmentExperienceDateCompleted"
                                    max={moment(new Date()).format("YYYY-MM-DD")}
                                    min={
                                      formik?.values
                                        ?.hepatitisCPastTreatmentExperienceDateStarted
                                    }
                                    value={
                                      formik?.values
                                        ?.hepatitisCPastTreatmentExperienceDateCompleted
                                    }
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={{
                                      border: "1px solid #014D88",
                                      borderRadius: "0.2rem",
                                    }}
                                  />
                                  {formik?.touched
                                    ?.hepatitisCPastTreatmentExperienceDateCompleted &&
                                    formik?.errors
                                      ?.hepatitisCPastTreatmentExperienceDateCompleted && (
                                      <span className={classes.error}>
                                        {
                                          formik?.errors
                                            ?.hepatitisCPastTreatmentExperienceDateCompleted
                                        }
                                      </span>
                                    )}
                                </CustomFormGroup>
                              </div>

                              <div className="form-group mb-3 col-md-4">
                                <CustomFormGroup
                                  formik={formik}
                                  name="hepatitisCPastTreatmentExperiencePrescribedDuration"
                                >
                                  <Label for="hepatitisCPastTreatmentExperiencePrescribedDuration">
                                    Prescribed duration
                                  </Label>

                                  <select
                                    className="form-control"
                                    name="hepatitisCPastTreatmentExperiencePrescribedDuration"
                                    id="hepatitisCPastTreatmentExperiencePrescribedDuration"
                                    value={
                                      formik?.values
                                        ?.hepatitisCPastTreatmentExperiencePrescribedDuration
                                    }
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={{
                                      border: "1px solid #014D88",
                                      borderRadius: "0.2rem",
                                    }}
                                  >
                                    <option>Select</option>
                                    <option value={"8"}>8 weeks</option>
                                    <option value={"12"}>12 weeks</option>
                                    <option value={"24"}>24 weeks</option>
                                  </select>
                                  {formik?.touched
                                    ?.hepatitisCPastTreatmentExperiencePrescribedDuration &&
                                    formik?.errors
                                      .hepatitisCPastTreatmentExperiencePrescribedDuration && (
                                      <span className={classes.error}>
                                        {
                                          formik?.errors
                                            ?.hepatitisCPastTreatmentExperiencePrescribedDuration
                                        }
                                      </span>
                                    )}
                                </CustomFormGroup>
                              </div>
                            </>
                          )}

                        {/* Hepatitis C Treatment Regimen */}
                        <div className="form-group mb-3 col-md-4">
                          <CustomFormGroup
                            formik={formik}
                            name="hepatitisCNewTreatmentRegimen"
                          >
                            <Label for="hepatitisCNewTreatmentRegimen">
                              New regimen
                            </Label>
                            {" "}
                            <select
                              className="form-control"
                              name="hepatitisCNewTreatmentRegimen"
                              id="hepatitisCNewTreatmentRegimen"
                              value={
                                formik?.values?.hepatitisCNewTreatmentRegimen
                              }
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            >
                              <option value="" selected>
                                Select
                              </option>
                              {hcvTreatmentRegimenOptions?.map?.(
                                ({ display }) => (
                                  <option key={display} value={display}>
                                    {display}
                                  </option>
                                )
                              )}
                            </select>
                            {formik?.touched?.hepatitisCNewTreatmentRegimen &&
                              formik?.errors.hepatitisCNewTreatmentRegimen && (
                                <span className={classes.error}>
                                  {
                                    formik?.errors
                                      ?.hepatitisCNewTreatmentRegimen
                                  }
                                </span>
                              )}
                          </CustomFormGroup>
                        </div>

                        {formik.values?.hepatitisCNewTreatmentRegimen && (
                          <>
                            <div className="form-group mb-3 col-md-4">
                              <CustomFormGroup
                                formik={formik}
                                name="hepatitisCNewTreatmentRegimenPrescribedDuration"
                              >
                                <Label for="hepatitisCNewTreatmentRegimenPrescribedDuration">
                                  Prescribed duration
                                </Label>



                                <select
                                  className="form-control"
                                  name="hepatitisCNewTreatmentRegimenPrescribedDuration"
                                  id="hepatitisCNewTreatmentRegimenPrescribedDuration"
                                  value={
                                    formik?.values
                                      ?.hepatitisCNewTreatmentRegimenPrescribedDuration
                                  }
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                >
                                  <option>Select</option>
                                  <option value={"8"}>8 weeks</option>
                                  <option value={"12"}>12 weeks</option>
                                  <option value={"24"}>24 weeks</option>
                                </select>
                                {formik?.touched
                                  ?.hepatitisCNewTreatmentRegimenPrescribedDuration &&
                                  formik?.errors
                                    ?.hepatitisCNewTreatmentRegimenPrescribedDuration && (
                                    <span className={classes.error}>
                                      {
                                        formik?.errors
                                          .hepatitisCNewTreatmentRegimenPrescribedDuration
                                      }
                                    </span>
                                  )}
                              </CustomFormGroup>
                            </div>

                            <div className="form-group mb-3 col-md-4">
                              <CustomFormGroup
                                formik={formik}
                                name="hepatitisCNewTreatmentRegimenDateStarted"
                              >
                                <Label for="hepatitisCNewTreatmentRegimenDateStarted">
                                  Date started
                                </Label>
                                {" "}
                                <input
                                  className="form-control"
                                  type="date"
                                  name="hepatitisCNewTreatmentRegimenDateStarted"
                                  id="hepatitisCNewTreatmentRegimenDateStarted"
                                  max={moment(new Date()).format("YYYY-MM-DD")}
                                  min={moment(
                                    new Date(patientDateOfBirth)
                                  ).format("YYYY-MM-DD")}
                                  value={
                                    formik?.values
                                      ?.hepatitisCNewTreatmentRegimenDateStarted
                                  }
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                />
                              </CustomFormGroup>
                              {formik?.touched
                                ?.hepatitisCNewTreatmentRegimenDateStarted &&
                                formik?.errors
                                  .hepatitisCNewTreatmentRegimenDateStarted && (
                                  <span className={classes.error}>
                                    {
                                      formik?.errors
                                        ?.hepatitisCNewTreatmentRegimenDateStarted
                                    }
                                  </span>
                                )}
                            </div>

                            <div className="form-group mb-3 col-md-4">
                              <CustomFormGroup
                                formik={formik}
                                name="hepatitisCNewTreatmentRegimenDateCompleted"
                              >
                                <Label for="hepatitisCNewTreatmentRegimenDateCompleted">
                                  Date Completed{" "}

                                </Label>
                                <input
                                  className="form-control"
                                  type="date"
                                  name="hepatitisCNewTreatmentRegimenDateCompleted"
                                  id="hepatitisCNewTreatmentRegimenDateCompleted"
                                  max={moment(new Date()).format("YYYY-MM-DD")}
                                  min={
                                    formik.values
                                      ?.hepatitisCNewTreatmentRegimenDateStarted
                                  }
                                  value={
                                    formik.values
                                      ?.hepatitisCNewTreatmentRegimenDateCompleted
                                  }
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                />
                                {formik?.touched
                                  ?.hepatitisCNewTreatmentRegimenDateCompleted &&
                                  formik?.errors
                                    .hepatitisCNewTreatmentRegimenDateCompleted && (
                                    <span className={classes.error}>
                                      {
                                        formik?.errors
                                          .hepatitisCNewTreatmentRegimenDateCompleted
                                      }
                                    </span>
                                  )}
                              </CustomFormGroup>
                            </div>
                          </>
                        )}

                        <div className="form-group mb-3 col-md-4">
                          <CustomFormGroup
                            formik={formik}
                            name="hepatitisCAdverseEventReported"
                          >
                            <Label for="hepatitisCAdverseEventReported">
                              Adverse event reported
                            </Label>
                            {" "}
                            <select
                              className="form-control"
                              name="hepatitisCAdverseEventReported"
                              id="hepatitisCAdverseEventReported"
                              value={
                                formik?.values?.hepatitisCAdverseEventReported
                              }
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
                            {formik?.touched?.hepatitisCAdverseEventReported &&
                              formik?.errors
                                ?.hepatitisCAdverseEventReported && (
                                <span className={classes.error}>
                                  {
                                    formik?.errors
                                      .hepatitisCAdverseEventReported
                                  }
                                </span>
                              )}
                          </CustomFormGroup>
                        </div>
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
                          <CustomFormGroup
                            formik={formik}
                            name="hepatitisCSvr12TestingDateTested"
                          >
                            <Label for="hepatitisCSvr12TestingDateTested">
                              Date tested
                            </Label>
                            {" "}
                            <input
                              className="form-control"
                              name="hepatitisCSvr12TestingDateTested"
                              id="hepatitisCSvr12TestingDateTested"
                              type="date"
                              max={moment(new Date()).format("YYYY-MM-DD")}
                              min={moment(
                                new Date(patientDateOfBirth)
                              ).format()}
                              value={
                                formik?.values?.hepatitisCSvr12TestingDateTested
                              }
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />
                            {formik?.touched
                              ?.hepatitisCSvr12TestingDateTested &&
                              formik?.errors
                                .hepatitisCSvr12TestingDateTested && (
                                <span className={classes.error}>
                                  {formik?.touched
                                    ?.hepatitisCSvr12TestingDateTested &&
                                    formik?.errors
                                      .hepatitisCSvr12TestingDateTested}
                                </span>
                              )}
                          </CustomFormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <CustomFormGroup
                            formik={formik}
                            name="hepatitisCSvr12TestingHcvRna"
                          >
                            <Label for="hepatitisCSvr12TestingHcvRna">
                              HCV RNA{" "}
                              {" "}
                            </Label>
                            <select
                              className="form-control"
                              name="hepatitisCSvr12TestingHcvRna"
                              id="hepatitisCSvr12TestingHcvRna"
                              value={
                                formik?.values.hepatitisCSvr12TestingHcvRna
                              }
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
                            {formik?.touched?.hepatitisCSvr12TestingHcvRna &&
                              formik?.errors.hepatitisCSvr12TestingHcvRna !==
                              "" && (
                                <span className={classes.error}>
                                  {formik?.errors.hepatitisCSvr12TestingHcvRna}
                                </span>
                              )}
                          </CustomFormGroup>
                        </div>

                        {formik.values?.hepatitisCSvr12TestingHcvRna?.toLowerCase() ===
                          "detected" && (
                            <div className="form-group mb-3 col-md-4">
                              <CustomFormGroup
                                formik={formik}
                                name="hepatitisCSvr12TestingHcvRnaValue"
                              >
                                <Label for="hepatitisCSvr12TestingHcvRnaValue">
                                  Input HCV RNA value
                                  {" "}
                                </Label>
                                <input
                                  className="form-control"
                                  name="hepatitisCSvr12TestingHcvRnaValue"
                                  id="hepatitisCSvr12TestingHcvRnaValue"
                                  type="number"
                                  value={
                                    formik.values
                                      ?.hepatitisCSvr12TestingHcvRnaValue
                                  }
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  style={{
                                    border: "1px solid #014D88",
                                    borderRadius: "0.2rem",
                                  }}
                                />

                                {formik?.touched
                                  ?.hepatitisCSvr12TestingHcvRnaValue &&
                                  formik?.errors
                                    .hepatitisCSvr12TestingHcvRnaValue !== "" && (
                                    <span className={classes.error}>
                                      {
                                        formik?.errors
                                          .hepatitisCSvr12TestingHcvRnaValue
                                      }
                                    </span>
                                  )}
                              </CustomFormGroup>
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
                          <CustomFormGroup
                            formik={formik}
                            name="hepatitisCHcvRetreatmentHcvGenotype"
                          >
                            <Label for="hepatitisCHcvRetreatmentHcvGenotype">
                              HCV Genotype
                            </Label>

                            <select
                              className="form-control"
                              name="hepatitisCHcvRetreatmentHcvGenotype"
                              id="hepatitisCHcvRetreatmentHcvGenotype"
                              value={
                                formik?.values
                                  ?.hepatitisCHcvRetreatmentHcvGenotype
                              }
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            >
                              <option value="">Select</option>
                              {_hcvGenotypeData?.map(
                                ({ display }) => (
                                  <option key={display} value={display}>
                                    {display}
                                  </option>
                                )
                              )}

                            </select>

                            {formik?.touched
                              ?.hepatitisCHcvRetreatmentHcvGenotype &&
                              formik?.errors
                                .hepatitisCHcvRetreatmentHcvGenotype !== "" && (
                                <span className={classes.error}>
                                  {
                                    formik?.errors
                                      .hepatitisCHcvRetreatmentHcvGenotype
                                  }
                                </span>
                              )}
                          </CustomFormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <CustomFormGroup
                            formik={formik}
                            name="hepatitisCHcvRetreatmentNewRegimen"
                          >
                            <Label for="hepatitisCHcvRetreatmentNewRegimen">
                              New regimen
                            </Label>

                            <select
                              className="form-control"
                              name="hepatitisCHcvRetreatmentNewRegimen"
                              id="hepatitisCHcvRetreatmentNewRegimen"
                              type="text"
                              value={
                                formik.values
                                  ?.hepatitisCHcvRetreatmentNewRegimen
                              }
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            >
                              <option value="">Select</option>
                              {hcvTreatmentRegimenOptions?.map(
                                ({ display }) => (
                                  <option key={display} value={display}>
                                    {display}
                                  </option>
                                )
                              )}
                            </select>
                            {formik?.touched
                              ?.hepatitisCHcvRetreatmentNewRegimen &&
                              formik?.errors
                                .hepatitisCHcvRetreatmentNewRegimen && (
                                <span className={classes.error}>
                                  {
                                    formik?.errors
                                      .hepatitisCHcvRetreatmentNewRegimen
                                  }
                                </span>
                              )}
                          </CustomFormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <CustomFormGroup
                            formik={formik}
                            name="hepatitisCHcvRetreatmentPrescribedDuration"
                          >
                            <Label for="hepatitisCHcvRetreatmentPrescribedDuration">
                              Prescribed Duration
                              {" "}
                            </Label>
                            <select
                              className="form-control"
                              name="hepatitisCHcvRetreatmentPrescribedDuration"
                              id="hepatitisCHcvRetreatmentPrescribedDuration"
                              value={
                                formik.values
                                  ?.hepatitisCHcvRetreatmentPrescribedDuration
                              }
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            >
                              <option>Select</option>
                              <option value={"8"}>8 weeks</option>
                              <option value={"12"}>12 weeks</option>
                              <option value={"24"}>24 weeks</option>
                            </select>
                            {formik?.touched
                              ?.hepatitisCHcvRetreatmentPrescribedDuration &&
                              formik?.errors
                                .hepatitisCHcvRetreatmentPrescribedDuration !==
                              "" && (
                                <span className={classes.error}>
                                  {
                                    formik?.errors
                                      .hepatitisCHcvRetreatmentPrescribedDuration
                                  }
                                </span>
                              )}
                          </CustomFormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <CustomFormGroup
                            formik={formik}
                            name="hepatitisCHcvRetreatmentDateStarted"
                          >
                            <Label for="hepatitisCHcvRetreatmentDateStarted">
                              Date started

                            </Label>
                            <input
                              tpe={"date"}
                              className="form-control"
                              name="hepatitisCHcvRetreatmentDateStarted"
                              id="hepatitisCHcvRetreatmentDateStarted"
                              max={moment(new Date()).format("YYYY-MM-DD")}
                              min={moment(
                                new Date(patientDateOfBirth)
                              ).format()}
                              type="date"
                              value={
                                formik?.values
                                  ?.hepatitisCHcvRetreatmentDateStarted
                              }
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              style={{
                                border: "1px solid #014D88",
                                borderRadius: "0.2rem",
                              }}
                            />

                            {formik.touched
                              ?.hepatitisCHcvRetreatmentDateStarted &&
                              formik?.errors
                                .hepatitisCHcvRetreatmentDateStarted !== "" && (
                                <span className={classes.error}>
                                  {
                                    formik?.errors
                                      .hepatitisCHcvRetreatmentDateStarted
                                  }
                                </span>
                              )}
                          </CustomFormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <CustomFormGroup
                            formik={formik}
                            name="hepatitisCHcvRetreatmentAdverseEffect"
                          >
                            <Label for="hepatitisCHcvRetreatmentAdverseEffect">
                              Retreatment Adverse events
                              {" "}
                            </Label>
                            <select
                              className="form-control"
                              name="hepatitisCHcvRetreatmentAdverseEffect"
                              id="hepatitisCHcvRetreatmentAdverseEffect"
                              value={
                                formik?.values
                                  ?.hepatitisCHcvRetreatmentAdverseEffect
                              }
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
                            {formik?.touched
                              ?.hepatitisCHcvRetreatmentAdverseEffect &&
                              formik?.errors
                                .hepatitisCHcvRetreatmentAdverseEffect !==
                              "" && (
                                <span className={classes.error}>
                                  {
                                    formik?.errors
                                      .hepatitisCHcvRetreatmentAdverseEffect
                                  }
                                </span>
                              )}
                          </CustomFormGroup>
                        </div>

                        <div className="form-group mb-3 col-md-4">
                          <CustomFormGroup
                            formik={formik}
                            name="hepatitisCHcvRetreatmentHistoryOfAdverseEffect"
                          >
                            <Label for="hepatitisCHcvRetreatmentHistoryOfAdverseEffect">
                              History of adverse events
                              {" "}
                            </Label>
                            <select
                              className="form-control"
                              name="hepatitisCHcvRetreatmentHistoryOfAdverseEffect"
                              id="hepatitisCHcvRetreatmentHistoryOfAdverseEffect"
                              value={
                                formik?.values
                                  ?.hepatitisCHcvRetreatmentHistoryOfAdverseEffect
                              }
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
                            {formik?.touched
                              ?.hepatitisCHcvRetreatmentHistoryOfAdverseEffect &&
                              formik?.errors
                                .hepatitisCHcvRetreatmentHistoryOfAdverseEffect !==
                              "" && (
                                <span className={classes.error}>
                                  {
                                    formik?.errors
                                      .hepatitisCHcvRetreatmentHistoryOfAdverseEffect
                                  }
                                </span>
                              )}
                          </CustomFormGroup>
                        </div>
                      </div>
                    </div>
                  </Collapse>
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
                  Retreatment SVR12 testing
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
                        <CustomFormGroup
                          formik={formik}
                          name="hepatitisCRetreatmentSvr12TestingDateTested"
                        >
                          <Label for="hepatitisCRetreatmentSvr12TestingDateTested">
                            Retreatment date Tested
                          </Label>
                          <input
                            className="form-control"
                            name="hepatitisCRetreatmentSvr12TestingDateTested"
                            id="hepatitisCRetreatmentSvr12TestingDateTested"
                            max={moment(new Date()).format("YYYY-MM-DD")}
                            value={
                              formik.values
                                ?.hepatitisCRetreatmentSvr12TestingDateTested
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{
                              border: "1px solid #014D88",
                              borderRadius: "0.2rem",
                            }}
                            type="date"
                          />

                          {formik?.touched
                            ?.hepatitisCRetreatmentSvr12TestingDateTested &&
                            formik?.errors
                              ?.hepatitisCRetreatmentSvr12TestingDateTested !==
                            "" && (
                              <span className={classes.error}>
                                {
                                  formik?.errors
                                    .hepatitisCRetreatmentSvr12TestingDateTested
                                }
                              </span>
                            )}
                        </CustomFormGroup>
                      </div>

                      <div className="form-group mb-3 col-md-4">
                        <CustomFormGroup
                          formik={formik}
                          name="hepatitisCRetreatmentSvr12TestingRetreatmentHcvRna"
                        >
                          <Label for="hepatitisCRetreatmentSvr12TestingRetreatmentHcvRna">
                            Retreatment HCV RNA
                            {" "}
                          </Label>
                          <select
                            className="form-control"
                            name="hepatitisCRetreatmentSvr12TestingRetreatmentHcvRna"
                            id="hepatitisCRetreatmentSvr12TestingRetreatmentHcvRna"
                            value={
                              formik?.values
                                ?.hepatitisCRetreatmentSvr12TestingRetreatmentHcvRna
                            }
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

                          {formik.touched
                            ?.hepatitisCRetreatmentSvr12TestingRetreatmentHcvRna &&
                            formik?.errors
                              .hepatitisCRetreatmentSvr12TestingRetreatmentHcvRna !==
                            "" && (
                              <span className={classes.error}>
                                {
                                  formik?.errors
                                    .hepatitisCRetreatmentSvr12TestingRetreatmentHcvRna
                                }
                              </span>
                            )}
                        </CustomFormGroup>
                      </div>

                      {formik.values?.hepatitisCRetreatmentSvr12TestingRetreatmentHcvRna.toLowerCase() ===
                        "detected" && (
                          <div className="form-group mb-3 col-md-4">
                            <CustomFormGroup
                              formik={formik}
                              name="hepatitisCRetreatmentSvr12TestingRetreatmentHcvRnaValue"
                            >
                              <Label for="hepatitisCRetreatmentSvr12TestingRetreatmentHcvRnaValue">
                                Input Retreatment HCV RNA value
                                {" "}
                              </Label>
                              <input
                                className="form-control"
                                type="number"
                                name="hepatitisCRetreatmentSvr12TestingRetreatmentHcvRnaValue"
                                id="hepatitisCRetreatmentSvr12TestingRetreatmentHcvRnaValue"
                                value={
                                  formik.values
                                    ?.hepatitisCRetreatmentSvr12TestingRetreatmentHcvRnaValue
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                  border: "1px solid #014D88",
                                  borderRadius: "0.2rem",
                                }}
                              />

                              {formik.touched
                                ?.hepatitisCRetreatmentSvr12TestingRetreatmentHcvRnaValue &&
                                formik?.errors
                                  .hepatitisCRetreatmentSvr12TestingRetreatmentHcvRnaValue !==
                                "" && (
                                  <span className={classes.error}>
                                    {
                                      formik?.errors
                                        .hepatitisCRetreatmentSvr12TestingRetreatmentHcvRnaValue
                                    }
                                  </span>
                                )}
                            </CustomFormGroup>
                          </div>
                        )}
                    </div>
                  </div>
                </Collapse>
              </div>
            </div>
            <br />
            {isLoading && <Spinner />}
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
                className={classes.button}
                disabled={isLoading}
                style={{ backgroundColor: "#014d88", fontWeight: "bolder" }}
              >
                <span style={{ textTransform: "capitalize" }}>Submit</span>
              </MatButton>
            </div>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExistingPatientTreatment;
