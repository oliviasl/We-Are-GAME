import React from "react";
import { Button } from "@material-tailwind/react";

const CollegeUpdateDatabase = () => {
    return (
        <div className="pb-16 pr-5 flex flex-row justify-between">
            <div className="font-bold text-5xl font-grotesk">College Database</div>

            <Button color="gray" className="rounded h-9 font-normal text-base font-circular-std">Update Database</Button>
        </div>
    );
};

export default CollegeUpdateDatabase;