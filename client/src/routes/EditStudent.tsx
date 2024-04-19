import React, { useState, useEffect } from "react";
import { Navbar } from "../layouts/Navbar";
import { set } from "react-hook-form";
import { setgid } from "process";
import { useCookies } from "react-cookie";
import { useParams, useNavigate } from "react-router-dom";
import EditStudentPill from "../components/EditStudentPill";
import { toast } from "react-toastify";
import NotFoundPage from "./NotFoundPage";
import "react-toastify/dist/ReactToastify.css";

export const EditStudent = () => {
  const [cookies] = useCookies(['user_id', 'user_status', 'user_name']);

  // field data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [school, setSchool] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // string?
  const [email, setEmail] = useState("");
  const [grade, setGrade] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [showContact, setShowContact] = useState(false);
  const [major1, setMajor1] = useState("");
  const [major2, setMajor2] = useState("");
  const [major3, setMajor3] = useState("");
  const [sport1, setSport1] = useState("");
  const [sport2, setSport2] = useState("");
  const [position1, setPosition1] = useState("");
  const [position2, setPosition2] = useState("");
  const [level1, setLevel1] = useState("Select...");
  const [level2, setLevel2] = useState("Select...");
  const [showLevel1, setShowLevel1] = useState(false);
  const [showLevel2, setShowLevel2] = useState(false);
  const [inputInterest, setInputInterest] = useState("");
  const [arrInterest, setArrInterest] = useState<string[]>([]);
  const [inputExtracurricular, setInputExtracurricular] = useState("");
  const [arrExtracurricular, setArrExtracurricular] = useState<string[]>([]);
  const [actReading, setACTReading] = useState("");
  const [actMath, setACTMath] = useState("");
  const [actScience, setACTScience] = useState("");
  const [actWriting, setACTWriting] = useState("");
  const [actComposite, setACTComposite] = useState("");
  const [satReading, setSATReading] = useState("");
  const [satMath, setSATMath] = useState("");
  const [satComposite, setSATComposite] = useState("");
  const [gpa, setGPA] = useState("");
  const [purpose, setPurpose] = useState("");
  const [goal, setGoal] = useState("");
  const [validID, setValidID] = useState(false);

  const { id } = useParams();
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
        userId: id,
        newFields: {
          user_firstname: firstName,
          user_lastname: lastName,
          user_school: school,
          user_phone: phoneNumber,
          user_email: email,
          ...(grade) && {user_grad_year: parseInt(grade)},
          user_instagram: instagram,
          user_facebook: facebook,
          user_potential_major: major1,
          user_alt_major1: major2,
          user_alt_major2: major3,
          user_sport1: sport1,
          user_sport2: sport2,
          user_sport1_role: position1,
          user_sport2_role: position2,
          user_sport1_level: level1,
          user_sport2_level: level2,
          ...(arrInterest.length > 0) && {user_interests: arrInterest.join(",")},
          ...(arrExtracurricular.length > 0) && {user_extracurriculars: arrExtracurricular.join(",")},
          ...(actReading) && {user_act_reading: parseInt(actReading)},
          ...(actMath) && {user_act_math: parseInt(actMath)},
          ...(actScience) && {user_act_science: parseInt(actScience)},
          ...(actWriting) && {user_act_english: parseInt(actWriting)},
          ...(actComposite) && {user_act: parseInt(actComposite)},
          ...(satReading) && {user_sat_read_write: parseInt(satReading)},
          ...(satMath) && {user_sat_math: parseInt(satMath)},
          ...(satComposite) && {user_sat: parseInt(satComposite)},
          ...(gpa) && {user_gpa: parseFloat(gpa)},
          user_purpose: purpose,
          user_goal: goal,
          user_show_socials: showContact,
        },
      };

      console.log(userData);

      const response = await fetch("/api/editUser", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        navigate(`/student-profile/${id}`);
      } else {
        console.error("Error saving user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = JSON.stringify({
          userId: id,
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
        const studentData = data[0];
        setFirstName(studentData.user_firstname);
        setLastName(studentData.user_lastname);
        setSchool(studentData.user_school);
        setPhoneNumber(studentData.user_phone);
        setEmail(studentData.user_email);
        if (studentData.user_grad_year != null)
          setGrade(studentData.user_grad_year.toString());
        setInstagram(studentData.user_instagram);
        setFacebook(studentData.user_facebook);
        setMajor1(studentData.user_potential_major);
        setMajor2(studentData.user_alt_major1);
        setMajor3(studentData.user_alt_major2);
        setSport1(studentData.user_sport1);
        setSport2(studentData.user_sport2);
        setPosition1(studentData.user_sport1_role);
        setPosition2(studentData.user_sport2_role);
        setLevel1(studentData.user_sport1_level);
        setLevel2(studentData.user_sport2_level);
        if (studentData.user_interests != null)
          setArrInterest(studentData.user_interests.split(","));
        if (studentData.user_extracurriculars != null)
          setArrExtracurricular(studentData.user_extracurriculars.split(","));
        if (studentData.user_act_reading != null)
          setACTReading(studentData.user_act_reading.toString());
        if (studentData.user_act_math != null)
          setACTMath(studentData.user_act_math.toString());
        if (studentData.user_act_science != null)
          setACTScience(studentData.user_act_science.toString());
        if (studentData.user_act_english != null)
          setACTWriting(studentData.user_act_english.toString());
        if (studentData.user_act != null)
          setACTComposite(studentData.user_act.toString());
        if (studentData.user_sat_read_write != null)
          setSATReading(studentData.user_sat_read_write.toString());
        if (studentData.user_sat_math != null)
          setSATMath(studentData.user_sat_math.toString());
        if (studentData.user_sat != null)
          setSATComposite(studentData.user_sat.toString());
        if (studentData.user_gpa != null)
          setGPA(studentData.user_gpa.toString());
        setPurpose(studentData.user_purpose);
        setGoal(studentData.user_goal);
        setShowContact(studentData.user_show_socials);

        if (Object.keys(data).length === 0)
          setValidID(false);
        else
          setValidID(true);
      } catch (error) {
        console.error("Error fetching student data:", error);
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

  return (
    <div>
      {validID && (cookies.user_status === 3 || cookies.user_id === parseInt(id ? id : "")) ? (
      <div className="mb-10">
        {/* Grid Wrapper */}
        <div className="mx-24 grid grid-cols-3 gap-5">
          {/* MY EDIT AND CANCEL */}
          <div className="col-span-full">
            <div className="flex justify-between items-center my-9">
              <div className="text-5xl font-bold">My Edit</div>
              <div
                className="flex justify-center items-center w-28 h-9 bg-brand-gray-90 border-2 border-brand-gray-20 rounded cursor-pointer"
                onClick={() => navigate(`/student-profile/${id}`)}
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
          {/* School Name */}
          <div>
            <div className="text-lg font-medium mb-3">School</div>
            <input
              className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
              id="last"
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
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
          {/* Grade */}
          <div>
            <div className="text-lg font-medium mb-3">Grade</div>
            <input
              className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
              id="last"
              type="text"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            />
          </div>

          {/* Instagram */}
          <div>
            <div className="text-lg font-medium mb-3">Instagram</div>
            <input
              className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
              id="first"
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
          </div>
          {/* Facebook */}
          <div>
            <div className="text-lg font-medium mb-3">Facebook</div>
            <input
              className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
              id="last"
              type="text"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
            />
          </div>

          {/* Contact Info */}
          <div className="col-start-1 col-span-full my-3">
            <div className="text-lg font-medium mb-3">
              Show Contact on Profile
            </div>
            {showContact ? (
              <div
                className="cursor-pointer border border-brand-green-45 rounded w-20 h-9 bg-brand-green-45 mb-2"
                onClick={() => setShowContact(!showContact)}
              >
                <div className="flex justify-between py-[6px] px-3 text-sm text-white font-normal">
                  <div className="rounded bg-white w-5 h-5" />
                  ON
                </div>
              </div>
            ) : (
              <div
                className="cursor-pointer border-black border-2 rounded w-20 h-9 mb-2"
                onClick={() => setShowContact(!showContact)}
              >
                <div className="flex justify-between py-[6px] px-3 text-sm font-normal">
                  OFF
                  <div className="rounded bg-black w-5 h-5" />
                </div>
              </div>
            )}
            <div className="text-sm">
              *Other students, mentors, and admins will see your contact
              information
            </div>
          </div>

          {/* Majors */}
          <div className="col-start-1 my-10">
            <div className="text-lg font-medium mb-3">Majors</div>
            <input
              className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
              id="first"
              type="text"
              value={major1}
              onChange={(e) => setMajor1(e.target.value)}
            />
          </div>
          {/* Major 2 */}
          <div className="flex items-end my-10">
            <input
              className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
              id="last"
              type="text"
              value={major2}
              onChange={(e) => setMajor2(e.target.value)}
            />
          </div>
          {/* Major 3 */}
          <div className="flex items-end my-10">
            <input
              className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
              id="last"
              type="text"
              value={major3}
              onChange={(e) => setMajor3(e.target.value)}
            />
          </div>

          {/* Sport */}
          <div>
            <div className="text-lg font-medium mb-3">Sport</div>
            <input
              className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
              id="first"
              type="text"
              value={sport1}
              onChange={(e) => setSport1(e.target.value)}
            />
          </div>
          {/* Position */}
          <div>
            <div className="text-lg font-medium mb-3">Position</div>
            <input
              className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
              id="last"
              type="text"
              value={position1}
              onChange={(e) => setPosition1(e.target.value)}
            />
          </div>
          {/* Level */}
          <div>
            <div className="text-lg font-medium mb-3">Level</div>
            <div className="relative inline-block text-left w-full">
              <div>
                <button
                  className="flex w-full h-9 justify-between gap-x-1.5 text-md font-medium rounded bg-white px-3 py-2 text-sm text-gray-700 border-black border-2 hover:bg-gray-50"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                  onClick={() => {
                    setShowLevel1(!showLevel1);
                    setShowLevel2(false);
                  }}
                >
                  {level1}
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
              {showLevel1 && (
                <div
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                        setLevel1("National");
                        setShowLevel1(false);
                      }}
                    >
                      National
                    </div>
                    <div
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      id="menu-item-0"
                      onClick={() => {
                        setLevel1("State");
                        setShowLevel1(false);
                      }}
                    >
                      State
                    </div>
                    <div
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      id="menu-item-0"
                      onClick={() => {
                        setLevel1("Regional");
                        setShowLevel1(false);
                      }}
                    >
                      Regional
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
          {/* Level 2 */}
          <div className="flex items-end">
            <div className="relative inline-block text-left w-full">
              <div>
                <button
                  className="flex w-full h-9 justify-between gap-x-1.5 text-md font-medium rounded bg-white px-3 py-2 text-sm text-gray-700 border-black border-2 hover:bg-gray-50"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                  onClick={() => {
                    setShowLevel2(!showLevel2);
                    setShowLevel1(false);
                  }}
                >
                  {level2}
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
              {showLevel2 && (
                <div
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                        setLevel2("National");
                        setShowLevel2(false);
                      }}
                    >
                      National
                    </div>
                    <div
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      id="menu-item-0"
                      onClick={() => {
                        setLevel2("State");
                        setShowLevel2(false);
                      }}
                    >
                      State
                    </div>
                    <div
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      id="menu-item-0"
                      onClick={() => {
                        setLevel2("Regional");
                        setShowLevel2(false);
                      }}
                    >
                      Regional
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

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
            <div className="text-lg font-medium mb-3">Extracurricular</div>
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
              {arrExtracurricular?.map((extracurricular: string, idx: number) => {
                return (
                  <EditStudentPill
                    key={extracurricular + idx}
                    text={extracurricular}
                    closeHandler={removeExtracurricular(idx)}
                  />
                );
              })}
            </div>
            {/* Map each extracurricular from an extracurriculars array */}
          </div>

          {/* ACT WRAPPER */}
          <div className="col-start-1">
            <div className="text-lg font-medium mb-3">ACT</div>
            <div className="flex justify-between mb-3">
              <div className="flex justify-between items-center w-full">
                <div className="mr-2">Reading</div>
                <input
                  className="border-2 border-black rounded min-w-10 w-2/5 h-9 px-2 py-2 mr-8 text-gray-700"
                  id="last"
                  type="text"
                  value={actReading}
                  onChange={(e) => setACTReading(e.target.value)}
                />
              </div>
              <div className="flex justify-between items-center w-full">
                <div className="mr-2">Math</div>
                <input
                  className="border-2 border-black rounded w-2/5 h-9 px-2 py-2 mr-8 text-gray-700"
                  id="last"
                  type="text"
                  value={actMath}
                  onChange={(e) => setACTMath(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-between items-center mb-3">
              <div className="flex justify-between items-center w-full">
                <div className="mr-2">Writing</div>
                <input
                  className="border-2 border-black rounded w-2/5 h-9 px-2 py-2 mr-8 text-gray-700"
                  id="last"
                  type="text"
                  value={actWriting}
                  onChange={(e) => setACTWriting(e.target.value)}
                />
              </div>
              <div className="flex justify-between items-center w-full">
                <div className="mr-2">Science</div>
                <input
                  className="border-2 border-black rounded w-2/5 h-9 px-2 py-2 mr-8 text-gray-700"
                  id="last"
                  type="text"
                  value={actScience}
                  onChange={(e) => setACTScience(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-between items-center w-1/2">
              <div className="mr-2">Composite</div>
              <input
                className="border-2 border-black rounded w-2/5 h-9 px-2 py-2 mr-8 text-gray-700"
                id="last"
                type="text"
                value={actComposite}
                onChange={(e) => setACTComposite(e.target.value)}
              />
            </div>
          </div>

          {/* SAT WRAPPER */}
          <div>
            <div className="text-lg font-medium mb-3">SAT</div>
            <div className="flex justify-between mb-3">
              <div className="flex justify-between items-center w-full">
                <div className="mr-2">Reading</div>
                <input
                  className="border-2 border-black rounded w-2/5 h-9 px-2 py-2 mr-8 text-gray-700"
                  id="last"
                  type="text"
                  value={satReading}
                  onChange={(e) => setSATReading(e.target.value)}
                />
              </div>
              <div className="flex justify-between items-center w-full">
                <div className="mr-2">Math</div>
                <input
                  className="border-2 border-black rounded w-2/5 h-9 px-2 py-2 mr-8 text-gray-700"
                  id="last"
                  type="text"
                  value={satMath}
                  onChange={(e) => setSATMath(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-between items-center w-1/2">
              <div className="mr-2">Composite</div>
              <input
                className="border-2 border-black rounded w-2/5 h-9 px-2 py-2 mr-8 text-gray-700"
                id="last"
                type="text"
                value={satComposite}
                onChange={(e) => setSATComposite(e.target.value)}
              />
            </div>
          </div>

          {/* GPA WRAPPER */}
          <div>
            <div className="text-lg font-medium mb-3">GPA</div>
            <input
              className="border-2 border-black rounded w-1/5 h-9 px-2 py-2 mr-12 text-gray-700"
              id="last"
              type="text"
              value={gpa}
              onChange={(e) => setGPA(e.target.value)}
            />
          </div>

          {/* PURPOSE AND GOAL WRAPPER */}
          <div className="col-span-full mt-8">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <div className="text-lg font-medium mb-3">Pursue My Purpose</div>
                <input
                  className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
                  id="last"
                  type="text"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                />
              </div>

              <div>
                <div className="text-lg font-medium mb-3">Goal</div>
                <input
                  className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
                  id="last"
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="col-span-full mt-6 mb-52">
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
        <NotFoundPage/>
      )}
    </div>
  );
};

export default EditStudent;
