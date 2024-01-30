import React from "react";
import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { Checkbox } from "@material-tailwind/react";

const CollegeFilters = () => {
    return (
        <div>
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
                    <Input size="md" crossOrigin={undefined} />
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
                <Checkbox className="w-9 h-9" color="green" crossOrigin={undefined}/>
                <div>Student Athlete Academic Resources</div>
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox color="green" className="w-9 h-9 bg-[#577347]"
                          icon={
                              <svg
                                  fill="577347"
                                   className="h-3 w-3"
                              ></svg>
                          }
                          crossOrigin={undefined}/>
                <div>Student Academic Resources</div>
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox color="green" className="w-9 h-9" crossOrigin={undefined}/>
                <div>Diversity Resources</div>
            </div>

            <Button>Search</Button>
        </div>
    );
};

export default CollegeFilters;
