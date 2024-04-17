import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import BatchAutofillModal from "./BatchAutofillModal";

const CollegeUpdateDatabase = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    const [cookies] = useCookies(["user_status"]);

    return (
        <div className="pb-16 pt-[19px] pr-5 flex items-center justify-between">
            <div className="font-bold text-5xl">College Database</div>
            {cookies.user_status === 3 && (
                <>
                    <div className="flex gap-2">
                        <Button 
                            color="gray" 
                            variant={"outlined"}
                            onClick={() => setIsModalOpen(true)}
                        >
                            Update Database
                        </Button>
                        <Button
                            color="gray"
                            className="border-2 border-brand-gray-20 hover:bg-semantic-success"
                            onClick={() => navigate("/add-college")}
                        >
                            Add College
                        </Button>
                    </div>
                    <BatchAutofillModal
                        isOpen={isModalOpen}
                        setIsOpen={setIsModalOpen}
                    />
                </>
            )}
        </div>
    );
};

export default CollegeUpdateDatabase;
