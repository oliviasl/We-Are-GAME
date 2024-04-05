import React, { useState } from "react";
import { Input, Button, Checkbox } from "@material-tailwind/react";

export interface CollegeFiltersProps {
    onCollegeData: (formData: CollegeData) => void;
}

export interface CollegeData {
    collegeByName?: string;
    collegeByGPA?: string;
    collegeBySATRead?: string;
    collegeBySATMath?: string;
    collegeByACT?: string;
    collegeHasStuAthAcademicRes?: boolean;
    collegeHasAcademicResource?: boolean;
    collegeHasDiversityResource?: boolean;
}

const CollegeFilters: React.FC<CollegeFiltersProps> = ({ onCollegeData }) => {
    // State for each form input
    const [collegeByName, setCollegeName] = useState("");
    const [collegeByGPA, setAverageGPA] = useState("");
    const [collegeBySATRead, setSatEBRW] = useState("");
    const [collegeBySATMath, setSatMath] = useState("");
    const [collegeByACT, setActComposite] = useState("");
    const [collegeHasStuAthAcademicRes, setStudentAthleteResources] =
        useState(false);
    const [collegeHasAcademicResource, setStudentAcademicResources] =
        useState(false);
    const [collegeHasDiversityResource, setDiversityResources] =
        useState(false);

    // Form submission handler
    const handleSubmit = (event: any) => {
        event.preventDefault(); // Prevents the default form submission behavior
        const formData = {
            collegeByName,
            collegeByGPA,
            collegeBySATRead,
            collegeBySATMath,
            collegeByACT,
            collegeHasStuAthAcademicRes,
            collegeHasAcademicResource,
            collegeHasDiversityResource,
        };
        console.log("formData", formData); // For demonstration, you'd likely send this data to a server
        onCollegeData(formData); // Pass the form data to the parent component
    };

    // Checkbox custom icon
    const icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9">
            <rect className="h-9 w-9" rx="4" fill="#FFF" />
            <rect className="h-5 w-5" rx="4" x="7.5" y="7.5" fill="#577347" />
        </svg>
    );

    return (
        <form onSubmit={handleSubmit} className="content-start">
            <div className="text-2xl font-bold">Search & Filter</div>

            {/* College Name */}
            <div className="flex items-center place-content-between my-2">
                <div>College Name</div>
                <div className="w-40">
                    <Input
                        size="lg"
                        value={collegeByName}
                        onChange={(e) => setCollegeName(e.target.value)}
                        crossOrigin={undefined}
                    />
                </div>
            </div>

            {/* Admission Statistics */}
            <div className="text-2xl font-bold">Admission Statistics</div>
            <div className="flex items-center place-content-between my-2">
                <div>Average GPA</div>
                <div className="w-40">
                    <Input
                        size="lg"
                        value={collegeByGPA}
                        onChange={(e) => setAverageGPA(e.target.value)}
                        crossOrigin={undefined}
                    />
                </div>
            </div>
            <div className="flex items-center place-content-between my-2">
                <div>SAT EBRW</div>
                <div className="w-40">
                    <Input
                        size="lg"
                        value={collegeBySATRead}
                        onChange={(e) => setSatEBRW(e.target.value)}
                        crossOrigin={undefined}
                    />
                </div>
            </div>
            <div className="flex items-center place-content-between my-2">
                <div>SAT Math</div>
                <div className="w-40">
                    <Input
                        size="lg"
                        value={collegeBySATMath}
                        onChange={(e) => setSatMath(e.target.value)}
                        crossOrigin={undefined}
                    />
                </div>
            </div>
            <div className="flex items-center place-content-between my-2">
                <div>ACT Composite</div>
                <div className="w-40">
                    <Input
                        size="lg"
                        value={collegeByACT}
                        onChange={(e) => setActComposite(e.target.value)}
                        crossOrigin={undefined}
                    />
                </div>
            </div>

            {/* Resources */}
            <div className="text-2xl font-bold">Resources</div>
            <div className="flex items-center space-x-2">
                <Checkbox
                    checked={collegeHasStuAthAcademicRes}
                    onChange={(e) =>
                        setStudentAthleteResources(e.target.checked)
                    }
                    icon={icon}
                    crossOrigin={undefined}
                />
                <div>Student Athlete Academic Resources</div>
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox
                    checked={collegeHasAcademicResource}
                    onChange={(e) =>
                        setStudentAcademicResources(e.target.checked)
                    }
                    icon={icon}
                    crossOrigin={undefined}
                />
                <div>Student Academic Resources</div>
            </div>
            <div className="flex items-center space-x-2 pb-6">
                <Checkbox
                    checked={collegeHasDiversityResource}
                    onChange={(e) => setDiversityResources(e.target.checked)}
                    icon={icon}
                    crossOrigin={undefined}
                />
                <div>Diversity Resources</div>
            </div>
            <div className="flex gap-4 w-full">
                <Button className="w-full" type="submit">
                    Search
                </Button>
                <Button
                    variant="outlined"
                    className="w-full"
                    onClick={() => {
                        setCollegeName("");
                        setAverageGPA("");
                        setSatEBRW("");
                        setSatMath("");
                        setActComposite("");
                        setStudentAthleteResources(false);
                        setStudentAcademicResources(false);
                        setDiversityResources(false);
                    }}
                >
                    Clear
                </Button>
            </div>
        </form>
    );
};

export default CollegeFilters;
