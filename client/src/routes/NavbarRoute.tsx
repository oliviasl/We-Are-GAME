import { useState } from "react";
import { Navbar } from "../layouts/Navbar";


const NavbarRoute = () => {
  const [userType, setUserType] = useState('User');

  return <div className="">
    <Navbar userType={userType} />
  </div>
}

export default NavbarRoute;