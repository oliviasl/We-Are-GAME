import CollegeFilters from "../layouts/CollegeFilters";
import CollegeSearchResults from "../layouts/CollegeSearchResults";
import CollegeUpdateDatabase from "../layouts/CollegeUpdateDatabase";
import { CollegeData } from "../layouts/CollegeFilters";

const CollegeDatabase = () => {
    const [formData, setFormData] = useState<CollegeData | {}>({});

    const handleFormData = (data: CollegeData) => {
        setFormData(data); // Update state with form data
    };

    return (
        <div className="h-screen w-screen flex flex-col">
            <div className="flex mx-0 mt-16 w-screen">
                <div className="flex-grow ml-[100px]"> 
                    <CollegeUpdateDatabase />
                    <CollegeSearchResults formData={formData}/>
                </div>
                <div className="mr-[100px]">
                    <CollegeFilters onCollegeData={handleFormData}/>
                </div>
            </div>
        </div>
    );
};


export default CollegeDatabase;