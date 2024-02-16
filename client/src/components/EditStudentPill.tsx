import React from "react";

type EditStudentPillProps = {
    text: string;
    closeHandler: () => void;
};

const EditStudentPill = ({ text, closeHandler }: EditStudentPillProps) => {
    return (
        <div
            onClick={closeHandler}
            className="flex bg-[#333333] text-white py-2 px-4 cursor-pointer rounded-md"
        >
            <div>{text}</div>
            <div className="ml-2">X</div>
        </div>
    );
};

export default EditStudentPill;
