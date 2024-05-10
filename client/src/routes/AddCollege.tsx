import CollegeFormPage from "../layouts/CollegeFormPage";

import {useNavigate} from "react-router-dom"
import {useCookies} from "react-cookie";
import NotFoundPage from "./NotFoundPage";

const AddCollege = () => {
  const navigate = useNavigate();

  async function onSubmit(data: any) {
    await fetch("https://we-are-game-backend.onrender.com/api/createCollege", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({collegeData: data}),
    })
    navigate("/")
  }

  const [cookies] = useCookies(['user_status']);

  if (parseInt(cookies.user_status, 10) < 3) {
    return <NotFoundPage/>
  }

  return <CollegeFormPage onSubmit={onSubmit}/>
}

export default AddCollege;