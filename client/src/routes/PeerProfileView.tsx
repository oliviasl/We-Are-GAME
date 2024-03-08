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

let userId = 1;
  

const PeerProfileViewRoute = () => {
    const [peerData, setPeerData] = useState({} as peerData);

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
            console.log("data:", data[0]);
            setPeerData(data[0]);
        } catch (error) {
            console.error("Error fetching student data:", error);
        }
        };
        fetchData();
    }, []);

    return (
        <div>
            <PeerProfileView
                peerData={peerData}
            />
        </div>
    );
};

export default PeerProfileViewRoute;