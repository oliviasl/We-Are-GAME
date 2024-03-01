import React from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";

type StudentDirectoryRowProps = {
  name: string;
  sport: string;
  major: string;
  id: string;
};

const StudentDirectoryRow = ({ name, sport, major, id }: StudentDirectoryRowProps) => {

  const navigate = useNavigate();

  return (
    <tr
      className='h-12 border-b border-black cursor-pointer'
      onClick={() => { navigate('/student-profile/' + id) }}
      key={id}
    >
      <td className='pl-16'>{name}</td>
      <td className='px-8'>{sport}</td>
      <td className='pr-16'>{major}</td>
    </tr>
  )
}

export default StudentDirectoryRow