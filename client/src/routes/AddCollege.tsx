import {useState} from "react";
import {CollegeProgressBar} from "../components/CollegeProgressBar";
import {Navbar} from "../layouts/Navbar";
import {collegeForm} from "../util/data/college-form";
import {CollegeFormFormSection} from "../components/CollegeFormFormSection";
import {collegeFormSchemas} from "../util/college-form-schema";

const AddCollege = () => {
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
      />
    </div>
  </div>
}

export default AddCollege;