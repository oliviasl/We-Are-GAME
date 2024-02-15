import StudentProfile from "../layouts/StudentProfile";
import { Navbar } from "../layouts/Navbar";
import React, { useEffect, useState, ElementType } from "react";

export interface studentData {
  user_id: number;
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

}

export interface collegeAssignments {
  assignment_id: number;
  college_id: number;
  user_id: number;
  college_name: string;
}

const StudentProfileRoute = () => {
  const [studentData, setStudentData] = useState<studentData>({} as studentData);
  const [collegeAssignments, setCollegeAssignments] = useState<collegeAssignments[]>([]);

  let userId = 1;

  // REMOVE! hard coded for display purposes
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
        const userData = JSON.stringify({
          userId: userId
        });
        const response = await fetch(`/api/userById`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: userData,
        });

        const data = await response.json();
        setStudentData(data[0]);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    const fetchAssignments = async () => {
      try {
        const userData = JSON.stringify({
          userId: userId
        });

        const assignmentsResponse = await fetch("/api/assignmentsByUserId", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: userData,
        });

        const assignmentsData = await assignmentsResponse.json();        
        const collegeNamesPromises = (assignmentsData as collegeAssignments[]).map(async (assignment: collegeAssignments) => {
          const collegeId = assignment.college_id;
        
          const collegeResponse = await fetch("/api/collegeById", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              userId: userId,
              collegeId: collegeId,
            }),
          });
        
          const collegeData = await collegeResponse.json();
          return {
            assignment_id: assignment.assignment_id,
            college_id: assignment.college_id,
            user_id: assignment.user_id,
            college_name: collegeData[0]?.college_name || "College unknown",
          };
        });
        
        const resolvedCollegeNames = await Promise.all(collegeNamesPromises);
        console.log("Resolved names:", resolvedCollegeNames);

        setCollegeAssignments(resolvedCollegeNames);

      } catch (error) {
        console.error("Error fetching assignments data:", error);
      }
    };

    fetchData();
    fetchAssignments();
  }, [userId]);

  return (
    <div className="">
      <Navbar />
      {<StudentProfile studentData={studentData} collegeAssignments={collegeAssignments} />}
    </div>
  );
};

export default StudentProfileRoute;
