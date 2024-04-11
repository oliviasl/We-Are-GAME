import {useCookies} from "react-cookie";
import {BookUser, School, SquareUser, Users} from "lucide-react";
import HomePageLinks from "../layouts/HomePageLinks";
import 'react-toastify/dist/ReactToastify.css';
import LoginSignup from "./LoginSignup";


const HomePage = () => {
  // user cookies
  const [cookies] = useCookies([
    "user_id",
    "user_status",
    "user_name",
  ]);

  const studentRouteInfo = [
    {
      name: "Explore Colleges",
      url: "/college-database",
      Icon: School,
    },
    {
      name: "Find a Mentor",
      url: "/mentor-database",
      Icon: Users,
    },
    {
      name: "Student Directory",
      url: "/student-database",
      Icon: BookUser,
    },
    {
      name: "View Profile",
      url: `/student-profile/${cookies.user_id}`,
      Icon: SquareUser,
    },
  ];

  const adminRouteInfo = [
    {
      name: "College Database",
      url: "/college-database",
      Icon: School,
    },
    {
      name: "Mentor Database",
      url: "/mentor-database",
      Icon: Users,
    },
    {
      name: "Student Database",
      url: "/student-database",
      Icon: BookUser,
    },
    {
      name: "Authenticate Users",
      url: "/authenticate",
      Icon: SquareUser,
    },
  ];

  const mentorRouteInfo = [
    {
      name: "College Database",
      url: "/college-database",
      Icon: School
    },
    {
      name: "Mentor Database",
      url: "/mentor-database",
      Icon: Users
    },
    {
      name: "Student Database",
      url: "/student-database",
      Icon: BookUser
    },
    {
      name: "Authenticate Users",
      url: "/authenticate",
      Icon: SquareUser
    },
  ];

  return (
    <div>
      {cookies.user_id !== null && cookies.user_id > 0 ? (
        <div className="w-screen flex flex-col items-center">
          <h1 className="w-full p-14 pl-24 text-left text-4xl text-brand-black font-bold font-grotesk">
            Welcome, {cookies.user_name}!
          </h1>
          {cookies.user_status === 1 && <HomePageLinks RouteInfo={studentRouteInfo}/>}
          {cookies.user_status === 2 && <HomePageLinks RouteInfo={mentorRouteInfo}/>}
          {cookies.user_status === 3 && <HomePageLinks RouteInfo={adminRouteInfo}/>}
        </div>
      ) : (
        <LoginSignup/>
      )}
    </div>
  );
};

export default HomePage;
