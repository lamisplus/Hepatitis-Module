import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import { Link } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { ToastContainer } from "react-toastify";
import ExistingPatientRegistrationForm from "./Forms/ExistingPatientRegistrationForm";
import { useLocalStorageState } from "../../../hooks/useLocalStorageState";
import ExistingPatientDiagnosis from "./Forms/ExistingPatientDiagnosis";
import ExistingPatientTreatment from "./Forms/ExistingPatientTreatment";
import ExistingPatientSteppers from "./Stepper/ExisitingPatientSteppers";

const ExistingViralHepatitisFormsContainer = () => {
  const [step, setStep] = useState(2);

  const formMap = {
    0: <ExistingPatientRegistrationForm step={step} setStep={setStep} />,
    1: <ExistingPatientDiagnosis step={step} setStep={setStep} />,
    2: <ExistingPatientTreatment step={step} setStep={setStep} />
  };
  return (
    <>
      <ToastContainer autoClose={3000} hideProgressBar />
      <div>
        <div
          className="row page-titles mx-0"
          style={{ marginTop: "0px", marginBottom: "-10px" }}
        >
          <ol className="breadcrumb">
            <li className="breadcrumb-item active">
              <h4>
                {" "}
                <Link to={"/"}>Viral Hepatitis /</Link>Enroll Existing Client
              </h4>
            </li>
          </ol>
        </div>
        <Link
          to={{
            pathname: "/",
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
        <ExistingPatientSteppers activeStep={step} />
      </div>

      {formMap[step]}
    </>
  );
};

export default ExistingViralHepatitisFormsContainer;
