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

    const [instagram, setInstagram] = useState('');
    const [facebook, setFacebook] = useState('');

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

    const [tempInterest, setTempInterest] = useState('');
    const [tempExtracurricular, setTempExtracurricular] = useState('');

    const [actReading, setACTReading] = useState('');
    const [actMath, setACTMath] = useState('');
    const [actScience, setACTScience] = useState('');
    const [actWriting, setACTWriting] = useState('');
    const [actComposite, setACTComposite] = useState('');

    const [satReading, setSATReading] = useState('');
    const [satMath, setSATMath] = useState('');
    const [satComposite, setSATComposite] = useState('');

    const [gpa, setGPA] = useState('');

    const [purpose, setPurpose] = useState('');
    const [goal, setGoal] = useState('');






    return (

        <div className='mb-10'>
            <Navbar />

            {/* Grid Wrapper */}
            <div className='mx-24 grid grid-cols-3 gap-5'>

                {/* MY EDIT AND CANCEL */}
                <div className='col-span-full'>
                    <div className='flex justify-between items-center my-9'>
                        <div className='text-5xl font-bold'>
                            My Edit
                        </div>
                        <div className='flex justify-center items-center w-28 h-9 bg-brand-gray-90 border-2 border-brand-gray-20 rounded'>
                            Cancel
                        </div>
                    </div>

                </div>

                {/* First Name */}
                <div>
                    <div className="text-lg font-medium mb-3">
                        First
                    </div>
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
                    <div className="text-lg font-medium mb-3">
                        Last
                    </div>
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
                    <div className="text-lg font-medium mb-3">
                        School
                    </div>
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
                    <div className="text-lg font-medium mb-3">
                        Phone Number
                    </div>
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
                    <div className="text-lg font-medium mb-3">
                        Email
                    </div>
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
                    <div className="text-lg font-medium mb-3">
                        Grade
                    </div>
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
                    <div className="text-lg font-medium mb-3">
                        Instagram
                    </div>
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
                    <div className="text-lg font-medium mb-3">
                        Facebook
                    </div>
                    <input
                        className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
                        id="last"
                        type="text"
                        value={facebook}
                        onChange={(e) => setFacebook(e.target.value)}
                    />
                </div>

                {/* Majors */}
                <div className='col-start-1 my-10'>
                    <div className="text-lg font-medium mb-3">
                        Majors
                    </div>
                    <input
                        className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
                        id="first"
                        type="text"
                        value={major1}
                        onChange={(e) => setMajor1(e.target.value)}
                    />
                </div>
                {/* Major 2 */}
                <div className='flex items-end my-10'>
                    <input
                        className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
                        id="last"
                        type="text"
                        value={major2}
                        onChange={(e) => setMajor2(e.target.value)}
                    />
                </div>
                {/* Major 3 */}
                <div className='flex items-end my-10'>
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
                    <div className="text-lg font-medium mb-3">
                        Sport
                    </div>
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
                    <div className="text-lg font-medium mb-3">
                        Position
                    </div>
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
                    <div className="text-lg font-medium mb-3">
                        Level
                    </div>
                    <input
                        className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
                        id="last"
                        type="text"
                        value={level1}
                        onChange={(e) => setLevel1(e.target.value)}
                    />
                </div>

                {/* Sport 2 */}
                <div className='col-start-1'>
                    <input
                        className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
                        id="first"
                        type="text"
                        value={sport2}
                        onChange={(e) => setSport2(e.target.value)}
                    />
                </div>
                {/* Position 2 */}
                <div className='flex items-end'>
                    <input
                        className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
                        id="last"
                        type="text"
                        value={position2}
                        onChange={(e) => setPosition2(e.target.value)}
                    />
                </div>
                {/* Level 2 */}
                <div className='flex items-end'>
                    <input
                        className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
                        id="last"
                        type="text"
                        value={level2}
                        onChange={(e) => setLevel2(e.target.value)}
                    />
                </div>

                {/* Sport 3 */}
                <div className='col-start-1'>
                    <input
                        className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
                        id="first"
                        type="text"
                        value={sport3}
                        onChange={(e) => setSport3(e.target.value)}
                    />
                </div>
                {/* Position 3 */}
                <div className='flex items-end'>
                    <input
                        className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
                        id="last"
                        type="text"
                        value={position3}
                        onChange={(e) => setPosition3(e.target.value)}
                    />
                </div>
                {/* Level 3 */}
                <div className='flex items-end'>
                    <input
                        className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
                        id="last"
                        type="text"
                        value={level3}
                        onChange={(e) => setLevel3(e.target.value)}
                    />
                </div>

                {/* Interests */}
                <div className='my-10'>
                    <div className="text-lg font-medium mb-3">
                        Interests
                    </div>
                    <input
                        className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
                        id="first"
                        type="text"
                        placeholder="Type and press enter to add"
                        value={tempInterest}
                        onChange={(e) => setTempInterest(e.target.value)}
                    />
                    {/* Map each interest from an interests array */}
                </div>
                {/* Extracurricular */}
                <div className='my-10'>
                    <div className="text-lg font-medium mb-3">
                        Extracurricular
                    </div>
                    <input
                        className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
                        id="last"
                        type="text"
                        placeholder="Type and press enter to add"
                        value={tempExtracurricular}
                        onChange={(e) => setTempExtracurricular(e.target.value)}
                    />
                    {/* Map each extracurricular from an extracurriculars array */}
                </div>

                {/* ACT WRAPPER */}
                <div className='col-start-1'>
                    <div className='text-lg font-medium mb-3'>
                        ACT
                    </div>
                    <div className='flex justify-between mb-3'>
                        <div className='flex justify-between items-center w-full'>
                            <div>
                                Reading
                            </div>
                            <input
                                className="border-2 border-black rounded w-20 h-9 px-2 py-2 mr-8 text-gray-700"
                                id="last"
                                type="text"
                                value={actReading}
                                onChange={(e) => setACTReading(e.target.value)}
                            />
                        </div>
                        <div className='flex justify-between items-center w-full'>
                            <div>
                                Math
                            </div>
                            <input
                                className="border-2 border-black rounded w-20 h-9 px-2 py-2 mr-8 text-gray-700"
                                id="last"
                                type="text"
                                value={actMath}
                                onChange={(e) => setACTMath(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='flex justify-between items-center mb-3'>
                        <div className='flex justify-between items-center w-full'>
                            <div >
                                Writing
                            </div>
                            <input
                                className="border-2 border-black rounded w-20 h-9 px-2 py-2 mr-8 text-gray-700"
                                id="last"
                                type="text"
                                value={actWriting}
                                onChange={(e) => setACTWriting(e.target.value)}
                            />
                        </div>
                        <div className='flex justify-between items-center w-full'>
                            <div>
                                Science
                            </div>
                            <input
                                className="border-2 border-black rounded w-20 h-9 px-2 py-2 mr-8 text-gray-700"
                                id="last"
                                type="text"
                                value={actScience}
                                onChange={(e) => setACTScience(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='flex justify-between items-center w-1/2'>
                        <div>
                            Composite
                        </div>
                        <input
                            className="border-2 border-black rounded w-20 h-9 px-2 py-2 mr-8 text-gray-700"
                            id="last"
                            type="text"
                            value={actComposite}
                            onChange={(e) => setACTComposite(e.target.value)}
                        />
                    </div>
                </div>

                {/* SAT WRAPPER */}
                <div>
                    <div className='text-lg font-medium mb-3'>
                        SAT
                    </div>
                    <div className='flex justify-between mb-3'>
                        <div className='flex justify-between items-center w-full'>
                            <div>
                                Reading
                            </div>
                            <input
                                className="border-2 border-black rounded w-20 h-9 px-2 py-2 mr-8 text-gray-700"
                                id="last"
                                type="text"
                                value={satReading}
                                onChange={(e) => setSATReading(e.target.value)}
                            />
                        </div>
                        <div className='flex justify-between items-center w-full'>
                            <div>
                                Math
                            </div>
                            <input
                                className="border-2 border-black rounded w-20 h-9 px-2 py-2 mr-8 text-gray-700"
                                id="last"
                                type="text"
                                value={satMath}
                                onChange={(e) => setSATMath(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='flex justify-between items-center w-1/2'>
                        <div>
                            Composite
                        </div>
                        <input
                            className="border-2 border-black rounded w-20 h-9 px-2 py-2 mr-8 text-gray-700"
                            id="last"
                            type="text"
                            value={satComposite}
                            onChange={(e) => setSATComposite(e.target.value)}
                        />
                    </div>
                </div>

                {/* GPA WRAPPER */}
                <div>
                    <div className='text-lg font-medium mb-3'>
                        GPA
                    </div>
                    <input
                        className="border-2 border-black rounded w-20 h-9 px-2 py-2 mr-12 text-gray-700"
                        id="last"
                        type="text"
                        value={gpa}
                        onChange={(e) => setGPA(e.target.value)}
                    />
                </div>

                {/* PURPOSE AND GOAL WRAPPER */}
                <div className='col-span-full mt-8'>
                    <div className='grid grid-cols-2 gap-5'>
                        <div>
                            <div className='text-lg font-medium mb-3'>
                                Pursue My Purpose
                            </div>
                            <input
                                className="border-2 border-black rounded w-full h-9 px-2 py-2 text-gray-700"
                                id="last"
                                type="text"
                                value={purpose}
                                onChange={(e) => setPurpose(e.target.value)}
                            />
                        </div>

                        <div>
                            <div className='text-lg font-medium mb-3'>
                                Goal
                            </div>
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

                <div className='col-span-full mt-6'>
                    <div className='flex justify-end'>
                        <div className='flex justify-center items-center w-28 h-9 bg-brand-gray-20 border-2 border-brand-gray-20 rounded text-white'>
                            Save
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditStudent;