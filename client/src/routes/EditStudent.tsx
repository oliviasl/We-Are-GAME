import React, { useState } from 'react'
import { Navbar } from '../layouts/Navbar'
import { set } from 'react-hook-form';
import { setgid } from 'process';


export const EditStudent = () => {

    // field data
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [school, setSchool] = useState('');

    const [phoneNumber, setPhoneNumber] = useState(''); // string?
    const [email, setEmail] = useState('');
    const [grade, setGrade] = useState('');

    const [major1, setMajor1] = useState('');
    const [major2, setMajor2] = useState('');
    const [major3, setMajor3] = useState('');

    const [sport1, setSport1] = useState('');
    const [sport2, setSport2] = useState('');
    const [sport3, setSport3] = useState('');
    const [position1, setPosition1] = useState('');
    const [position2, setPosition2] = useState('');
    const [position3, setPosition3] = useState('');
    const [level1, setLevel1] = useState('');
    const [level2, setLevel2] = useState('');
    const [level3, setLevel3] = useState('');


    return (
        <div>
            <Navbar />
            {/* Entire View Wrapper */}
            <div className='w-5/6 mx-24'>
                {/* View Header Wrapper */}
                <div className='flex justify-between items-center mt-9'>
                    <div className='text-5xl font-bold'>
                        My Edit
                    </div>
                    <div className='flex justify-center items-center w-28 h-9 bg-brand-gray-90 border-2 border-brand-gray-20 rounded'>
                        Cancel
                    </div>
                </div>

                {/* First Last School Wrapper */}
                <div className="flex justify-between mt-8">
                    {/* First / Last Name */}
                    <div className='w-1/4'>
                        {/* First Name */}
                        <div className="text-lg font-medium mb-3">
                            First
                        </div>
                        <input
                            className="border-2 border-black rounded w-full h-9 py-2 text-gray-700"
                            id="first"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className='w-1/4'>
                        {/* Last Name */}
                        <div className="text-lg font-medium mb-3">
                            Last
                        </div>
                        <input
                            className="border-2 border-black rounded w-full h-9 py-2 text-gray-700"
                            id="last"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className='w-1/4'>
                        {/* School Name */}
                        <div className="text-lg font-medium mb-3">
                            School
                        </div>
                        <input
                            className="border-2 border-black rounded w-full h-9 py-2 text-gray-700"
                            id="last"
                            type="text"
                            value={school}
                            onChange={(e) => setSchool(e.target.value)}
                        />
                    </div>
                </div>

                {/* Phone Number / Email / Grade Wrapper */}
                <div className="flex justify-between mt-5">
                    {/* Phone Number Wrapper */}
                    <div className='w-1/4'>
                        <div className="text-lg font-medium mb-3">
                            Phone Number
                        </div>
                        <input
                            className="border-2 border-black rounded w-full h-9 py-2 text-gray-700"
                            id="first"
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    {/* Email Wrapper */}
                    <div className='w-1/4'>
                        <div className="text-lg font-medium mb-3">
                            Email
                        </div>
                        <input
                            className="border-2 border-black rounded w-full h-9 py-2 text-gray-700"
                            id="last"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {/* Grade Wrapper  */}
                    <div className='w-1/4'>
                        <div className="text-lg font-medium mb-3">
                            Grade
                        </div>
                        <input
                            className="border-2 border-black rounded w-full h-9 py-2 text-gray-700"
                            id="last"
                            type="text"
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                        />
                    </div>
                </div>

                {/* Majors Wrapper */}
                <div className="flex justify-between items-end mt-10">
                    {/* Phone Number Wrapper */}
                    <div className='w-1/4'>
                        <div className="text-lg font-medium mb-3">
                            Majors
                        </div>
                        <input
                            className="border-2 border-black rounded w-full h-9 py-2 text-gray-700"
                            id="first"
                            type="text"
                            value={major1}
                            onChange={(e) => setMajor1(e.target.value)}
                        />
                    </div>
                    {/* Email Wrapper */}
                    <div className='w-1/4'>
                        <input
                            className="border-2 border-black rounded w-full h-9 py-2 text-gray-700"
                            id="last"
                            type="text"
                            value={major2}
                            onChange={(e) => setMajor2(e.target.value)}
                        />
                    </div>
                    {/* Grade Wrapper  */}
                    <div className='w-1/4'>
                        <input
                            className="border-2 border-black rounded w-full h-9 py-2 text-gray-700"
                            id="last"
                            type="text"
                            value={major3}
                            onChange={(e) => setMajor3(e.target.value)}
                        />
                    </div>
                </div>

                {/* Sport / Position / Level Wrapper */}
                <div>
                    {/* First Row */}
                    <div className="flex justify-between mt-10">
                        {/* Sport Wrapper */}
                        <div className='w-1/4'>
                            <div className="text-lg font-medium mb-3">
                                Sport
                            </div>
                            <input
                                className="border-2 border-black rounded w-full h-9 py-2 text-gray-700"
                                id="first"
                                type="text"
                                value={sport1}
                                onChange={(e) => setSport1(e.target.value)}
                            />
                        </div>
                        {/* Position Wrapper */}
                        <div className='w-1/4'>
                            <div className="text-lg font-medium mb-3">
                                Position
                            </div>
                            <input
                                className="border-2 border-black rounded w-full h-9 py-2 text-gray-700"
                                id="last"
                                type="text"
                                value={position1}
                                onChange={(e) => setPosition1(e.target.value)}
                            />
                        </div>
                        {/* Level Wrapper  */}
                        <div className='w-1/4'>
                            <div className="text-lg font-medium mb-3">
                                Level
                            </div>
                            <input
                                className="border-2 border-black rounded w-full h-9 py-2 text-gray-700"
                                id="last"
                                type="text"
                                value={level1}
                                onChange={(e) => setLevel1(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Second Row */}
                    <div className="flex justify-between mt-5">
                        {/* Sport Wrapper */}
                        <div className='w-1/4'>
                            <input
                                className="border-2 border-black rounded w-full h-9 py-2 text-gray-700"
                                id="first"
                                type="text"
                                value={sport2}
                                onChange={(e) => setSport2(e.target.value)}
                            />
                        </div>
                        {/* Position Wrapper */}
                        <div className='w-1/4'>
                            <input
                                className="border-2 border-black rounded w-full h-9 py-2 text-gray-700"
                                id="last"
                                type="text"
                                value={position2}
                                onChange={(e) => setPosition2(e.target.value)}
                            />
                        </div>
                        {/* Level Wrapper  */}
                        <div className='w-1/4'>
                            <input
                                className="border-2 border-black rounded w-full h-9 py-2 text-gray-700"
                                id="last"
                                type="text"
                                value={level2}
                                onChange={(e) => setLevel2(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Third Row */}
                    <div className="flex justify-between mt-5">
                        {/* Sport Wrapper */}
                        <div className='w-1/4'>
                            <input
                                className="border-2 border-black rounded w-full h-9 py-2 text-gray-700"
                                id="first"
                                type="text"
                                value={sport3}
                                onChange={(e) => setSport3(e.target.value)}
                            />
                        </div>
                        {/* Position Wrapper */}
                        <div className='w-1/4'>
                            <input
                                className="border-2 border-black rounded w-full h-9 py-2 text-gray-700"
                                id="last"
                                type="text"
                                value={position3}
                                onChange={(e) => setPosition3(e.target.value)}
                            />
                        </div>
                        {/* Level Wrapper  */}
                        <div className='w-1/4'>
                            <input
                                className="border-2 border-black rounded w-full h-9 py-2 text-gray-700"
                                id="last"
                                type="text"
                                value={level3}
                                onChange={(e) => setLevel3(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Interests / Extracurricular Row */}
                <div className="flex justify-start mt-10">
                    {/* Interests Wrapper */}
                    <div className='w-1/4'>
                        <div className="text-lg font-medium mb-3">
                            Interests
                        </div>
                        <input
                            className="border-2 border-black rounded w-full h-9 py-2 text-gray-700"
                            id="first"
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    {/* Extracurricular Wrapper */}
                    <div className='w-1/4'>
                        <div className="text-lg font-medium mb-3">
                            Extracurricular
                        </div>
                        <input
                            className="border-2 border-black rounded w-full h-9 py-2 text-gray-700"
                            id="last"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                {/* ACT SAT GPA Wrapper */}
                <div className='flex mt-10'>
                    {/* ACT Wrapper */}
                    <div className='w-1/3'>
                        <div className='text-lg font-medium mb-3'>
                            ACT
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className='mr-16'>
                                Reading
                            </div>
                            <input
                                className="border-2 border-black rounded w-20 h-9 py-2 mr-12 text-gray-700"
                                id="last"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                             <div className='mr-12'>
                                Math
                            </div>
                            <input
                                className="border-2 border-black rounded w-20 h-9 py-2 mr-12 text-gray-700"
                                id="last"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default EditStudent;