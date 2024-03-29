import {Button} from "@material-tailwind/react";
import {Link} from "react-router-dom";

const NotFoundPage = () => {
  return <div className={"w-full px-24 py-36 space-y-8"}>
    <h1 className={"text-6xl text-brand-black font-bold font-grotesk"}>404 Error</h1>
    <p className={"text-xl text-brand-black font-bold font-grotesk"}>Sorry, the page you are looking for does not
      exist.</p>
    <div><Link to={"/"}><Button>Back to Home</Button></Link></div>
  </div>;
};

export default NotFoundPage