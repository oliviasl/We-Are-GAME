import React, { useState } from "react";
import clsx from "clsx";

const HomePage = () => {
  //Page State
  const [tabs, setTabs] = useState("Login");
  //Input States
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const clearFields = () => {
    setUsername("");
    setPassword("");
    setVerifyPassword("");
    setFirstName("");
    setLastName("");
    setEmail("");
  };

  return (
    <div className="flex justify-center m-3">
      {/* Entire View */}
      <div className="w-[612px] border-2 border-black rounded">
        {/* Bordered Panel */}
        <div className="flex justify-around mt-2">
          {/* Login vs Signup Nav */}
          <div
            className={clsx("cursor-pointer w-full text-center py-2 px-4 border-b-2", {
              "border-black": tabs === "Login",
            })}
            onClick={() => {
              setTabs("Login");
              clearFields();
            }}
          >
            Login
          </div>
          <div
            className={clsx("cursor-pointer w-full text-center py-2 px-4 border-b-2", {
              "border-black": tabs !== "Login",
            })}
            onClick={() => {
              setTabs("SignUp");
              clearFields();
            }}
          >
            Sign Up
          </div>
        </div>
        {tabs === "Login" ? (
          <div className="px-8 sm:px-24 my-12">
            {/* Login Form */}
            <div>
              {/* Username Wrapper */}
              <div className="block text-gray-700 text-sm font-medium mb-3">
                Username
              </div>
              <input
                className="border-2 border-black rounded w-full py-2 px-3 text-gray-700 leading-tight mb-3"
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </div>
            <div>
              {/* Password Wrapper */}
              <div className="block text-gray-700 text-sm font-medium mb-3">
                Password
              </div>
              <input
                className="border-2 border-black rounded w-full py-2 px-3 text-gray-700 leading-tight mb-5"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div className="flex items-center justify-center">
              {/* Login Button Wrapper */}
              <div className="cursor-pointer bg-gray-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Login
              </div>
            </div>
          </div>
        ) : (
          <div className="px-8 sm:px-24 my-12">
            {/* Sign Up Form */}
            <div className="flex gap-5">
              {/* First / Last Name */}
              <div>
                {/* First Name */}
                <div className="text-gray-700 text-sm font-medium mb-3">
                  First
                </div>
                <input
                  className="border-2 border-black rounded w-full py-2 px-3 text-gray-700 leading-tight"
                  id="first"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
              </div>
              <div>
                {/* Last Name */}
                <div className="text-gray-700 text-sm font-medium mb-3">Last</div>
                <input
                  className="border-2 border-black rounded w-full py-2 px-3 text-gray-700 leading-tight"
                  id="last"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="mt-5">
              {/* Username Wrapper */}
              <div className="block text-gray-700 text-sm font-medium mb-2">
                Username
              </div>
              <input
                className="border-2 border-black rounded w-full py-2 px-3 text-gray-700 leading-tight"
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </div>
            <div className="mt-5">
              {/* Password Wrapper */}
              <div className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </div>
              <input
                className="border-2 border-black rounded w-full py-2 px-3 text-gray-700 leading-tight"
                id="password"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div className="mt-5">
              {/* Verify Password Wrapper */}
              <div className="block text-gray-700 text-sm font-medium mb-2">
                Verify Password
              </div>
              <input
                className="border-2 border-black rounded w-full py-2 px-3 text-gray-700 leading-tight"
                id="verifypassword"
                type="text"
                value={verifyPassword}
                onChange={(e) => setVerifyPassword(e.target.value)}
              ></input>
            </div>
            <div className="mt-5">
              {/* Email Wrapper */}
              <div className="block text-gray-700 text-sm font-medium mb-2">
                Email
              </div>
              <input
                className="border-2 border-black rounded w-full py-2 px-3 text-gray-700 leading-tight"
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="flex items-center justify-end mt-6">
              {/* Auth Wrapper */}
              <div className="cursor-pointer bg-gray-700 text-white font-medium py-2 px-4 rounded">
                Request Authorization
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
