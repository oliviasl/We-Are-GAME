import CollegeFormPage from "../layouts/CollegeFormPage";

import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import NotFoundPage from "./NotFoundPage";

const EditCollege = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState<any>(undefined);

  useEffect(() => {
    async function fetchCollegeData() {
      const data = await fetch("/api/collegeById/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ collegeId: id }),
      }).then(v => v.json())
      if (data && data[0]) {
        setInitialData(data[0])
      }
    }

    if (id && !initialData) fetchCollegeData();
  }, [id, setInitialData]);

  async function onSubmit(data: any) {
    await fetch("/api/editCollege", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ collegeId: id, newFields: data }),
    })
    navigate("/")
  }

  const [cookies] = useCookies(['user_status']);

  return (
    <div>
      {initialData != null && parseInt(cookies.user_status, 10) == 3 ? (
        <CollegeFormPage data={initialData} onSubmit={onSubmit} />
      ) : (
        <NotFoundPage />
      )}
    </div>
  )
}

export default EditCollege;