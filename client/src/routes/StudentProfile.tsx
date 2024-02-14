import StudentProfile from "../layouts/StudentProfile";
import React, { useEffect, useState, ElementType } from "react";

export interface studentData {
  user_email: string;
  user_firstname: string;
  user_lastname: string;
  user_phone: string;
  user_school: string;
  user_grade: number;
  user_ncaa_registered: boolean;
  user_reg_number: number;
  user_goal: string;
  user_purpose: string;
  user_gpa: number;

  user_sat: number;
  user_sat_read_write: number;
  user_sat_math: number;

  user_act: number;
  user_act_english: number;
  user_act_math: number;
  user_act_reading: number;
  user_act_science: number;

  user_potential_major: string;
  user_alt_major1: string;
  user_alt_major2: string;
  user_interests: string;
  user_extracurriculars: string;
  user_sport1: string;
  user_sport1_role: string;
  user_sport2: string;
  user_sport2_role: string;
  user_notes: string;

  user_grad_year:number;
  colleges:string[];

}

const StudentProfileRoute = () => {
  const [studentData, setStudentData] = useState<studentData>({} as studentData);
  let userId = 1;

  // REMOVE! hard coded for display purposes
  studentData.colleges = ["Univ. of Southern California", "Univ. of Michigan", "Univ. of California, Los Angeles"];
  studentData.user_grad_year = 2026;
  studentData.user_act_math = 36;
  studentData.user_act_science = 36;
  studentData.user_act_reading = 36;
  studentData.user_act_english = 36;
  studentData.user_sat = 1600;
  // REMOVE! hard coded for display purposes

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/userById?userId=${userId}`);
        const data = await response.json();
        console.log(JSON.stringify(data)); 
        setStudentData(data[0]);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchData();
  }, [userId]);
  
  return (
    <div className="">
      {<StudentProfile studentData={studentData} />}
    </div>
  );
};

export default StudentProfileRoute;
