import React from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";


type MentorDirectoryRowProps = {
    name: string;
    sport: string;
    major: string;
    id: string;
}

const MentorDirectoryRow = ({ name, sport, major, id }: MentorDirectoryRowProps) => {

    const navigate = useNavigate();

  return (
    <tr
      className='h-12 border-b border-black cursor-pointer'
      onClick={() => { navigate('/mentor-profile/' + id) }}
      key={id}
    >
      <td className='pl-16'>{name}</td>
      <td className='px-8'>{sport}</td>
      <td className='pr-16'>{major}</td>
    </tr>
  )
}

export default MentorDirectoryRow