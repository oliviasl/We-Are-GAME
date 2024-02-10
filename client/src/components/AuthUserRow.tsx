import React from "react";

type AuthUserRowProps = {
    name: string;
    email: string;
    onApprove: () => void;
    onDeny: () => void;
};
const AuthUserRow = ({ name, email, onApprove, onDeny }: AuthUserRowProps) => {
    return (
        <tr className="h-12 border-b border-black" key={email}>
            <td className="pl-16">{name}</td>
            <td className="px-8">{email}</td>
            <td className="pr-16">
                <span
                    onClick={onApprove}
                    className="my-2 px-4 py-2 rounded bg-gray-800 cursor-pointer text-white"
                >
                    Approve
                </span>
                <span
                    onClick={onDeny}
                    className="my-2 px-4 py-2 rounded bg-gray-800 cursor-pointer ml-2 text-white"
                >
                    Deny
                </span>
            </td>
        </tr>
    );
};

export default AuthUserRow;
