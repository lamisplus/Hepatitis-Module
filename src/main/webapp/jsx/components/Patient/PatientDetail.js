import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PatientCardDetail from "./PatientCard";
import { useHistory } from "react-router-dom";
import { token, url as baseUrl } from "../../../api";
import axios from "axios";
import SubMenu from "./SubMenu";
import RecentHistory from "./../History/RecentHistory";
// import PatientVaccinationHistory from "./../Vaccination/VaccinationHistory";
import Biometrics from "./Biometric";
import AddmissionHome from "./../Admission/AddmissionHome";
import PatientVaccinationHistory from "./../Vaccination/VaccinationHistory";
import DashboardForm2 from "./ViralHepatitisForms/DashboardForm2";
import DasboardTreatmentForm from "./ViralHepatitisForms/DashboardTreatmentForm";
import DashboardEnrollmentForm from "./ViralHepatitisForms/DashboardEnrollmentForm";
import PatientHistory from "./PatientHistoryy";
const styles = (theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
  },
  column: {
    flexBasis: "20.33%",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

function PatientCard(props) {
  let history = useHistory();
  const [art, setArt] = useState(false);
  const [recentActivities, setRecentActivities] = useState([]);
  const [allPatientInfo, setAllPatientInfo] = useState({});

  const [activeContent, setActiveContent] = useState({
    route: "recent-history",
    id: "",
    activeTab: "home",
    actionType: "create",
    obj: {},
  });
  const { classes } = props;
  const patientObj =
    history.location && history.location.state
      ? history.location.state.patientObj
      : {};
  const prepId =
    history.location && history.location.state
      ? history.location.state.prepId
      : {};

  console.log(patientObj);

  const getFullPatientDetail = (value) => {
    axios
      .get(`${baseUrl}patient/${patientObj.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        setAllPatientInfo(response.data);
      })
      .catch((error) => {
        //console.log(error);
      });
  };
  const getRecentActivties = () => {
    axios
      .get(`${baseUrl}hepatitis/activities/${patientObj.personUuid}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setRecentActivities(response.data);
        console.log(response.data);
      })

      .catch((error) => {
        //console.log(error);
      });
  };
  useEffect(() => {
    getRecentActivties();
  }, [activeContent]);

  return (
    <div className={classes.root}>
      <div
        className="row page-titles mx-0"
        style={{ marginTop: "0px", marginBottom: "-10px" }}
      >
        <ol className="breadcrumb">
          <li className="breadcrumb-item active">
            <h4>
              {" "}
              <Link to={"/"}>HEPATITIS /</Link> Patient Dashboard
            </h4>
          </li>
        </ol>
      </div>
      <Card>
        <CardContent>
          <PatientCardDetail
            patientObj={patientObj}
            allPatientInfo={allPatientInfo}
            setArt={setArt}
            setActiveContent={setActiveContent}
          />
          <SubMenu
            patientObj={patientObj}
            art={art}
            setActiveContent={setActiveContent}
            recentActivities={recentActivities}
          />
          <br />
          {activeContent.route === "recent-history" && (
            <RecentHistory
              patientObj={patientObj}
              setActiveContent={setActiveContent}
              activeContent={activeContent}
              allRecentActivities={recentActivities}
            />
          )}

          {/* {activeContent.route === "enrollment" && (
            <DashboardEnrollmentForm
              patientObj={patientObj}
              setActiveContent={setActiveContent}
              activeContent={activeContent}
              userStatus={true}
            />
          )} */}

          {activeContent.route === "diagnosis" && (
            <DashboardForm2
              patientObj={patientObj}
              setActiveContent={setActiveContent}
              activeContent={activeContent}
            />
          )}
          {activeContent.route === "treatment" && (
            <DasboardTreatmentForm
              patientObj={patientObj}
              setActiveContent={setActiveContent}
              activeContent={activeContent}
            />
          )}
          {activeContent.route === "patient-history" && (
            <PatientHistory
              patientObj={patientObj}
              setActiveContent={setActiveContent}
              activeContent={activeContent}
              recentActivities={recentActivities}
            />
          )}
          {/*  {activeContent.route==='biometrics' &&(<Biometrics patientObj={patientObj} setActiveContent={setActiveContent} activeContent={activeContent}/>)}
          {activeContent.route==='addmission' &&( <AddmissionHome patientObj={patientObj} setActiveContent={setActiveContent} activeContent={activeContent} />)}
          {activeContent.route==='vaccination' &&( <PatientVaccinationHistory patientObj={patientObj} setActiveContent={setActiveContent} activeContent={activeContent}/>)}
          {activeContent.route==='discharge' &&( <AddmissionHome patientObj={patientObj} setActiveContent={setActiveContent} activeContent={activeContent} />)}
          {activeContent.route==='icu' &&( <AddmissionHome patientObj={patientObj} setActiveContent={setActiveContent} activeContent={activeContent} />)}
          {activeContent.route==='patient-history' &&( <PatientHistory patientObj={patientObj} setActiveContent={setActiveContent} activeContent={activeContent}/>)}          */}
        </CardContent>
      </Card>
    </div>
  );
}

PatientCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PatientCard);
