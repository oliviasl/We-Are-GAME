import { useState } from "react";
import { Navbar } from "../components/Navbar";


const NavbarRoute = () => {
  const [activeStep, setActiveStep] = useState(0);

  return <div className="">
      <Navbar />
  </div>
}

export default NavbarRoute;