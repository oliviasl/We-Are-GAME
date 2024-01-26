import React from "react";
import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { Checkbox } from "@material-tailwind/react";

const CollegeFilters = () => {
    return (
        <div>
            <div className="text-2xl font-bold">Search & Filter</div>

            <div className="flex items-center space-x-2">
                <div>College Name</div>
                <Input size="md" crossOrigin={undefined} />
            </div>

            <div className="text-2xl font-bold">Admission Statistics</div>

            <div className="flex items-center space-x-20 border-l-2">
                <div>Average GPA</div>
                <Input size="md" crossOrigin={undefined} />
            </div>

            <div className="flex items-center space-x-2">
                <div>SAT EBRW</div>
            </div>

            <div className="flex items-center space-x-2">
                <div>SAT Math</div>
                <Input size="md" crossOrigin={undefined} />
            </div>

            <div className="flex items-center space-x-2">
                <div>ACT Composite</div>
                <Input size="md" crossOrigin={undefined} />
            </div>

            <div className="text-2xl font-bold">Resources</div>

            <div className="flex items-center space-x-2">
                <Checkbox color="green" crossOrigin={undefined}/>
                <div>Student Athlete Academic Resources</div>
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox color="green" crossOrigin={undefined}/>
                <div>Student Academic Resources</div>
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox color="green" crossOrigin={undefined}/>
                <div>Diversity Resources</div>
            </div>

            <Button>Search</Button>
        </div>
    );
};

export default CollegeFilters;
