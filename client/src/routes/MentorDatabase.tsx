import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import MentorDirectoryRow from "../components/MentorDirectoryRow";
import {Typography, Card, Button, Input} from "@material-tailwind/react";

const MentorDatabase = () => {
  // table data
  const [mentors, setMentors] = useState<any[]>([]);
  const [cookies] = useCookies(["user_status"]);

  // pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // search and filter
  const [displayName, setDisplayName] = useState("");
  const [filterName, setFilterName] = useState("");

  const [displayMajor, setDisplayMajor] = useState("");
  const [filterMajor, setFilterMajor] = useState("");

  const [displaySport, setDisplaySport] = useState("");
  const [filterSport, setFilterSport] = useState("");

  const navigate = useNavigate();

  // paginated mentor query
  const fetchApprovedMentors = useCallback(async () => {
    const pageBody = JSON.stringify({
      pageNumber: page,
      fields: {
        mentorByName: filterName,
        mentorBySport: filterSport,
        mentorByMajor: filterMajor,
      },
    });
    const response = await fetch("https://we-are-game-backend.onrender.com/api/paginatedMentorsFiltered", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: pageBody,
    });
    const data = await response.json();

    const { mentorData, totalPages } = data;

    if (data) {
      setMentors(mentorData);
      setTotalPages(totalPages);
    }
  }, [page, filterName, filterSport, filterMajor]);

  useEffect(() => {
    fetchApprovedMentors();
  }, [page, fetchApprovedMentors]);

  return (
    <div className="h-screen w-screen flex flex-col">
        <div className="flex mx-0 mt-16 w-screen">
            <div className="flex-grow ml-[100px]"> 
              <div className="pb-16 pt-[19px] pr-5 flex items-center justify-between">
                <div className="font-bold text-5xl">
                    Find a Mentor
                </div>
                { cookies.user_status > 1 &&
                <Button
                    color="gray"
                    className="border-2 border-brand-gray-20 hover:bg-semantic-success"
                    onClick={() => navigate("/add-mentor")}
                >
                    Add Mentor
                </Button>
                }
              </div>
              <Card shadow={false} className="h-full w-full pr-5">
                <table className="table-auto text-left rounded-none">
                  <thead>
                    <tr className="h-12">
                    <th className="border-b border-black p-4 border-t">
                        <Typography
                        variant="small"
                        color="black"
                        className="font-semibold leading-none opacity-70"
                        >
                          Mentor Name              
                        </Typography>
                      </th>
                      <th className="border-b border-black p-4 border-t">
                        <Typography
                          variant="small"
                          color="black"
                          className="font-semibold leading-none opacity-70"
                          >
                            Sport              
                        </Typography>                
                      </th>
                      <th className="border-b border-black p-4 border-t">
                        <Typography
                          variant="small"
                          color="black"
                          className="font-semibold leading-none opacity-70"
                          >
                            Major              
                        </Typography>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mentors.map((mentor) => {
                      return (
                        <MentorDirectoryRow
                          name={
                            mentor?.mentor_firstname +
                            " " +
                            mentor?.mentor_lastname
                          }
                          major={[mentor?.mentor_major1, mentor?.mentor_major2, mentor?.mentor_major3]}
                          sport={[mentor?.mentor_sport1, mentor?.mentor_sport2]}
                          id={mentor?.mentor_id}
                        />
                      );
                    })}
                  </tbody>
                </table>
                <div className="flex justify-start items-center gap-2 mt-16">
                  <button
                      disabled={page === 1 || totalPages === 0}
                      className="relative h-8 max-h-[24px] w-8 max-w-[24px] select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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
                  <span className="text-[#577347] text-[12px] font-circular-std">
                      Page {page} of {totalPages}
                  </span>
                  <button
                      disabled={page === totalPages || totalPages === 0}
                      className="relative h-8 max-h-[24px] w-8 max-w-[24px] select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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
            </div>
            <div className="mr-[100px] pl-[5vw]">
              <div className="text-2xl font-bold">Search & Filter</div>
              <div className="flex items-center place-content-between my-2">
                  <div>Name</div>
                  <div className="w-40">
                      <Input
                          size="lg"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          crossOrigin={undefined}
                      />
                  </div>
              </div>
              <div className="flex items-center place-content-between my-2">
                  <div>Sport</div>
                  <div className="w-40">
                      <Input
                          size="lg"
                          value={displaySport}
                          onChange={(e) =>
                              setDisplaySport(e.target.value)
                          }
                          crossOrigin={undefined}
                      />
                  </div>
              </div>
              <div className="flex items-center place-content-between my-2">
                  <div>Major</div>
                  <div className="w-40">
                      <Input
                          size="lg"
                          value={displayMajor}
                          onChange={(e) =>
                              setDisplayMajor(e.target.value)
                          }
                          crossOrigin={undefined}
                      />
                  </div>
              </div>
              <div className="flex gap-4 w-full">
                  <Button
                      className="w-full"
                      onClick={() => {
                          setFilterName(displayName);
                          setFilterSport(displaySport);
                          setFilterMajor(displayMajor);
                          setPage(1);
                      }}
                  >
                      Search
                  </Button>
                  <Button
                      variant="outlined"
                      className="w-full"
                      onClick={() => {
                          setDisplayName("");
                          setDisplayMajor("");
                          setDisplaySport("");
                      }}
                  >
                      Clear
                  </Button>
              </div>
          </div>
        </div>
    </div>
);
};

export default MentorDatabase;
