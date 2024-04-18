import React, { useState } from "react";
import ProfileBox from "../components/ProfileBox";
import CollegeBox from "../components/CollegeBox";
import { collegeAssignments, studentData } from "../routes/StudentProfile";
import Pencil from "../components/Pencil";
import AddCollegeModal from "../layouts/AddCollegeModal";
import { renderStudentData } from "./MentorOfStudentView";
import { shouldDisplayTitle } from "./MentorOfStudentView";
import NotFoundPage from "../routes/NotFoundPage";

interface StudentProfileProps {
  studentData: studentData;
  collegeAssignments: collegeAssignments[];
  handleDelete: (collegeId: number) => void;
  handleAdd: (collegeId: number) => void;
}

const StudentProfile: React.FC<StudentProfileProps> = ({
  studentData,
  collegeAssignments,
  handleDelete,
  handleAdd,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  if (!studentData) {
    return null;
  }

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const capFirstLetter = (str: string): string => {
    return str.replace(/\b\w/g, (match: string) => match.toUpperCase());
  };

  const personalTitles: Record<string, string> = {
    user_phone: "Phone Number",
    user_email: "Email",
    user_facebook: "Facebook",
    user_instagram: "Instagram",
    user_gpa: "GPA",
    user_ncaa_registered: "NCAA Eligibility",
  };

  const personalInfoKeys = [
    "user_phone",
    "user_email",
    "user_facebook",
    "user_instagram",
    "user_gpa",
    "user_ncaa_registered",
  ] as Array<keyof typeof studentData>;

  const actTitles: Record<string, string> = {
    user_act_math: "ACT Math",
    user_act_science: "ACT Science",
    user_act_reading: "ACT Reading",
    user_act_english: "ACT English",
    user_act: "Composite",
  };
  const actKeys = [
    "user_act_math",
    "user_act_science",
    "user_act_reading",
    "user_act_english",
    "user_act",
  ] as Array<keyof typeof studentData>;

  const satTitles: Record<string, string> = {
    user_sat_math: "SAT Math",
    user_sat_read_write: "SAT Reading",
    user_sat: "Composite",
  };
  const satKeys = ["user_sat_math", "user_sat_read_write", "user_sat"] as Array<
    keyof typeof studentData
  >;

  const sports: string[] = [
    ...(studentData.user_sport1
      ? [
        `${capFirstLetter(studentData.user_sport1)}/${capFirstLetter(
          studentData.user_sport1_role
        )}`,
      ]
      : []),
    ...(studentData.user_sport2
      ? [
        `${capFirstLetter(studentData.user_sport2)}/${capFirstLetter(
          studentData.user_sport2_role
        )}`,
      ]
      : []),
  ];

  // TO DO: major naming?
  const majors = [
    studentData.user_potential_major
      ? capFirstLetter(studentData.user_potential_major)
      : null,
    studentData.user_alt_major1
      ? capFirstLetter(studentData.user_alt_major1)
      : null,
    studentData.user_alt_major2
      ? capFirstLetter(studentData.user_alt_major2)
      : null,
  ].filter(Boolean) as string[];

  return (
    <div>
      {studentData.user_id === 1 || studentData.user_id === 2 ? (
        <NotFoundPage />
      ) : (
        <div className="grid grid-cols-3 gap-4 m-auto mx-20 my-10 mb-32 font-circular-std leading-none">
          {/* Username/Grad year */}
          <div className="col-span-2 order-1">
            <div className="bg-brand-gray-20 rounded text-brand-white flex p-4 items-center">
              <div className="flex-col flex-grow">
                <div className="text-lg font-medium p-0 m-0">
                  {studentData.user_firstname + " " + studentData.user_lastname}
                </div>
                <div className="text-sm font-normal">
                  {studentData.user_school && studentData.user_grad_year ? (
                    studentData.user_school + "/" + studentData.user_grad_year
                  ) : "" }
                  {studentData.user_school && !studentData.user_grad_year ? (
                    studentData.user_school
                  ) : "" }
                  {!studentData.user_school && studentData.user_grad_year ? (
                    studentData.user_grad_year
                  ) : "" }
                </div>
              </div>
              {/* icon */}
              <div className="mr-2">
                <a href={`/edit-student/${studentData.user_id}`}>
                  <Pencil fill="#FFFFFF" />
                </a>
              </div>
            </div>
          </div>

          {/* Colleges */}
          <div className=" rounded row-span-4 order-2 border-gray-400 border-2">
            <div className="p-4 ">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-md mb-2">Colleges</h2>
                <div className="px-1 pb-1">
                  <Pencil fill="#B3B3B3" onClick={openModal} />
                </div>
              </div>
              <div>
                {collegeAssignments.map((assignment) => (
                  <CollegeBox
                    key={assignment.college_id}
                    name={assignment.college_name}
                    college_id={assignment.college_id}
                    onDelete={() => handleDelete(assignment.college_id)}
                  />
                ))}
              </div>
              <button
                className="border-4 border-gray-400 border-dashed rounded text-gray-400 text-3xl text-center p-2 py-1 w-full transition duration-300 ease-in-out hover:bg-brand-blue-95 hover:border-brand-blue-95 hover:text-white focus:outline-none"
                onClick={openModal}
              >
                +
              </button>
              <AddCollegeModal
                isOpen={modalOpen}
                onClose={closeModal}
                onAdd={handleAdd}
              />
            </div>
          </div>

          {/* Notes */}
          <div className=" border-gray-400 border-2 rounded row-span-1 order-8">
            <div className="w-full p-4">
              <h2 className="text-md mb-2">Notes</h2>
              <div>{studentData.user_notes}</div>
            </div>
          </div>

          {/* Personal */}
          <div
            className={studentData.user_show_socials ? 'border-gray-400 border-2 rounded-md order-3' : 'border-gray-400 border-2 rounded-md order-3 col-span-2'}>
            <div className="w-full p-4">
              <h2 className="text-md mb-4">Personal</h2>
              <div className="grid grid-cols-2 gap-y-4 justify-between w-full">
                {personalInfoKeys.map((key) => (
                  <React.Fragment key={key}>
                    {/* Only display title when appropriate */}
                    {shouldDisplayTitle(key, studentData) && (
                      <div>{personalTitles[key]}</div>
                    )}
                    {renderStudentData(key, studentData) ?
                      <div
                        className="text-right">{renderStudentData(key, studentData)}</div> : (shouldDisplayTitle(key, studentData) ?
                          <div /> : null)}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>


          {/* Academics */}
          <div
            className={studentData.user_show_socials ? "border-gray-400 border-2 rounded-md min-h-[50px] order-4" : "border-gray-400 border-2 rounded-md min-h-[50px] order-4 col-span-2"}>
            <div className="w-full p-4 flex-wrap">
              <h2 className="text-md mb-2">Academics</h2>
              {/* ACT*/}
              <div className={`bg-brand-blue-95 mb-3 rounded`}>
                <div className="grid grid-cols-2 w-full py-2 px-4 gap-x-6 gap-y-2">
                  {actKeys.map((key) => (
                    <div key={key} className="flex justify-between w-full">
                      <div>{actTitles[key]}</div>
                      <div>{studentData[key]}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* SAT*/}
              <div className={`bg-brand-blue-95 mb-3 rounded`}>
                <div className="grid grid-cols-2 w-full py-2 px-4 gap-x-6 gap-y-2">
                  {satKeys.map((key) => (
                    <div key={key} className="flex justify-between w-full">
                      <div>{satTitles[key]}</div>
                      <div>{studentData[key]}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sport */}
          <div className="order-5 border-gray-400 border-2 rounded-md ">
            <ProfileBox type="Sport" data={sports} />
          </div>

          {/* Major */}
          <div className="order-5 border-gray-400 border-2 rounded-md ">
            <ProfileBox type="Major" data={majors} />
          </div>

          {/* Extracurriculars */}
          <div className="order-5 border-gray-400 border-2 rounded ">
            <ProfileBox
              type="Extracurriculars"
              data={(studentData.user_extracurriculars != null && studentData.user_extracurriculars.length > 0) ? studentData.user_extracurriculars.split(",") : []}
            />
          </div>

          {/* Special Interests */}
          <div className="order-5 border-gray-400 border-2 rounded h-40">
            <ProfileBox
              type="Special Interests"
              data={(studentData.user_interests != null && studentData.user_interests.length > 0) ? studentData.user_interests.split(",") : []}
            />
          </div>

          <div className="grid-rows-2 col-span-2 order-6">
            {/* Pursue My Purpose */}
            <div className="border-gray-400 border-2 rounded min-h-[50px] col-span-2 p-5 h-36 mb-4">
              <div className="w-full">
                <h2 className="text-md mb-2 font-medium">Pursue My Purpose</h2>
                <div className="font-weight-450">{studentData.user_purpose}</div>
              </div>
            </div>
            {/* Goal */}
            <div className="border-gray-400 border-2 rounded min-h-[50px] col-span-2 p-5 h-36">
              <div className="w-full">
                <h2 className="text-md mb-2 font-medium">Goal</h2>
                <div className="font-weight-450">{studentData.user_goal}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;