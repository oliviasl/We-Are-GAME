import React, { useEffect, useState, useCallback } from "react";
import { Navbar } from "../layouts/Navbar";
import AuthUserRow from "../components/AuthUserRow";

const AuthenticateUsers = () => {
    //Table Data
    const [users, setUsers] = useState<any[]>([]);

    //Pagination States
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchUnapprovedUsers = useCallback(async () => {
        const pageBody = JSON.stringify({
            pageNumber: page,
        });
        const response = await fetch("/api/paginatedUnapprovedUsers", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: pageBody,
        });
        const data = await response.json();

        const { totalPages, unapprovedUsers } = data;
        setUsers(unapprovedUsers);
        setTotalPages(totalPages);
    }, [page]);

    const onApprove = async (id: Number) => {
        const idBody = JSON.stringify({
            userId: id,
        });
        await fetch("/api/approveUser", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: idBody,
        });
        fetchUnapprovedUsers();
    };

    const onDeny = async (id: Number) => {
        const idBody = JSON.stringify({
            userId: id,
        });
        await fetch("/api/deleteUser", {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: idBody,
        });
        fetchUnapprovedUsers();
    };

    useEffect(() => {
        fetchUnapprovedUsers();
    }, [page, fetchUnapprovedUsers]);

    return (
        <div>
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
                    <tbody>
                        {users.map((user) => {
                            return (
                                <AuthUserRow
                                    name={
                                        user?.user_firstname +
                                            " " +
                                            user?.user_lastname || ""
                                    }
                                    email={user?.user_email || ""}
                                    onApprove={() => {
                                        onApprove(user?.user_id);
                                    }}
                                    onDeny={() => {
                                        onDeny(user?.user_id);
                                    }}
                                    key={user?.user_id}
                                />
                            );
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
        </div>
    );
};

export default AuthenticateUsers;
