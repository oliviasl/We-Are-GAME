import React, { useState } from "react";
import clsx from "clsx";

const HomePage = () => {
  //Page State
  const [tabs, setTabs] = useState("Login");
  //Input States
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const clearFields = () => {
    setPassword("");
    setVerifyPassword("");
    setFirstName("");
    setLastName("");
    setEmail("");
  };


  const createUser = async () => {
    console.log("Would create a user");
    const userBody = JSON.stringify({
      userData: {
        user_email: email,
        user_password: password,
        user_firstname: firstName,
        user_lastname: lastName,
      },
    });
    const response = await fetch("/api/createUser", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: userBody,
    });
    const status = await response.json();
    console.log(status);
    //would put toast here
    setTabs("Logged in and user created");
  };


  const authUser = async () => {
    console.log("Would login/auth a user");
    const authBody =  JSON.stringify({
      email: email,
      password: password,
    })
    const response = await fetch("/api/validateUser", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: authBody
    });
    const status = await response.json();
    console.log(status); // I think if not [-1,-1], pass
  };

  return (
    <div className="flex justify-center m-3">
      {/* Entire View */}
      <div className="w-[612px] border-2 border-black rounded">
        {/* Bordered Panel */}
        <div className="flex justify-around mt-2">
          {/* Login vs Signup Nav */}
          <div
            className={clsx(
              "cursor-pointer w-full text-center py-2 px-4 border-b-2",
              {
                "border-black": tabs === "Login",
              }
            )}
            onClick={() => {
              setTabs("Login");
              clearFields();
            }}
          >
            Login
          </div>
          <div
            className={clsx(
              "cursor-pointer w-full text-center py-2 px-4 border-b-2",
              {
                "border-black": tabs !== "Login",
              }
            )}
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
                Email
              </div>
              <input
                className="border-2 border-black rounded w-full py-2 px-3 text-gray-700 mb-3"
                id="username"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              {/* Password Wrapper */}
              <div className="block text-gray-700 text-sm font-medium mb-3">
                Password
              </div>
              <input
                className="border-2 border-black rounded w-full py-2 px-3 text-gray-700 mb-5"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div className="flex items-center justify-center">
              {/* Login Button Wrapper */}
              <div
                className="cursor-pointer bg-gray-700 text-white font-medium py-2 px-4 rounded"
                onClick={authUser}
              >
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
                  First Name
                </div>
                <input
                  className="border-2 border-black rounded w-full py-2 px-3 text-gray-700"
                  id="first"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
              </div>
              <div>
                {/* Last Name */}
                <div className="text-gray-700 text-sm font-medium mb-3">
                  Last Name
                </div>
                <input
                  className="border-2 border-black rounded w-full py-2 px-3 text-gray-700"
                  id="last"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="mt-5">
              {/* Password Wrapper */}
              <div className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </div>
              <input
                className="border-2 border-black rounded w-full py-2 px-3 text-gray-700"
                id="password"
                type="password"
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
                type="password"
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
              <div
                className="cursor-pointer bg-gray-700 text-white font-medium py-2 px-4 rounded"
                onClick={createUser}
              >
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
