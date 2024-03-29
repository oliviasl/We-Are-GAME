import React from "react";
import {peerData} from "../routes/StudentProfile";
import ProfileBox from "../components/ProfileBox";

interface PeerProfileProps {
    peerData: peerData;
}

const PeerProfileView: React.FC<PeerProfileProps> = ({peerData}) => {
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

    const majors: string[] = [
        peerData.user_potential_major ? peerData.user_potential_major : '',
        peerData.user_alt_major1 ? peerData.user_alt_major1 : '',
        peerData.user_alt_major2 ? peerData.user_alt_major2 : '',
    ];

    return (
        <div className="grid grid-cols-2 gap-4 m-auto mx-20 my-10 mb-32 font-circular-std leading-none">
        {/* Username/Grad year */}
        <div className='col-span-2 order-1'>
          <div className="bg-brand-gray-20 rounded-t-md text-brand-white flex p-4 items-center">
            <div className="flex-col flex-grow">
              <div className="text-lg font-medium p-0 m-0">{peerData.user_firstname + " " + peerData.user_lastname}</div>

              <div className="text-sm font-normal">{peerData.user_school + "/" + peerData.user_grad_year}</div> 
            </div>
          </div>
        </div>
        <div className="col-span-2 grid grid-cols-3 gap-4 order-2">
            {/* Personal */}
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

            
            {/* Sport */}
            <div className="order-5 border-gray-400 border-2 rounded-md ">
                <ProfileBox type="Sport" data={sports}/>        
            </div>
    
            {/* Major */}
            <div className="order-5 border-gray-400 border-2 rounded-md ">
                <ProfileBox type="Major" data={majors} />        
            </div>
        </div>
      </div>
    );
};

export default PeerProfileView;