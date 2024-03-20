import React, { useState } from "react";
import AutofillModal from "./AutofillModal";

type AutofillCollegeProps={
    stateAutofill: (arg1: boolean) => void;
}

const AutofillCollege = ({stateAutofill}: AutofillCollegeProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="flex w-full justify-between px-20 mt-4">
                <div className="text-5xl font-bold font-grotesk">
                    Add College
                </div>
                <div
                    className="bg-[#1A1A1A] text-white flex justify-center items-center px-8 py-2 rounded-md cursor-pointer"
                    onClick={() => {
                        setIsModalOpen(true);
                    }}
                >
                    Quick Fill
                </div>
            </div>
            <div className="z-50">
                <AutofillModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} stateAutofill={stateAutofill}/>
            </div>
        </>
    );
};

export default AutofillCollege;
