import React from "react";
import PatientDashboardTreatment from "./PatientDashboardTreatmentCreate";

const PatientDashboardTreatmentContainer = (props) => {
  const actionType = props?.activeContent?.actionType || "create";

  const componentMap = {
    create: <PatientDashboardTreatment {...props} />,
    view: <div>view of treatment</div>,
    update: <div>Update of treatment</div>,
  };
  return <>{componentMap[actionType]}</>;
};

export default PatientDashboardTreatmentContainer;
