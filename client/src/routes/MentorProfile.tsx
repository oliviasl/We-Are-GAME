import React, { useState, useEffect } from "react";
import MentorProfile from "../layouts/MentorProfile";
import { useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

export interface mentorData {
    mentor_id: number;
    mentor_firstname: string;
    mentor_lastname: string;
    mentor_email: string;
    mentor_phone: string;
    mentor_colleges: string;
    mentor_degrees: string;
    mentor_major1: string;
    mentor_degree1: string;
    mentor_major2: string;
    mentor_degree2: string;
    mentor_major3: string;
    mentor_degree3: string;
    mentor_curr_employment: string;
    mentor_highest_sports_level: string;
    mentor_interests: string;
    mentor_extracurriculars: string;
    mentor_sport1: string;
    mentor_sport1_role: string;
    mentor_sport2: string;
    mentor_sport2_role: string;
}



const MentorProfileViewRoute = () => {
    const [mentorData, setMentorData] = useState({} as mentorData);
    const [validID, setValidID] = useState(true);
    const {id} = useParams();

    useEffect(() => {
        const fetchData = async () => {
        try {
            const mentorData = JSON.stringify({
                mentorId: id
            });
            const response = await fetch('https://we-are-game-backend.onrender.com/api/mentorById', {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: mentorData,
            });

            const data = await response.json();
            setMentorData(data[0]);

            if (Object.keys(data).length === 0)
                setValidID(false);
            else
                setValidID(true);
        } catch (error) {
            console.error("Error fetching mentor data:", error);
        }
        };
        fetchData();
    }, []);

    return (
        <div>
            {validID ? (
                <MentorProfile
                    mentorData={mentorData}
                />
            ) : (
                <NotFoundPage/>
            )}
        </div>
    );
};

export default MentorProfileViewRoute;
