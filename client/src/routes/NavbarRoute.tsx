import { useState } from "react";
import { Navbar } from "../components/Navbar";


const NavbarRoute = () => {
  const [userType, setUserType] = useState('User');

  let isAdmin = false;
  /*
    actual check for if user is an admin should go here
  */

  if (userType === 'User') { // default state (unset)
    setUserType(isAdmin ? 'admin' : 'student');
  }

  return <div className="">
    {userType === 'admin' ? (
    <Navbar isAdmin />
    ) : (
      <Navbar isAdmin={false} />
    )}
  </div>
}

export default NavbarRoute;