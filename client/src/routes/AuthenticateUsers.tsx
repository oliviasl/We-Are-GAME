import React from "react";
import { Navbar } from "../layouts/Navbar";
import AuthUserRow from "../components/AuthUserRow";

const AuthenticateUsers = () => {
    return (
        <div>
            <Navbar />
            <div className="mx-20 mt-16">
                <div className="font-bold text-5xl">Authentication</div>
                <table className="w-full px-20 table-fixed">
                    <tr className="pxx-20">
                        <th>Company</th>
                        <th>Contact</th>
                        <th>Country</th>
                    </tr>
                    <AuthUserRow name="bob" id={1} email="a@a.a" />
                </table>
            </div>
        </div>
    );
};

export default AuthenticateUsers;
