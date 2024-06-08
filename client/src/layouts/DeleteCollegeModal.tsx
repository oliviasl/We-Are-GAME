import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import Modal from "react-modal";
import X from "../components/X";
const appElement = document.getElementById("root")!;
Modal.setAppElement(appElement);

interface DeleteModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const DeleteCollegeModal = ({ isOpen, setIsOpen }: DeleteModalProps) => {
    const [input, setInput] = useState("");

    useEffect(() => {
        setInput("");
    }, [isOpen]);

    const handleChange = (value: string) => {
        setInput(value);
    };

    const deleteCollege = (value: string) => {
        fetch("https://we-are-game-backend.onrender.com/api/deleteCollege/", {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                collegeId: value,
            }),
        })
            .then((response) => {
                if (response.status === 200)
                    toast.success('Performed delete.')
            })
            .catch((error) => console.error("Error deleting college:", error));
    }


    const customStyles = {
        content: {
            border: "2px solid lightgrey" as const,
            width: "52%" as const,
            margin: "auto" as const,
            maxHeight: "30vh",
            overflow: "hidden" as const,
        },
    };

    return (
        <Modal
            isOpen={isOpen}
            contentLabel="Delete College"
            style={customStyles}
        >
            <div className="px-12 py-10 flex-col">
                <div className="font-grotesk flex justify-between">
                    <div className="font-bold text-2xl">Delete College</div>
                    <button onClick={() => setIsOpen(false)}>
                        <X fill="black" />
                    </button>
                </div>
                <div className="flex mt-6 gap-3">
                    <input
                        placeholder="Search by college name"
                        value={input}
                        onChange={(e) => handleChange(e.target.value)}
                        className="border-2 border-brand-gray-20 bg-gray-100 rounded-md px-4 py-1 w-full outline-none"
                    ></input>
                    {/* <button className="bg-brand-gray-20 text-brand-white p-2 px-8 rounded-md transition duration-200 ease-in-out hover:bg-brand-green-45">Search</button> */}
                </div>
                <Button
                    color="gray"
                    className="mt-5 border-2 border-brand-gray-20 hover:bg-semantic-success"
                    onClick={() => { deleteCollege(input) }}
                >
                    Delete College
                </Button>
            </div>
        </Modal>
    );
};


export default DeleteCollegeModal;
