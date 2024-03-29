import React, { useState, useEffect, useCallback } from 'react';
import MentorDirectoryRow from '../components/MentorDirectoryRow';

const MentorDatabase = () => {

    // table data
    const [mentors, setMentors] = useState<any[]>([]);

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
        const response = await fetch("/api/paginatedMentorsFiltered", {
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
        <div>
            {/* View Wrapper */}
            <div className="flex mx-20 mt-16 gap-2">
                {/* Table Wrapper */}
                <div className="w-3/4">
                    <div className='flex items-center justify-between'>
                        <div className="font-bold text-5xl font-grotesk">
                            Find a Mentor
                        </div>
                        <div className="w-30 h-9 cursor-pointer bg-brand-gray-20 text-white font-medium px-8 py-[5px] rounded">
                            Add Profile
                        </div>
                    </div>
                    <table className="mt-16 w-full px-20 table-fixed font-circular-std">
                        <thead>
                            <tr className="border-y border-black">
                                <th className="text-left py-2 pl-16 font-semibold">
                                    Mentor Name
                                </th>
                                <th className="text-left py-2 px-8 font-semibold">
                                    Sport
                                </th>
                                <th className="text-left py-2 pr-16 font-semibold">
                                    Major
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
                                        major={mentor?.mentor_major1}
                                        sport={mentor?.mentor_sport1}
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
                </div>

                {/* Search Component */}
                <div className="w-1/4 pl-2">
                    <div className="font-bold text-2xl font-grotesk">
                        Search & Filter
                    </div>
                    <div className="flex pt-5 items-center">
                        <div className="w-1/3  text-left font-normal">Name</div>
                        <input
                            value={displayName}
                            onChange={(e) => {
                                setDisplayName(e.target.value);
                            }}
                            className="border-2 border-black rounded w-2/3 h-9"
                            type="text"
                        />
                    </div>
                    <div className="flex pt-5 items-center">
                        <div className="w-1/3  text-left font-normal">
                            Major
                        </div>
                        <input
                            value={displayMajor}
                            onChange={(e) => {
                                setDisplayMajor(e.target.value);
                            }}
                            className="border-2 border-black rounded w-2/3 h-9"
                            type="text"
                        />
                    </div>
                    <div className="flex pt-5 pb-3 items-center">
                        <div className="w-1/3  text-left font-normal">
                            Sport
                        </div>
                        <input
                            value={displaySport}
                            onChange={(e) => {
                                setDisplaySport(e.target.value);
                            }}
                            className="border-2 border-black rounded w-2/3 h-9"
                            type="text"
                        />
                    </div>
                    <div className="flex items-center justify-center mt-3 gap-4">
                        <div
                            onClick={() => {
                                setFilterName(displayName);
                                setFilterSport(displaySport);
                                setFilterMajor(displayMajor);
                                setPage(1);
                            }}
                            className="cursor-pointer bg-brand-gray-20 border-2 border-brand-gray-20 text-white font-medium px-8 py-[5px] mx-3 rounded"
                        >
                            Search
                        </div>
                        <div
                            onClick={() => {
                                setDisplayName("");
                                setDisplaySport("");
                                setDisplayMajor("");
                                setFilterName("");
                                setFilterSport("");
                                setFilterMajor("");
                                setPage(1);
                            }}
                            className="cursor-pointer bg-brand-gray-90 border-2 border-brand-gray-20 font-medium px-8 py-[5px] rounded"
                        >
                            Clear
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MentorDatabase