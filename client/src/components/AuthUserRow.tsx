import React from "react";

type AuthUserRowProps = {
    name: string;
    id: Number;
    email: string;
};
const AuthUserRow = ({ name, id, email }: AuthUserRowProps) => {
    return (
        <tr>
            <td>{name}</td> <td>{email}</td> <td> APPROVE / DENY</td>
        </tr>
    );
};

export default AuthUserRow;
