import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import X from "../components/X";
const appElement = document.getElementById("root")!;
Modal.setAppElement(appElement);

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (collegeId: number) => void;
}

interface CollegeData {
  college_id: number;
  college_name: string;
}

const AddCollegeModal: React.FC<ModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState<CollegeData[]>([]);
  useEffect(() => {
    setInput("");
    setSearchResults([]);
  }, [isOpen]);

  const fetchSearch = (value: string) => {
    fetch("/api/collegeByName/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        college_name: value,
      }),
    })
      .then((response) => response.json())
      .then((json: CollegeData[]) => {
        setSearchResults(json);
      })
      .catch((error) => console.error("Error fetching search:", error));
  };

  const handleChange = (value: string) => {
    if (value.trim() === "") {
      setSearchResults([]);
    } else {
      fetchSearch(value);
    }
    setInput(value);
  };

  const customStyles = {
    content: {
      border: "2px solid lightgrey" as const,
      width: "52%" as const,
      margin: "auto" as const,
      height: searchResults.length > 0 ? "44vh" : "26vh",
      maxHeight: "44vh",
      overflow: "hidden" as const,
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add College"
      style={customStyles}
    >
      <div className="px-12 py-10 flex-col">
        <div className="font-grotesk flex justify-between">
          <div className="font-bold text-2xl">Add College</div>
          <button onClick={onClose}>
            <X fill="black" />
          </button>
        </div>
        <div className="flex mt-6 gap-3">
          <input
            placeholder="Search by college name"
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            className="border-2 border-brand-gray-20 bg-gray-100 rounded-md px-4 py-1 w-full outline-none"
          ></input>
          {/* <button className="bg-brand-gray-20 text-brand-white p-2 px-8 rounded-md transition duration-200 ease-in-out hover:bg-brand-green-45">Search</button> */}
        </div>
        {/* search results */}
        {searchResults.length > 0 && (
          <div
            className="mt-7 divide-y-2 h-25 divide-brand-gray-20"
            style={{ maxHeight: "25vh", overflowY: "auto" }}
          >
            <hr />
            {searchResults.map((result) => (
              <div
                className="flex justify-between px-5 py-2 items-center"
                key={result.college_id}
              >
                <div>{result.college_name}</div>
                <button
                  className=" bg-gray-300 px-3 py-0.5 text-xs rounded-sm border-black border-1"
                  onClick={() => {
                    onAdd(result.college_id);
                    onClose();
                  }}
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AddCollegeModal;
