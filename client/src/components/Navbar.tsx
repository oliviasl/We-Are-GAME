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
        <Logo />
          <div className="text-2xl">We Are G.A.M.E.</div>
      </div>
      
      <div className="flex items-center gap-12">
        <div className="hover:text-green-900">College Directory</div>
        <div className="hover:text-green-900">Mentor Directory</div>
        <div className="hover:text-green-900">Student Directory</div>

        {isAdmin ? (
          <div className="hover:text-green-900">Authenticate Users</div>
        ) : (
          <div className="hover:text-green-900">Student Profile</div>
        )}
      </div>
    </div>
  );
}