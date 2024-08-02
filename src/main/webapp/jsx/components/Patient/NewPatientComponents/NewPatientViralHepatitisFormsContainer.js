import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import { Link, useLocation } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { ToastContainer } from "react-toastify";
import NewPatientSteppers from "./Stepper/NewPatientSteppers";
import NewPatientRegistrationForm from "./Forms/NewPatientRegistrationForm";
import { useLocalStorageState } from "../../../hooks/useLocalStorageState";
import NewPatientDiagnosis from "./Forms/NewPatientDiagnosis";

const NewPatientViralHepatitisFormsContainer = () => {
  const [step, setStep] = useLocalStorageState(
    "new-patient-hepatitis-enrollment-form-step",
    0
  );

  useEffect(() => {
    setStep(0);
  }, []);
  const formMap = {
    // 0: <NewPatientRegistrationForm step={step} setStep={setStep} />,
    0: <NewPatientDiagnosis step={step} setStep={setStep} />
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
        <NewPatientSteppers activeStep={step} />
      </div>

      {formMap[step]}
    </>
  );
};

export default NewPatientViralHepatitisFormsContainer;
