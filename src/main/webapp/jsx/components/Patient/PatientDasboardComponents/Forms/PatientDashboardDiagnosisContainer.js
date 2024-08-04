import React from "react";
import PatientDashboardDiagnosisCreate from "./PatientDashboardDiagnosisCreate";
import PatientDashboardDiagnosisViewUpdate from "./PatientDashboardDiagnosisViewUpdate";

const PatientDashboardDiagnosisContainer = (props) => {
  const actionType = props?.activeContent?.actionType || "create";

  const componentMap = {
    create: <PatientDashboardDiagnosisCreate {...props} />,
    view: <PatientDashboardDiagnosisViewUpdate {...props} disableInputs={true}/>,
    update: <PatientDashboardDiagnosisViewUpdate {...props} disableInputs={false}/>
  };
  return <>{componentMap[actionType]}</>;
};

export default PatientDashboardDiagnosisContainer;
