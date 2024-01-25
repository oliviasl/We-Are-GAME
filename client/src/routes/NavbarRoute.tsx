import { useState } from "react";
import { Navbar } from "../components/Navbar";


const NavbarRoute = () => {
  const [activeStep, setActiveStep] = useState(0);

  return <div className="items-center">
    <div className="w-full">
      <Navbar />
    </div>
  </div>
}

export default NavbarRoute;