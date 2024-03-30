// import React from "react";
// import {mentorData} from "../routes/MentorProfile";
// import ProfileBox from "../components/ProfileBox";
// import Pencil from "../components/Pencil";
// import { useCookies } from "react-cookie";
// import {studentData, collegeAssignments} from "../routes/StudentProfile";

// interface MentorProfileProps {
//     mentorData: mentorData;
// }

// const MentorProfile: React.FC<MentorProfileProps> = ({mentorData}) => {

//     const [cookies] = useCookies(['user_id', 'user_status']);
    
//     if (!mentorData) {
//         return null;
//     }

//     const capFirstLetter = (str: string): string => {
//         return str.replace(/\b\w/g, (match: string) => match.toUpperCase());
//     };

//     const personalTitles: Record<string, string> = {
//         mentor_phone: "Phone Number",
//         mentor_email: "Email",
//         // add mentor fb and ig
//       };
//     const personalInfoKeys = ["mentor_phone", "mentor_email"] as Array<keyof typeof mentorData>;

//     return (
//         <div className="grid grid-cols-2 gap-4 m-auto mx-20 my-10 mb-32 font-circular-std leading-none">
//       {/* Mentorname/Job */}
//       <div className='col-span-2 order-1'>
//         <div className="bg-brand-gray-20 rounded-t-md text-brand-white flex p-4 items-center">
//           <div className="flex-col flex-grow">
//             <div className="text-lg font-medium p-0 m-0">{mentorData.mentor_firstname + " " + mentorData.mentor_lastname}</div>
//             <div className="text-sm font-normal">{mentorData.mentor_curr_employment}</div> 
//           </div>
//           {/* TODO: make it so pencil only shows when userid 2+ */}
//           <div className="mr-2">
//             {key === 'user_id'}
//             <Pencil fill="#FFFFFF" />
//           </div>
//         </div>
//       </div>

//       {/* Personal */}
//     <div className='border-gray-400 border-2 rounded-md order-3'>
//       <div className="w-full p-4">
//         <h2 className="text-md mb-4">Personal</h2>
//         <div className="grid grid-cols-2 gap-y-4 justify-between w-full">
//           {personalInfoKeys.map((key) => (
//             <React.Fragment key={key}>
//               <div>{personalTitles[key]}</div>
//               {/* Separate logic for clarity */}
//               <div className="text-right">
//                 {key === 'user_gpa' && typeof studentData[key] !== 'undefined'
//                   ? studentData[key].toFixed(1)
//                   : key === 'user_ncaa_registered'
//                     ? studentData[key] ? 'Yes' : 'No'
//                     : (key !== 'user_facebook' && key !== 'user_instagram') ? studentData[key] : ''
//                 }
//                 {/* Display socials if user_show_socials is true */}
//                 {(key === 'user_facebook' || key === 'user_instagram') && studentData.user_show_socials
//                   ? studentData[key]
//                   : ''}
//               </div>
//             </React.Fragment>
//           ))}
//         </div>
//       </div>
//     </div>
      
//       {/* Sport */}
//       <div className="order-5 border-gray-400 border-2 rounded-md ">
//         <ProfileBox type="Sport" data={sports}/>        
//       </div>

//       {/* Major */}
//       <div className="order-5 border-gray-400 border-2 rounded-md ">
//         <ProfileBox type="Major" data={majors} />        
//       </div>

//       {/* Extracurriculars */}
//       <div className="order-5 border-gray-400 border-2 rounded-md ">
//         <ProfileBox type="Extracurriculars" data={studentData.user_extracurriculars} />        
//       </div>

//       {/* Special Interests */}
//       <div className="order-5 border-gray-400 border-2 rounded-md ">
//         <ProfileBox type="Special Interests" data={studentData.user_interests}/>        
//       </div>

//     </div>
//     );
// };

// export default MentorProfile;
export {}