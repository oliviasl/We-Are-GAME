import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { CollegeProgressBar } from "../components/CollegeProgressBar";

const AddCollege = () => {
  const [activeStep, setActiveStep] = useState(0);

  return <div className="h-screen w-screen flex flex-col items-center">
    <div className="max-w-6xl w-full">
      <CollegeProgressBar activeStep={activeStep} />
    </div>
    <div className="mt-16 max-w-4xl w-full flex space-x-4">
      <Button onClick={() => setActiveStep(step=>step-1)} disabled={activeStep===0} fullWidth>
        Prev
      </Button>
      <Button onClick={() => setActiveStep(step=>step+1)} fullWidth>
        Next
      </Button>
    </div>
  </div>
}

export default AddCollege;