import { Typography } from "@material-tailwind/react";

const Logo = () => (
  <div className="rounded-full w-20 h-20 bg-gray-200">
    {/* <img src='#' alt='Logo' /> */}
  </div>
);

export function Navbar() {
  return (
    // added padding/margin for testing purposes: should be removed once Nav is integrated into other components
    <div className="z-[20] mx-auto flex w-full items-center justify-between bg-grey-600 p-14 my-8 text-brand-black font-bold font-grotesk">
      <div className="flex items-center">
        <Logo />
        <div>
          <div className="text-2xl">We Are G.A.M.E.</div>
        </div>
      </div>
      
      <div className="flex items-center">
        <div className="">Logo</div>
        <div className="">Logo</div>
        <div className="">Logo</div>
      </div>
    </div>
  );
}