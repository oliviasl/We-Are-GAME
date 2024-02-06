import StudentProfile from "../layouts/StudentProfile";
import { Navbar } from "../layouts/Navbar";
import React, { useEffect, useState, ElementType } from "react";

const StudentProfileRoute = () => {
  // const [studentData, setStudentData] = useState<studentData | null>(null);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`/api/userById?userId=${userId}`);
  //       const data = await response.json();
  //       setStudentData(data[0]);
  //       console.log(data); 
  //     } catch (error) {
  //       console.error("Error fetching student data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [userId]);

  const studentData = {
    // TO DO: DYNAMICALLY POPULATE!
    username: "Sample Username",
    gradYear: "Sample Gradyear",
    phoneNum: "999-999-9999",
    email: "student@email.com",
    gpa: 4.0,
    eligibility: true,

    actMath: 36,
    actScience: 36,
    actReading: 36,
    actEnglish: 36,
    actComposite: 36,

    satMath: 1600,
    satReading: 1600,
    satComposite: 1600,

    purpose: "Sample Purpose",
    goal: "Sample Goal",
    notes: "Sample Note (yeji was here)",

    sports:["Tennis/Singles/Nat.", "Soccer/Goalie/Reg."],
    majors:["Business", "Marketing"],
    extracurriculars:["DECA", "Science Olympiad", "Key Club"],
    specialInterests:["Game Development", "Baking", "Art"],
    
    colleges:["Univ. of Southern California", "Univ. of Michigan", "Univ. of California, Los Angeles"]

  };

  return (
    <div className="">
      <Navbar />
      {studentData && <StudentProfile studentData={studentData} />}
    </div>
  );
};

export default StudentProfileRoute;
