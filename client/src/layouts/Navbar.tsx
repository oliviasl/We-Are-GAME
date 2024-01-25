import { Typography } from "@material-tailwind/react";

const Logo = () => (
  <div className="rounded-full w-20 h-20 bg-gray-200">
    {/* <img src='#' alt='Logo' /> */}
  </div>
);

type NavbarProps = {
  isAdmin: boolean;
}

export function Navbar({ isAdmin }: NavbarProps) {
  console.log(isAdmin);
  return (
    // added padding for testing purposes: should be removed once Nav is integrated into other components, not exact green!
    <div className="z-[20] mx-auto mt-28 mb-4 px-24 flex w-full items-center justify-between bg-grey-600 text-brand-black font-bold font-grotesk">
      <div className="flex items-center gap-5">
          <a href='#'>
            <Logo />
          </a>
          <div className="text-2xl"><a href='#'>We Are G.A.M.E.</a></div>
      </div>
      
      <div className="flex items-center gap-12">
        <div className="hover:text-green-900"><a href='#'>College Directory</a></div>
        <div className="hover:text-green-900"><a href='#'>Mentor Directory</a></div>
        <div className="hover:text-green-900"><a href='#'>Student Directory</a></div>

        {isAdmin ? (
          <div className="hover:text-green-900"><a href='#'>Authenticate Users</a></div>
        ) : (
          <div className="hover:text-green-900"><a href='#'>Student Profile</a></div>
        )}
      </div>
    </div>
  );
}