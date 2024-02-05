import StudentProfile from "../layouts/StudentProfile";
import { Navbar } from "../layouts/Navbar";
import React, { useEffect, useState, ElementType } from "react";

const StudentProfileRoute = () => {
  return (
    <div className="">
      <Navbar />
      <StudentProfile />
    </div>
  );
};

export default StudentProfileRoute;
