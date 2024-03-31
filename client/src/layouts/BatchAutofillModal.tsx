import React, { useState } from "react";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@material-tailwind/react";

type BatchAutofillModalProps = {
    isOpen: boolean;
    setIsOpen: (arg1: boolean) => void;
};

const customStyles = {
    content: {
        border: "2px solid lightgrey" as const,
        width: "820px" as const,
        height: "250px" as const,
        margin: "auto" as const,
    },
    overlay: { zIndex: 1000 },
};

const BatchAutofillModal = ({ isOpen, setIsOpen }: BatchAutofillModalProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const autofillCollege = async () => {
        setIsLoading(true);
        const response = await fetch("/api/batchAutofill", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (data) {
            toast("Success! "+data+" colleges updated.");
        } else {
            toast("Fail.");
        }
        setIsLoading(false);

    };

    return (
        <Modal isOpen={isOpen} style={customStyles}>
            <div className="px-16 py-12">
                <div className="w-full flex-col items-center justify-center">
                    <div className="text-center text-2xl font-bold font-grotesk">
                        Are you sure you would like to update the database?
                    </div>
                    <div className="text-center font-circular-std">
                        Updating the database will overwrite existing data and
                        cannot be undone.
                    </div>
                    {isLoading ? (
                        <div className="flex justify-center text-3xl mt-8">Updating colleges...</div>
                    ) : (
                        <div className="flex justify-center gap-3 mt-8">
                            <Button
                                color="gray"
                                variant={"outlined"}
                                onClick={() => {
                                    setIsOpen(false);
                                }}
                                className="font-circular-std font-normal"
                            >
                                Cancel
                            </Button>
                            <Button
                                color="gray"
                                variant={"filled"}
                                onClick={() => {
                                    autofillCollege();
                                }}
                                className="font-circular-std font-normal"
                            >
                                Update
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            <ToastContainer hideProgressBar={true} />
        </Modal>
    );
};

export default BatchAutofillModal;
