import {useLocation} from "react-router-dom";
import React, {useState} from "react";

export default function Background() {
  const {pathname} = useLocation();

  const basePath = pathname.split("/")[1];

  const [hasError, setHasError] = useState(false);
  const handleError = () => setHasError(true);
  if (hasError) return null;


  return <img className={"absolute bottom-0 w-full -z-10"} src={`/backgrounds/${basePath ?? "homepage"}.png`}
              alt={"Background"} onError={handleError}/>
}