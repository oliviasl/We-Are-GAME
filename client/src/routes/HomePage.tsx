import React, { useEffect, useState, ElementType } from "react";
import { Home } from "lucide-react";
import HomePageLinks from "../layouts/HomePageLinks";

const tempRouteInfo = [
    {
        name: "Explore Colleges", 
        url: "#",
        Icon: Home
    },
    {
        name: "Find a Mentor", 
        url: "#",
        Icon: Home
    },
    {
        name: "Student Directory", 
        url: "#",
        Icon: Home
    },
    {
        name: "View Profile", 
        url: "#",
        Icon: Home
    },
]

const HomePage = () => {
    const [username, setUsername] = useState("User");

    // useEffect(() => {
    //     fetch(`/api/allColleges`)
    //         .then(response => response.json())
    //         .then(data => {console.log(data); setCollegeTable(data)})
    //         .catch(error => console.error(error));
    // }, []);

    return (
        <div className="h-screen w-screen flex flex-col items-center">
            <h1 className="w-full p-14 pl-20 text-left text-4xl text-brand-black font-bold font-grotesk">
                Welcome, {username}!
            </h1>
            <HomePageLinks RouteInfo={tempRouteInfo}/>
        </div>
    )

    // return (
    //     <div className="h-screen flex items-center justify-center">
    //         <table>
    //             <tr className="text-3xl">
    //                 <th>Name</th>
    //                 <th>Location</th>
    //                 <th>Website</th>
    //             </tr>
    //             {collegeTable.map((data) => (
    //                 <tr>
    //                     <td className="w-48 text-center text-2xl p-4">{data.college_name}</td>
    //                     <td className="w-48 text-center text-2xl p-4">{data.location_city}, {data.location_state}</td>
    //                     <td className="w-48 text-center text-2xl p-4">{data.general_web_addr}</td>
    //                 </tr>
    //             ))
    //             }
    //         </table>
    //     </div>
    // );
};

export default HomePage;