import {Navbar} from "../layouts/Navbar";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {College} from "../util/types/college";

const CollegeProfile = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState<Partial<College> | undefined>(undefined);

  useEffect(() => {
    async function fetchCollegeData() {
      const data = await fetch(`/api/collegeById/${id}`).then(v => v.json())
      if (data && data[0]) {
        setInitialData(data[0])
      }
    }

    if (id && !initialData) fetchCollegeData();
  }, [id, setInitialData]);

  if (!initialData) return null;

  return <div className="h-screen w-screen flex flex-col items-center">
    <Navbar/>
    <div>
      <h1>{initialData!.college_name}</h1>
    </div>
  </div>
}

export default CollegeProfile;