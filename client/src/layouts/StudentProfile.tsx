import React, { useEffect, useState, ElementType } from "react";
import ProfileBox from "../components/ProfileBox";

const Pencil = ({ fill }: { fill: string })  => { 
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path d="M0 18V13.75L13.2 0.575C13.4 0.391667 13.621 0.25 13.863 0.15C14.105 0.0500001 14.359 0 14.625 0C14.8917 0 15.15 0.0500001 15.4 0.15C15.65 0.25 15.8667 0.4 16.05 0.6L17.425 2C17.625 2.18333 17.771 2.4 17.863 2.65C17.955 2.9 18.0007 3.15 18 3.4C18 3.66667 17.9543 3.921 17.863 4.163C17.7717 4.405 17.6257 4.62567 17.425 4.825L4.25 18H0ZM14.6 4.8L16 3.4L14.6 2L13.2 3.4L14.6 4.8Z"/>
    </svg>
  );
};

const StudentProfile = () => {
  const [userId, setUserId] = useState(1);
  const [studentData, setStudentData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/userById?userId=${userId}`);
        const data = await response.json();
        setStudentData(data[0]);
        console.log(data); 
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const username = "Sample Username";

  return (
    <div className="grid grid-cols-3 gap-4 m-auto mx-20 mt-10 font-circular-std leading-none">
      {/* Username/Grad year */}
      <div className='col-span-2 order-1'>
        <div className="bg-brand-gray-20 rounded-t-md text-brand-white flex p-4 items-center">
          <div className="flex-col flex-grow">
            <div className="text-lg font-medium p-0 m-0">{username}</div>
            <div className="text-sm font-normal">Highschool/College Grad Yr.</div>
          </div>
          {/* icon */}
          <div className="mr-2">
            <Pencil fill="#FFFFFF" />
          </div>
        </div>
      </div>
      {/* Colleges */}
      <div className=' rounded-md row-span-4 order-2 border-gray-400 border-2'>
        <div className="m-4">
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
            <div>Phone Number</div><div className="text-right">999-999-9999</div>
            <div>Email</div><div className="text-right">student@email.com</div>
            <div>GPA</div><div className="text-right">4.0</div>
            <div>NCAA Eligibility</div><div className="text-right">Yes</div>
            <div className=" text-gray-400">12345</div>
          </div>
        </div>
      </div>
      {/* Academics */}
      <div className=' border-gray-400 border-2 rounded-md min-h-[50px] order-4'>
        <div className="w-full p-4 flex-wrap">
          <h2 className="text-md mb-2">Academics</h2>
          <div className="bg-brand-blue-95 mb-3 rounded-sm">
            <div className="grid grid-cols-2 w-full py-2 px-4 gap-x-6 gap-y-2">
              <div className="flex justify-between w-full">
                <div>ACT Math</div>
                <div>36</div>
              </div>
              <div className="flex justify-between w-full">
                <div>ACT Science</div>
                <div>36</div>
              </div>
              <div className="flex justify-between w-full">
                <div>ACT Reading</div>
                <div>36</div>
              </div>
              <div className="flex justify-between w-full">
                <div>ACT English</div>
                <div>36</div>
              </div>
              <div className="flex justify-between w-full">
                <div>Composite</div>
                <div>36</div>
              </div>
            </div>
          </div>
          <div className="bg-brand-blue-95 mb-3 rounded-sm">
            <div className="grid grid-cols-2 w-full py-2 px-4 gap-x-6 gap-y-2">
              <div className="flex justify-between w-full">
                <div>SAT Math</div>
                <div>800</div>
              </div>
              <div className="flex justify-between w-full">
                <div>SAT Reading</div>
                <div>800</div>
              </div>
              <div className="flex justify-between w-full">
                <div>Composite</div>
                <div>1600</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Extracurriculars */}
      <div className='bg-blue-500 rounded-md min-h-[50px] order-5'></div>
      {/* Special Interests */}
      <div className='bg-purple-500 rounded-md min-h-[50px] order-6'></div>
      {/* Extracurriculars */}
      <div className='bg-blue-500 rounded-md min-h-[50px] order-5'></div>
      {/* Special Interests */}
      <div className='bg-purple-500 rounded-md min-h-[50px] order-6'></div>

      {/* Pursue My Purpose */}
      <div className=' border-gray-400 border-2 rounded-md min-h-[50px] col-span-2 order-7'>
        <div className="w-full p-4">
          <h2 className="text-md mb-2">Pursue My Purpose</h2>
          <div>I want to make a lotta money</div>
        </div>
      </div>
      {/* Notes */}
      <div className=' border-gray-400 border-2 rounded-md row-span-2 order-8'>
        <h2 className="text-md m-4 mb-2">Notes</h2>
      </div>
      {/* Goal */}
      <div className=' border-gray-400 border-2 rounded-md min-h-[50px] col-span-2 order-9'>
        <div className="w-full m-4">
          <h2 className="text-md mb-2">Goal</h2>
          <div>I want to maintain a work life balance.</div>
        </div>
      </div>
      
    </div>
  );
};

export default StudentProfile;
