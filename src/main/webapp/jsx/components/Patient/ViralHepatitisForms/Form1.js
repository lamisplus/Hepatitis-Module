import React, { useEffect } from "react";
import MatButton from "@material-ui/core/Button";
import { FormGroup, Label, Spinner, Form } from "reactstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckSquare,
  faCoffee,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";
import "react-widgets/dist/css/react-widgets.css";
import "react-phone-input-2/lib/style.css";
import "../patient.css";
import "react-widgets/dist/css/react-widgets.css";
import { useValidateForm1ValuesHook } from "../../../formSchemas/form1ValidationSchema";
import { ArrowForward } from "@material-ui/icons";
import { getCookie, setCookie } from "../../../helpers/cookieStoragehelpers";
import axios from "axios";
import { toast } from "react-toastify";
import { url as apiUrl, token } from "../../../../api";
import { useCallback } from "react";
import { useState } from "react";

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

const postDataWithToken = async (data, key) => {
  try {
    const response = await axios.post(`${apiUrl}${key}`, data, {
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

const ViralHepatitisForm1 = ({ setStep }) => {
  const [basicInfo, setBasicInfo] = useState({
    active: true,
    streetAddress: "",
    address: [],
    contact: [],
    contactPoint: [],
    dateOfBirth: "",
    deceased: false,
    deceasedDateTime: null,
    firstName: "",
    genderId: "",
    identifier: "",
    otherName: "",
    maritalStatusId: "",
    educationId: "",
    employmentStatusId: "",
    dateOfRegistration: "",
    isDateOfBirthEstimated: null,
    age: "",
    phoneNumber: "",
    altPhonenumber: "",
    dob: "",
    countryId: 1,
    stateId: "",
    district: "",
    sexId: "",
    ninNumber: "",
  });

  const [allContacts, setAllContacts] = useState([]);
  const [saving, setSaving] = useState(false);
  const [disabledAgeBaseOnAge, setDisabledAgeBaseOnAge] = useState(false);
  const [ageDisabled, setAgeDisabled] = useState(true);
  const [showRelative, setShowRelative] = useState(false);
  const [patientFacilityId, setPatientFacilityId] = useState(null);
  const [genders, setGenders] = useState([]);
  const [maritalStatusOptions, setMaritalStatusOptions] = useState([]);
  const [educationOptions, setEducationOptions] = useState([]);
  const [occupationOptions, setOccupationOptions] = useState([]);
  const [relationshipOptions, setRelationshipOptions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [errors, setErrors] = useState({});
  const [topLevelUnitCountryOptions, settopLevelUnitCountryOptions] = useState(
    []
  );
  const [carePoints, setCarePoints] = useState([]);
  const [sourceReferral, setSourceReferral] = useState([]);
  const [pregnancyStatus, setPregnancyStatus] = useState([]);

  const sexCodeset = async () => {
    const response = await axios.get(`${apiUrl}application-codesets/v2/SEX`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setGenders(response.data.sort());
  };

  const loadMaritalStatus = useCallback(async () => {
    try {
      const response = await axios.get(
        `${apiUrl}application-codesets/v2/MARITAL_STATUS`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMaritalStatusOptions(response.data.sort());
    } catch (e) {}
  }, []);

  const loadEducation = useCallback(async () => {
    try {
      const response = await axios.get(
        `${apiUrl}application-codesets/v2/EDUCATION`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEducationOptions(response.data.sort());
    } catch (e) {}
  }, []);

  const loadOccupation = useCallback(async () => {
    try {
      const response = await axios.get(
        `${apiUrl}application-codesets/v2/OCCUPATION`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOccupationOptions(response.data.sort());
    } catch (e) {}
  }, []);

  const CareEntryPoint = () => {
    axios
      .get(`${apiUrl}application-codesets/v2/POINT_ENTRY`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //console.log(response.data);
        setCarePoints(response.data);
      })
      .catch((error) => {
        //console.log(error);
      });
  };
  //Get list of Source of Referral
  const SourceReferral = () => {
    axios
      .get(`${apiUrl}application-codesets/v2/SOURCE_REFERRAL`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //console.log(response.data);
        setSourceReferral(response.data);
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  const EnrollmentSetting = () => {
    axios
      .get(`${apiUrl}application-codesets/v2/ENROLLMENT_SETTING`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //console.log(response.data);
        setEnrollSetting(response.data);
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  const loadRelationships = useCallback(async () => {
    try {
      const response = await axios.get(
        `${apiUrl}application-codesets/v2/RELATIONSHIP`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRelationshipOptions(response.data.sort());
    } catch (e) {}
  }, []);

  const loadTopLevelCountry = useCallback(async () => {
    const response = await axios.get(
      `${apiUrl}organisation-units/parent-organisation-units/0`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    settopLevelUnitCountryOptions(response.data.sort());
  }, []);

  const loadOrganisationUnitsByParentId = async (parentId) => {
    const response = await axios.get(
      `${apiUrl}organisation-units/parent-organisation-units/${parentId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  };
  const calculate_age = (dob) => {
    const today = new Date();
    const dateParts = dob.split("-");
    const birthDate = new Date(dob); // create a date object directlyfrom`dob1`argument
    let age_now = today.getFullYear() - birthDate.getFullYear();

    return age_now;
  };
  const phoneNumberFormatCheck = (phone) => {
    //console.log("err", phone);
    if (
      phone != undefined &&
      typeof phone?.value !== null &&
      typeof phone?.value !== "undefined" &&
      phone?.value?.charAt(0) === "0"
    ) {
      phone.value = phone.value.replace("0", "234");
    }
    return phone;
  };
  //Country List
  const GetCountry = () => {
    axios
      .get(`${apiUrl}organisation-units/parent-organisation-units/0`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        //console.log(error);
      });
  };
  //Get States from selected country
  const getStates = (e) => {
    const getCountryId = e?.target?.value;
    setStateByCountryId(1);
    setBasicInfo({ ...basicInfo, countryId: getCountryId });
  };
  //Get list of State
  function setStateByCountryId() {
    axios
      .get(`${apiUrl}organisation-units/parent-organisation-units/1`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //console.log(response.data);
        setStates(response.data.sort());
      })
      .catch((error) => {
        //console.log(error);
      });
  }
  //fetch province
  const getProvinces = (e) => {
    const stateId = e?.target?.value;
    setBasicInfo({ ...basicInfo, stateId: e?.target?.value });
    axios
      .get(
        `${apiUrl}organisation-units/parent-organisation-units/${formik?.values?.state}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setProvinces(response.data.sort());
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  const postDataWithToken = async (data, key) => {
    try {
      const response = await axios.post(`${apiUrl}${key}`, data, {
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
      toast.error("Enrolment failed");
      console.error("Error posting data:", error.message);
      throw error;
    }
  };

  const onSubmitHandler = (values) => {
    window.scrollTo(0, 0);
    const restructuredEnrolmentPayload = {
      bmi: values.weight / values.height,
      breastfeeding: values.breastfeeding,
      coreEntryPoint: "DF",
      height: values.height,
      hepatitisB: "string",
      historyOfUsingAbusedSubstance: values.historyOfUsingAbusedSubstance,
      personDto: {
        active: true,
        address: [
          {
            city: "Kano",
            countryId: 40,
            district: "string",
            line: ["string"],
            postalCode: "string",
            stateId: 0,
          },
        ],
        contact: [
          {
            address: {
              city: "string",
              countryId: 3,
              district: "string",
              line: ["string"],
              organisationUnitId: 0,
              postalCode: "string",
              stateId: 0,
            },
            contactPoint: { type: "string", value: "string" },
            firstName: "James",
            genderId: null,
            otherName: "Milner",
            relationshipId: 0,
            surname: "string",
          },
        ],
        contactPoint: [{ type: "string", value: "string" }],
        dateOfBirth: "2021-02-05",
        dateOfRegistration: "2021-02-03",
        deceased: true,
        deceasedDateTime: "2023-09-07T14:58:21.006Z",
        educationId: null,
        employmentStatusId: null,
        emrId: "string",
        facilityId: 1456,
        firstName: "string",
        genderId: null,
        id: 0,
        identifier: [{ assignerId: 0, type: "string", value: "string" }],
        isDateOfBirthEstimated: true,
        maritalStatusId: null,
        ninNumber: "string",
        organizationId: 0,
        otherName: "string",
        sexId: 377,
        surname: "string",
        uuid: "string",
      },
      pregnancy: values.pregnancy,
      screening: {
        dateOfFirstHepatitisBPositiveScreening: "2020-08-23",
        hepatitisC: null,
      },
      weight: values.weight,
    };
    //{
    //   coreEntryPoint: values.coreEntryPoint,
    //   pregnancy: values.pregnancy,
    //   weight: values.weight,
    //   height: values.height,
    //   bmi: values.weight / values.height,
    //   hepatitisB: values.hepatitisB,
    //   breastfeeding: values.breastfeeding,
    //   historyOfUsingAbusedSubstance: values.historyOfUsingAbusedSubstance,
    //   screening: {
    //     dateOfFirstHepatitisBPositiveScreening:
    //       values.dateOfFirstHepatitisBPositiveScreening,
    //     hepatitisC: values.hepatitisC,
    //   },
    //   personDto: {
    //     contact: [
    //       {
    //         address: {
    //           city: "string",
    //           countryId: 0,
    //           district: "string",
    //           line: ["string"],
    //           organisationUnitId: 0,
    //           postalCode: "string",
    //           stateId: 0,
    //         },
    //         contactPoint: {
    //           type: "string",
    //           value: "string",
    //         },
    //         firstName: "string",
    //         genderId: 0,
    //         otherName: "string",
    //         relationshipId: 0,
    //         surname: "string",
    //       },
    //     ],
    //     contactPoint: [
    //       {
    //         type: "string",
    //         value: "string",
    //       },
    //     ],
    //     dateOfBirth: values.dateOfBirth,
    //     active: true,
    //     address: [
    //       {
    //         city: "",
    //         countryId: Number(values.countryId),
    //         district: "",
    //         line: [],
    //         organisationUnitId: 0,
    //         postalCode: "",
    //         stateId: Number(values.stateId),
    //       },
    //     ],
    //     age: calculate_age(values.dateOfBirth),
    //     // stateId: values.stateId,
    //     educationId: Number(values.educationId),
    //     employmentStatusId: Number(values.employmentStatusId),
    //     maritalStatusId: Number(values.maritalStatusId),
    //     isDateOfBirthEstimated:
    //       values.isDateOfBirthEstimated === "true" ? true : false,
    //     ninNumber: values.ninNumber,
    //     surname: values.surname,
    //     firstName: values.firstName,
    //     otherName: values.otherName,
    //     sexId: Number(values.sexId),
    //     genderId: Number(values.sexId),
    //     organizationId: 0,
    //   },
    // };
    setCookie("hepatitis1", values, 1);
    setCookie("heaptitis1PayloadValue", restructuredEnrolmentPayload, 1);

    postDataWithToken(restructuredEnrolmentPayload, "hepatitis/enrollment");
    // setStep(1);
  };
  const classes = useStyles();
  const { formik } = useValidateForm1ValuesHook(onSubmitHandler);

  const castCookieValueToForm = () => {
    const cookieValue = getCookie("hepatitis1");
    if (cookieValue) {
      formik.setValues(cookieValue);
    }
  };

  const PregnancyStatus = () => {
    axios
      .get(`${apiUrl}application-codesets/v2/PREGNANCY_STATUS`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //console.log(response.data);
        setPregnancyStatus(response.data);
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  useEffect(() => {
    castCookieValueToForm();
    sexCodeset();
    PregnancyStatus();
    CareEntryPoint();
    SourceReferral();
    loadMaritalStatus();
    loadTopLevelCountry();
    loadRelationships();
    loadOrganisationUnitsByParentId();
    EnrollmentSetting();
    loadEducation();
    getProvinces();
    setStateByCountryId();
    loadOccupation();
    getStates();
    GetCountry();
  }, []);

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
                    Demography
                  </h5>
                </div>

                <div className="card-body">
                  <div className="basic-form">
                    <div className="row">
                      {/* <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                          <Label for="facilityId">
                            Facility Id <span style={{ color: "red" }}> *</span>{" "}
                          </Label>
                          <input
                            className="form-control"
                            type="number"
                            name="facilityId"
                            id="facilityId"
                            value={formik.values.facilityId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{
                              border: "1px solid #014D88",
                              borderRadius: "0.2rem",
                            }}
                          />
                          {formik.errors.facilityId !== "" ? (
                            <span className={classes.error}>
                              {formik.errors.facilityId}
                            </span>
                          ) : (
                            ""
                          )}
                        </FormGroup>
                      </div> */}
                      <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                          <Label for="surname">
                            Surname <span style={{ color: "red" }}> *</span>{" "}
                          </Label>
                          <input
                            className="form-control"
                            type="text"
                            name="surname"
                            id="surname"
                            value={formik.values.surname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{
                              border: "1px solid #014D88",
                              borderRadius: "0.2rem",
                            }}
                          />
                          {formik.errors.surname !== "" ? (
                            <span className={classes.error}>
                              {formik.errors.surname}
                            </span>
                          ) : (
                            ""
                          )}
                        </FormGroup>
                      </div>
                      <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                          <Label for="firstName">
                            Firstname <span style={{ color: "red" }}> *</span>{" "}
                          </Label>
                          <input
                            className="form-control"
                            type="text"
                            name="firstName"
                            id="firstName"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{
                              border: "1px solid #014D88",
                              borderRadius: "0.2rem",
                            }}
                          />
                          {formik.errors.firstName !== "" ? (
                            <span className={classes.error}>
                              {formik.errors.firstName}
                            </span>
                          ) : (
                            ""
                          )}
                        </FormGroup>
                      </div>
                      <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                          <Label for="otherName">Other name </Label>
                          <input
                            className="form-control"
                            type="text"
                            name="otherName"
                            id="otherName"
                            value={formik.values.otherName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{
                              border: "1px solid #014D88",
                              borderRadius: "0.2rem",
                            }}
                          />
                          {formik.errors.otherName !== "" ? (
                            <span className={classes.error}>
                              {formik.errors.otherName}
                            </span>
                          ) : (
                            ""
                          )}
                        </FormGroup>
                      </div>
                      <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                          <Label for="phone">
                            Phone <span style={{ color: "red" }}> *</span>{" "}
                          </Label>
                          <input
                            className="form-control"
                            type="text"
                            name="phone"
                            id="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{
                              border: "1px solid #014D88",
                              borderRadius: "0.2rem",
                            }}
                          />
                          {formik.errors.phone !== "" ? (
                            <span className={classes.error}>
                              {formik.errors.phone}
                            </span>
                          ) : (
                            ""
                          )}
                        </FormGroup>
                      </div>
                      {/* <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                          <Label for="residentialAddress">
                            Residential Address{" "}
                            <span style={{ color: "red" }}> *</span>{" "}
                          </Label>
                          <input
                            className="form-control"
                            type="text"
                            name="residentialAddress"
                            id="residentialAddress"
                            value={formik.values.residentialAddress}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{
                              border: "1px solid #014D88",
                              borderRadius: "0.2rem",
                            }}
                          />
                          {formik.errors.residentialAddress !== "" ? (
                            <span className={classes.error}>
                              {formik.errors.residentialAddress}
                            </span>
                          ) : (
                            ""
                          )}
                        </FormGroup>
                      </div> */}

                      <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                          <Label for="countryId">
                            Country <span style={{ color: "red" }}> *</span>{" "}
                          </Label>
                          <select
                            className="form-control"
                            // type="text"
                            name="countryId"
                            id="countryId"
                            value={formik.values.countryId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{
                              border: "1px solid #014D88",
                              borderRadius: "0.2rem",
                            }}
                          >
                            <option value="">Select</option>
                            {countries.map((item, index) => (
                              <option value={Number(item.id)} key={index}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                          {formik.errors.countryId !== "" ? (
                            <span className={classes.error}>
                              {formik.errors.countryId}
                            </span>
                          ) : (
                            ""
                          )}
                        </FormGroup>
                      </div>
                      <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                          <Label for="stateId">
                            State <span style={{ color: "red" }}> *</span>{" "}
                          </Label>
                          <select
                            className="form-control"
                            name="stateId"
                            id="stateId"
                            value={formik.values.stateId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{
                              border: "1px solid #014D88",
                              borderRadius: "0.2rem",
                            }}
                          >
                            <option value="">Select</option>
                            {states.map((item, index) => (
                              <option value={Number(item.id)} key={index}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                          {formik.errors.stateId !== "" ? (
                            <span className={classes.error}>
                              {formik.errors.stateId}
                            </span>
                          ) : (
                            ""
                          )}
                        </FormGroup>
                      </div>

                      <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                          <Label for="landmark">Landmark </Label>
                          <input
                            className="form-control"
                            type="text"
                            name="landmark"
                            id="landmark"
                            value={formik.values.landmark}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{
                              border: "1px solid #014D88",
                              borderRadius: "0.2rem",
                            }}
                          />
                          {formik.errors.landmark !== "" ? (
                            <span className={classes.error}>
                              {formik.errors.landmark}
                            </span>
                          ) : (
                            ""
                          )}
                        </FormGroup>
                      </div>
                      {/* <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                          <Label for="lga">LGA </Label>
                          <input
                            className="form-control"
                            type="text"
                            name="lga"
                            id="lga"
                            value={formik.values.lga}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{
                              border: "1px solid #014D88",
                              borderRadius: "0.2rem",
                            }}
                          />
                          {formik.errors.lga !== "" ? (
                            <span className={classes.error}>
                              {formik.errors.lga}
                            </span>
                          ) : (
                            ""
                          )}
                        </FormGroup>
                      </div> */}
                      <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                          <Label for="dateOfBirth">
                            Date of birth
                            <span style={{ color: "red" }}> *</span>{" "}
                          </Label>
                          <input
                            className="form-control"
                            type="date"
                            name="dateOfBirth"
                            id="dateOfBirth"
                            value={formik.values.dateOfBirth}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{
                              border: "1px solid #014D88",
                              borderRadius: "0.2rem",
                            }}
                          />
                          {formik.errors.dateOfBirth !== "" ? (
                            <span className={classes.error}>
                              {formik.errors.dateOfBirth}
                            </span>
                          ) : (
                            ""
                          )}
                        </FormGroup>
                      </div>
                      <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                          <Label for="isDateOfBirthEstimated">
                            Is date Of estimated
                            <span style={{ color: "red" }}> *</span>{" "}
                          </Label>
                          <select
                            className="form-control"
                            // type="date"
                            name="isDateOfBirthEstimated"
                            id="isDateOfBirthEstimated"
                            value={formik.values.isDateOfBirthEstimated}
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
                          {formik.errors.isDateOfBirthEstimated !== "" ? (
                            <span className={classes.error}>
                              {formik.errors.isDateOfBirthEstimated}
                            </span>
                          ) : (
                            ""
                          )}
                        </FormGroup>
                      </div>

                      <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                          <Label for="dateOfRegistration">
                            Date of registration
                            <span style={{ color: "red" }}> *</span>{" "}
                          </Label>
                          <input
                            className="form-control"
                            type="date"
                            name="dateOfRegistration"
                            id="dateOfRegistration"
                            value={formik.values.dateOfRegistration}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{
                              border: "1px solid #014D88",
                              borderRadius: "0.2rem",
                            }}
                          />
                          {formik.errors.dateOfRegistration !== "" ? (
                            <span className={classes.error}>
                              {formik.errors.dateOfRegistration}
                            </span>
                          ) : (
                            ""
                          )}
                        </FormGroup>
                      </div>

                      <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                          <Label for="employmentStatusId">Occupation</Label>
                          <select
                            className="form-control"
                            name="employmentStatusId"
                            id="employmentStatusId"
                            value={formik.values.employmentStatusId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{
                              border: "1px solid #014D88",
                              borderRadius: "0.2rem",
                            }}
                          >
                            <option value="">Select</option>
                            {occupationOptions.map((item, index) => (
                              <option
                                value={Number(item.id)}
                                key={Number(item.id)}
                              >
                                {item.display}
                              </option>
                            ))}
                          </select>
                          {formik.errors.employmentStatusId !== "" ? (
                            <span className={classes.error}>
                              {formik.errors.employmentStatusId}
                            </span>
                          ) : (
                            ""
                          )}
                        </FormGroup>
                      </div>
                      <div className="form-group mb-3 col-md-4">
                        <FormGroup>
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
                            {maritalStatusOptions.map((item, index) => (
                              <option value={Number(item.id)}>
                                {item.display}
                              </option>
                            ))}
                          </select>
                          {formik.errors.maritalStatusId !== "" ? (
                            <span className={classes.error}>
                              {formik.errors.maritalStatusId}
                            </span>
                          ) : (
                            ""
                          )}
                        </FormGroup>
                      </div>
                      <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                          <Label for="educationId">
                            Education <span style={{ color: "red" }}> *</span>{" "}
                          </Label>
                          <select
                            className="form-control"
                            // type="text"
                            name="educationId"
                            id="educationId"
                            value={formik.values.educationId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{
                              border: "1px solid #014D88",
                              borderRadius: "0.2rem",
                            }}
                          >
                            <option>Select</option>
                            {educationOptions.map((item, index) => (
                              <option value={Number(item.id)}>
                                {item.display}
                              </option>
                            ))}
                          </select>
                          {formik.errors.educationId !== "" ? (
                            <span className={classes.error}>
                              {formik.errors.educationId}
                            </span>
                          ) : (
                            ""
                          )}
                        </FormGroup>
                      </div>

                      <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                          <Label for="relationship">
                            Relationship{" "}
                            <span style={{ color: "red" }}> *</span>{" "}
                          </Label>
                          <select
                            className="form-control"
                            name="relationship"
                            id="relationship"
                            value={formik.values.relationship}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{
                              border: "1px solid #014D88",
                              borderRadius: "0.2rem",
                            }}
                          >
                            <option>Select</option>
                            {relationshipOptions.map((item, index) => (
                              <option value={Number(item.id)}>
                                {item.display}
                              </option>
                            ))}
                          </select>
                          {formik.errors.relationship !== "" ? (
                            <span className={classes.error}>
                              {formik.errors.relationship}
                            </span>
                          ) : (
                            ""
                          )}
                        </FormGroup>
                      </div>

                      <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                          <Label for="sexId">
                            Sex <span style={{ color: "red" }}> *</span>{" "}
                          </Label>
                          <select
                            className="form-control"
                            name="sexId"
                            id="sexId"
                            value={formik.values.sexId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{
                              border: "1px solid #014D88",
                              borderRadius: "0.2rem",
                            }}
                          >
                            <option>Select</option>
                            {genders.map((item, index) => (
                              <option value={Number(item.id)}>
                                {item.display}
                              </option>
                            ))}
                          </select>
                          {formik.errors.sexId !== "" ? (
                            <span className={classes.error}>
                              {formik.errors.sexId}
                            </span>
                          ) : (
                            ""
                          )}
                        </FormGroup>
                      </div>

                      <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                          <Label for="ninNumber">NIN number </Label>
                          <input
                            className="form-control"
                            type="text"
                            name="ninNumber"
                            id="ninNumber"
                            value={formik.values.ninNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{
                              border: "1px solid #014D88",
                              borderRadius: "0.2rem",
                            }}
                          />
                          {formik.errors.ninNumber !== "" ? (
                            <span className={classes.error}>
                              {formik.errors.ninNumber}
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

                <div className="card-body">
                  <div className="row">
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="coreEntryPoint">
                          Core entry point
                          <span style={{ color: "red" }}> *</span>{" "}
                        </Label>
                        <select
                          className="form-control"
                          name="coreEntryPoint"
                          id="coreEntryPoint"
                          value={formik.values.coreEntryPoint}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        >
                          <option value=""> </option>
                          {carePoints.map((value) => (
                            <option key={value.id} value={value.id}>
                              {value.display}
                            </option>
                          ))}
                        </select>
                        {formik.errors.coreEntryPoint !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.coreEntryPoint}
                          </span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>
                    {/* <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="sex">
                          Sex <span style={{ color: "red" }}> *</span>{" "}
                        </Label>
                        <select
                          className="form-control"
                          name="sex"
                          id="sex"
                          value={formik.values.sex}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        >
                          <option value="">Select</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                        {formik.errors.sex !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.sex}
                          </span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div> */}

                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="pregnancy">
                          Pregnancy <span style={{ color: "red" }}> *</span>{" "}
                        </Label>
                        <select
                          className="form-control"
                          name="pregnancy"
                          id="pregnancy"
                          value={formik.values.pregnancy}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        >
                          <option value="">Select </option>
                          {pregnancyStatus.map((value) => (
                            <option key={value.id} value={value.id}>
                              {value.display}
                            </option>
                          ))}
                        </select>
                        {formik.errors.pregnancy !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.pregnancy}
                          </span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>

                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="weight">
                          Weight (in KG){" "}
                          <span style={{ color: "red" }}> *</span>{" "}
                        </Label>
                        <input
                          className="form-control"
                          type="number"
                          name="weight"
                          id="weight"
                          value={formik.values.weight}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
                        {formik.errors.weight !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.weight}
                          </span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>

                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="height">
                          Height (In M) <span style={{ color: "red" }}> *</span>{" "}
                        </Label>
                        <input
                          className="form-control"
                          type="number"
                          name="height"
                          id="height"
                          value={formik.values.height}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
                        {formik.errors.height !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.height}
                          </span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>

                    {/* <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="bmi">BMI </Label>
                        <input
                          className="form-control"
                          type="number"
                          name="bmi"
                          id="bmi"
                          value={formik.values.bmi}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
                        {formik.errors.bmi !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.bmi}
                          </span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div> */}

                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="hepatitisB">
                          Hepatitis B (HBsAg){" "}
                          <span style={{ color: "red" }}> *</span>{" "}
                        </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="hepatitisB"
                          id="hepatitisB"
                          value={formik.values.hepatitisB}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
                        {formik.errors.hepatitisB !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.hepatitisB}
                          </span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="breastfeeding">
                          Breastfeeding <span style={{ color: "red" }}> *</span>{" "}
                        </Label>
                        <select
                          className="form-control"
                          name="breastfeeding"
                          id="breastfeeding"
                          value={formik.values.breastfeeding}
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
                        {formik.errors.breastfeeding !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.breastfeeding}
                          </span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="historyOfUsingAbusedSubstance">
                          History of using abused substance{" "}
                        </Label>
                        <select
                          className="form-control"
                          name="historyOfUsingAbusedSubstance"
                          id="historyOfUsingAbusedSubstance"
                          value={formik.values.historyOfUsingAbusedSubstance}
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
                        {formik.errors.historyOfUsingAbusedSubstance !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.historyOfUsingAbusedSubstance}
                          </span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
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
                    Screening
                  </h5>
                </div>

                <div className="card-body">
                  <div className="row">
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="dateOfFirstHepatitisBPositiveScreening">
                          Date of first Hep. B positive screening{" "}
                          <span style={{ color: "red" }}> *</span>{" "}
                        </Label>
                        <input
                          className="form-control"
                          type="date"
                          name="dateOfFirstHepatitisBPositiveScreening"
                          id="dateOfFirstHepatitisBPositiveScreening"
                          value={
                            formik.values.dateOfFirstHepatitisBPositiveScreening
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
                        {formik.errors
                          .dateOfFirstHepatitisBPositiveScreening !== "" ? (
                          <span className={classes.error}>
                            {
                              formik.errors
                                .dateOfFirstHepatitisBPositiveScreening
                            }
                          </span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="hepatitisC">Hepatitis C (HCVAb) </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="hepatitisC"
                          id="hepatitisC"
                          value={formik.values.hepatitisC}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        />
                        {formik.errors.hepatitisC !== "" ? (
                          <span className={classes.error}>
                            {formik.errors.hepatitisC}
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
              <div className="d-flex justify-content-end">
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

export default ViralHepatitisForm1;
