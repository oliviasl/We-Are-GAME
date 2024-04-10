import React from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";


type MentorDirectoryRowProps = {
    name: string;
    sport: string[];
    major: string[];
    id: string;
}

function formatArray(array: string[]) {
  const cell = array.filter(str => str !== "").join(", ");
  if (cell.length > 20) {
    return cell.substring(0, 17)+"...";
} else {
    return cell;
}
}

const MentorDirectoryRow = ({ name, sport, major, id }: MentorDirectoryRowProps) => {

  const navigate = useNavigate();
  const sportCell = formatArray(sport);
  const majorCell = formatArray(major);

  return (
    <tr
      className='h-12 border-b border-black cursor-pointer'
      onClick={() => { navigate('/mentor-profile/' + id) }}
      key={id}
    >
      <td className='pl-16'>{name}</td>
      <td className='px-8'>{sportCell}</td>
      <td className='pr-16'>{majorCell}</td>
    </tr>
  )
}

export default MentorDirectoryRow