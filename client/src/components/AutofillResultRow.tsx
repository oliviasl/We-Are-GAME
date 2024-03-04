import React from "react";

type AutofillResultRowProps = {
    name: string;
    onSelect: () => void;
};

const AutofillResultRow = ({ name, onSelect }: AutofillResultRowProps) => {
    return (
        <div className="w-full border-b-1 border-black flex justify-between items-center px-6 py-4" key={name}>
            <div className="font-circular-std">{name}</div>
            <div
                className="cursor-pointer px-4 border border-black py-1 rounded-md bg-[#E6E6E6] text-xs ml-3"
                onClick={onSelect}
            >
                Select
            </div>
        </div>
    );
};

export default AutofillResultRow;
