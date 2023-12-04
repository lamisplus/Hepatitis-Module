import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dropdown, Menu } from "semantic-ui-react";
import { makeStyles } from "@material-ui/core/styles";
import { url as baseUrl, token } from "../../../api";

const useStyles = makeStyles((theme) => ({
  navItemText: {
    padding: theme.spacing(2),
  },
}));

function SubMenu(props) {
  const classes = useStyles();
  let gender = "";
  const patientObjs = props.patientObj ? props.patientObj : {};
  //const patientCurrentStatus=props.patientObj && props.patientObj.currentStatus==="Died (Confirmed)" ? true : false ;
  const [patientObj, setpatientObj] = useState(patientObjs);
  const [genderType, setGenderType] = useState();
  const [diagnosisActivities, setDiagnosisActivities] = useState(true);
  const [treatmentActivities, setTreatmentActivities] = useState(true);

  useEffect(() => {
    Observation();

    props.recentActivities.map((each) => {
      if (each.activityName === "Hepatitis Diagnosis") {
        setDiagnosisActivities(false);
      }

      if (each.activityName === "Hepatitis Treatment") {
        setTreatmentActivities(false);
      }
    });
  }, [props.patientObj, props.recentActivities]);
  //Get list of RegimenLine
  const Observation = () => {
    axios
      .get(`${baseUrl}observation/person/${props.patientObj.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const observation = response.data;
        const mental = observation.filter((x) => x.type === "mental health");
        const evaluation = observation.filter(
          (x) => x.type === "initial evaluation"
        );
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  const loadVaccination = (row) => {
    props.setActiveContent({ ...props.activeContent, route: "diagnosis" });
  };
  const loadTreatment = (row) => {
    props.setActiveContent({ ...props.activeContent, route: "treatment" });
  };
  const loadAddmission = (row) => {
    props.setActiveContent({ ...props.activeContent, route: "addmission" });
  };
  const onClickDischarge = (row) => {
    props.setActiveContent({ ...props.activeContent, route: "discharge" });
  };
  const onClickHome = (row) => {
    props.setActiveContent({ ...props.activeContent, route: "recent-history" });
  };
  const loadPatientHistory = () => {
    //setActiveItem('history')
    props.setActivZContent({
      ...props.activeContent,
      route: "patient-history",
    });
  };

  return (
    <div>
      <Menu size="large" color={"black"} inverted>
        <Menu.Item onClick={() => onClickHome()}> Home</Menu.Item>
        {diagnosisActivities && (
          <Menu.Item onClick={() => loadVaccination()}>Diagnosis</Menu.Item>
        )}

        {treatmentActivities && (
          <Menu.Item onClick={() => loadTreatment()}>Treatment</Menu.Item>
        )}

        {/* <Menu.Item onClick={() => loadAddmission()} >Addmission</Menu.Item>
                <Menu.Item onClick={() => loadIcu()} >Patient ICU</Menu.Item>
                <Menu.Item onClick={() => onClickDischarge()} > Discharg/Death</Menu.Item>
                <Menu.Item onClick={() => loadPatientHistory(patientObj)} >History</Menu.Item>                     */}
      </Menu>
    </div>
  );
}

export default SubMenu;
