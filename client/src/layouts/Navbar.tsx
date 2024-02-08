import { useState } from "react";

const Logo = () => (
  <div className="rounded-full w-20 h-20 bg-gray-200">
    {/* <img src='#' alt='Logo' /> */}
  </div>
);

export function Navbar() {
  // TODO: check cookies to set userState

  // set user status
  const [userState, setUserState] = useState(3);

  return (
    // added padding for testing purposes: should be removed once Nav is integrated into other components
    <div className="z-[20] mx-auto mt-20 mb-4 px-20 flex w-full items-center justify-between bg-grey-600 text-brand-black font-bold font-grotesk">
      <div className="flex items-center gap-5">
          <a href='/#'>
            <Logo />
          </a>
          <div className="text-xl"><a href='/#'>We Are G.A.M.E.</a></div>
      </div>
      
      <div className="flex items-center gap-12">
        <div className="hover:text-brand-green-45 text-sm"><a href='/#'>College Directory</a></div>
        <div className="hover:text-brand-green-45 text-sm"><a href='/#'>Mentor Directory</a></div>
        <div className="hover:text-brand-green-45 text-sm"><a href='/#'>Student Directory</a></div>

        {userState === 3 ? (
          <div className="hover:text-brand-green-45 text-sm"><a href='/authenticate'>Authenticate Users</a></div>
        ) : (
          <div className="hover:text-brand-green-45 text-sm"><a href='/#'>Student Profile</a></div>
        )}
      </div>
    </div>
  );
}