import React, { useEffect, useState, ElementType } from "react";
import { Divide, Home } from "lucide-react";
import HomePageLinks from "../layouts/HomePageLinks";
import { setegid } from "process";

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
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

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
        <div className="flex justify-center m-3"> {/* Entire View */}
            <div className="w-[612px] border-2 border-black rounded"> {/* Bordered Panel */}
                <div className="flex justify-around mt-3"> {/* Login vs Signup Nav */}
                    <div className="cursor-pointer" onClick={()=>{setTabs("Login")}}>Login</div>
                    <div className="cursor-pointer" onClick={()=>{setTabs("SignUp")}}>Sign Up</div>
                </div>
                {tabs=="Login" ? 
                    <div className="w-[400px] m-auto mt-12"> {/* Login Form */}
                        <div> {/* Username Wrapper */}
                            <div className="block text-gray-700 text-sm font-bold mb-3">Username</div>
                            <input className="border-2 border-black rounded w-full py-2 px-3 text-gray-700 leading-tight mb-3" id="username" type="text" value={username} onChange={e => setUsername(e.target.value)}></input>
                        </div>
                        <div> {/* Password Wrapper */}
                            <div className="block text-gray-700 text-sm font-bold mb-3">Password</div>
                            <input className="border-2 border-black rounded w-full py-2 px-3 text-gray-700 leading-tight mb-5" id="password" type="password"  value={password} onChange={e => setPassword(e.target.value)}></input>
                        </div>
                        <div className="flex items-center justify-center"> {/* Login Button Wrapper */}
                            <div className="cursor-pointer bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-12">Login</div>
                        </div>
                    </div> 
                : 
                    <div className="w-[400px] m-auto mt-12"> {/* Sign Up Form */}
                        <div className="flex space-x-auto mt-17"> {/* First / Last Name */}
                            <div className="w-[190px]"> {/* First Name */}
                                <div className="text-gray-700 text-sm font-bold mb-3">First</div>
                                <input className="border-2 border-black rounded w-full py-2 px-3 text-gray-700 leading-tight" id="first" type="text"  value={firstName} onChange={e => setFirstName(e.target.value)}></input>
                            </div>
                            <div className="w-[20px]"></div> {/* Spacer */}
                            <div className="w-[190px]"> {/* Last Name */}
                                <div className="text-gray-700 text-sm font-bold mb-3">Last</div>
                                <input className="border-2 border-black rounded w-full py-2 px-3 text-gray-700 leading-tight" id="last" type="text"  value={lastName} onChange={e => setLastName(e.target.value)}></input>
                            </div>
                        </div>
                        <div className="w-[400px] m-auto mt-5"> {/* Username Wrapper */}
                            <div className="block text-gray-700 text-sm font-bold mb-2">Username</div>
                            <input className="border-2 border-black rounded w-full py-2 px-3 text-gray-700 leading-tight" id="username" type="text"  value={username} onChange={e => setUsername(e.target.value)}></input>
                        </div>
                        <div className="w-[400px] m-auto mt-5"> {/* Password Wrapper */}
                            <div className="block text-gray-700 text-sm font-bold mb-2">Password</div>
                            <input className="border-2 border-black rounded w-full py-2 px-3 text-gray-700 leading-tight" id="password" type="text"  value={password} onChange={e => setPassword(e.target.value)}></input>
                        </div>
                        <div className="w-[400px] m-auto mt-5"> {/* Verify Password Wrapper */}
                            <div className="block text-gray-700 text-sm font-bold mb-2 py-12px">Verify Password</div>
                            <input className="border-2 border-black rounded w-full py-2 px-3 text-gray-700 leading-tight" id="verifypassword" type="text" value={verifyPassword} onChange={e => setVerifyPassword(e.target.value)}></input>
                        </div>
                        <div className="w-[400px] m-auto mt-5"> {/* Email Wrapper */}
                            <div className="block text-gray-700 text-sm font-bold mb-2 py-12px">Email</div>
                            <input className="border-2 border-black rounded w-full py-2 px-3 text-gray-700 leading-tight" id="email" type="text"  value={email} onChange={e => setEmail(e.target.value)}></input>
                        </div>
                        <div className="w-[400px] flex items-center justify-end mt-6"> {/* Auth Wrapper */}
                            <div className="cursor-pointer bg-gray-700 text-white font-bold py-2 px-4 rounded">Request Authorization</div>
                        </div>
                    </div>
                }
            </div>
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