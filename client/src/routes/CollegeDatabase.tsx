import CollegeFilters from "../layouts/CollegeFilters";
import CollegeSearchResults from "../layouts/CollegeSearchResults";
import CollegeUpdateDatabase from "../layouts/CollegeUpdateDatabase";

const CollegeDatabase = () => {
    return (
        <div className="h-screen w-screen flex flex-col">
            <div className="flex mx-0 mt-16 w-screen">
                <div className="flex-grow ml-[100px]"> 
                    <CollegeUpdateDatabase />
                    <CollegeSearchResults />
                </div>
                <div className="mr-[100px]">
                    <CollegeFilters />
                </div>
            </div>
        </div>
    );
};


export default CollegeDatabase;