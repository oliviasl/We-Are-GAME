import { Step, Stepper, Typography } from "@material-tailwind/react";

const steps: string[] = [
  "Basic Information",
  "Academic and Athletic Programs",
  "Enrollment Statistics",
  "Costs & Financial Aid",
  "College Resources",
  "Application Deadlines",
  "Additional Notes"
]

type CollegeProgressBarProps = {
  activeStep: number;
}
 
export function CollegeProgressBar({ activeStep }: CollegeProgressBarProps) {
  return (
    <div className="w-full py-4 px-8">
      <Stepper
        activeStep={activeStep}
      >
        {steps.map((step, i) => (
          <Step className={"h-6 w-6 border-2 border-transparent"} activeClassName="bg-brand-green-45 border-gray-900">
            <div className="absolute top-0 mt-8 w-36 text-center">
              <Typography
                color={activeStep === i ? "blue-gray" : "gray"}
                className={"font-bold text-sm"}
              >
                {step}
              </Typography>
            </div>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}