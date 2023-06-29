import React, { useState } from "react";
import SummaryTypeSelect from "./SummaryTypeSelect/SummaryTypeSelect";
import ViralHepatitisForm2 from "./ViralHepatitisForms/Form2";

const ViralHepatitisSummaryFormContainer = () => {

  const [formValues, setFormValues] = useState({
    select1Value: "",
    select2Value: "",
    select3Value: "",
});

const formMap = {
    "Reactive" : <div>Diagnosis Reactive</div>,
    "Non Reactive" : <div>Non Reactive</div>,
    "Fibrosis" : <div>Fibrosis</div>,
    "Cirrhosis" : <div>Cirrhosis</div>,
    "Hepatocellular Carcinoma" : <div>Hepatocellular Carcinoma</div>,
    "Monitoring Reactive" : <div>Monitoring Reactive</div>,
    "Monitoring Non Reactive" : <div>Monitoring Non Reactive</div>,
    "Reactive" : <div>reactive</div>,
    "Reactive" : <div>reactive</div>,
    "Reactive" : <div>reactive</div>,
    "Reactive" : <div>reactive</div>,
    "Reactive" : <div>reactive</div>,

}

  return (
    <div>
      <div>
        <SummaryTypeSelect formValues={formValues} setFormValues={setFormValues}/>
      </div>

      <div>
        <ViralHepatitisForm2/>
      </div>
    </div>
  );
};

export default ViralHepatitisSummaryFormContainer;
