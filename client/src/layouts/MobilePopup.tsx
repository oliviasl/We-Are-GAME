import {Dialog} from "@material-tailwind/react";
import useIsMobile from "../util/useIsMobile";

export default function MobilePopup() {
  const isMobile = useIsMobile();

  return <Dialog open={isMobile} handler={() => void 0} size={"xs"} className={"!max-w-sm !w-full !min-w-0"}>
    <div className={"p-4 font-grotesk text-black space-y-2 text-center"}>
      <p className={"text-2xl font-bold"}>This website is optimized for desktop.</p>
      <p className={"text-lg "}>
        Please access our website on a desktop or bigger screen. Thank you!
      </p>
    </div>
  </Dialog>
}