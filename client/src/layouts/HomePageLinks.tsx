import React, { ElementType } from "react";

type RouteTile = {
  url: string,
  name: string,
  Icon: ElementType
}

type RouteInfoProps = {
  RouteInfo: RouteTile[]
}

const HomePage = ({ RouteInfo }: RouteInfoProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-3/5 gap-4 content-center place-items-center">
      {RouteInfo.map((routeTile, idx) => (
        <a key={idx} href={routeTile.url} className="flex flex-row items-center rounded gap-4 w-full min-w-[300px] h-full content-center p-16 bg-brand-gray-20 hover:bg-brand-green-45 duration-150">
          <routeTile.Icon className="w-10 h-10 min-w-[40px] min-h-[40px] text-white" />
          <h1 className="text-white text-2xl font-bold font-grotesk pt-1">{routeTile.name}</h1>
        </a>
      ))}
    </div>
  )
};

export default HomePage;