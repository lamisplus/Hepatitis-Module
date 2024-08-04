import React from "react";
import PatientDashboardDiagnosisCreate from "./PatientDashboardDiagnosisCreate";

const PatientDashboardDiagnosisContainer = (props) => {
  const actionType = props?.activeContent?.actionType || "create";

  const componentMap = {
    create: <PatientDashboardDiagnosisCreate {...props} />,
    view: <div>view of diagnosis</div>,
    update: <div>Update of diagnosis</div>
  };
  return <>{componentMap[actionType]}</>;
};

export default PatientDashboardDiagnosisContainer;
