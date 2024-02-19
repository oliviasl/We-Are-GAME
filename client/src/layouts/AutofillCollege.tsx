import React, { useState } from "react";
import AutofillModal from "./AutofillModal";

const AutofillCollege = () => {
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
                <AutofillModal isOpen={isModalOpen} setIsOpen={setIsModalOpen}/>
            </div>
        </>
    );
};

export default AutofillCollege;
