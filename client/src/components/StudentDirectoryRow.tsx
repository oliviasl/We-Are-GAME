import React from 'react'

type StudentDirectoryRowProps = {
  name: string;
  sport: string;
  major: string;
  email: string;
};

const StudentDirectoryRow = ({ name, sport, major, email }: StudentDirectoryRowProps) => {
  return (
    <tr className='h-12 border-b border-black' key={email}>
      <td className='pl-16'>{name}</td>
      <td className='px-8'>{sport}</td>
      <td className='pr-16'>{major}</td>
    </tr>
  )
}

export default StudentDirectoryRow