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
import { Collapse, IconButton } from "@material-ui/core";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import { useValidateSummaryValuesHook } from "../../../formSchemas/summaryFormsValidationSchema";
import DynamicSummaryForm from "./DynamicSummaryForm";

import SubHeaderSummaryForm from "./SubHeaderSummary";
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
  const { formik } = useValidateSummaryValuesHook();
  const [isDropdownsOpen, setIsDropdownsOpen] = useState({
    hepatitisBDropdown: true,
    hepatitisCDropdown: true,
    coInfectionDropdown: true,
  });
  return (
    <>
      {/* <Card className={classes.root}> */}
      {/* <CardContent> */}
      <SubHeaderSummaryForm headerText="DIAGNOSIS - Reactive" />
      <SubHeaderSummaryForm headerText="DIAGNOSIS - Non-Reactive" />
      <SubHeaderSummaryForm headerText="COMPLICATIONS - Fibrosis" />
      <SubHeaderSummaryForm headerText="COMPLICATIONS - Cirrhosis" />
      <SubHeaderSummaryForm headerText="COMPLICATIONS - Hepatocellular carcinoma" />
      <SubHeaderSummaryForm headerText="TREATMENT - HBV DNA <2000 IU/ml" />
      <SubHeaderSummaryForm headerText="TREATMENT - HBV DNA ≥2000 IU/ml" />
      <SubHeaderSummaryForm headerText="TREATMENT - HBV DNA ≥200,000 IU/ml" />
      <SubHeaderSummaryForm headerText="TREATMENT - HBeAg +ve" />

      {/* </CardContent> */}
      {/* </Card> */}
    </>
  );
};

export default Reactive;
