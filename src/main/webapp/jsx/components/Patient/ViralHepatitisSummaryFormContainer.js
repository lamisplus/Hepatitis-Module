import React, { useState } from "react";
import SummaryTypeSelect from "./SummaryTypeSelect/SummaryTypeSelect";
import Reactive  from "../Patient/ViralHepatitisSummaryForms/Reactive";
import NonReactive from "./ViralHepatitisSummaryForms/NonReactive";

const ViralHepatitisSummaryFormContainer = () => {

  const [formValues, setFormValues] = useState({
    select1Value: "",
    select2Value: "",
    select3Value: "",
});

const formMap = {
    "Reactive" : <Reactive/>,
    "Non Reactive" : <NonReactive/>,
    "Fibrosis" : <div>Fibrosis</div>,
    "Cirrhosis" : <div>Cirrhosis</div>,
    "Hepatocellular Carcinoma" : <div>Hepatocellular Carcinoma</div>,
    "HBV DNA <2000 IU/ml" : <div>HBV DNA {">"}2000 IU/ml</div>,
    "HBV DNA >=2000 IU/ml" : <div>HBV DNA {">="}2000 IU/ml</div>,
    "HBV DNA >=200000 IU/ml" : <div>HBV DNA {">="}200000 IU/ml</div>,
    "HBegAg +ve" : <div>HBegAg +ve</div>,
    "Mortality Reactive" : <div> Mortality Reactive</div>,
    "Mortality Reactive" : <div> Mortality Reactive</div>,
    "Monitoring Reactive" : <div>Monitoring Reactive</div>,
    "Monitoring Non Reactive" : <div>Monitoring Non Reactive</div>,
}

  return (
    <div>
      <div>
        <SummaryTypeSelect formValues={formValues} setFormValues={setFormValues}/>
      </div>

      <div className="my-2" style={{fontWeight: "600"}}>
        <span>{formValues.select1Value && ` ${formValues.select1Value} `}</span>
        <span>{formValues.select2Value && ` | ${formValues.select2Value } `}</span>
        <span style={{color: "#014d88"}}>{formValues.select3Value && `| ${formValues.select3Value} `}</span>
      </div>

      <div>
       {formMap[formValues.select3Value]}
      </div>
    </div>
  );
};

export default ViralHepatitisSummaryFormContainer;
