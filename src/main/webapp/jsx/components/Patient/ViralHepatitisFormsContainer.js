import React from "react";
import Button from "@material-ui/core/Button";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import {Link} from "react-router-dom";
import {TiArrowBack} from 'react-icons/ti'
import { ToastContainer } from "react-toastify";
import Steppers from "./Stepper/Stepper";
import ViralHepatitisForm1 from "./ViralHepatitisForms/Form1";
import ViralHepatitisForm2 from "./ViralHepatitisForms/Form2";
import ViralHepatitisForm3 from "./ViralHepatitisForms/Form3";
import FollowupForm from "./ViralHepatitisForms/FollowUp";




const ViralHepatitisFormsContainer = (props) => {
    return (
        <>
            <ToastContainer autoClose={3000} hideProgressBar />
            <div className="row page-titles mx-0" style={{marginTop:"0px", marginBottom:"-10px"}}>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active"><h4> <Link to={"/"} >Viral Hepatitis /</Link>New Client</h4></li>
                </ol>
            </div>
            <Link
                    to={{
                        pathname: "/",
                        state: 'users'
                    }}>
                    <Button
                        variant="contained"
                        color="primary"
                        className=" float-end mr-10 pr-10"
                        style={{backgroundColor:'#014d88',fontWeight:"bolder", margingRight:"-40px"}}
                        startIcon={<TiArrowBack />}
                    >
                        <span style={{ textTransform: "capitalize", color:'#fff' }}>Back </span>
                    </Button>
            </Link>
            <br/><br/> 
            <Steppers/>
            <FollowupForm/>
        </>
    );
};

export default ViralHepatitisFormsContainer