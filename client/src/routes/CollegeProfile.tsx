import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {College} from "../util/types/college";
import {Button, Chip} from "@material-tailwind/react";
import {MapPinIcon} from "lucide-react";
import {CollegeProfileSidebar} from "../components/CollegeProfileSidebar";
import {CollegeProfileInfo} from "../components/CollegeProfileInfo";
import AssignStudentModal from "../layouts/AssignStudentModal";

const CollegeProfile = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const [isAssignStudentModalOpen, setIsAssignStudentModalOpen] = useState(false)

  const [data, setData] = useState<Partial<College> | undefined>(undefined);

  useEffect(() => {
    async function fetchCollegeData() {
      const _data = await fetch("/api/collegeById/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({collegeId: id}),
      }).then(v => v.json())
      if (_data && _data[0]) {
        setData(_data[0])
      }
    }

    if (id && !data) fetchCollegeData();
  }, [id, setData]);

  if (!data) return null;

  return <div className="h-screen w-screen flex flex-col items-center">
    <main className={"w-full px-20 pb-20"}>
      <header className={"flex space-x-8 w-full py-12"}>
        <div className={"flex-1 space-y-4"}>
          <h1 className={"text-5xl font-bold"}>{data!.college_name}</h1>
          <div className={"flex space-x-4"}>
            {data!.sport_conference &&
              <Chip value={data!.sport_conference} className={"normal-case bg-semantic-success"}/>}
            <div className={"flex space-x-2"}>
              <MapPinIcon className={"text-semantic-success"}/>
              <p>
                {data!.location_city && `${data!.location_city}`}{data!.location_city && data!.location_state && ", "}{data!.location_state && `${data!.location_state}`}
              </p>
            </div>
          </div>
        </div>
        <div className={"space-x-2"}>
          <Link to={`/edit-college/${data.college_id}`}>
            <Button className={"bg-semantic-warning text-white"}>Edit College</Button>
          </Link>
          <Button onClick={() => setIsAssignStudentModalOpen(true)}>Assign Student</Button>
        </div>
      </header>
      <div className={"grid grid-cols-[3fr_7fr] gap-8"}>
        <CollegeProfileSidebar data={data!}/>
        <CollegeProfileInfo data={data!}/>
      </div>
    </main>
    <AssignStudentModal isOpen={isAssignStudentModalOpen} onClose={() => setIsAssignStudentModalOpen(false)}/>
  </div>
}

export default CollegeProfile;