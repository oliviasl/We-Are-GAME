import StudentProfile from "../layouts/StudentProfile";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PeerProfileView from "../layouts/PeerProfileView";
import { useCookies } from "react-cookie";
import MentorOfStudentView from "../layouts/MentorOfStudentView";
import NotFoundPage from "./NotFoundPage";

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
  user_sport1_level: string;
  user_sport2: string;
  user_sport2_role: string;
  user_sport2_level: string;
  user_notes: string;

  user_grad_year: number;

  user_instagram: string;
  user_facebook: string;
  user_show_socials: boolean;
}

export interface peerData {
  user_id: number;
  user_email: string;
  user_firstname: string;
  user_lastname: string;
  user_phone: string;
  user_school: string;
  user_facebook: string;
  user_instagram: string;
  user_show_socials: boolean;

  user_potential_major: string;
  user_alt_major1: string;
  user_alt_major2: string;
  user_sport1: string;
  user_sport1_role: string;
  user_sport1_level: string;
  user_sport2: string;
  user_sport2_role: string;
  user_sport2_level: string;

  user_grad_year: number;
}

export interface collegeAssignments {
  assignment_id: number;
  college_id: number;
  user_id: number;
  college_name: string;
}

const StudentProfileRoute = () => {
  const { id } = useParams();

  const [studentData, setStudentData] = useState<studentData>({} as studentData);
  const [validID, setValidID] = useState(true);
  const [collegeAssignments, setCollegeAssignments] = useState<collegeAssignments[]>([]);
  const [peerData, setPeerData] = useState<peerData>({} as peerData);
  const [cookies] = useCookies(['user_id', 'user_status', 'user_name']);

  const fetchAssignments = async () => {
    try {
      const userData = JSON.stringify({
        userId: id
      });

      const assignmentsResponse = await fetch("https://we-are-game-backend.onrender.com/api/assignmentsByUserId", {
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

        const collegeResponse = await fetch("https://we-are-game-backend.onrender.com/api/collegeById", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            userId: id,
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
      setCollegeAssignments(resolvedCollegeNames);

    } catch (error) {
      console.error("Error fetching assignments data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = JSON.stringify({
          userId: id
        });
        const response = await fetch(`https://we-are-game-backend.onrender.com/api/userById`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: userData,
        });

        const data = await response.json();
        setStudentData(data[0]);
        setPeerData(data[0]);
        
        if (Object.keys(data).length === 0)
          setValidID(false);
        else
          setValidID(true);
      } catch (error) {
        console.error("Error fetching student data:", error);
        setValidID(false);
      }
    };

    fetchData();
    fetchAssignments();
    
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDelete = async (collegeId: number) => {
    try {
      const response = await fetch('https://we-are-game-backend.onrender.com/api/deleteAssignment', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          userId: id,
          collegeId: collegeId,
        }),
      });

      if (response.ok) {
        await fetchAssignments();
        console.log('Assignment deleted');
      } else {
        console.error('Cannot delete assignment');
      }
    } catch (error) {
      console.error('Error deleting assignment:', error);
    }
  };

  const handleAdd = async (collegeId: number) => {
    try {
      const response = await fetch('https://we-are-game-backend.onrender.com/api/createAssignment', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          userId: id,
          collegeId: collegeId,
        }),
      });
  
      if (response.ok) {
        await fetchAssignments();
        console.log('Assignment created');
      } else {
        console.error('Cannot create assignment');
      }
    } catch (error) {
      console.error('Error creating assignment:', error);
    }
  };

  return (
    
    <div>
      {validID && (cookies.user_status === 3 || cookies.user_id === parseInt(id ? id : "")) ? (
        <StudentProfile
          studentData={studentData}
          collegeAssignments={collegeAssignments}
          handleDelete={handleDelete}
          handleAdd={handleAdd}
        />
      ) : validID && cookies.user_status === 1 ? (
        <PeerProfileView
          peerData={peerData}
        />
      ) : validID && cookies.user_status === 2 ? (
        <MentorOfStudentView
          studentData={studentData}
          collegeAssignments={collegeAssignments}
          handleDelete={handleDelete}
          handleAdd={handleAdd}
        />
      ) : (
        <NotFoundPage/>
      )}
    </div>
  );

};

export default StudentProfileRoute;
