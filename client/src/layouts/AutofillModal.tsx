import React, { useState } from "react";
import Modal from "react-modal";
import X from "../components/X";
import AutofillResultRow from "../components/AutofillResultRow";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type AutofillModalProps = {
    stateAutofill: (arg1: boolean) => void;
    isOpen: boolean;
    setIsOpen: (arg1: boolean) => void;
};

const customStyles = {
    content: {
        border: "2px solid lightgrey" as const,
        width: "52%" as const,
        margin: "auto" as const,
    },
    overlay: { zIndex: 1000 },
};

const AutofillModal = ({ isOpen, setIsOpen, stateAutofill }: AutofillModalProps) => {
    const [collegeInput, setCollegeInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showMessage, setShowMessage] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const lookupCollege = async () => {
        setShowMessage(false);

        if (collegeInput.length === 0) {
            setShowMessage(true);
            setErrorMessage("Empty queries are not allowed.");
            return;
        }

        const collegeLookupBody = JSON.stringify({
            collegeName: collegeInput,
        });
        setIsLoading(true);
        const response = await fetch("/api/searchScorecard", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: collegeLookupBody,
        });
        const data = await response.json();
        setIsLoading(false);
        if (data.length > 0) {
            setSearchResults(data);
        } else {
            setSearchResults([]);
            setShowMessage(true);
            setErrorMessage(
                ' No results found matching "' + collegeInput + '".'
            );
        }
    };

    const autofillCollege = (name: string) => {
        return async () => {
            const collegeLookupBody = JSON.stringify({
                collegeName: name,
            });

            const response = await fetch("/api/autofillCollege", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: collegeLookupBody,
            });

            const data = await response.json();
            console.log(data);
            // pass data up
            stateAutofill(data);
            if (data) {
                toast("Success.");
                setCollegeInput("");
                setErrorMessage("");
                setSearchResults([]);
                setIsOpen(false);
            } else {
                toast("Fail.");
            }
        };
    };

    return (
        <Modal isOpen={isOpen} style={customStyles}>
            <div className="px-16 py-12">
                <div className="w-full flex justify-between">
                    <div className="text-2xl font-bold font-grotesk">
                        Quick Fill
                    </div>
                    <div
                        onClick={() => {
                            setIsOpen(false);
                        }}
                        className="cursor-pointer"
                    >
                        <X fill="black" />
                    </div>
                </div>
                <div className="mt-4 flex w-full items-center">
                    <input
                        value={collegeInput}
                        onChange={(e) => {
                            setCollegeInput(e.target.value);
                        }}
                        className="border-2 border-black rounded h-9 w-full p-2"
                        type="text"
                    />
                    <div
                        className="bg-[#1A1A1A] text-white rounded-md px-4 py-2 ml-3 cursor-pointer"
                        onClick={lookupCollege}
                    >
                        Search
                    </div>
                </div>
                <div>
                    {isLoading ? (
                        <div className="text-4xl mt-16 text-center">Loading...</div>
                    ) : (
                        <div>
                            {showMessage ? (
                                <div className="mt-1 text-[#7B2525] font-circular-std">
                                    {errorMessage}
                                </div>
                            ) : (
                                <div className="mt-8">
                                    <div className="h-px bg-black" />
                                    {searchResults?.map((result) => {
                                        return (
                                            <AutofillResultRow
                                                name={result}
                                                onSelect={autofillCollege(result)}
                                            />
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <ToastContainer hideProgressBar={true} />
        </Modal>
    );
};

export default AutofillModal;
