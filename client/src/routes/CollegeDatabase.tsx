import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { CollegeProgressBar } from "../components/CollegeProgressBar";
import { Navbar } from "../layouts/Navbar";
import CollegeFilters from "../layouts/CollegeFilters";

const CollegeDatabase = () => {


    return <div className="h-screen w-screen flex flex-col">
        < Navbar />
        <div className="flex justify-end mx-28 mt-16">
            < CollegeFilters />
        </div>


    </div>
}

export default CollegeDatabase;