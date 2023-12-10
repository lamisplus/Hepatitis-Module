import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { ToastContainer } from "react-toastify";
import Steppers from "./Stepper/Stepper";
import ViralHepatitisForm1 from "./ViralHepatitisForms/Form1";
import ViralHepatitisForm2 from "./ViralHepatitisForms/Form2";
import ViralHepatitisForm3 from "./ViralHepatitisForms/Form3";
import ViralHepatitisForm4 from "./ViralHepatitisForms/Form4";
import FollowupForm from "./ViralHepatitisForms/FollowUp";
import LaboratoryRegister from "./ViralHepatitisForms/LaboratoryRegister";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";

const ViralHepatitisFormsContainer = (props) => {
  const [step, setStep] = useLocalStorageState(
    "hepatitis-enrollment-form-step",
    0
  );
  const location = useLocation();
  const locationState = location.state;

  console.log(locationState);
  useEffect(() => {
    setStep(0);
  }, []);
  const formMap = {
    0: (
      <ViralHepatitisForm1
        step={step}
        setStep={setStep}
        userStatus={locationState.existingPatient}
        patientObj={locationState.patientObj}
      />
    ),
    1: <ViralHepatitisForm2 step={step} setStep={setStep} />,
    2: (
      <ViralHepatitisForm3
        step={step}
        setStep={setStep}
        userStatus={locationState.existingPatient}
      />
    ),
    // 3: <FollowupForm step={step} setStep={setStep}/>,
    // 4: <LaboratoryRegister/>,
  };
  return (
    <>
      <ToastContainer autoClose={3000} hideProgressBar />
      <div
        className="row page-titles mx-0"
        style={{ marginTop: "0px", marginBottom: "-10px" }}
      >
        <ol className="breadcrumb">
          <li className="breadcrumb-item active">
            <h4>
              {" "}
              <Link to={"/"}>Viral Hepatitis /</Link>New Client
            </h4>
          </li>
        </ol>
      </div>
      <Link
        to={{
          pathname: "/",
          state: "users",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          className=" float-end mr-10 pr-10"
          style={{
            backgroundColor: "#014d88",
            fontWeight: "bolder",
            margingRight: "-40px",
          }}
          startIcon={<TiArrowBack />}
        >
          <span style={{ textTransform: "capitalize", color: "#fff" }}>
            Back{" "}
          </span>
        </Button>
      </Link>
      <br />
      <br />
      <Steppers activeStep={step} />
      {formMap[step]}
    </>
  );
};

export default ViralHepatitisFormsContainer;
