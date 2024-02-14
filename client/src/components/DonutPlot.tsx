import {Doughnut} from "react-chartjs-2";

export function DonutPlot({data}: { data: [number, string, string][] }) {
  return <Doughnut
    options={{
      layout: {
        autoPadding: false
      },
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            boxWidth: 20,
          }
        }
      }
    }}
    data={{
      labels: data.map(([_, title, __]) => title + " %"),
      datasets: [
        {
          data: data.map(([data, _, __]) => data),
          backgroundColor: data.map(([_, __, color]) => color),
          borderColor: "black",
          borderWidth: 1,
        },
      ],
    }}/>
}