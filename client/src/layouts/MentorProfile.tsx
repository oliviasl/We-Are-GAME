import React from "react";
import {mentorData} from "../routes/MentorProfile";
import ProfileBox from "../components/ProfileBox";
import { useParams, useNavigate } from "react-router-dom";
import Pencil from "../components/Pencil";
import { useCookies } from "react-cookie";

interface MentorProfileProps {
    mentorData: mentorData;
}

const MentorProfile: React.FC<MentorProfileProps> = ({mentorData}) => {
    const navigate = useNavigate();

    const [cookies] = useCookies(['user_id', 'user_status']);
    
    if (!mentorData) {
        return null;
    }

    const capFirstLetter = (str: string): string => {
        return str.replace(/\b\w/g, (match: string) => match.toUpperCase());
    };

    const sports: string[] = [
        ...(mentorData.mentor_sport1
          ? [
              `${capFirstLetter(mentorData.mentor_sport1)}/${capFirstLetter(
                mentorData.mentor_sport1_role
              )}`,
            ]
          : []),
        ...(mentorData.mentor_sport2
          ? [
              `${capFirstLetter(mentorData.mentor_sport2)}/${capFirstLetter(
                mentorData.mentor_sport2_role
              )}`,
            ]
          : []),
      ];

    const personalTitles: Record<string, string> = {
        mentor_phone: "Phone Number",
        mentor_email: "Email",
        mentor_facebook: "Facebook",
        mentor_instagram: "Instagram",
      };
    const personalInfoKeys = ["mentor_phone", "mentor_email", "mentor_facebook", "mentor_instagram"] as Array<keyof typeof mentorData>;

    return (
        <div className="grid grid-cols-2 gap-4 m-auto mx-20 my-10 mb-32 font-circular-std leading-none">
      {/* Mentorname/Job */}
      <div className='col-span-2 order-1'>
        <div className="bg-brand-gray-20 rounded-t-md text-brand-white flex p-4 items-center">
          <div className="flex-col flex-grow">
            <div className="text-lg font-medium p-0 m-0">{mentorData.mentor_firstname + " " + mentorData.mentor_lastname}</div>
            <div className="text-sm font-normal">{mentorData.mentor_curr_employment}</div> 
          </div>
          <div className="mr-2">
            {cookies.user_status >= 2 && (
                <button onClick={() => navigate(`/edit-mentor/${cookies.user_id}`)} style={{ background: 'none', border: 'none', padding: 0 }}>
                <Pencil fill="#FFFFFF" />
              </button>
               
                )}
          </div>
        </div>
      </div>

      {/* Personal */}
    <div className='border-gray-400 border-2 rounded-md order-3'>
      <div className="w-full p-4">
        <h2 className="text-md mb-4">Personal</h2>
        <div className="grid grid-cols-2 gap-y-4 justify-between w-full">
          {personalInfoKeys.map((key) => (
            <React.Fragment key={key}>
              <div>{personalTitles[key]}</div>
              {/* Separate logic for clarity */}
              <div className="text-right">
                {/* Display socials if user_show_socials is true */}
                {(key === 'mentor_facebook' || key === 'mentor_instagram') && mentorData.mentor_show_socials
                  ? mentorData[key]
                  : ''}
                  {(key === 'mentor_phone' || key === 'mentor_email') && mentorData[key]}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
      
      {/* Sport */}
      <div className="order-5 border-gray-400 border-2 rounded-md ">
        <ProfileBox type="Sport" data={sports}/>        
      </div>

      {/* Major
      <div className="order-5 border-gray-400 border-2 rounded-md ">
        <ProfileBox type="Major" data={majors} />        
      </div> */}

      {/* Extracurriculars */}
      <div className="order-5 border-gray-400 border-2 rounded-md ">
        <ProfileBox type="Extracurriculars" data={mentorData.mentor_extracurriculars} />        
      </div>

      {/* Special Interests */}
      <div className="order-5 border-gray-400 border-2 rounded-md ">
        <ProfileBox type="Special Interests" data={mentorData.mentor_interests}/>        
      </div>

    </div>
    );
};

export default MentorProfile;
