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

    // return (
    //     <div className="h-screen w-screen flex flex-col items-center">
    //         <h1 className="w-full p-14 pl-20 text-left text-4xl text-brand-black font-bold font-grotesk">
    //             Welcome, {username}!
    //         </h1>
    //         <HomePageLinks RouteInfo={tempRouteInfo}/>
    //     </div>
    // )

    return (
        
        //              NOTES
        // how to center div in middle of screen?
        // not sure why width control isnt working
        // assuming I need to useState() with the login vs signup button and control the underline through a bool?
        
        <div className="w-full h-full flex items-center justify-center p-6">
            <form className="w-400px border border-black rounded px-8 pt-6 pb-8 mb-4">
                <div className="flex items-center justify-between pb-6">
                    <button>Login</button>
                    <button>Sign Up</button>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2 py-12px" htmlFor="username">
                        Username
                    </label>
                    <input className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight" id="username" type="text"></input>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight" id="password" type="password"></input>
                </div>
                <div className="flex items-center justify-center">
                    <button className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );

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