import { Navbar } from "../layouts/Navbar";
import StudentProfile from "../layouts/StudentProfile";
import React, { useEffect, useState, ElementType } from "react";

const Profile = () => {
  return (
    <div className="">
      <Navbar />
      <StudentProfile />
    </div>
  );
};

export default Profile;
