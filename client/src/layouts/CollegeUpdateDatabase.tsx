import React from "react";
import {Button} from "@material-tailwind/react";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

const CollegeUpdateDatabase = () => {
  const navigate = useNavigate();

  const [cookies] = useCookies(["user_status"])

  return (
    <div className="pb-16 pt-[19px] pr-5 flex items-center justify-between">
      <div className="font-bold text-5xl">College Database</div>

      {cookies.user_status === 3 && <div className={"space-x-2"}>
        <Button color="gray" variant={"outlined"}>Update Database</Button>
        <Button color="gray" onClick={() => navigate("/add-college")}>Add College</Button>
      </div>}
    </div>
  );
};

export default CollegeUpdateDatabase;