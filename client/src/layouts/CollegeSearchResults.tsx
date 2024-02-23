import React, {useEffect, useState} from "react";
import {Button, Card, Typography} from "@material-tailwind/react";
import {Link} from "react-router-dom";

interface CollegeData {
  college_name: string;
  // other fields...
}

async function fetchColleges(fields: any): Promise<any> {
  try {
    const response = await fetch('/api/collegesFiltered', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({fields}), // Convert the JavaScript object to a JSON string
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data; // Return the data so it can be used by the caller
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    throw error; // Re-throw the error so the caller can handle it
  }
}

const CollegeSearchResults = () => {
  const TABLE_HEAD = ["College Name", "Location", "Admit Rate", "Average GPA", ""];
  const [TABLE_ROWS, setTableRows] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fields = {"collegeByGPA": 3};
        const data = await fetchColleges(fields);
        setTableRows(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card shadow={false} className="h-full w-full pr-5">
      <table className=" table-auto text-left rounded-none">
        <thead>
        <tr className="h-12">
          {TABLE_HEAD.map((head) => (
            <th
              key={head}
              className="border-b border-black p-4 border-t"

            >
              <Typography
                variant="small"
                color="black"
                className="font-semibold leading-none opacity-70"
              >
                {head}
              </Typography>
            </th>
          ))}
        </tr>
        </thead>
        <tbody>
        {TABLE_ROWS.map(({college_id, college_name, college_location, acceptance_rate, max_gpa}, index) => {
          const isLast = index === TABLE_ROWS.length - 1;
          const classes = "p-4 border-b border-black";

          return (
            <tr key={college_name} className="h-12">
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {college_name}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {college_location}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {acceptance_rate}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  as="a"
                  href="#"
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  {max_gpa}
                </Typography>
              </td>
              <td className={classes}>
                <Link to={`/college-profile/${college_id}`}>
                  <Button variant="outlined" className="h-6 flex items-center">
                    Explore
                  </Button>
                </Link>
              </td>
            </tr>
          );
        })}
        </tbody>
      </table>
    </Card>
  );
};

export default CollegeSearchResults;