import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditStudentPill from "../components/EditStudentPill";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import "react-toastify/dist/ReactToastify.css";
import NotFoundPage from "./NotFoundPage";

export const EditMentor = () => {
  // field data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [colleges, setColleges] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // string?
  const [email, setEmail] = useState("");
  const [degree1, setDegree1] = useState("");
  const [degree2, setDegree2] = useState("");
  const [degree3, setDegree3] = useState("");
  const [currEmployment, setCurrEmployment] = useState("");
  const [major1, setMajor1] = useState("");
  const [major2, setMajor2] = useState("");
  const [major3, setMajor3] = useState("");
  const [sport1, setSport1] = useState("");
  const [sport2, setSport2] = useState("");
  const [position1, setPosition1] = useState("");
  const [position2, setPosition2] = useState("");
  const [highestLevel, setHighestLevel] = useState("Select...");
  const [showHighestLevel, setShowHighestLevel] = useState(false);
  const [inputInterest, setInputInterest] = useState("");
  const [arrInterest, setArrInterest] = useState<string[]>([]);
  const [inputExtracurricular, setInputExtracurricular] = useState("");
  const [arrExtracurricular, setArrExtracurricular] = useState<string[]>([]);

  const { id } = useParams();
  const [validID, setValidID] = useState(false);
  const [cookies] = useCookies(["user_id", "user_status", "user_name"]);

  const navigate = useNavigate();
  const saveUserData = async () => {
    // cannot save with empty first or last name
    if (!firstName.trim() || !lastName.trim()) {
      toast("First name and last name can't be empty!", {
        className: "border-l-8 border-semantic-warning",
      });
      return;
    }
    try {
      const userData = {
        mentorId: id,
        newFields: {
          ...(firstName) ? {mentor_firstname: firstName} : {mentor_firstname: null},
          ...(lastName) ? {mentor_lastname: lastName} : {mentor_lastname: null},
          ...(email) ? {mentor_email: email} : {mentor_email: null},
          ...(phoneNumber) ? {mentor_phone: phoneNumber} : {mentor_phone: null},
          ...(colleges) ? {mentor_colleges: colleges} : {mentor_colleges: null},
          ...(degree1) ? {mentor_degree1: degree1} : {mentor_degree1: null},
          ...(degree2) ? {mentor_degree2: degree2} : {mentor_degree2: null},
          ...(degree3) ? {mentor_degree3: degree3} : {mentor_degree3: null},
          ...(major1) ? {mentor_major1: major1} : {mentor_major1: null},
          ...(major2) ? {mentor_major2: major2} : {mentor_major2: null},
          ...(major3) ? {mentor_major3: major3} : {mentor_major3: null},
          ...(currEmployment) ? {mentor_curr_employment: currEmployment} : {mentor_curr_employment: null},
          ...(highestLevel) ? {mentor_highest_sports_level: highestLevel} : {mentor_highest_sports_level: null},
          ...(arrInterest && arrInterest.length > 0) ? {mentor_interests: arrInterest.join(",")} : {mentor_interests: []},
          ...(arrExtracurricular && arrExtracurricular.length > 0) ? {mentor_extracurriculars: arrExtracurricular.join(",")} : {mentor_extracurriculars: []},
          ...(sport1) ? {mentor_sport1: sport1} : {mentor_sport1: null},
          ...(position1) ? {mentor_sport1_role: position1} : {mentor_sport1_role: null},
          ...(sport2) ? {mentor_sport1: sport2} : {mentor_sport1: null},
          ...(position2) ? {mentor_sport1_role: position1} : {mentor_sport2_role: null},
        },
      };
      const response = await fetch("/api/editMentor", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        navigate(`/mentor-profile/${id}`);
      } else {
        console.error("Error saving mentor data:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving mentor data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = JSON.stringify({
          mentorId: id,
        });
        const response = await fetch(`/api/mentorById`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: userData,
        });

        const data = await response.json();
        const mentorData = data[0];
        setFirstName(mentorData.mentor_firstname);
        setLastName(mentorData.mentor_lastname);
        setColleges(mentorData.mentor_colleges);
        setPhoneNumber(mentorData.mentor_phone);
        setEmail(mentorData.mentor_email);
        setCurrEmployment(mentorData.mentor_curr_employment);
        setDegree1(mentorData.mentor_degree1);
        setDegree2(mentorData.mentor_degree2);
        setDegree3(mentorData.mentor_degree3);
        setMajor1(mentorData.mentor_major1);
        setMajor2(mentorData.mentor_major2);
        setMajor3(mentorData.mentor_major3);
        setSport1(mentorData.mentor_sport1);
        setSport2(mentorData.mentor_sport2);
        setPosition1(mentorData.mentor_sport1_role);
        setPosition2(mentorData.mentor_sport2_role);
        setHighestLevel(mentorData.mentor_highest_sports_level);

        if (mentorData.mentor_interests != null && mentorData.mentor_interests.length > 0)
          setArrInterest(mentorData.mentor_interests.split(","));
        else
          setArrInterest([])
        if (mentorData.mentor_extracurriculars != null  && mentorData.mentor_extracurriculars.length > 0)
          setArrExtracurricular(mentorData.mentor_extracurriculars.split(","));
        else
          setArrExtracurricular([])
        
        if (Object.keys(mentorData).length === 0) 
          setValidID(false);
        else 
          setValidID(true);
      } catch (error) {
        console.error("Error fetching mentor data:", error);
        setValidID(false);
      }
    };

    fetchData();
  }, [id]);

  const handleInterestKeypress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setArrInterest((prevInterests: string[]) => {
        return [...prevInterests, inputInterest];
      });
      setInputInterest("");
    }
  };

  const removeInterest = (indexToRemove: number) => {
    return () => {
      setArrInterest((prevItems) => {
        // Create a copy of the previous array and remove the item at the specified index
        const updatedItems = [...prevItems];
        updatedItems.splice(indexToRemove, 1);
        return updatedItems;
      });
    };
  };

  const handleExtracurricularKeypress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setArrExtracurricular((prevExtracurriculars: string[]) => {
        return [...prevExtracurriculars, inputExtracurricular];
      });
      setInputExtracurricular("");
    }
  };

  const removeExtracurricular = (indexToRemove: number) => {
    return () => {
      setArrExtracurricular((prevItems) => {
        // Create a copy of the previous array and remove the item at the specified index
        const updatedItems = [...prevItems];
        updatedItems.splice(indexToRemove, 1);
        return updatedItems;
      });
    };
  };

  console.log("ID " + validID);
  console.log("cookies " + cookies.user_status);

  return (
    <div>
      {validID &&
      (cookies.user_status === 2 || cookies.user_status === 3) ? (
        <div className="mb-10">
          {/* Grid Wrapper */}
          <div className="mx-24 grid grid-cols-3 gap-5">
            {/* MY EDIT AND CANCEL */}
            <div className="col-span-full">
              <div className="flex justify-between items-center my-9">
                <div className="text-5xl font-bold">Mentor Edit</div>
                <div
                  className="flex justify-center items-center w-28 h-9 bg-brand-gray-90 border-2 border-brand-gray-20 rounded cursor-pointer"
                  onClick={() => navigate(`/mentor-profile/${id}`)}
                >
                  Cancel
                </div>
              </div>
            </div>

            {/* First Name */}
            <div>
              <div className="text-lg font-medium mb-3">First</div>
              <input
                className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
                id="first"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            {/* Last Name */}
            <div>
              <div className="text-lg font-medium mb-3">Last</div>
              <input
                className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
                id="last"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            {/* Phone Number */}
            <div>
              <div className="text-lg font-medium mb-3">Phone Number</div>
              <input
                className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
                id="first"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            {/* Email */}
            <div>
              <div className="text-lg font-medium mb-3">Email</div>
              <input
                className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
                id="last"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* Current Employment */}
            <div>
              <div className="text-lg font-medium mb-3">Current Employment</div>
              <input
                className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
                id="first"
                type="text"
                value={currEmployment}
                onChange={(e) => setCurrEmployment(e.target.value)}
              />
            </div>
            {/* Colleges */}
            <div>
              <div className="text-lg font-medium mb-3">Colleges</div>
              <input
                className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
                id="last"
                type="text"
                value={colleges}
                onChange={(e) => setColleges(e.target.value)}
              />
            </div>
          </div>
          <div className="mx-24 mt-7 grid grid-cols-3 gap-5">
            {/* Degree 1 */}
            <div>
              <div className="text-lg font-medium mb-3">Degrees</div>
              <input
                className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
                id="last"
                type="text"
                value={degree1}
                onChange={(e) => setDegree1(e.target.value)}
              />
            </div>
            {/* Major 1 */}
            <div>
              <div className="text-lg font-medium mb-3">Majors</div>
              <input
                className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
                id="first"
                type="text"
                value={major1}
                onChange={(e) => setMajor1(e.target.value)}
              />
            </div>
            {/* Degree 2 */}
            <div className="col-start-1">
              <input
                className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
                id="last"
                type="text"
                value={degree2}
                onChange={(e) => setDegree2(e.target.value)}
              />
            </div>
            {/* Major 2 */}
            <div className="flex items-end">
              <input
                className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
                id="last"
                type="text"
                value={major2}
                onChange={(e) => setMajor2(e.target.value)}
              />
            </div>
            {/* Degree 3 */}
            <div className="col-start-1">
              <input
                className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
                id="last"
                type="text"
                value={degree3}
                onChange={(e) => setDegree3(e.target.value)}
              />
            </div>
            {/* Major 3 */}
            <div className="flex items-end">
              <input
                className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
                id="last"
                type="text"
                value={major3}
                onChange={(e) => setMajor3(e.target.value)}
              />
            </div>
          </div>

          <div className="mx-24 mt-5 grid grid-cols-3 gap-5">
            {/* Sport */}
            <div className="mt-4">
              <div className="text-lg font-medium mb-3">Sport</div>
              <input
                className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
                id="first"
                type="text"
                value={sport1}
                onChange={(e) => setSport1(e.target.value)}
              />
            </div>
            {/* Position 1 */}
            <div>
              <div className="text-lg font-medium mb-3 mt-4">Position</div>
              <input
                className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
                id="last"
                type="text"
                value={position1}
                onChange={(e) => setPosition1(e.target.value)}
              />
            </div>
            {/* Highest Level */}
            <div>
              <div className="text-lg font-medium mb-3 mt-4">Highest Level</div>
              <div className="relative inline-block text-left w-full">
                <div>
                  <button
                    className="flex w-full h-9 justify-between gap-x-1.5 text-md font-medium rounded bg-white px-3 py-2 text-sm text-gray-700 border-black border-2 hover:bg-gray-50"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={() => {
                      setShowHighestLevel(!showHighestLevel);
                    }}
                  >
                    {highestLevel}
                    <svg
                      className="-mr-1 h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                {showHighestLevel && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                  >
                    <div className="py-1" role="none">
                      <div
                        className="text-gray-700 block px-4 py-2 text-sm"
                        role="menuitem"
                        id="menu-item-0"
                        onClick={() => {
                          setHighestLevel("D1");
                          setShowHighestLevel(false);
                        }}
                      >
                        D1
                      </div>
                      <div
                        className="text-gray-700 block px-4 py-2 text-sm"
                        role="menuitem"
                        id="menu-item-0"
                        onClick={() => {
                          setHighestLevel("D2");
                          setShowHighestLevel(false);
                        }}
                      >
                        D2
                      </div>
                      <div
                        className="text-gray-700 block px-4 py-2 text-sm"
                        role="menuitem"
                        id="menu-item-0"
                        onClick={() => {
                          setHighestLevel("D3");
                          setShowHighestLevel(false);
                        }}
                      >
                        D3
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sport 2 */}
            <div className="col-start-1">
              <input
                className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
                id="first"
                type="text"
                value={sport2}
                onChange={(e) => setSport2(e.target.value)}
              />
            </div>
            {/* Position 2 */}
            <div className="flex items-end">
              <input
                className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
                id="last"
                type="text"
                value={position2}
                onChange={(e) => setPosition2(e.target.value)}
              />
            </div>
          </div>

          <div className="mx-24 grid grid-cols-3 gap-5">
            {/* Interests */}
            <div className="my-10">
              <div className="text-lg font-medium mb-3">Interests</div>
              <input
                className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
                id="first"
                type="text"
                placeholder="Type and press enter to add"
                value={inputInterest}
                onChange={(e) => setInputInterest(e.target.value)}
                onKeyDown={handleInterestKeypress}
              />
              <div className="gap-3 w-full flex mt-5 flex-wrap">
                {arrInterest?.map((interest: string, idx: number) => {
                  return (
                    <EditStudentPill
                      key={interest + idx}
                      text={interest}
                      closeHandler={removeInterest(idx)}
                    />
                  );
                })}
              </div>
              {/* Map each interest from an interests array */}
            </div>
            {/* Extracurricular */}
            <div className="my-10">
              <div className="text-lg font-medium mb-3">Extracurriculars</div>
              <input
                className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
                id="last"
                type="text"
                value={inputExtracurricular}
                placeholder="Type and press enter to add"
                onChange={(e) => setInputExtracurricular(e.target.value)}
                onKeyDown={handleExtracurricularKeypress}
              />
              <div className="gap-3 w-full flex mt-5 flex-wrap">
                {arrExtracurricular?.map(
                  (extracurricular: string, idx: number) => {
                    return (
                      <EditStudentPill
                        key={extracurricular + idx}
                        text={extracurricular}
                        closeHandler={removeExtracurricular(idx)}
                      />
                    );
                  }
                )}
              </div>
              {/* Map each extracurricular from an extracurriculars array */}
            </div>

            <div className="col-span-full mt-6 mb-32">
              <div className="flex justify-end">
                <div
                  className="flex justify-center items-center w-28 h-9 bg-brand-gray-20 border-2 border-brand-gray-20 rounded text-white hover:bg-brand-green-45 transition duration-300 ease-in-out cursor-pointer"
                  onClick={saveUserData}
                >
                  Save
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NotFoundPage />
      )}
    </div>
  );
};

export default EditMentor;
