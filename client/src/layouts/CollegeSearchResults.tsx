import React, {useEffect, useState} from "react";
import { Card, Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";

interface CollegeData {
    college_name: string;
    // other fields...
}

async function fetchColleges(fields: any, pageNumber: number): Promise<any> {
    try {
        const response = await fetch('/api/paginatedCollegesFiltered', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({fields: fields, pageNumber: pageNumber}), // Convert the JavaScript object to a JSON string
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
    const [TABLE_ROWS, setTableRows] =useState<any[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fields = { "collegeByGPA": 3};
                const data = await fetchColleges(fields, page);
                console.log("Data: ", data);

                const {totalPages, colleges} = data;
                console.log("colleges: ", colleges);
                setTableRows(colleges);
                setTotalPages(totalPages);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [page]);

    console.log(TABLE_ROWS)

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
              {TABLE_ROWS.map(({ college_name, college_location, acceptance_rate, max_gpa }, index) => {
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
                        <Button variant="outlined" className="h-6 flex items-center">
                            Explore
                        </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
            <div className="flex justify-center items-center gap-2 mt-16">
                <button
                    disabled={page === 1}
                    className="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    onClick={() => {
                        setPage((p) => {
                            return p - 1;
                        });
                    }}
                >
                    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            aria-hidden="true"
                            className="w-4 h-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                            ></path>
                        </svg>
                    </span>
                </button>
                <span>
                    Page {page} of {totalPages}
                </span>
                <button
                    disabled={page === totalPages}
                    className="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={() => {
                        setPage((p) => {
                            return p + 1;
                        });
                    }}
                >
                    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            aria-hidden="true"
                            className="w-4 h-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                            ></path>
                        </svg>
                    </span>
                </button>
            </div>
        </Card>
      );
};

export default CollegeSearchResults;