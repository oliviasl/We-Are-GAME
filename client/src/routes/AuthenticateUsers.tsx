import React, { useState } from "react";
import { Navbar } from "../layouts/Navbar";
import AuthUserRow from "../components/AuthUserRow";

const AuthenticateUsers = () => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const onApprove = async (id: Number) => {
        console.log("would approve user with id", id.toString());
    };
    const onDeny = async (id: Number) => {
        console.log("would deny user with id", id.toString());
    };
    
    return (
        <div>
            <Navbar />
            <div className="mx-20 mt-16">
                <div className="font-bold text-5xl">Authentication</div>
                <table className="mt-16 w-full px-20 table-fixed">
                    <thead>
                        <tr className="border-y border-black">
                            <th className="text-left py-2 pl-16">Name</th>
                            <th className="text-left py-2 px-8">Email</th>
                            <th className="text-left py-2 pr-16">
                                Approve/Deny
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <AuthUserRow
                            name="bob"
                            email="a@a.a"
                            onApprove={() => {
                                onApprove(1);
                            }}
                            onDeny={() => {
                                onDeny(1);
                            }}
                        />
                        <AuthUserRow
                            name="bob"
                            email="a@a.a"
                            onApprove={() => {
                                onApprove(1);
                            }}
                            onDeny={() => {
                                onDeny(1);
                            }}
                        />
                        <AuthUserRow
                            name="bob"
                            email="a@a.a"
                            onApprove={() => {
                                onApprove(1);
                            }}
                            onDeny={() => {
                                onDeny(1);
                            }}
                        />
                        <AuthUserRow
                            name="bob"
                            email="a@a.a"
                            onApprove={() => {
                                onApprove(1);
                            }}
                            onDeny={() => {
                                onDeny(1);
                            }}
                        />
                        <AuthUserRow
                            name="bob"
                            email="a@a.a"
                            onApprove={() => {
                                onApprove(1);
                            }}
                            onDeny={() => {
                                onDeny(1);
                            }}
                        />
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-16">
                Page {page} of {totalPages}
            </div>
        </div>
    );
};

export default AuthenticateUsers;
