import React, { useEffect, useState, ElementType } from "react";
import { Home } from "lucide-react";

const tempRouteTiles = [
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
            <h1 className="w-full p-14 pl-20 text-left text-4xl font-bold">
                Welcome, {username}!
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 w-2/3 gap-4 content-center place-items-center">
                {tempRouteTiles.map(routeTile => (
                    <a href={routeTile.url} className="flex flex-row items-center rounded gap-4 w-full h-full content-center p-20 bg-secondary-dark-gray">
                        <routeTile.Icon className="w-6 h-6 text-white" />
                        <h1 className="text-white text-2xl font-bold">{routeTile.name}</h1>
                    </a>
                ))}
            </div>
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