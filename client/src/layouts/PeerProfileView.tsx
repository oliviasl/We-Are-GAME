import React from "react";
import { peerData } from "../routes/StudentProfile";
import ProfileBox from "../components/ProfileBox";
import NotFoundPage from "../routes/NotFoundPage";

interface PeerProfileProps {
  peerData: peerData;
}

const capFirstLetter = (str: string): string => {
  return str.replace(/\b\w/g, (match: string) => match.toUpperCase());
};

const PeerProfileView: React.FC<PeerProfileProps> = ({ peerData }) => {
  const peerInfoKeys = ["user_email", "user_facebook", "user_instagram"] as Array<keyof typeof peerData>;
  const personalTitles: Record<string, string> = {
    user_email: "Email",
    user_facebook: "Facebook",
    user_instagram: "Instagram"
  };

  // TODO: make first letter caps
  const sports: string[] = [
    ...(peerData.user_sport1 ? [`${peerData.user_sport1}/${peerData.user_sport1_role}`] : []),
    ...(peerData.user_sport2 ? [`${peerData.user_sport2}/${peerData.user_sport2_role}`] : []),
  ];

  const majors = [
    peerData.user_potential_major
      ? capFirstLetter(peerData.user_potential_major)
      : null,
      peerData.user_alt_major1
      ? capFirstLetter(peerData.user_alt_major1)
      : null,
      peerData.user_alt_major2
      ? capFirstLetter(peerData.user_alt_major2)
      : null,
  ].filter(Boolean) as string[];
  
  return (
    <div>
      {peerData.user_id === 1 || peerData.user_id === 2 ? (
        <NotFoundPage />
      ) : (
        <div className="grid grid-cols-2 gap-4 m-auto mx-20 my-10 mb-32 font-circular-std leading-none">
          {/* Username/Grad year */}
          <div className='col-span-2 order-1'>
            <div className="bg-brand-gray-20 rounded-t-md text-brand-white flex p-4 items-center">
              <div className="flex-col flex-grow">
                <div className="text-lg font-medium p-0 m-0">{peerData.user_firstname + " " + peerData.user_lastname}</div>

                <div className="text-sm font-normal">
                  {peerData.user_school && peerData.user_grad_year ? (
                    peerData.user_school + "/" + peerData.user_grad_year
                  ) : "" }
                  {peerData.user_school && !peerData.user_grad_year ? (
                    peerData.user_school
                  ) : "" }
                  {!peerData.user_school && peerData.user_grad_year ? (
                    peerData.user_grad_year
                  ) : "" }
                </div>
              </div>
            </div>
          </div>

          <div className={peerData.user_show_socials ? "col-span-2 grid grid-cols-3 gap-4 order-2" : "col-span-2 grid grid-cols-2 gap-4 order-2"}>
            {/* Personal */}
            {peerData.user_show_socials && (
              <div className=' border-gray-400 border-2 rounded-md order-3'>
                <div className="w-full p-4">
                  <h2 className="text-md mb-4">Personal</h2>
                  <div className="grid grid-cols-2 gap-y-4 justify-between w-full">
                    <h2>Phone Number</h2>
                    <div className="text-right">{peerData.user_phone}</div>
                    {peerInfoKeys.map((key) => (
                      (peerData.user_show_socials) && (
                        <React.Fragment key={key}>
                          <div>{personalTitles[key]}</div>
                          <div className="text-right">
                            {/* TO DO: figure out how to put the @ in the usernames? */}
                            {typeof peerData[key] !== 'undefined'
                              ? peerData[key]
                              : ''}
                          </div>
                        </React.Fragment>
                      )
                    ))}
                  </div>
                </div>
              </div>
            )}


            {/* Sport */}
            <div className="order-5 border-gray-400 border-2 rounded-md ">
              <ProfileBox type="Sport" data={sports} />
            </div>

            {/* Major */}
            <div className="order-5 border-gray-400 border-2 rounded-md ">
              <ProfileBox type="Major" data={majors} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PeerProfileView;