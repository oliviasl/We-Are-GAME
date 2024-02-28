import {Button} from "@material-tailwind/react";
import {College} from "../util/types/college";
import {formatDate} from "../util/formatDate";

export function CollegeProfileSidebar({data}: { data: Partial<College> }) {
  return (
    <div className={"space-y-12"}>
      <div className={"space-y-4 w-full"}>
        <h2 className={"text-2xl font-bold"}>Important Links</h2>
        <div className={"space-y-2 w-full"}>
          {data!.general_web_addr &&
            <a href={data!.general_web_addr} className={"block w-full"}>
              <Button className={"w-full"}>University Website</Button>
            </a>
          }
          {data!.general_web_addr &&
            <a href={data!.admissions_web_addr} className={"block w-full"}>
              <Button className={"w-full"}>Admissions Website</Button>
            </a>
          }
          {data!.general_web_addr &&
            <a href={data!.app_web_addr} className={"block w-full"}>
              <Button className={"w-full"}>Application</Button>
            </a>
          }
          {data!.general_web_addr &&
            <a href={data!.fin_aid_web_addr} className={"block w-full"}>
              <Button className={"w-full"}>Financial Aid & Scholarships</Button>
            </a>
          }
          {data!.general_web_addr &&
            <a href={data!.net_price_calc_web_addr} className={"block w-full"}>
              <Button className={"w-full"}>Net Price Calculator</Button>
            </a>
          }
        </div>
      </div>
      <div className={"space-y-4 w-full"}>
        <h2 className={"text-2xl font-bold"}>Deadlines</h2>
        <div className={"space-y-4 w-full"}>
          <div className={"space-y-1"}>
            <h3 className={"text-lg font-bold"}>Regular Application</h3>
            <div className={"space-y-0"}>
              <>
                {data!.app_regular_deadline &&
                  <p>
                    <>Application: {formatDate(data.app_regular_deadline)}</>
                  </p>}
                {data!.app_essay_deadline &&
                  <p>
                    <>Essays: {formatDate(data.app_essay_deadline)}</>
                  </p>}
                {data!.app_letters_of_rec_deadline &&
                  <p>
                    <>Letters of
                      Recommendation: {formatDate(data.app_letters_of_rec_deadline)}</>
                  </p>}
              </>
            </div>
          </div>
          <div className={"space-y-1"}>
            <h3 className={"text-lg font-bold"}>Preferential Application</h3>
            <div className={"space-y-0"}>
              <>
                {data!.app_preferential_deadline &&
                  <p>
                    <>Application: {formatDate(data.app_preferential_deadline)}</>
                  </p>}
              </>
            </div>
          </div>
          <div className={"space-y-1"}>
            <h3 className={"text-lg font-bold"}>Financial Aid Application</h3>
            <div className={"space-y-0"}>
              <>
                {data!.app_fin_aid_deadline &&
                  <p>
                    <>Application: {formatDate(data.app_fin_aid_deadline)}</>
                  </p>}
              </>
            </div>
          </div>
        </div>
      </div>
      <div className={"space-y-4 w-full"}>
        <h2 className={"text-2xl font-bold"}>Other Resources</h2>
        <div className={"space-y-2 w-full"}>
          {data!.academic_resources_web_addr &&
            <a href={data!.academic_resources_web_addr} className={"block w-full"}>
              <Button className={"w-full"}>Student Academic Resources</Button>
            </a>
          }
          {data!.diversity_resources_web_addr &&
            <a href={data!.diversity_resources_web_addr} className={"block w-full"}>
              <Button className={"w-full"}>Student Diversity Resources</Button>
            </a>
          }
          {data!.stu_ath_academic_res_web_addr &&
            <a href={data!.stu_ath_academic_res_web_addr} className={"block w-full"}>
              <Button className={"w-full"}>Student Athlete Academic Resources</Button>
            </a>
          }
          {data!.student_orgs_web_addr &&
            <a href={data!.student_orgs_web_addr} className={"block w-full"}>
              <Button className={"w-full"}>Organizations</Button>
            </a>
          }
          {data!.study_abroad_web_addr &&
            <a href={data!.study_abroad_web_addr} className={"block w-full"}>
              <Button className={"w-full"}>Study Abroad</Button>
            </a>
          }
        </div>
      </div>
    </div>
  )
}