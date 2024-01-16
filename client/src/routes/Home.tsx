import React, { useEffect, useState } from "react"

const Home = () => {
    const [collegeTable, setCollegeTable] = useState([] as any[]);

    useEffect(() => {
        fetch(`/api/allColleges`)
            .then(response => response.json())
            .then(data => {console.log(data); setCollegeTable(data)})
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="h-screen flex items-center justify-center">
            <table>
                <tr className="text-3xl">
                    <th>Name</th>
                    <th>Location</th>
                    <th>Website</th>
                </tr>
                {collegeTable.map((data) => (
                    <tr>
                        <td className="w-48 text-center text-2xl p-4">{data.college_name}</td>
                        <td className="w-48 text-center text-2xl p-4">{data.location_city}, {data.location_state}</td>
                        <td className="w-48 text-center text-2xl p-4">{data.general_web_addr}</td>
                    </tr>
                ))
                }
            </table>
        </div>
    );
};

export default Home;