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
            <div className="pr-2">{text}</div>
            <button onClick={() => console.log('deleted')}>
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="9.5" cy="9.5" r="9.5" fill="white" />
                    <line x1="6.55221" y1="6.49249" x2="12.6236" y2="13.0987" stroke="#7B2525" strokeWidth="1.5" />
                    <line x1="12.8017" y1="6.53141" x2="6.43809" y2="12.8691" stroke="#7B2525" strokeWidth="1.5" />
                </svg>
            </button>
        </div>
    );
};

export default EditStudentPill;
