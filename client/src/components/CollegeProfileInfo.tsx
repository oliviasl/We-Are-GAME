import {College} from "../util/types/college";
import {Button} from "@material-tailwind/react";
import {BoxPlot} from "./BoxPlot";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from 'chart.js';
import {DonutPlot} from "./DonutPlot";
import ensureValidLink from "../util/ensureValidLink";

ChartJS.register(ArcElement, Tooltip, Legend);

export function CollegeProfileInfo({data}: { data: Partial<College> }) {
  const quickFacts = [
    [data!.acceptance_rate, "Acceptance Rate"],
    [data!.grad_rate_athletes, "Athlete Graduation Rate"],
    [data!.first_year_grad_rate, "First-Year Graduation Rate"],
    [data!.first_year_retention_rate, "First-Year Retention Rate"],
    [data!.first_year_transfer_rate, "First-Year Transfer Rate"]
  ].filter(([data]) => !!data) as [number, string][]

  const programInfo = [
    [ensureValidLink(data!.majors_web_addr!), "Undergraduate Programs Website"],
    [ensureValidLink(data!.athletics_web_addr!), "Athletic Programs Website"],
    [ensureValidLink(data!.questionaire_web_addr!), "Prospective Student Athlete FAQ Website"],
  ].filter(([data]) => !!data) as [string, string][]

  const enrollmentByRace = [
    [data!.race_white, "White", "hsla(196, 49%, 60%, 1)"],
    [data!.race_black, "Black", "hsla(126, 54%, 32%, 1)"],
    [data!.race_hispanic, "Hispanic", "hsla(41, 80%, 64%, 1)"],
    [data!.race_asian, "Asian", "hsla(245, 58%, 72%, 1)"],
    [data!.race_pacific_islander, "Pacific Islander", "hsla(313, 42%, 59%, 1)"],
    [data!.race_native_american, "Native American", "hsla(86, 35%, 53%, 1)"],
    [data!.race_two_or_more, "Two or More", "hsla(41, 80%, 64%, 1)"],
    [data!.race_other, "Two or More", "hsla(238, 46%, 51%, 1)"],
  ].filter(([data]) => !!data) as [number, string, string][]

  const enrollmentByGender = [
    [data!.gender_male, "Female", "hsla(196, 49%, 60%, 1)"],
    [data!.gender_female, "Male", "hsla(41, 80%, 64%, 1)"],
  ].filter(([data]) => !!data) as [number, string, string][]

  return (
    <div className={"space-y-12"}>
      <div className={"space-y-4 w-full"}>
        <h2 className={"text-2xl font-bold"}>Quick Facts</h2>
        <div className={"flex flex-wrap justify-center"}>
          {
            quickFacts.map(([data, title]) => (
              <div className={"flex flex-col justify-center items-center py-4 space-y-2"}
                   style={{width: `${quickFacts.length % 3 === 1 ? 50 : (100 / 3)}%`}}>
                <p className={"text-6xl font-semibold"}>{data}%</p>
                <p className={"font-medium"}>{title}</p>
              </div>
            ))
          }
        </div>
      </div>
      <div className={"space-y-4 w-full"}>
        <h2 className={"text-2xl font-bold"}>Academic and Athletic Program Information</h2>
        <div className={"flex justify-center gap-x-4"}>
          {
            programInfo.map(([data, title]) => (
              <a href={data} className={"w-full"}><Button className={"w-full h-full !py-8"}>{title}</Button></a>
            ))
          }
        </div>
      </div>
      <div className={"space-y-6 w-full"}>
        <h2 className={"text-2xl font-bold"}>Admitted Score Distribution</h2>
        <div className={"flex justify-center gap-x-4"}>
          <div className={"grid grid-cols-[1fr_3fr] w-full gap-4"}>
            <div>
              <p>GPA</p>
            </div>
            <div>
              <BoxPlot min={data!.min_gpa || 0}
                       max={data!.max_gpa || 4}
                       leftBound={0}
                       rightBound={4}
                       color={"hsla(313, 42%, 59%, 1)"}/>
            </div>
          </div>
        </div>
        <h3 className={"text-xl font-bold"}>SAT Scores</h3>
        <div className={"flex justify-center gap-x-4"}>
          <div className={"grid grid-cols-[1fr_3fr] w-full gap-4"}>
            <div>
              <p>Evidence-Based Reading and Writing</p>
            </div>
            <div>
              <BoxPlot min={data!.min_sat_read_write || 200}
                       max={data!.max_sat_read_write || 800}
                       leftBound={200}
                       rightBound={800}
                       color={"hsla(196, 49%, 60%, 1)"}/>
            </div>
          </div>
        </div>
        <div className={"flex justify-center gap-x-4"}>
          <div className={"grid grid-cols-[1fr_3fr] w-full gap-4"}>
            <div>
              <p>Math</p>
            </div>
            <div>
              <BoxPlot min={data!.min_sat_math || 200}
                       max={data!.max_sat_math || 800}
                       leftBound={200}
                       rightBound={800}
                       color={"hsla(41, 80%, 64%, 1)"}/>
            </div>
          </div>
        </div>
        <h3 className={"text-xl font-bold"}>ACT Scores</h3>
        <div className={"flex justify-center gap-x-4"}>
          <div className={"grid grid-cols-[1fr_3fr] w-full gap-4"}>
            <div>
              <p>English</p>
            </div>
            <div>
              <BoxPlot min={data!.min_act_english || 0}
                       max={data!.max_act_english || 36}
                       leftBound={0}
                       rightBound={36}
                       color={"hsla(196, 49%, 60%, 1)"}/>
            </div>
          </div>
        </div>
        <div className={"flex justify-center gap-x-4"}>
          <div className={"grid grid-cols-[1fr_3fr] w-full gap-4"}>
            <div>
              <p>Math</p>
            </div>
            <div>
              <BoxPlot min={data!.min_act_math || 0}
                       max={data!.max_act_math || 36}
                       leftBound={0}
                       rightBound={36}
                       color={"hsla(41, 80%, 64%, 1)"}/>
            </div>
          </div>
        </div>
        <div className={"flex justify-center gap-x-4"}>
          <div className={"grid grid-cols-[1fr_3fr] w-full gap-4"}>
            <div>
              <p>Reading</p>
            </div>
            <div>
              <BoxPlot min={data!.min_act_reading || 0}
                       max={data!.max_act_reading || 36}
                       leftBound={0}
                       rightBound={36}
                       color={"hsla(196, 49%, 60%, 1)"}/>
            </div>
          </div>
        </div>
        <div className={"flex justify-center gap-x-4"}>
          <div className={"grid grid-cols-[1fr_3fr] w-full gap-4"}>
            <div>
              <p>Science</p>
            </div>
            <div>
              <BoxPlot min={data!.min_act_science || 0}
                       max={data!.max_act_science || 36}
                       leftBound={0}
                       rightBound={36}
                       color={"hsla(86, 35%, 53%, 1)"}/>
            </div>
          </div>
        </div>
      </div>
      <div className={"space-y-4 w-full"}>
        <h2 className={"text-2xl font-bold"}>Demographic Information</h2>
        <div className={"flex space-x-8"}>
          <div className={"w-full space-y-4"}>
            <p className={"text-xl font-medium"}>Enrollment by Race</p>
            <div><DonutPlot data={enrollmentByRace}/></div>
          </div>
          <div className={"w-full space-y-4"}>
            <p className={"text-xl font-medium"}>Enrollment by Gender</p>
            <div><DonutPlot data={enrollmentByGender}/></div>
          </div>
        </div>
      </div>
      {data!.extra_notes && <div className={"space-y-4 w-full"}>
        <h2 className={"text-2xl font-bold"}>Additional Notes</h2>
        <div className={"flex space-x-8"}>
          <p>{data!.extra_notes}</p>
        </div>
      </div>}
    </div>
  )
}