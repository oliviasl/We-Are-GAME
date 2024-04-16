import React, { useState, useEffect } from "react";
import MentorProfile from "../layouts/MentorProfile";
import { useParams } from "react-router-dom";

export interface mentorData {
    mentor_id: number;
    mentor_firstname: string;
    mentor_lastname: string;
    mentor_email: string;
    mentor_phone: string;
    mentor_colleges: string;
    mentor_degrees: string;
    mentor_major1: string;
    mentor_major2: string;
    mentor_major3: string;
    mentor_curr_employment: string;
    mentor_highest_sports_level: string;
    mentor_interests: string;
    mentor_extracurriculars: string;
    mentor_sport1: string;
    mentor_sport1_role: string;
    mentor_sport2: string;
    mentor_sport2_role: string;
    mentor_facebook: string;
    mentor_instagram: string;
    mentor_show_socials: boolean;

}



const MentorProfileViewRoute = () => {
    const [mentorData, setMentorData] = useState({} as mentorData);
    const {id} = useParams();

    useEffect(() => {
        const fetchData = async () => {
        try {
            const mentorData = JSON.stringify({
                mentorId: id
            });
            const response = await fetch('/api/mentorById', {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: mentorData,
            });

            const data = await response.json();
            console.log("data:", data[0]);
            setMentorData(data[0]);
        } catch (error) {
            console.error("Error fetching mentor data:", error);
        }
        };
        fetchData();
    }, []);

    return (
        <div>
            <MentorProfile
                mentorData={mentorData}
            />
        </div>
    );
};

export default MentorProfileViewRoute;
