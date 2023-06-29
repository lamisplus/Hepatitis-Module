import React, { useState } from "react";
import SummaryTypeSelect from "./SummaryTypeSelect/SummaryTypeSelect";
import Reactive  from "../Patient/ViralHepatitisSummaryForms/Reactive";

const ViralHepatitisSummaryFormContainer = () => {

  const [formValues, setFormValues] = useState({
    select1Value: "",
    select2Value: "",
    select3Value: "",
});

const formMap = {
    "Reactive" : <Reactive/>,
    "Non Reactive" : <div>Non Reactive</div>,
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

      <div>
       {formMap[formValues.select3Value]}
      </div>
    </div>
  );
};

export default ViralHepatitisSummaryFormContainer;
