import {Navbar} from "../layouts/Navbar";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {College} from "../util/types/college";
import {Button, Chip} from "@material-tailwind/react";
import {MapPinIcon} from "lucide-react";
import {CollegeProfileSidebar} from "../components/CollegeProfileSidebar";
import {CollegeProfileInfo} from "../components/CollegeProfileInfo";

const CollegeProfile = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<Partial<College> | undefined>(undefined);

  useEffect(() => {
    async function fetchCollegeData() {
      const _data = await fetch(`/api/collegeById/${id}`).then(v => v.json())
      if (_data && _data[0]) {
        setData(_data[0])
      }
    }

    if (id && !data) fetchCollegeData();
  }, [id, setData]);

  if (!data) return null;

  return <div className="h-screen w-screen flex flex-col items-center">
    <Navbar/>
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
          <Button className={"bg-semantic-warning text-white"}>Edit College</Button>
          <Button>Assign Student</Button>
        </div>
      </header>
      <div className={"grid grid-cols-[3fr_7fr] gap-8"}>
        <CollegeProfileSidebar data={data!}/>
        <CollegeProfileInfo data={data!}/>
      </div>
    </main>
  </div>
}

export default CollegeProfile;