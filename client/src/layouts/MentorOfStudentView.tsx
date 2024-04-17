import React, { useState } from "react";
import ProfileBox from "../components/ProfileBox";
import CollegeBox from "../components/CollegeBox";
import { studentData, collegeAssignments } from "../routes/StudentProfile";
import Pencil from "../components/Pencil";
import AddCollegeModal from "../layouts/AddCollegeModal";

interface MentorOfStudentViewProps {
  studentData: studentData;
  collegeAssignments: collegeAssignments[];
  handleDelete: (collegeId: number) => void;
  handleAdd: (collegeId: number) => void;
}

export function shouldDisplayTitle(key: keyof typeof studentData, studentData: any) {
  const isSocialKey = key === 'user_facebook' || key === 'user_instagram';
  const isContactKey = key === 'user_email' || key === 'user_phone';
  const showSocials = studentData.user_show_socials;

  // Show if it's a social key and user_show_socials is true
  // Or if it's not a social key
  // Now also checks if it's a contact key, applying the same logic
  return ((isContactKey || isSocialKey) && showSocials) || (!isSocialKey && !isContactKey);
}


export function renderStudentData(key: keyof typeof studentData, studentData: any) {
  const isSocialKey = key === 'user_facebook' || key === 'user_instagram';
  const isContactKey = key === 'user_email' || key === 'user_phone';
  if (key === 'user_gpa' && typeof studentData[key] !== 'undefined') {
    return studentData[key].toFixed(1);
  } else if (key === 'user_ncaa_registered') {
    return studentData[key] ? 'Yes' : 'No';
  } else if ((isSocialKey || isContactKey) && !studentData.user_show_socials) {
    // Directly return null if user_show_socials is false or not set for social keys
    return null;
  } else {
    // For other keys, return the value if available, otherwise null to avoid rendering empty strings
    return studentData[key] ? studentData[key] : null;
  }
}
const MentorOfStudentView: React.FC<MentorOfStudentViewProps> = ({
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
  };
  
  const personalInfoKeys = ["user_phone", "user_email", "user_facebook", "user_instagram"] as Array<keyof typeof studentData>;

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
  const majors: string[] = [
    studentData.user_potential_major
      ? capFirstLetter(studentData.user_potential_major)
      : "",
    studentData.user_alt_major1
      ? capFirstLetter(studentData.user_alt_major1)
      : "",
    studentData.user_alt_major2
      ? capFirstLetter(studentData.user_alt_major2)
      : "",
  ];

  
  
  

  return (
    <div className="grid grid-cols-3 gap-4 m-auto mx-20 my-10 mb-32 font-circular-std leading-none">
      
      {/* Username/Grad year */}
      <div className="col-span-2 order-0">
        <div className="bg-brand-gray-20 rounded text-brand-white flex p-4 items-center">
          <div className="flex-col flex-grow">
            <div className="text-lg font-medium p-0 m-0">
              {studentData.user_firstname + " " + studentData.user_lastname}
            </div>
            {/* TO DO: how to handle? */}
            <div className="text-sm font-normal">
              {studentData.user_grad_year}
            </div>
          </div>
        </div>
      </div>

      {/* Colleges */}
      <div className=" rounded row-span-4 col-span-1 order-0 border-gray-400 border-2">
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
      <div className="order-7 border-gray-400 border-2 rounded">
        <div className="w-full p-4">
            <h2 className="text-md mb-2">Notes</h2>
          </div>
      </div>


      {/* Personal */}
      {(studentData.user_show_socials) && (
    <div className='border-gray-400 border-2 rounded col-span-2 order-3'>
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
              <div className="text-right">{renderStudentData(key, studentData)}</div> : ''}
          </React.Fragment>
        ))}
        </div>
      </div>
    </div>)}
      {/* Sport */}
      <div className="order-5 border-gray-400 border-2 rounded">
        <ProfileBox type="Sport" data={sports} />
      </div>

      {/* Major */}
      <div className="order-5 border-gray-400 border-2 rounded">
        <ProfileBox type="Major" data={majors} />
      </div>

      {/* Extracurriculars */}
      <div className="order-5 border-gray-400 border-2 rounded ">
        <ProfileBox
          type="Extracurriculars"
          data={studentData.user_extracurriculars != null ? studentData.user_extracurriculars.split(",") : []}
        />
      </div>

      {/* Special Interests */}
      <div className="order-5 border-gray-400 border-2 rounded h-40">
        <ProfileBox
          type="Special Interests"
          data={studentData.user_interests != null ? studentData.user_interests.split(",") : []}
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
  );
};

export default MentorOfStudentView;
