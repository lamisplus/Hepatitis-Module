import React from "react";
import MatButton from "@material-ui/core/Button";
import {FormGroup, Label, Spinner,Form} from "reactstrap";
import {library} from '@fortawesome/fontawesome-svg-core'
import {faCheckSquare, faCoffee, faEdit, faTrash, } from '@fortawesome/free-solid-svg-icons'
import {makeStyles} from "@material-ui/core/styles";
import {Card, CardContent} from "@material-ui/core";
import "react-widgets/dist/css/react-widgets.css";
import 'react-phone-input-2/lib/style.css'
import  '../patient.css'
import "react-widgets/dist/css/react-widgets.css";
import { useValidateForm1ValuesHook } from "../../../formSchemas/form1ValidationSchema";
import { ArrowForward } from "@material-ui/icons";
library.add(faCheckSquare, faCoffee, faEdit, faTrash);

const useStyles = makeStyles((theme) => ({
    card: {
        margin: theme.spacing(20),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    cardBottom: {
        marginBottom: 20,
    },
    Select: {
        height: 45,
        width: 300,
    },
    button: {
        margin: theme.spacing(1),
    },
    root: {
        '& > *': {
            margin: theme.spacing(1)
        },
        "& .card-title":{
            color:'#fff',
            fontWeight:'bold'
        },
        "& .form-control":{
            borderRadius:'0.25rem',
            height:'41px'
        },
        "& .card-header:first-child": {
            borderRadius: "calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0"
        },
        "& .dropdown-toggle::after": {
            display: " block !important"
        },
        "& select":{
            "-webkit-appearance": "listbox !important"
        },
        "& p":{
            color:'red'
        },
        "& label":{
            fontSize:'14px',
            color:'#014d88',
            fontWeight:'bold'
        }
    },
    demo: {
        backgroundColor: theme.palette.background.default,
    },
    inline: {
        display: "inline",
    },
    error:{
        color: '#f85032',
        fontSize: '12.8px'
    },  
    success: {
        color: "#4BB543 ",
        fontSize: "11px",
    },
}));


const ViralHepatitisForm1 = () => {

    const classes = useStyles();
    const {formik} = useValidateForm1ValuesHook()
    return (
        <>
            <Card className={classes.root}>
                <CardContent> 
                    <div className="col-xl-12 col-lg-12">
                        <Form onSubmit={formik.handleSubmit}>
                            <div className="card">
                                <div className="card-header" style={{backgroundColor:"#014d88",color:'#fff',fontWeight:'bolder',  borderRadius:"0.2rem"}}>
                                    <h5 className="card-title" style={{color:'#fff'}}>Demography</h5>
                                </div>

                                <div className="card-body">
                                    <div className="basic-form">
                                        <div className="row"> 
                                            <div className="form-group mb-3 col-md-4">
                                                <FormGroup>
                                                    <Label for="hospitalNumber">Hospital Number <span style={{ color:"red"}}> *</span> </Label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="hospitalNumber"
                                                        id="hospitalNumber"
                                                        value={formik.initialValues.hospitalNumber}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                                    />
                                                {formik.errors.hospitalNumber !=="" ? (
                                                    <span className={classes.error}>{formik.errors.hospitalNumber}</span>
                                                    ) : "" }

                                                    
                                                </FormGroup>
                                            </div>
                                            <div className="form-group mb-3 col-md-4">
                                                <FormGroup>
                                                    <Label for="surname">Surname <span style={{ color:"red"}}> *</span> </Label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="surname"
                                                        id="surname"
                                                        value={formik.initialValues.surname}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                                    />
                                                {formik.errors.surname !=="" ? (
                                                    <span className={classes.error}>{formik.errors.surname}</span>
                                                    ) : "" }

                                                    
                                                </FormGroup>
                                            </div>
                                            <div className="form-group mb-3 col-md-4">
                                                <FormGroup>
                                                    <Label for="otherName">Other name </Label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="otherName"
                                                        id="otherName"
                                                        value={formik.initialValues.otherName}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                                    />
                                                {formik.errors.otherName !=="" ? (
                                                    <span className={classes.error}>{formik.errors.otherName}</span>
                                                    ) : "" }

                                                    
                                                </FormGroup>
                                            </div>
                                        </div>
                                        <div className="row"> 
                                            <div className="form-group mb-3 col-md-4">
                                                <FormGroup>
                                                    <Label for="phone">Phone <span style={{ color:"red"}}> *</span> </Label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="phone"
                                                        id="phone"
                                                        value={formik.initialValues.phone}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                                    />
                                                {formik.errors.phone !=="" ? (
                                                    <span className={classes.error}>{formik.errors.phone}</span>
                                                    ) : "" }

                                                    
                                                </FormGroup>
                                            </div>
                                            <div className="form-group mb-3 col-md-4">
                                                <FormGroup>
                                                    <Label for="residentialAddress">Residential Address <span style={{ color:"red"}}> *</span> </Label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="residentialAddress"
                                                        id="residentialAddress"
                                                        value={formik.initialValues.residentialAddress}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                                    />
                                                {formik.errors.residentialAddress !=="" ? (
                                                    <span className={classes.error}>{formik.errors.residentialAddress}</span>
                                                    ) : "" }

                                                    
                                                </FormGroup>
                                            </div>
                                            <div className="form-group mb-3 col-md-4">
                                                <FormGroup>
                                                    <Label for="landmark">Landmark </Label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="landmark"
                                                        id="landmark"
                                                        value={formik.initialValues.landmark}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                                    />
                                                {formik.errors.landmark !=="" ? (
                                                    <span className={classes.error}>{formik.errors.landmark}</span>
                                                    ) : "" }

                                                    
                                                </FormGroup>
                                            </div>
                                        </div>
                                        <div className="row"> 
                                            <div className="form-group mb-3 col-md-4">
                                                <FormGroup>
                                                    <Label for="country">Country <span style={{ color:"red"}}> *</span> </Label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="country"
                                                        id="country"
                                                        value={formik.initialValues.country}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                                    />
                                                {formik.errors.country !=="" ? (
                                                    <span className={classes.error}>{formik.errors.country}</span>
                                                    ) : "" }

                                                    
                                                </FormGroup>
                                            </div>
                                            <div className="form-group mb-3 col-md-4">
                                                <FormGroup>
                                                    <Label for="state">State <span style={{ color:"red"}}> *</span> </Label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="state"
                                                        id="state"
                                                        value={formik.initialValues.state}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                                    />
                                                {formik.errors.state !=="" ? (
                                                    <span className={classes.error}>{formik.errors.state}</span>
                                                    ) : "" }

                                                    
                                                </FormGroup>
                                            </div>
                                            <div className="form-group mb-3 col-md-4">
                                                <FormGroup>
                                                    <Label for="lga">LGA </Label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="lga"
                                                        id="lga"
                                                        value={formik.initialValues.lga}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                                    />
                                                {formik.errors.lga !=="" ? (
                                                    <span className={classes.error}>{formik.errors.lga}</span>
                                                    ) : "" }

                                                    
                                                </FormGroup>
                                            </div>
                                        </div>
                                        <div className="row"> 
                                            <div className="form-group mb-3 col-md-4">
                                                <FormGroup>
                                                    <Label for="dateOfBirth">Date of birth<span style={{ color:"red"}}> *</span> </Label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="dateOfBirth"
                                                        id="dateOfBirth"
                                                        value={formik.initialValues.dateOfBirth}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                                    />
                                                {formik.errors.dateOfBirth !=="" ? (
                                                    <span className={classes.error}>{formik.errors.dateOfBirth}</span>
                                                    ) : "" }

                                                    
                                                </FormGroup>
                                            </div>
                                            <div className="form-group mb-3 col-md-4">
                                                <FormGroup>
                                                    <Label for="age">Age <span style={{ color:"red"}}> *</span> </Label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="age"
                                                        id="age"
                                                        value={formik.initialValues.age}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                                    />
                                                {formik.errors.age !=="" ? (
                                                    <span className={classes.error}>{formik.errors.age}</span>
                                                    ) : "" }

                                                    
                                                </FormGroup>
                                            </div>
                                            <div className="form-group mb-3 col-md-4">
                                                <FormGroup>
                                                    <Label for="occupation">Occupation</Label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="occupation"
                                                        id="occupation"
                                                        value={formik.initialValues.occupation}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                                    />
                                                {formik.errors.occupation !=="" ? (
                                                    <span className={classes.error}>{formik.errors.occupation}</span>
                                                    ) : "" }                             
                                                </FormGroup>
                                            </div>
                                        </div>
                                        <div className="row"> 
                                            <div className="form-group mb-3 col-md-4">
                                                <FormGroup>
                                                    <Label for="maritalStatus">Marital status<span style={{ color:"red"}}> *</span> </Label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="maritalStatus"
                                                        id="maritalStatus"
                                                        value={formik.initialValues.maritalStatus}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                                    />
                                                {formik.errors.maritalStatus !=="" ? (
                                                    <span className={classes.error}>{formik.errors.maritalStatus}</span>
                                                    ) : "" }

                                                    
                                                </FormGroup>
                                            </div>
                                            <div className="form-group mb-3 col-md-4">
                                                <FormGroup>
                                                    <Label for="education">Education <span style={{ color:"red"}}> *</span> </Label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="education"
                                                        id="education"
                                                        value={formik.initialValues.education}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                                    />
                                                {formik.errors.education !=="" ? (
                                                    <span className={classes.error}>{formik.errors.education}</span>
                                                    ) : "" }
                                                </FormGroup>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
            
                            <div className="card">
                                <div className="card-header" style={{backgroundColor:"#014d88",color:'#fff',fontWeight:'bolder', borderRadius:"0.2rem"}}>
                                    <h5 className="card-title"  style={{color:'#fff'}}>Enrollment</h5>
                                </div>

                            <div className="card-body">
                            <div className="row"> 
                                <div className="form-group mb-3 col-md-4">
                                    <FormGroup>
                                        <Label for="careEntryPoint">Care entry point<span style={{ color:"red"}}> *</span> </Label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="careEntryPoint"
                                            id="careEntryPoint"
                                            value={formik.initialValues.careEntryPoint}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                        />
                                    {formik.errors.careEntryPoint !=="" ? (
                                        <span className={classes.error}>{formik.errors.careEntryPoint}</span>
                                        ) : "" }
                                    </FormGroup>
                                </div>
                               
                            </div>
                                <div className="row"> 
                                    <div className="form-group mb-3 col-md-4">
                                        <FormGroup>
                                            <Label for="weight">Weight <span style={{ color:"red"}}> *</span> </Label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="weight"
                                                id="weight"
                                                value={formik.initialValues.weight}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                            />
                                        {formik.errors.weight !=="" ? (
                                            <span className={classes.error}>{formik.errors.weight}</span>
                                            ) : "" }   
                                        </FormGroup>
                                    </div>
                                    <div className="form-group mb-3 col-md-4">
                                        <FormGroup>
                                            <Label for="height">Height <span style={{ color:"red"}}> *</span> </Label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="height"
                                                id="height"
                                                value={formik.initialValues.height}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                            />
                                        {formik.errors.height !=="" ? (
                                            <span className={classes.error}>{formik.errors.height}</span>
                                            ) : "" }   
                                        </FormGroup>
                                    </div>
                                    <div className="form-group mb-3 col-md-4">
                                        <FormGroup>
                                            <Label for="bmi">BMI </Label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="bmi"
                                                id="bmi"
                                                value={formik.initialValues.bmi}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                            />
                                        {formik.errors.bmi !=="" ? (
                                            <span className={classes.error}>{formik.errors.bmi}</span>
                                            ) : "" }
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className="row"> 
                                    <div className="form-group mb-3 col-md-4">
                                        <FormGroup>
                                            <Label for="hbsAg">Hepatitis B (HBsAg) <span style={{ color:"red"}}> *</span> </Label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="hbsAg"
                                                id="hbsAg"
                                                value={formik.initialValues.hbsAg}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                            />
                                        {formik.errors.hbsAg !=="" ? (
                                            <span className={classes.error}>{formik.errors.hbsAg}</span>
                                            ) : "" }
                                        </FormGroup>
                                    </div>
                                    <div className="form-group mb-3 col-md-4">
                                        <FormGroup>
                                            <Label for="breastfeeding">Breastfeeding <span style={{ color:"red"}}> *</span> </Label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="breastfeeding"
                                                id="breastfeeding"
                                                value={formik.initialValues.breastfeeding}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                            />
                                        {formik.errors.breastfeeding !=="" ? (
                                            <span className={classes.error}>{formik.errors.breastfeeding}</span>
                                            ) : "" }

                                            
                                        </FormGroup>
                                    </div>
                                    <div className="form-group mb-3 col-md-4">
                                        <FormGroup>
                                            <Label for="historyOfUsingAbusedSubstance">History of using abused substance </Label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="historyOfUsingAbusedSubstance"
                                                id="historyOfUsingAbusedSubstance"
                                                value={formik.initialValues.historyOfUsingAbusedSubstance}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                            />
                                        {formik.errors.historyOfUsingAbusedSubstance !=="" ? (
                                            <span className={classes.error}>{formik.errors.historyOfUsingAbusedSubstance}</span>
                                            ) : "" }

                                            
                                        </FormGroup>
                                    </div>
                                </div>
                            </div>
                            </div>

                            <div className="card">
                                <div className="card-header" style={{backgroundColor:"#014d88",color:'#fff',fontWeight:'bolder', borderRadius:"0.2rem"}}>
                                    <h5 className="card-title"  style={{color:'#fff'}}>Screening</h5>
                                </div>

                            <div className="card-body">
                            <div className="row"> 
                                    <div className="form-group mb-3 col-md-4">
                                        <FormGroup>
                                            <Label for="hbsAg">Hepatitis B (HBsAg) <span style={{ color:"red"}}> *</span> </Label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="hbsAg"
                                                id="hbsAg"
                                                value={formik.initialValues.hbsAg}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                            />
                                        {formik.errors.hbsAg !=="" ? (
                                            <span className={classes.error}>{formik.errors.hbsAg}</span>
                                            ) : "" }    
                                        </FormGroup>
                                    </div>
                                    <div className="form-group mb-3 col-md-4">
                                        <FormGroup>
                                            <Label for="dateOfHepatitisBPositiveScreening">Date of first Hep. B positive screening <span style={{ color:"red"}}> *</span> </Label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="dateOfHepatitisBPositiveScreening"
                                                id="dateOfHepatitisBPositiveScreening"
                                                value={formik.initialValues.dateOfHepatitisBPositiveScreening}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                            />
                                        {formik.errors.dateOfHepatitisBPositiveScreening !=="" ? (
                                            <span className={classes.error}>{formik.errors.dateOfHepatitisBPositiveScreening}</span>
                                            ) : "" }
                                        </FormGroup>
                                    </div>
                                    <div className="form-group mb-3 col-md-4">
                                        <FormGroup>
                                            <Label for="hcvAb">Hepatitis C (HCVAb) </Label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="hcvAb"
                                                id="hcvAb"
                                                value={formik.initialValues.hcvAb}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                            />
                                        {formik.errors.hcvAb !=="" ? (
                                            <span className={classes.error}>{formik.errors.hcvAb}</span>
                                            ) : "" }                                            
                                        </FormGroup>
                                    </div>
                                </div>
                            </div>
                            </div>
                            
                            {false ? <Spinner /> : ""}

                            <br />
                        <div className="d-flex justify-content-end">
                        <MatButton
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                endIcon={<ArrowForward />}
                                style={{backgroundColor:'#014d88',fontWeight:"bolder"}}
                            >
                                
                                <span style={{ textTransform: "capitalize" }}>Next</span>
                            
                            </MatButton>
                        </div>
                        </Form>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default ViralHepatitisForm1