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
        <rect className="h-9 w-9 border-2 border-black" rx="4" fill="#FFF"/>
        <rect className="h-5 w-5" rx="4" x="7.5" y="7.5" fill="#577347"/>
    </svg>


    return (
        <div className="flex flex-col justify-start gap-y-6">
            <div className="text-2xl font-bold font-grotesk">Search & Filter</div>

            <div className="flex items-center place-content-between">
                <div className="text-base font-circular-std">College Name</div>
                <div className="w-40">
                    <Input size="md" crossOrigin={undefined} />
                </div>
            </div>
            <div>
                <div className="text-[20px] font-bold font-grotesk">Admission Statistics</div>

                <div className="flex items-center place-content-between my-2">
                    <div className="text-base font-circular-std">Average GPA</div>
                    <div className="w-40">
                        <Input size="md" crossOrigin={undefined} />
                    </div>
                </div>

                <div className="flex items-center place-content-between my-2">
                    <div className="text-base font-circular-std">SAT EBRW</div>
                    <div className="w-40">
                        <Input size="md" crossOrigin={undefined} />
                    </div>
                </div>

                <div className="flex items-center place-content-between my-2">
                    <div className="text-base font-circular-std">SAT Math</div>
                    <div className="w-40">
                        <Input size="md" className="" crossOrigin={undefined} />
                    </div>
                </div>

                <div className="flex items-center place-content-between">
                    <div className="text-base font-circular-std">ACT Composite</div>
                    <div className="w-40">
                        <Input size="md" crossOrigin={undefined} />
                    </div>
                </div>

            </div>
            <div className="gap-y-3">
                <div className="text-[20px] font-bold font-grotesk">Resources</div>
                <div className="flex flex-col gap-y-0">
                    <div className="flex items-center space-x-2 -translate-x-3">
                        <Checkbox className="w-9 h-9 border-2 border-black" color="green" icon={icon}  crossOrigin={undefined}/>
                        <div className="text-base font-circular-std">Student Athlete Academic Resources</div>
                    </div>

                    <div className="flex items-center space-x-2 -translate-x-3 -translate-y-3">
                        <Checkbox className="w-9 h-9 border-2 border-black"
                                icon={
                                    icon
                                }
                                crossOrigin={undefined}/>
                        <div className="text-base font-circular-std">Student Academic Resources</div>
                    </div>

                    <div className="flex items-center space-x-2 -translate-x-3 -translate-y-6">
                        <Checkbox color="green" className="w-9 h-9 border-2 border-black my-0" icon={icon} crossOrigin={undefined}/>
                        <div className="text-base font-circular-std">Diversity Resources</div>
                    </div>
                </div>
            </div>
            

            <Button color ="gray" className="rounded h-9 w-40 font-normal text-base font-circular-std -translate-y-9">Search</Button>
        </div>
    );
};

export default CollegeFilters;
