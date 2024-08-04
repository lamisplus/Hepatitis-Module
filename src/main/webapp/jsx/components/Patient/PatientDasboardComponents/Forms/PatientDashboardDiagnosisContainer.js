import React from "react";
import PatientDashboardDiagnosisCreate from "./PatientDashboardDiagnosisCreate";

const PatientDashboardDiagnosisContainer = (props) => {
  const actionType = props?.activeContent?.actionType || "create";

  const componentMap = {
    create: <PatientDashboardDiagnosisCreate {...props} />,
  };
  return <>{componentMap[actionType]}</>;
};

export default PatientDashboardDiagnosisContainer;
