import React from "react";
import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { Checkbox } from "@material-tailwind/react";

const CollegeFilters = () => {

    const icon=
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-9 w-9"
    >
        <rect className="h-9 w-9" rx="4" fill="#FFF"/>
        <rect className="h-5 w-5" rx="4" x="7.5" y="7.5" fill="#577347"/>
    </svg>


    return (
        <div className="content-start">
            <div className="text-2xl font-bold">Search & Filter</div>

            <div className="flex items-center place-content-between my-2 ">
                <div>College Name</div>
                <div className="w-40">
                    <Input size="md" crossOrigin={undefined} />
                </div>
            </div>

            <div className="text-2xl font-bold">Admission Statistics</div>

            <div className="flex items-center place-content-between my-2">
                <div>Average GPA</div>
                <div className="w-40">
                    <Input size="md" crossOrigin={undefined} />
                </div>
            </div>

            <div className="flex items-center place-content-between my-2">
                <div>SAT EBRW</div>
                <div className="w-40">
                    <Input size="md" crossOrigin={undefined} />
                </div>
            </div>

            <div className="flex items-center place-content-between my-2">
                <div>SAT Math</div>
                <div className="w-40">
                    <Input size="md" className="" crossOrigin={undefined} />
                </div>
            </div>

            <div className="flex items-center place-content-between my-2">
                <div>ACT Composite</div>
                <div className="w-40">
                    <Input size="md" crossOrigin={undefined} />
                </div>
            </div>

            <div className="text-2xl font-bold">Resources</div>

            <div className="flex items-center space-x-2">
                <Checkbox className="w-9 h-9" color="green" icon={icon}  crossOrigin={undefined}/>
                <div>Student Athlete Academic Resources</div>
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox className="w-9 h-9"
                        icon={
                            icon
                        }
                        crossOrigin={undefined}/>
                <div>Student Academic Resources</div>
            </div>

            <div className="flex items-center space-x-2 pb-6">
                <Checkbox color="green" className="w-9 h-9" icon={icon} crossOrigin={undefined}/>
                <div>Diversity Resources</div>
            </div>

            <Button>Search</Button>
        </div>
    );
};

export default CollegeFilters;
