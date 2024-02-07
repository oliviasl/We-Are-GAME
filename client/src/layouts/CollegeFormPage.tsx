import {useState} from "react";
import {collegeFormSchemas} from "../util/college-form-schema";
import {Navbar} from "./Navbar";
import {CollegeProgressBar} from "../components/CollegeProgressBar";
import {CollegeFormFormSection} from "../components/CollegeFormFormSection";
import {collegeForm} from "../util/data/college-form";

export default function CollegeFormPage({data}: { data?: any }) {
  const [formData, setFormData] = useState({})
  const [activeStep, setActiveStep] = useState(0);

  async function onNextButtonClick(data: any) {
    const updatedFormData = {...formData, ...data}
    setFormData(updatedFormData);

    if (activeStep < collegeFormSchemas.length - 1) {
      setActiveStep(activeStep + 1)
    } else alert(JSON.stringify(updatedFormData));
  }

  return <div className="h-screen w-screen flex flex-col items-center">
    <Navbar/>
    <div className="max-w-6xl w-full">
      <CollegeProgressBar activeStep={activeStep}/>
    </div>
    <div className="mt-16 max-w-4xl w-full space-y-8 pt-4 pb-20">
      <CollegeFormFormSection
        section={collegeForm[activeStep]}
        schema={collegeFormSchemas[activeStep]}
        onBack={activeStep > 0 ? () => setActiveStep(step => step - 1) : undefined}
        onNext={onNextButtonClick}
        isLastTab={activeStep === collegeFormSchemas.length - 1}
        data={data}
      />
    </div>
  </div>
}