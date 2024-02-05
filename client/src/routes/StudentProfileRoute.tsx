import { Navbar } from "../layouts/Navbar";
import { ProfileBox } from "../components/ProfileBox";
import React, { useEffect, useState, ElementType } from "react";


const StudentProfile = () => {
  const [username, setUsername] = useState("User");
  const hobbies = ["Reading", "Gardening", "Traveling"];

  return (
    <div className="">
      <Navbar />
      <div className="flex-wrap m-auto mx-20 mt-10">
        {/* profile info */}
        <div className=" bg-brand-gray-20 text-brand-white flex justify-between p-4 rounded-md font-circular-std items-center "> 
          {/* user name + grad year */}
          <div className="flex-col">
            <div className="text-lg font-medium p-0 m-0 leading-tight">Robert Lin {username}</div>
            <div className="text-sm">Highschool/College Grad Yr.</div>
          </div>
          {/* icon */}
          <div className="bg-black">
            P
          </div>
        </div>
        {/* college info */}
        <div className="border-2">
          Colleges
          University of Southern California
          <ProfileBox type="hobbies" />
        </div>

      </div>
    </div>
  )
};

export default StudentProfile;