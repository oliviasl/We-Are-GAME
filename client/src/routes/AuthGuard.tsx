import {useCookies} from "react-cookie";
import {Navigate, Outlet} from "react-router-dom";

const AuthGuard = () => {
  const [cookies] = useCookies(['user_id', 'user_status']);

  if (!cookies.user_id || !cookies.user_status) {
    return <Navigate to={"/"} replace/>;
  }

  return <Outlet/>;
};

export default AuthGuard