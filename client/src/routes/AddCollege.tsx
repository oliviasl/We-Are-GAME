import CollegeFormPage from "../layouts/CollegeFormPage";

import {useNavigate} from "react-router-dom"

const AddCollege = () => {
  const navigate = useNavigate();

  async function onSubmit(data: any) {
    await fetch("/api/createCollege", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({collegeData: data}),
    })
    navigate("/")
  }

  return <CollegeFormPage onSubmit={onSubmit}/>
}

export default AddCollege;