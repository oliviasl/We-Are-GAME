import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Typography } from "@material-tailwind/react";

type StudentDirectoryRowProps = {
    name: string;
    sport: string[];
    major: string[];
    id: string;
};

function formatArray(array: string[]) {
    const cell = array.filter((str) => (str && str.trim() !== "")).join(", ");
    if (cell.length > 20) {
        return cell.substring(0, 17) + "...";
    } else {
        return cell;
    }
}

const StudentDirectoryRow = ({
    name,
    sport,
    major,
    id,
}: StudentDirectoryRowProps) => {
    const navigate = useNavigate();
    const sportCell = formatArray(sport);
    const majorCell = formatArray(major);
    return (
        <tr
            className="h-12"
            onClick={() => {
                navigate("/student-profile/" + id);
            }}
            key={id}
        >
            <td className="p-4 border-b border-black">
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                >
                    {name}
                </Typography>
            </td>
            <td className="p-4 border-b border-black">
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                >
                    {sportCell}
                </Typography>
            </td>
            <td className="p-4 border-b border-black">
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                >
                    {majorCell}
                </Typography>
            </td>
        </tr>
    );
};

export default StudentDirectoryRow;
