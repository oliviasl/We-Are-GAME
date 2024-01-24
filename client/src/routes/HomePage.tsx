import React, { useEffect, useState, ElementType } from "react";
import { Divide, Home } from "lucide-react";
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
    const [tabs, setTabs] = useState("Login");
    const [password, setPassword] = useState("");

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
        
        <div className="flex justify-center m-3">
            <div className="w-[612px] border-2 border-black rounded">
                <div className="flex justify-around mt-3">
                    <div className="cursor-pointer" onClick={()=>{setTabs("Login")}}>Login</div>
                    <div onClick={()=>{setTabs("SignUp")}}>Sign Up</div>
                </div>
                {tabs=="Login" ? 
                    <div className="w-[400px] m-auto mt-12">
                        <div>
                            <div className="block text-gray-700 text-sm font-bold mb-3">Username</div>
                            <input className="border-2 border-black rounded w-full py-2 px-3 text-gray-700 leading-tight mb-3" id="username" type="text"></input>
                        </div>
                        <div>
                            <div className="block text-gray-700 text-sm font-bold mb-3">Password</div>
                            <input className="border-2 border-black rounded w-full py-2 px-3 text-gray-700 leading-tight mb-5" id="password" type="password"></input>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="cursor-pointer bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-12">Login</div>
                        </div>
                    </div> 
                : 
                    <div>
                        <div className="flex justify-center">
                            <div className="w-[191px] mx-2">
                                <div className="text-gray-700 text-sm font-bold mb-3">First</div>
                                <input className="border-2 border-black rounded w-full py-2 px-3 text-gray-700 leading-tight" id="username" type="text"></input>
                            </div>
                            <div className="w-[191px] mx-2">
                                <div className="text-gray-700 text-sm font-bold mb-3">Last</div>
                                <input className="border-2 border-black rounded w-full py-2 px-3 text-gray-700 leading-tight" id="username" type="text"></input>
                            </div>
                        </div>
                        <div className="w-[400px] m-auto mt-5">
                            <div className="block text-gray-700 text-sm font-bold mb-2">Username</div>
                            <input className="border-2 border-black rounded w-full py-2 px-3 text-gray-700 leading-tight" id="username" type="text"></input>
                        </div>
                        <div className="w-[400px] m-auto mt-5">
                            <div className="block text-gray-700 text-sm font-bold mb-2">Password</div>
                            <input className="border-2 border-black rounded w-full py-2 px-3 text-gray-700 leading-tight" id="username" type="text"></input>
                        </div>
                        <div className="w-[400px] m-auto mt-5">
                            <div className="block text-gray-700 text-sm font-bold mb-2 py-12px">Verify Password</div>
                            <input className="border-2 border-black rounded w-full py-2 px-3 text-gray-700 leading-tight" id="username" type="text"></input>
                        </div>
                        <div className="w-[400px] m-auto mt-5">
                            <div className="block text-gray-700 text-sm font-bold mb-2 py-12px">
                                Email
                            </div>
                            <input className="border-2 border-black rounded w-full py-2 px-3 text-gray-700 leading-tight" id="username" type="text"></input>
                        </div>
                    </div>
                }
            </div>
        </div>
    );

    // can we map the repetitive structure or needs to be independent because of values?

    //          SIGN UP Page
    // return (
    
    // );

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