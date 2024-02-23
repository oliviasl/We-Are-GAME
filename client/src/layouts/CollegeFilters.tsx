import React, { useState } from "react";
import { Input, Button, Checkbox } from "@material-tailwind/react";

const CollegeFilters = () => {
    // State for each form input
    const [collegeName, setCollegeName] = useState('');
    const [averageGPA, setAverageGPA] = useState('');
    const [satEBRW, setSatEBRW] = useState('');
    const [satMath, setSatMath] = useState('');
    const [actComposite, setActComposite] = useState('');
    const [studentAthleteResources, setStudentAthleteResources] = useState(false);
    const [studentAcademicResources, setStudentAcademicResources] = useState(false);
    const [diversityResources, setDiversityResources] = useState(false);

    // Form submission handler
    const handleSubmit = (event: any) => {
        event.preventDefault(); // Prevents the default form submission behavior
        const formData = {
            collegeName,
            averageGPA,
            satEBRW,
            satMath,
            actComposite,
            studentAthleteResources,
            studentAcademicResources,
            diversityResources,
        };
        console.log(formData); // For demonstration, you'd likely send this data to a server
    };

    // Checkbox custom icon
    const icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9">
            <rect className="h-9 w-9" rx="4" fill="#FFF"/>
            <rect className="h-5 w-5" rx="4" x="7.5" y="7.5" fill="#577347"/>
        </svg>
    );

    return (
        <form onSubmit={handleSubmit} className="content-start">
            <div className="text-2xl font-bold">Search & Filter</div>

            {/* College Name */}
            <div className="flex items-center place-content-between my-2">
                <div>College Name</div>
                <div className="w-40">
                    <Input size="lg" value={collegeName} onChange={(e) => setCollegeName(e.target.value)} crossOrigin={undefined} />
                </div>

            </div>

            {/* Admission Statistics */}
            <div className="text-2xl font-bold">Admission Statistics</div>
            <div className="flex items-center place-content-between my-2">
                <div>Average GPA</div>
                <div className="w-40">
                <Input size="lg" value={averageGPA} onChange={(e) => setAverageGPA(e.target.value)} crossOrigin={undefined} />
                </div>
            </div>
            <div className="flex items-center place-content-between my-2">
                <div>SAT EBRW</div>
                <div className="w-40">
                <Input size="lg" value={satEBRW} onChange={(e) => setSatEBRW(e.target.value)} crossOrigin={undefined}/>
                </div>
            </div>
            <div className="flex items-center place-content-between my-2">
                <div>SAT Math</div>
                <div className="w-40">
                <Input size="lg" value={satMath} onChange={(e) => setSatMath(e.target.value)} crossOrigin={undefined} />
                </div>
            </div>
            <div className="flex items-center place-content-between my-2">
                <div>ACT Composite</div>
                <div className="w-40">
                <Input size="lg" value={actComposite} onChange={(e) => setActComposite(e.target.value)} crossOrigin={undefined} />
                </div>
            </div>

            {/* Resources */}
            <div className="text-2xl font-bold">Resources</div>
            <div className="flex items-center space-x-2">
                <Checkbox checked={studentAthleteResources} onChange={(e) => setStudentAthleteResources(e.target.checked)} icon={icon} crossOrigin={undefined} />
                <div>Student Athlete Academic Resources</div>
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox checked={studentAcademicResources} onChange={(e) => setStudentAcademicResources(e.target.checked)} icon={icon} crossOrigin={undefined} />
                <div>Student Academic Resources</div>
            </div>
            <div className="flex items-center space-x-2 pb-6">
                <Checkbox checked={diversityResources} onChange={(e) => setDiversityResources(e.target.checked)} icon={icon} crossOrigin={undefined} />
                <div>Diversity Resources</div>
            </div>

            <Button type="submit">Search</Button>
        </form>
    );
};

export default CollegeFilters;
