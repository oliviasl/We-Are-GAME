import React from "react";
import { Button } from "@material-tailwind/react";

const CollegeUpdateDatabase = () => {
    return (
        <div className="pb-16 pt-[19px] pr-5 flex items-baseline justify-between">
            <div className="font-bold text-5xl">College Database</div>

            <div className="h-9 rounded"><Button color="gray">Update Database</Button></div>
        </div>
    );
};

export default CollegeUpdateDatabase;