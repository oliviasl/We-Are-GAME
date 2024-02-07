import React from "react";
import { Navbar } from "../layouts/Navbar";

const StudentDatabase = () => {
    return (
        <div>
            <Navbar />
            <div className="mx-20 mt-16">
                <div className="font-bold text-5xl font-grotesk">
                    Authentication
                </div>
                <table className="mt-16 w-full px-20 table-fixed font-circular-std">
                    <thead>
                        <tr className="border-y border-black">
                            <th className="text-left py-2 pl-16 font-normal">
                                Name
                            </th>
                            <th className="text-left py-2 px-8 font-normal">
                                Email
                            </th>
                            <th className="text-left py-2 pr-16 font-normal">
                                Approve/Deny
                            </th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentDatabase;
