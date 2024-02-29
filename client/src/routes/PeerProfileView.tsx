import React, { useState, useEffect } from "react";
import PeerProfileView from "../layouts/PeerProfileView";

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
    user_sport2: string;
    user_sport2_role: string;
  
    user_grad_year: number;
}

let userId = 3;
  

const PeerProfileViewRoute = () => {
    const [peerData, setPeerData] = useState({} as peerData);
    
    // REMOVE! hard coded for display purposes
    peerData.user_firstname = "Jane";
    peerData.user_lastname = "Doe";
    peerData.user_grad_year = 2026;
    peerData.user_phone = "310-000-0000";
    peerData.user_email = "student@email.com";
    peerData.user_facebook = "@fbjanedoe";
    peerData.user_instagram = "@igjanedoe";
    peerData.user_sport1 = "Tennis";
    peerData.user_sport2 = "Badminton";
    peerData.user_sport1_role = "Captain";
    peerData.user_sport2_role = "JV";
    peerData.user_potential_major = "CS";
    peerData.user_alt_major1 = "Business";
    peerData.user_alt_major2 = "Art";
    peerData.user_school = "High School";
    peerData.user_show_socials = true;
    // REMOVE! hard coded for display purposes

    // TO DO: hook up backend
    //     useEffect(() => {
    //         const fetchData = async () => {
    //         try {
    //             const userData = JSON.stringify({
    //                 userId: userId
    //             });
    //             const response = await fetch(`/api/userById`, {
    //                 method: "post",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     Accept: "application/json",
    //                 },
    //                 body: userData,
    //             });

    //             const data = await response.json();
    //             setPeerData(data[0]);
    //         } catch (error) {
    //             console.error("Error fetching student data:", error);
    //         }
    //         };

    //     fetchData();
    //   }, [userId]);

    return (
        <div>
            <PeerProfileView
                peerData={peerData}
            />
        </div>
    );
};

export default PeerProfileViewRoute;