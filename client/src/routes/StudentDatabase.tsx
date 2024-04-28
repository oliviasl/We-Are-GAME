import React, { useState, useEffect, useCallback } from "react";
import { Input, Button, Card, Typography } from "@material-tailwind/react";
import StudentDirectoryRow from "../components/StudentDirectoryRow";

const StudentDatabase = () => {
    //Table Data
    const [students, setStudents] = useState<any[]>([]);

    //Pagination States
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    //Search & Filter States
    const [displayName, setDisplayName] = useState("");
    const [filterName, setFilterName] = useState("");

    const [displayMajor, setDisplayMajor] = useState("");
    const [filterMajor, setFilterMajor] = useState("");

    const [displaySport, setDisplaySport] = useState("");
    const [filterSport, setFilterSport] = useState("");

    const fetchApprovedUsers = useCallback(async () => {
        const pageBody = JSON.stringify({
            pageNumber: page,
            fields: {
                userByName: filterName,
                userBySport: filterSport,
                userByMajor: filterMajor,
            },
        });
        const response = await fetch("/api/paginatedUsersFiltered", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: pageBody,
        });
        const data = await response.json();

        const { studentData, totalPages } = data;

        if (data) {
            setStudents(studentData);
            setTotalPages(totalPages);
        }
    }, [page, filterName, filterSport, filterMajor]);

    useEffect(() => {
        fetchApprovedUsers();
    }, [page, fetchApprovedUsers]);

    return (
        <div className="h-screen w-screen flex flex-col">
            <div className="flex mx-0 mt-16 w-screen">
                <div className="flex-grow ml-[100px]">
                    <div className="pb-16 pt-[19px] pr-5 flex items-center justify-between">
                        <div className="font-bold text-5xl">
                            Student Directory
                        </div>
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
                                            Name
                                        </Typography>
                                    </th>
                                    <th className="border-b border-black p-4 border-t">
                                        <Typography
                                            variant="small"
                                            color="black"
                                            className="font-semibold leading-none opacity-70"
                                        >
                                            Sport
                                        </Typography>{" "}
                                    </th>
                                    <th className="border-b border-black p-4 border-t">
                                        <Typography
                                            variant="small"
                                            color="black"
                                            className="font-semibold leading-none opacity-70"
                                        >
                                            Major
                                        </Typography>{" "}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student) => {
                                    return (
                                        <StudentDirectoryRow
                                            name={
                                                student?.user_firstname +
                                                " " +
                                                student?.user_lastname
                                            }
                                            major={[
                                                student?.user_potential_major,
                                                student?.user_alt_major1,
                                                student?.user_alt_major2,
                                            ]}
                                            sport={[
                                                student?.user_sport1,
                                                student?.user_sport2,
                                            ]}
                                            id={student?.user_id}
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
                                disabled={
                                    page === totalPages || totalPages === 0
                                }
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

export default StudentDatabase;
