import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";

const CollegeSearchResults = () => {
    const TABLE_HEAD = ["College Name", "Location", "Admit Rate", "Average GPA", ""];
    const TABLE_ROWS = [
        {
          name: "John Michael",
          job: "Manager",
          date: "23/04/18",
        },
        {
          name: "Alexa Liras",
          job: "Developer",
          date: "23/04/18",
        },
        {
          name: "Laurent Perrier",
          job: "Executive",
          date: "19/09/17",
        },
        {
          name: "Michael Levi",
          job: "Developer",
          date: "24/12/08",
        },
        {
          name: "Richard Gran",
          job: "Manager",
          date: "04/10/21",
        },
      ];
    return (
        <Card shadow={false} className="h-full w-full overflow-scroll">
          <table className="w-full min-w-max table-auto text-left rounded-none">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-black p-4"
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
              {TABLE_ROWS.map(({ name, job, date }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
     
                return (
                  <tr key={name}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {job}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {date}
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
                        Edit
                      </Typography>
                    </td>
                    <td>
                        <Button variant="outlined">
                            Explore
                        </Button>
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