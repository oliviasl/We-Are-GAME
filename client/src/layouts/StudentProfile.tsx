import React, { useEffect, useState, ElementType } from "react";
import ProfileBox from "../components/ProfileBox";

const Pencil = ({ fill }: { fill: string })  => { 
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill={fill} xmlns="http://www.w3.org/2000/svg" onClick={() => console.log("hi")}>
      <path d="M0 18V13.75L13.2 0.575C13.4 0.391667 13.621 0.25 13.863 0.15C14.105 0.0500001 14.359 0 14.625 0C14.8917 0 15.15 0.0500001 15.4 0.15C15.65 0.25 15.8667 0.4 16.05 0.6L17.425 2C17.625 2.18333 17.771 2.4 17.863 2.65C17.955 2.9 18.0007 3.15 18 3.4C18 3.66667 17.9543 3.921 17.863 4.163C17.7717 4.405 17.6257 4.62567 17.425 4.825L4.25 18H0ZM14.6 4.8L16 3.4L14.6 2L13.2 3.4L14.6 4.8Z"/>
    </svg>
  );
};

interface studentData {
  username:string;
  gradYear:string;
  phoneNum:string;
  email:string;
  gpa:number;
  eligibility:boolean;

  actMath:number;
  actScience:number;
  actReading:number;
  actEnglish:number;
  actComposite:number;

  satMath:number,
  satReading:number,
  satComposite:number,

  purpose:string;
  goal:string;
  notes:string;

  sports:string[];
  majors:string[];
  extracurriculars:string[];
  specialInterests:string[];

}

const StudentProfile = ({ studentData }: { studentData: studentData }) => {
  const personalTitles: Record<string, string> = {
    gradYear: "Graduation Year",
    phoneNum: "Phone Number",
    email: "Email",
    gpa: "GPA",
    eligibility: "NCAA Eligibility",
  };

  const actTitles: Record<string, string> = {
    actMath: "ACT Math",
    actScience: "ACT Science",
    actReading: "ACT Reading",
    actEnglish: "ACT English",
    actComposite: "Composite",
  };

  const satTitles: Record<string, string> = {
    satMath: "ACT Math",
    satReading: "ACT Reading",
    satComposite: "Composite",
  };

  const personalInfoKeys = ["gradYear", "phoneNum", "email", "gpa", "eligibility"] as Array<keyof typeof studentData>;
  const actKeys = ["actMath", "actScience", "actReading", "actEnglish", "actComposite"] as Array<keyof typeof studentData>;
  const satKeys = ["satMath", "satReading", "satComposite"] as Array<keyof typeof studentData>;
  
  return (
    <div className="grid grid-cols-3 gap-4 m-auto mx-20 my-10 font-circular-std leading-none">
      {/* Username/Grad year */}
      <div className='col-span-2 order-1'>
        <div className="bg-brand-gray-20 rounded-t-md text-brand-white flex p-4 items-center">
          <div className="flex-col flex-grow">
            <div className="text-lg font-medium p-0 m-0">{studentData.username}</div>
            <div className="text-sm font-normal">{studentData.gradYear}</div>
          </div>
          {/* icon */}
          <div className="mr-2">
            <Pencil fill="#FFFFFF" />
          </div>
        </div>
      </div>

      {/* Colleges */}
      <div className=' rounded-md row-span-4 order-2 border-gray-400 border-2'>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h2 className="text-md mb-2">Colleges</h2>
            <div className=" p-1"><Pencil fill="#B3B3B3" /></div>
          </div>
        </div>
      </div>

      {/* Personal */}
      <div className=' border-gray-400 border-2 rounded-md order-3'>
        <div className="w-full p-4">
          <h2 className="text-md mb-4">Personal</h2>
          <div className="grid grid-cols-2 gap-y-4 justify-between w-full">
            {personalInfoKeys.map((key) => (
              <React.Fragment key={key}>
                <div>{personalTitles[key]}</div>
                <div className="text-right">{key === 'gpa' ? studentData[key].toFixed(1) : studentData[key]}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Academics */}
      <div className='border-gray-400 border-2 rounded-md min-h-[50px] order-4'>
        <div className="w-full p-4 flex-wrap">
          <h2 className="text-md mb-2">Academics</h2>
          {/* ACT*/}
          <div className={`bg-brand-blue-95 mb-3 rounded-sm`}>
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
          <div className={`bg-brand-blue-95 mb-3 rounded-sm`}>
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
        <ProfileBox type="Sport" data={studentData.sports}/>        
      </div>
      
      {/* Major */}
      <div className="order-5 border-gray-400 border-2 rounded-md ">
        <ProfileBox type="Major" data={studentData.majors} />        
      </div>

      {/* Extracurriculars */}
      <div className="order-5 border-gray-400 border-2 rounded-md ">
        <ProfileBox type="Extracurriculars" data={studentData.extracurriculars} />        
      </div>

      {/* Special Interests */}
      <div className="order-5 border-gray-400 border-2 rounded-md ">
        <ProfileBox type="Special Interests" data={studentData.specialInterests}/>        
      </div>

      {/* Pursue My Purpose */}
      <div className=' border-gray-400 border-2 rounded-md min-h-[50px] col-span-2 order-7'>
        <div className="w-full p-4">
          <h2 className="text-md mb-2">Pursue My Purpose</h2>
          <div>I want to make a lotta money</div>
        </div>
      </div>
      {/* Notes */}
      <div className=' border-gray-400 border-2 rounded-md row-span-2 order-8'>
        <div className="w-full p-4">
          <h2 className="text-md mb-2">Notes</h2>
          <div>{studentData.notes}</div>         
        </div>
      </div>
      {/* Goal */}
      <div className=' border-gray-400 border-2 rounded-md min-h-[50px] col-span-2 order-9'>
        <div className="w-full m-4">
          <h2 className="text-md mb-2">Goal</h2>
          <div>{studentData.goal}</div>
        </div>
      </div>
      
    </div>
  );
};

export default StudentProfile;
