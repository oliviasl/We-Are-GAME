import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { CollegeProgressBar } from "../components/CollegeProgressBar";
import { Navbar } from "../layouts/Navbar";
import CollegeFilters from "../layouts/CollegeFilters";

const CollegeDatabase = () => {


    return <div className="h-screen w-screen flex flex-col items-center">
        < Navbar />
        < CollegeFilters />

    </div>
}

export default CollegeDatabase;