import React from "react";
import PatientDashboardEnrolmentViewUpdate from "./PatientDashboardEnrolmentViewUpdate";

const PatientDashboardEnrolmentContainer = (props) => {
  const actionType = props?.activeContent?.actionType || "create";

  const componentMap = {
    view: <PatientDashboardEnrolmentViewUpdate {...props} disableInputs={true} />,
    update: <PatientDashboardEnrolmentViewUpdate {...props} disableInputs={false}/>,
  };
  return <>{componentMap[actionType]}</>;
};

export default PatientDashboardEnrolmentContainer;
