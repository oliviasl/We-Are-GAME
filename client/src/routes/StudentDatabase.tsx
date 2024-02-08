import React, { useState, useEffect, useCallback } from "react";
import { Navbar } from "../layouts/Navbar";
import StudentDirectoryRow from "../components/StudentDirectoryRow";

const StudentDatabase = () => {

    //Table Data
    const [users, setUsers] = useState<any[]>([]);

    //Pagination States
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchApprovedUsers = useCallback(async () => {
        const pageBody = JSON.stringify({
            pageNumber: page,
        });
        const response = await fetch("/api/paginatedApprovedUsers", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: pageBody,
        });
        const data = await response.json();

        const { totalPages, approvedUsers } = data;
        setUsers(approvedUsers);
        setTotalPages(totalPages);
    }, [page]);

    useEffect(() => {
        fetchApprovedUsers();
    }, [page, fetchApprovedUsers]);

    return (
        <div>
            <Navbar />
            {/* View Wrapper */}
            <div className="flex mx-20 mt-16">
                {/* Table Wrapper */}
                <div className="w-3/4">
                    <div className="font-bold text-5xl font-grotesk">
                        Student Directory
                    </div>
                    <table className="mt-16 w-full px-20 table-fixed font-circular-std">
                        <thead>
                            <tr className="border-y border-black">
                                <th className="text-left py-2 pl-16 font-semibold">
                                    Name
                                </th>
                                <th className="text-left py-2 px-8 font-semibold">
                                    Sport
                                </th>
                                <th className="text-left py-2 pr-16 font-semibold">
                                    Major
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => {
                                return (
                                    <StudentDirectoryRow 
                                        name = {
                                            user?.user_firstname + " " + user?.user_lastname
                                        }
                                        major = {
                                            user?.user_potential_major
                                        }
                                        sport = {
                                            user?.user_sport1
                                        } 
                                        email = {
                                            user?.user_email
                                        }
                                    />
                                )
                            })}
                        </tbody>
                    </table>
                    <div className="flex justify-start items-center gap-2 mt-16">
                        <button
                            disabled={page === 1}
                            className="relative h-8 max-h-[24px] w-8 max-w-[24px] select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            onClick={() => {
                                setPage((p) => {
                                    return p - 1;
                                });
                            }}
                        >
                            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                    className="w-4 h-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                                    ></path>
                                </svg>
                            </span>
                        </button>
                        <span className="text-[#577347] text-[12px] font-circular-std">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            disabled={page === totalPages}
                            className="relative h-8 max-h-[24px] w-8 max-w-[24px] select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                            onClick={() => {
                                setPage((p) => {
                                    return p + 1;
                                });
                            }}
                        >
                            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                    className="w-4 h-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                    ></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>

                {/* Search Component */}
                <div className="w-1/4 pl-2">
                    <div className="font-bold text-2xl font-grotesk">
                       Search & Filter
                    </div>
                    <div className="flex pt-5 items-center">
                        <div className="w-1/3  text-left font-normal">Name</div>
                        <input className = 'border-2 border-black rounded w-2/3 h-9' type="text" />
                    </div>
                    <div className="flex pt-5 items-center">
                        <div className="w-1/3  text-left font-normal">Major</div>
                        <input className = 'border-2 border-black rounded w-2/3 h-9' type="text" />
                    </div>
                    <div className="flex pt-5 pb-3 items-center">
                        <div className="w-1/3  text-left font-normal">Sport</div>
                        <input className = 'border-2 border-black rounded w-2/3 h-9' type="text" />
                    </div>
                    <div className="flex items-center justify-start mt-3 ">
                        {/* Auth Wrapper */}
                        <div className="w-28 h-9 cursor-pointer bg-brand-gray-20 text-white font-medium px-8 py-[5px] rounded">
                            Search
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDatabase;
