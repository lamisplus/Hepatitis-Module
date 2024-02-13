import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import MatButton from "@material-ui/core/Button";
import Button from "@material-ui/core/Button";
import {FormGroup, Label, Spinner,Input,Form, InputGroup} from "reactstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faCheckSquare, faCoffee, faEdit, faTrash, } from '@fortawesome/free-solid-svg-icons'
import * as moment from 'moment';
import {makeStyles} from "@material-ui/core/styles";
import {Card, CardContent} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import {Link, useHistory, useLocation} from "react-router-dom";
import {TiArrowBack} from 'react-icons/ti'
import {FaPlus, FaAngleDown} from 'react-icons/fa'
import {token, url as baseUrl } from "../../../../api";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import  '../patient.css'
import {  Modal } from "react-bootstrap";
import "react-widgets/dist/css/react-widgets.css";
import { DateTimePicker } from "react-widgets";


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


const UserRegistration = (props) => {
    const [basicInfo, setBasicInfo]= useState(
            {
                active: true,
                address: [],
                contact: [],
                contactPoint: [],
                dateOfBirth: "",
                deceased: false,
                deceasedDateTime: null,
                firstName: "",
                genderId: "",
                identifier: "",
                otherName: "",
                maritalStatusId: "",
                educationId: "",
                employmentStatusId:"",
                dateOfRegistration: "",
                isDateOfBirthEstimated: null,
                age:"",
                phoneNumber:"",
                altPhonenumber:"",
                dob:"",
                countryId:1,
                stateId:"",
                district:"",
                sexId:"",
                ninNumber:""

            }
    )
    const [relatives, setRelatives]= useState(
                { 
                    address:"",
                    phone:"",
                    firstName: "",
                    email: "",
                    relationshipId: "",
                    lastName: "",
                    middleName: ""
                }
                
        )
    const [contacts, setContacts] = useState([]);
    const [saving, setSaving] = useState(false);
    const [disabledAgeBaseOnAge, setDisabledAgeBaseOnAge] = useState(false);
    const [ageDisabled, setAgeDisabled] = useState(true);
    const [showRelative, setShowRelative] = useState(false);
    //const [editRelative, setEditRelative] = useState(null);
    const [genders, setGenders]= useState([]);
    const [maritalStatusOptions, setMaritalStatusOptions]= useState([]);
    const [educationOptions, setEducationOptions]= useState([]);
    const [occupationOptions, setOccupationOptions]= useState([]);
    const [relationshipOptions, setRelationshipOptions]= useState([]);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [errors, setErrors] = useState({})
    //const [topLevelUnitCountryOptions, settopLevelUnitCountryOptions]= useState([]);
    const [patientDTO, setPatientDTO]= useState({"person":"", "vaccinationEnrollment":""})
    const userDetail = props.location && props.location.state ? props.location.state.user : null;
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
     //HIV INFORMATION
     const [showContactCard, setShowContactCard] = useState(true);
     const [vaccine, setVaccine] = useState([]);
     //const [showRelativeCard, setShowRelativeCard] = useState(false);
     const [objValues, setObjValues] = useState(
        {   adverseEffect: "",
            batchNumber:"",
            doseNumber: "",
            location: "",
            patientId: "",
            vaccinationFacility: "",
            vaccine: "",
            vaccineDate: "",
            knownMedicalCondition: "",
            medicalCondition: "",
            occupation: "",
            vaccineId: "",
            visitDate: "",
            patientId: "",
            visitId: "",
            workInHealthSector: ""
        });
     
     //status for hospital Number 
     const [hospitalNumStatus, setHospitalNumStatus]= useState(false);
     const [hospitalNumStatus2, setHospitalNumStatus2]= useState(false);
     const [open, setOpen] = React.useState(false)
     const toggle = () => setOpen(!open);
    const locationState = location.state;
    let patientId = null;
    patientId = locationState ? locationState.patientId : null;
    let temp = { ...errors }

    useEffect(() => { 
        loadGenders();
        loadMaritalStatus();
        loadEducation();
        loadOccupation();
        loadRelationships();
        VACCINE();        
        GetCountry();
        setStateByCountryId()
        if(basicInfo.dateOfRegistration < basicInfo.dob){
            toast.error('Date of registration can not be earlier than date of birth')
        }
          
    }, [basicInfo.dateOfRegistration]);
    //covid/codeset?category=VACCINE
    const VACCINE = () => {
        axios
        .get(`${baseUrl}covid/codeset?category=VACCINE`,
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then((response) => {
            //console.log(response.data);
            setVaccine(response.data);
        })
        .catch((error) => {
            //console.log(error);
        });

    }
    const loadGenders = useCallback(async () => {
        try {
            const response = await axios.get(`${baseUrl}application-codesets/v2/SEX`, { headers: {"Authorization" : `Bearer ${token}`} });
            setGenders(response.data);
        } catch (e) {
            
        }
    }, []);
    const loadMaritalStatus = useCallback(async () => {
        try {
            const response = await axios.get(`${baseUrl}application-codesets/v2/MARITAL_STATUS`, { headers: {"Authorization" : `Bearer ${token}`} });
            setMaritalStatusOptions(response.data);
        } catch (e) {
        }
    }, []);
    const loadEducation = useCallback(async () => {
        try {
            const response = await axios.get(`${baseUrl}application-codesets/v2/EDUCATION`, { headers: {"Authorization" : `Bearer ${token}`} });
            setEducationOptions(response.data);
        } catch (e) {

        }
    }, []);
    const loadOccupation = useCallback(async () => {
        try {
            const response = await axios.get(`${baseUrl}application-codesets/v2/OCCUPATION`, { headers: {"Authorization" : `Bearer ${token}`} });
            setOccupationOptions(response.data);
        } catch (e) {

        }
    }, []);
    const loadRelationships = useCallback(async () => {
      try {
          const response = await axios.get(`${baseUrl}application-codesets/v2/RELATIONSHIP`, { headers: {"Authorization" : `Bearer ${token}`} });
          setRelationshipOptions(response.data);
      } catch (e) {
      }
    }, []);
    // const loadTopLevelCountry = useCallback(async () => {
    //     const response = await axios.get(`${baseUrl}organisation-units/parent-organisation-units/0`, { headers: {"Authorization" : `Bearer ${token}`} });
    //     settopLevelUnitCountryOptions(response.data);
    // }, []);
    //Country List
      const GetCountry =()=>{
        axios
        .get(`${baseUrl}organisation-units/parent-organisation-units/0`,
            { headers: {"Authorization" : `Bearer ${token}`} }
        )
        .then((response) => {
            
            setCountries(response.data);
        })
        .catch((error) => {
        //console.log(error);
        });        
    }
     //Get States from selected country
    const getStates = e => {
        const getCountryId =e.target.value;
            setStateByCountryId(1); 
            setBasicInfo({ ...basicInfo, countryId: getCountryId });
    };
    //Get list of State
    function setStateByCountryId() {
        axios
        .get(`${baseUrl}organisation-units/parent-organisation-units/1`,
            { headers: {"Authorization" : `Bearer ${token}`} }
        )
        .then((response) => {
            setStates(response.data.sort());
        })
        .catch((error) => {
        //console.log(error);
        });  
    }    
     //fetch province
     const getProvinces = e => {
            const stateId = e.target.value;
            setBasicInfo({ ...basicInfo, stateId: e.target.value });
            axios
            .get(`${baseUrl}organisation-units/parent-organisation-units/${stateId}`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                setProvinces(response.data);
            })
            .catch((error) => {
            //console.log(error);
            });  
    };
    //Date of Birth and Age handle 
    const handleDobChange = (e) => {
        if (e.target.value) {
            const today = new Date();
            const birthDate = new Date(e.target.value);
            let age_now = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
                if(m<18){
                    alert("The child is less than 18months")
                    setDisabledAgeBaseOnAge(true)
                }else{
                    setDisabledAgeBaseOnAge(false)
                }
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age_now--;
                }
                basicInfo.age=age_now
                //setBasicInfo({...basicInfo, age: age_now});        
                } else {
                    setBasicInfo({...basicInfo, age:  ""});
                }
                setBasicInfo({...basicInfo, dob: e.target.value});
                if(basicInfo.age!=='' && basicInfo.age>=60){
                    toggle()
                }
           
    }
    const handleDateOfBirthChange = (e) => {
        if (e.target.value == "Actual") {
            setAgeDisabled(true);
        } else if (e.target.value == "Estimated") {
            setAgeDisabled(false);
        }
    }
    const handleAgeChange = (e) => {
        const ageNumber = e.target.value.replace(/\D/g, '')
        if (!ageDisabled && ageNumber) {  
            const currentDate = new Date();
            currentDate.setDate(15);
            currentDate.setMonth(5);
            const estDob = moment(currentDate.toISOString());
            const dobNew = estDob.add((ageNumber * -1), 'years');
            //setBasicInfo({...basicInfo, dob: moment(dobNew).format("YYYY-MM-DD")});
            basicInfo.dob =moment(dobNew).format("YYYY-MM-DD")
            if(ageNumber!=='' && ageNumber>=60){
                toggle()
            }

        }
        setBasicInfo({...basicInfo, age: Math.abs(e.target.value)});
    }
    //End of Date of Birth and Age handling 
    //Handle Input Change for Basic Infor
    const handleInputChangeBasic = e => {  
        setErrors({...temp, [e.target.name]:""})      
        setBasicInfo ({...basicInfo,  [e.target.name]: e.target.value}); 
        if(e.target.name==='firstName' && e.target.value!==''){
            const name = alphabetOnly(e.target.value)
            setBasicInfo ({...basicInfo,  [e.target.name]: name});
        }
        if(e.target.name==='lastName' && e.target.value!==''){
            const name = alphabetOnly(e.target.value)
            setBasicInfo ({...basicInfo,  [e.target.name]: name});
        }
        if(e.target.name==='middleName' && e.target.value!==''){
            const name = alphabetOnly(e.target.value)
            setBasicInfo ({...basicInfo,  [e.target.name]: name});
        }
        if(e.target.name==='ninNumber' && e.target.value!==''){
            const ninNumberValue = checkNINLimit(e.target.value)
            setBasicInfo ({...basicInfo,  [e.target.name]: ninNumberValue});
        }
        if(e.target.name==='hospitalNumber' && e.target.value!==''){
        async function getHosiptalNumber() {
            const hosiptalNumber=e.target.value
            const response = await axios.post(`${baseUrl}patient/exist/hospital-number`, hosiptalNumber,
                    { headers: {"Authorization" : `Bearer ${token}`, 'Content-Type': 'text/plain'} }
                );
            if(response.data!==true){
                setHospitalNumStatus(false)
                errors.hospitalNumber=""
                setObjValues ({...objValues,  uniqueId: e.target.value});
                setHospitalNumStatus2(true)
            }else{
                errors.hospitalNumber=""
                toast.error("Error! Hosiptal Number already exist");
                setHospitalNumStatus(true)
                setHospitalNumStatus2(false)
            }
        }
        getHosiptalNumber();
        } 
                
    } 
    //Function to show relatives 
    const handleAddRelative = () => {
        setShowRelative(true);
    };
    //Function to cancel the relatives form
    const handleCancelSaveRelationship = () => {
        setShowRelative(false);
    }
    /*****  Validation  Relationship Input*/
    const validateRelatives = () => {
        let temp = { ...errors }
            temp.firstName = relatives.firstName ? "" : "First Name is required"
            temp.lastName = relatives.lastName ? "" : "Last Name  is required."
            temp.phone = relatives.phone ? "" : "Phone Number  is required."
            temp.relationshipId = relatives.relationshipId ? "" : "Relationship Type is required."  
                setErrors({ ...temp })
        return Object.values(temp).every(x => x === "")
    }
    //Function to add relatives 
    const handleSaveRelationship = (e) => {
        if(validateRelatives()){
            setContacts([...contacts, relatives])
            setRelatives({ 
                address:"",
                phone:"",
                firstName: "",
                email: "",
                relationshipId: "",
                lastName: "",
                middleName: ""
            })
        }

    }
    const handleDeleteRelative = (index) => {
        contacts.splice(index, 1);
        setContacts([...contacts]);
    };
    const handleEditRelative = (relative, index) => {
        setRelatives(relative)
        setShowRelative(true);
        contacts.splice(index, 1); 
    };   
    const getRelationship = (relationshipId) => {
        const relationship = relationshipOptions.find(obj => obj.id == relationshipId);
        return relationship ? relationship.display : '';
    };
    const handleInputChangeRelatives = e => {        
        setRelatives ({...relatives,  [e.target.name]: e.target.value});               
    }
    /*****  Validation  */
    const validate = () => {
        
            temp.firstName = basicInfo.firstName ? "" : "First Name is required"
            temp.hospitalNumber = basicInfo.hospitalNumber ? "" : "Hospital Number  is required."
            //temp.middleName = basicInfo.middleName ? "" : "Middle is required."
           // temp.landmark = basicInfo.landmark ? "" : "This field is required."
            temp.lastName = basicInfo.lastName ? "" : "Last Name  is required."
            temp.sexId = basicInfo.sexId ? "" : "Gender is required."
            temp.dateOfRegistration = basicInfo.dateOfRegistration ? "" : "Date of Registration is required."
            //temp.educationId = basicInfo.educationId ? "" : "Education is required."
            temp.address = basicInfo.address ? "" : "Address is required."
            temp.phoneNumber = basicInfo.phoneNumber ? "" : "Phone Number  is required."
            temp.countryId = basicInfo.countryId ? "" : "Country is required."    
            temp.stateId = basicInfo.stateId ? "" : "State is required."  
            temp.district = basicInfo.district ? "" : "Province/LGA is required." 
            //VACCINATION FORM VALIDATION
            temp.vaccine = objValues.vaccine ? "" : "This field is required"
            temp.vaccineDate = objValues.vaccineDate ? "" : "This field is required"
            //temp.doseNumber = objValues.doseNumber ? "" : "This field is required"
            temp.location = objValues.location ? "" : "This field is required"
            temp.batchNumber = objValues.batchNumber ? "" : "This field is required"
            temp.adverseEffect = objValues.adverseEffect ? "" : "This field is required"
            
                setErrors({ ...temp })
        return Object.values(temp).every(x => x == "")
    }
    const handleSubmit = async (e) => {
        e.preventDefault(); 
         if(validate()){
            setSaving(true)
            let newConatctsInfo=[]
            //Manipulate relatives contact  address:"",
            const actualcontacts=contacts && contacts.length>0 && contacts.map((x)=>{
                
                const contactInfo = { 
                address: {
                    line: [
                        x.address
                    ],
                },
                contactPoint: {
                    type: "phone",
                    value: x.phone
                },
                firstName: x.firstName,
                fullName: x.firstName + " " + x.middleName + " " + x.lastName,
                relationshipId: x.relationshipId,
                surname: x.lastName,
                otherName: x.middleName
            }
            
            newConatctsInfo.push(contactInfo)
            })
            try {
                const patientForm = {
                    active: true,
                    address: [
                        {
                            "city": basicInfo.address,
                            "countryId": basicInfo.countryId,
                            "district": basicInfo.district,
                            "line": [
                                basicInfo.landmark
                            ],
                            "organisationUnitId": 0,
                            "postalCode": "",
                            "stateId": basicInfo.stateId
                        }
                    ],
                    contact: newConatctsInfo,
                    contactPoint: [],
                    dateOfBirth: basicInfo.dob,
                    deceased: false,
                    deceasedDateTime: null,
                    firstName: basicInfo.firstName,
                    genderId: basicInfo.sexId,
                    sexId: basicInfo.sexId,
                    identifier: [
                        {
                            "assignerId": 1,
                            "type": "HospitalNumber",
                            "value": basicInfo.hospitalNumber
                        }
                    ],
                    otherName: basicInfo.middleName,
                    maritalStatusId: basicInfo.maritalStatusId,
                    surname: basicInfo.lastName,
                    educationId: basicInfo.educationId,
                    employmentStatusId: basicInfo.employmentStatusId,
                    dateOfRegistration: basicInfo.dateOfRegistration,
                    isDateOfBirthEstimated: basicInfo.dateOfBirth == "Actual" ? false : true,
                    ninNumber:basicInfo.ninNumber
                };
                const phone = {
                    "type": "phone",
                    "value": basicInfo.phoneNumber
                };
                if (basicInfo.email) {
                    const email = {
                        "type": "email",
                        "value": basicInfo.email
                    }
                    patientForm.contactPoint.push(email);
                }
                if (basicInfo.altPhonenumber) {
                    const altPhonenumber = {
                        "type": "altphone",
                        "value": basicInfo.altPhonenumber
                    }
                    patientForm.contactPoint.push(altPhonenumber);
                }
                patientForm.contactPoint.push(phone);
                //patientForm.id = patientId;
                patientDTO.person=patientForm;
                patientDTO.vaccinationEnrollment=objValues;
                const response = await axios.post(`${baseUrl}covid/enrollments`, patientDTO, { headers: {"Authorization" : `Bearer ${token}`} });
                toast.success("Patient Register successful", {position: toast.POSITION.BOTTOM_CENTER});
                setSaving(false)
                history.push('/');
            } catch (error) {   
                setSaving(false)             
                if(error.response && error.response.data){
                    let errorMessage = error.response.data.apierror && error.response.data.apierror.message!=="" ? error.response.data.apierror.message :  "Something went wrong, please try again";
                    if(error.response.data.apierror && error.response.data.apierror.message!=="" && error.response.data.apierror && error.response.data.apierror.subErrors[0].message!==""){
                        toast.error(error.response.data.apierror.message + " : " + error.response.data.apierror.subErrors[0].field + " " + error.response.data.apierror.subErrors[0].message, {position: toast.POSITION.BOTTOM_CENTER});
                    }else{
                        toast.error(errorMessage, {position: toast.POSITION.BOTTOM_CENTER});
                    }
                }
                else{
                    toast.error("Something went wrong. Please try again...", {position: toast.POSITION.BOTTOM_CENTER});
                }
            }
        }

    }
    const alphabetOnly=(value)=>{
        const result = value.replace(/[^a-z]/gi, '');
        return result
    }
    const handleInputChange = e => {  
        setErrors({...temp, [e.target.name]:""})        
        setObjValues ({...objValues,  [e.target.name]: e.target.value});
        if(e.target.name==='location' && objValues.location!=='Facility'){
            objValues.vaccinationFacility=""
            setObjValues ({...objValues,  ['vaccinationFacility']: ""});
            setObjValues ({...objValues,  [e.target.name]: e.target.value});
        }          
    }      
    const checkPhoneNumber=(e, inputName)=>{
        const NumberValue = checkNumberLimit(e.target.value.replace(/\D/g, ''))
        setRelatives({...relatives, [inputName]: NumberValue})    
    }
    // const checkPhoneNumberBasic=(e, inputName)=>{
    //     const limit = 10;
    //     setBasicInfo({...basicInfo,  [inputName]: e.slice(0, limit)});     
    // } 
    const checkNINLimit=(e)=>{
        const limit = 11;        
        const acceptedNumber= e.slice(0, limit)
        return  acceptedNumber   
    }
    //Handle CheckBox handleCheckBoxworkInHealthSector handleCheckBoxknownMedicalCondition
    const handleCheckBoxworkInHealthSector =e =>{
        if(e.target.checked){
            setObjValues ({...objValues,  ['workInHealthSector']: e.target.checked});  
            //setOvcEnrolled(true)
        }else{
            setObjValues ({...objValues,  ['workInHealthSector']: false}); 
        }
    }
    
    const handleInputChangePhoneNumber=(e, inputName)=>{
        const limit = 11;
        const NumberValue = checkNumberLimit(e.target.value.replace(/\D/g, ''))
        setBasicInfo({...basicInfo, [inputName]: NumberValue})
    }
    const checkNumberLimit=(e)=>{
        const limit = 11;        
        const acceptedNumber= e.slice(0, limit)
        return  acceptedNumber   
    }
    const handleCheckBoxknownMedicalCondition =e =>{
        if(e.target.checked){
            setObjValues ({...objValues,  ['knownMedicalCondition']: e.target.checked});  
            //setOvcEnrolled(true)
        }else{
            setObjValues ({...objValues,  ['knownMedicalCondition']: false});  
        }
    }
    const onClickContactCard =() =>{
      setShowContactCard(!showContactCard)
    }
    const onClickRelativeCard =() =>{
      setShowRelative(!showRelative)
    }
    const handleCancel =()=>{
        history.push({ pathname: '/' });
    }


    return (
        <>
            <br /><br/>
            <Card className={classes.root}>
                <CardContent>
                    <div className="col-xl-12 col-lg-12">
                        <Form >
                            <div className="card">
                                <div className="card-header" style={{backgroundColor:"#014d88",color:'#fff',fontWeight:'bolder',  borderRadius:"0.2rem"}}>
                                    <h5 className="card-title" style={{color:'#fff'}}>{userDetail===null ? "Basic Information" : "Edit User Information"}</h5>
                                </div>
                                <div className="card-body">
                                    <div className="basic-form">
                                        <div className="row">
                                            <div className="form-group mb-3 col-md-4">
                                                <FormGroup>
                                                    <Label for="dateOfRegistration">Date Registration<span style={{ color:"red"}}> *</span> </Label>
                                                    <Input
                                                        className="form-control"
                                                        type="date"
                                                        name="dateOfRegistration"
                                                        id="dateOfRegistration"
                                                        min="1983-12-31"
                                                        max= {moment(new Date()).format("YYYY-MM-DD") }
                                                        value={basicInfo.dateOfRegistration}
                                                        onChange={handleInputChangeBasic}
                                                        style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                    />
                                                   {errors.dateOfRegistration !=="" ? (
                                                    <span className={classes.error}>{errors.dateOfRegistration}</span>
                                                    ) : "" }
                                                </FormGroup>
                                            </div>
                                            <div className="form-group mb-3 col-md-4">
                                      <Label >Location <span style={{ color:"red"}}> *</span></Label>
                                      <FormGroup> 
                                          <Input 
                                              type="select"
                                              name="location"
                                              id="location"
                                              onChange={handleInputChange}
                                              value={objValues.location} >
                                              <option value="" >Select</option>
                                              <option value="Facility" >Facility</option>
                                              <option value="Community" >Community</option>
                                          </Input>
                                      </FormGroup> 
                                      {errors.location !=="" ? (
                                              <span className={classes.error}>{errors.location}</span>
                                      ) : "" }                                        
                                      
                              </div>
                              {objValues.location==='Facility' && (
                              <div className="form-group mb-3 col-md-4">
                                      <FormGroup>
                                      <Label >Facility Name </Label>
                                      <InputGroup> 
                                          <Input 
                                              type="text"
                                              name="vaccinationFacility"
                                              id="vaccinationFacility"
                                              onChange={handleInputChange}
                                              value={objValues.vaccinationFacility}>
                                          </Input>
                                      </InputGroup> 
                                      {errors.vaccinationFacility !=="" ? (
                                              <span className={classes.error}>{errors.vaccinationFacility}</span>
                                      ) : "" }                                        
                                      </FormGroup>
                              </div>
                              )}
                                        
                                        <div className="row">
                                          <div className="form-group  col-md-4">
                                              <FormGroup>
                                                  <Label>Country <span style={{ color:"red"}}> *</span></Label>
                                                  <select
                                                      className="form-control"
                                                      type="text"
                                                      name="countryId"
                                                      id="countryId"
                                                      style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                      value={basicInfo.countryId}
                                                      disabled
                                                      onChange={getStates}
                                                      >
                                                      <option value={""}>Select</option>
                                                      {countries.map((value, index) => (
                                                          <option key={index} value={value.id}>
                                                              {value.name}
                                                          </option>
                                                      ))}
                                                  </select>
                                                  {errors.countryId !=="" ? (
                                                      <span className={classes.error}>{errors.countryId}</span>
                                                      ) : "" }
                                              </FormGroup>
                                          </div>

                                          <div className="form-group  col-md-4">
                                              <FormGroup>
                                                  <Label>State <span style={{ color:"red"}}> *</span></Label>
                                                  <select
                                                      className="form-control"
                                                      type="text"
                                                      name="stateId"
                                                      id="stateId"
                                                      value={basicInfo.stateId}
                                                      style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                      onChange={getProvinces}
                                                      >
                                                      <option value="">Select</option>
                                                      {states.map((value, index) => (
                                                          <option key={index} value={value.id}>
                                                              {value.name}
                                                          </option>
                                                      ))}
                                                  </select>
                                                  {errors.stateId !=="" ? (
                                                      <span className={classes.error}>{errors.stateId}</span>
                                                      ) : "" }
                                              </FormGroup>
                                          </div>

                                          <div className="form-group  col-md-4">
                                              <FormGroup>
                                                  <Label>Province/District/LGA <span style={{ color:"red"}}> *</span></Label>
                                                  <select
                                                      className="form-control"
                                                      type="text"
                                                      name="district"
                                                      id="district"
                                                      value={basicInfo.district}
                                                      style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                      onChange={handleInputChangeBasic}
                                                      >
                                                      <option value="">Select</option>
                                                      {provinces.map((value, index) => (
                                                          <option key={index} value={value.id}>
                                                              {value.name}
                                                          </option>
                                                      ))}
                                                  </select>
                                                  {errors.district !=="" ? (
                                                      <span className={classes.error}>{errors.district}</span>
                                                      ) : "" }
                                              </FormGroup>
                                          </div>
                                      </div>
                                        <div className="row">
                                            <div className="form-group  col-md-4">
                                                <FormGroup>
                                                    <Label>Sex <span style={{ color:"red"}}> *</span></Label>
                                                    <select
                                                            className="form-control"
                                                            name="sexId"
                                                            id="sexId"
                                                            onChange={handleInputChangeBasic}
                                                            value={basicInfo.sexId}
                                                            style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}>
                                                            <option value={""}>Select</option>
                                                            {genders.map((gender, index) => (
                                                            <option key={gender.id} value={gender.id}>{gender.display}</option>
                                                            ))}
                                                        </select>
                                                        {errors.sexId !=="" ? (
                                                    <span className={classes.error}>{errors.sexId}</span>
                                                    ) : "" }
                                                </FormGroup>
                                            </div>
                                            <div className="form-group mb-2 col-md-2">
                                                <FormGroup>
                                                    <Label>Date Of Birth <span style={{ color:"red"}}> *</span></Label>
                                                    <div className="radio">
                                                        <label>
                                                            <input
                                                                type="radio"
                                                                value="Actual"
                                                                name="dateOfBirth"
                                                                defaultChecked
                                                                onChange={(e) => handleDateOfBirthChange(e)}
                                                                style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                            /> Actual
                                                        </label>
                                                    </div>
                                                    <div className="radio">
                                                        <label>
                                                            <input
                                                                type="radio"
                                                                value="Estimated"
                                                                name="dateOfBirth"
                                                                onChange={(e) => handleDateOfBirthChange(e)}
                                                                style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                            /> Estimated
                                                        </label>
                                                    </div>
                                                </FormGroup>
                                            </div>
                                            <div className="form-group mb-3 col-md-3">
                                                <FormGroup>
                                                    <Label>Date </Label>
                                                    <input
                                                        className="form-control"
                                                        type="date"
                                                        name="dob"
                                                        min="1940-01-01"
                                                        id="dob"
                                                        max={basicInfo.dateOfRegistration}
                                                        value={basicInfo.dob}
                                                        onChange={handleDobChange}
                                                        style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                    />
                                                </FormGroup>
                                            </div>
                                            <div className="form-group mb-3 col-md-3">
                                                <FormGroup>
                                                    <Label>Age</Label>
                                                    <input
                                                        type="number"
                                                        name="age"                                                       
                                                        className="form-control"                                                        
                                                        id="age"
                                                        min="1"
                                                        value={basicInfo.age}
                                                        disabled={ageDisabled}
                                                        onChange={handleAgeChange}
                                                        style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                    />
                                                </FormGroup>
                                            </div>
                                        </div>
                                            </div>
                                            </div>
                                            </div>
                    
                                    <div className="card">
                                        <div className="card-header" style={{backgroundColor:"#014d88",color:'#fff',fontWeight:'bolder',  borderRadius:"0.2rem"}}>
                                            <h5 className="card-title" style={{color:'#fff'}}>VH Laboratory register</h5>
                                            {showContactCard===false  ? (<><span className="float-end" style={{cursor: "pointer"}} onClick={onClickContactCard}><FaPlus /></span></>) :  (<><span className="float-end" style={{cursor: "pointer"}} onClick={onClickContactCard}><FaAngleDown /></span> </>)}
                                        </div>
                                        {showContactCard && (
                                        <div className="card-body">
                                            <div className={"row"}>
                                                <div className="form-group mb-3 col-md-4">
                                                    <FormGroup>
                                                        <Label>Clinic/Unit where test request was ordered</Label>
                                                        <select
                                                            className="form-control"
                                                            name="maritalStatusId"
                                                            id="maritalStatusId"
                                                            onChange={handleInputChangeBasic}
                                                            value={basicInfo.maritalStatusId}
                                                            style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}>
                                                            <option value={""}>Select</option>
                                                            {maritalStatusOptions.map((maritalStatusOption, index) => (
                                                                <option key={maritalStatusOption.id} value={maritalStatusOption.id}>{maritalStatusOption.display}</option>
                                                            ))}
                                                        </select>
                                                        
                                                    </FormGroup>
                                                </div>
                                                <div className="form-group  col-md-4">
                                                    <FormGroup>
                                                        <Label>HBV screening</Label>
                                                        <select
                                                            className="form-control"
                                                            name="employmentStatusId"
                                                            id="employmentStatusId"
                                                            onChange={handleInputChangeBasic}
                                                            value={basicInfo.employmentStatusId}
                                                            style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}>
                                                            <option value={""}>Select</option>
                                                            {occupationOptions.map((occupationOption, index) => (
                                                                <option key={occupationOption.id} value={occupationOption.id}>{occupationOption.display}</option>
                                                            ))}
                                                        </select>
                                                        {errors.employmentStatusId !=="" ? (
                                                        <span className={classes.error}>{errors.employmentStatusId}</span>
                                                        ) : "" }
                                                    </FormGroup>
                                                </div>
                                            <div className="form-group  col-md-4">
                                                <FormGroup>
                                                    <Label>HBcAb (Total)</Label>
                                                    <select
                                                        className="form-control"
                                                        name="educationId"
                                                        id="educationId"
                                                        onChange={handleInputChangeBasic}
                                                        value={basicInfo.educationId}
                                                        style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}>
                                                        <option value={""}>Select</option>
                                                        {educationOptions.map((educationOption, index) => (
                                                            <option key={educationOption.id} value={educationOption.id}>{educationOption.display}</option>
                                                        ))}
                                                    </select>
                                                    {errors.educationId !=="" ? (
                                                    <span className={classes.error}>{errors.educationId}</span>
                                                    ) : "" }
                                                </FormGroup>
                                            </div>
                                        <div className="form-group mb-3 col-md-4">
                                                <FormGroup>
                                                    <Label for="ninNumber">HBsAg quantification(IU/ml)</Label>
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        name="ninNumber"
                                                        value={basicInfo.ninNumber}
                                                        id="ninNumber"
                                                        onChange={handleInputChangeBasic}
                                                        style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                                    />
                                                </FormGroup>
                                        </div>
                                        <div className="form-group  col-md-4">
                                                    <FormGroup>
                                                        <Label>HBeAg</Label>
                                                        <select
                                                            className="form-control"
                                                            name="employmentStatusId"
                                                            id="employmentStatusId"
                                                            onChange={handleInputChangeBasic}
                                                            value={basicInfo.employmentStatusId}
                                                            style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}>
                                                            <option value={""}>Select</option>
                                                            {occupationOptions.map((occupationOption, index) => (
                                                                <option key={occupationOption.id} value={occupationOption.id}>{occupationOption.display}</option>
                                                            ))}
                                                        </select>
                                                        {errors.employmentStatusId !=="" ? (
                                                        <span className={classes.error}>{errors.employmentStatusId}</span>
                                                        ) : "" }
                                                    </FormGroup>
                                                </div>
                                                <div className="form-group  col-md-4">
                                                    <FormGroup>
                                                        <Label>Anti-HDV</Label>
                                                        <select
                                                            className="form-control"
                                                            name="employmentStatusId"
                                                            id="employmentStatusId"
                                                            onChange={handleInputChangeBasic}
                                                            value={basicInfo.employmentStatusId}
                                                            style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}>
                                                            <option value={""}>Select</option>
                                                            {occupationOptions.map((occupationOption, index) => (
                                                                <option key={occupationOption.id} value={occupationOption.id}>{occupationOption.display}</option>
                                                            ))}
                                                        </select>
                                                        {errors.employmentStatusId !=="" ? (
                                                        <span className={classes.error}>{errors.employmentStatusId}</span>
                                                        ) : "" }
                                                    </FormGroup>
                                                    </div>
                                                    <div className="form-group  col-md-4">
                                                    <FormGroup>
                                                        <Label>HBV DNA (Write exact result)</Label>
                                                        <select
                                                            className="form-control"
                                                            name="employmentStatusId"
                                                            id="employmentStatusId"
                                                            onChange={handleInputChangeBasic}
                                                            value={basicInfo.employmentStatusId}
                                                            style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}>
                                                            <option value={""}>Select</option>
                                                            {occupationOptions.map((occupationOption, index) => (
                                                                <option key={occupationOption.id} value={occupationOption.id}>{occupationOption.display}</option>
                                                            ))}
                                                        </select>
                                                        {errors.employmentStatusId !=="" ? (
                                                        <span className={classes.error}>{errors.employmentStatusId}</span>
                                                        ) : "" }
                                                    </FormGroup>
                                                </div>
                                                <div className="form-group  col-md-4">
                                                    <FormGroup>
                                                        <Label>HCV screening</Label>
                                                        <select
                                                            className="form-control"
                                                            name="employmentStatusId"
                                                            id="employmentStatusId"
                                                            onChange={handleInputChangeBasic}
                                                            value={basicInfo.employmentStatusId}
                                                            style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}>
                                                            <option value={""}>Select</option>
                                                            {occupationOptions.map((occupationOption, index) => (
                                                                <option key={occupationOption.id} value={occupationOption.id}>{occupationOption.display}</option>
                                                            ))}
                                                        </select>
                                                        {errors.employmentStatusId !=="" ? (
                                                        <span className={classes.error}>{errors.employmentStatusId}</span>
                                                        ) : "" }
                                                    </FormGroup>
                                            </div>
                                            <div className="form-group  col-md-4">
                                                    <FormGroup>
                                                        <Label>Type of HCV RNA test</Label>
                                                        <select
                                                            className="form-control"
                                                            name="employmentStatusId"
                                                            id="employmentStatusId"
                                                            onChange={handleInputChangeBasic}
                                                            value={basicInfo.employmentStatusId}
                                                            style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}>
                                                            <option value={""}>Select</option>
                                                            {occupationOptions.map((occupationOption, index) => (
                                                                <option key={occupationOption.id} value={occupationOption.id}>{occupationOption.display}</option>
                                                            ))}
                                                        </select>
                                                        {errors.employmentStatusId !=="" ? (
                                                        <span className={classes.error}>{errors.employmentStatusId}</span>
                                                        ) : "" }
                                                    </FormGroup>
                                            </div>
                                            <div className="form-group  col-md-4">
                                                    <FormGroup>
                                                        <Label>Hepatitis C Virus RNA Testing</Label>
                                                        <select
                                                            className="form-control"
                                                            name="employmentStatusId"
                                                            id="employmentStatusId"
                                                            onChange={handleInputChangeBasic}
                                                            value={basicInfo.employmentStatusId}
                                                            style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}>
                                                            <option value={""}>Select</option>
                                                            {occupationOptions.map((occupationOption, index) => (
                                                                <option key={occupationOption.id} value={occupationOption.id}>{occupationOption.display}</option>
                                                            ))}
                                                        </select>
                                                        {errors.employmentStatusId !=="" ? (
                                                        <span className={classes.error}>{errors.employmentStatusId}</span>
                                                        ) : "" }
                                                    </FormGroup>
                                                    </div>
                                                <div className="form-group mb-3 col-md-4">
                                                <FormGroup>
                                                    <Label for="ninNumber">HCV RNA Write exact result(IU/ml)</Label>
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        name="ninNumber"
                                                        value={basicInfo.ninNumber}
                                                        id="ninNumber"
                                                        onChange={handleInputChangeBasic}
                                                        style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                                    />
                                                </FormGroup>
                                            </div>
                                            <div className="form-group  col-md-4">
                                                    <FormGroup>
                                                        <Label>HIV Status</Label>
                                                        <select
                                                            className="form-control"
                                                            name="employmentStatusId"
                                                            id="employmentStatusId"
                                                            onChange={handleInputChangeBasic}
                                                            value={basicInfo.employmentStatusId}
                                                            style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}>
                                                            <option value={""}>Select</option>
                                                            {occupationOptions.map((occupationOption, index) => (
                                                                <option key={occupationOption.id} value={occupationOption.id}>{occupationOption.display}</option>
                                                            ))}
                                                        </select>
                                                        {errors.employmentStatusId !=="" ? (
                                                        <span className={classes.error}>{errors.employmentStatusId}</span>
                                                        ) : "" }
                                                    </FormGroup>
                                            </div>
                                          </div>
                                      </div>
                                )}
                            </div>
                            {/* END OF First DOSAGE */}
                            {saving ? <Spinner /> : ""}
                            <br/>
                            </div>
                        </Form>
                    </div>
                </CardContent>
            </Card>
            <Modal show={open} toggle={toggle} className="fade" size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered backdrop="static">
             <Modal.Header >
            <Modal.Title id="contained-modal-title-vcenter">
                Notification!
            </Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <h4>Are you Sure of the Age entered?</h4>
                </Modal.Body>
            <Modal.Footer>
                <Button onClick={toggle} style={{backgroundColor:"#014d88", color:"#fff"}}>Yes</Button>
            </Modal.Footer>
            </Modal> 
        </>
    );
};

export default UserRegistration