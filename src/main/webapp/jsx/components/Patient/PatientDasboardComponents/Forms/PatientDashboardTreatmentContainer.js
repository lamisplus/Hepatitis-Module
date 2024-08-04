import React from "react";
import PatientDashboardTreatment from "./PatientDashboardTreatmentCreate";
import PatientDashboardTreatmentViewUpdate from "./PatientDashboardTreatmentViewUpdate";

const PatientDashboardTreatmentContainer = (props) => {
  const actionType = props?.activeContent?.actionType || "create";

  const componentMap = {
    create: <PatientDashboardTreatment {...props} />,
    view: <PatientDashboardTreatmentViewUpdate {...props} disableInputs={true} />,
    update: <PatientDashboardTreatmentViewUpdate {...props} disableInputs={false}/>,
  };
  return <>{componentMap[actionType]}</>;
};

export default PatientDashboardTreatmentContainer;
