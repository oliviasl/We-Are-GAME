export const BoxPlot = ({min, max, leftBound, rightBound, color}: {
  min: number,
  max: number,
  leftBound: number,
  rightBound: number,
  color: string
}) => {
  const width = 100 / (rightBound / (max - min));
  const leftMargin = 100 / (rightBound / min);

  return (
    <div className={"h-16 pb-4"}>
      <div className={"h-full w-full border-l-[2px] border-r-[2px] border-black relative"}>
        <div className={"w-full border-t-[2px] border-black bottom-1/2 absolute -z-[1]"}/>
        <div className={"h-full w-12 rounded-lg border-[2px] border-black"} style={{
          width: `${width}%`,
          marginLeft: `${leftMargin}%`,
          backgroundColor: color
        }}/>
      </div>
      <div className={"w-full relative"}>
        <p className={"-translate-x-1/2 inline-block absolute"}>{leftBound}</p>
        <p className={"-translate-x-1/2 inline-block absolute"} style={{
          marginLeft: `${leftMargin}%`
        }}>{min}</p>
        <p className={"-translate-x-1/2 inline-block absolute"} style={{
          marginLeft: `${leftMargin + width}%`
        }}>{max}</p>
        <p className={"ml-[100%] -translate-x-1/2 inline-block absolute"}>{rightBound}</p>
      </div>
    </div>
  )
}