import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import Modal from "react-modal";
import X from "../components/X";
const appElement = document.getElementById("root")!;
Modal.setAppElement(appElement);

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface StudentData {
  user_id: number;
  user_firstname: string;
  user_lastname: string;
}

const AssignStudentModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [searchResults, setSearchResults] = useState<StudentData[]>([]);
  useEffect(() => {
    setName("");
    setSearchResults([]);
  }, [isOpen]);

  const fetchSearch = (value: string) => {
    fetch("/api/userByName/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        userName: value,
      }),
    })
      .then((response) => response.json())
      .then((json: StudentData[]) => {
        setSearchResults(json);
      })
      .catch((error) => console.error("Error fetching search:", error));
  };

  const createAssignment = async (student: StudentData) => {
    await fetch("/api/createAssignment", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        userId: student.user_id,
        collegeId: id,
      }),
    });

    toast(
      `${student.user_firstname} ${student.user_lastname} successfully assigned.`,
      {
        className: "border-l-8 border-semantic-success",
      }
    );
    onClose();
  };

  const customStyles = {
    content: {
      border: "2px solid lightgrey" as const,
      width: "52%" as const,
      margin: "auto" as const,
      height: searchResults.length > 0 ? "50vh" : "30vh",
      maxHeight: "50vh",
      overflow: "hidden" as const,
    },
  };

  const handleChange = (value: string) => {
    if (value.trim() === "") {
      setSearchResults([]);
    } else {
      fetchSearch(value);
    }
    setName(value);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Assign Student"
      style={customStyles}
    >
      <div className="px-12 py-10 flex-col">
        <div className="font-grotesk flex justify-between">
          <div className="font-bold text-2xl">Assign Student</div>
          <button onClick={onClose}>
            <X fill="black" />
          </button>
        </div>
        <div className="flex mt-6 gap-3">
          <input
            placeholder="Search by student name"
            value={name}
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
                key={result.user_id}
              >
                <div>{result.user_firstname + " " + result.user_lastname}</div>
                <button
                  className=" bg-gray-300 px-3 py-0.5 text-xs rounded-sm border-black border-1"
                  onClick={() => {
                    createAssignment(result);
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

    // <Dialog size={"md"} open={isOpen} handler={onClose}>
    //   <DialogHeader>Assign Student</DialogHeader>
    //   <DialogBody>
    //     <form
    //       onSubmit={(e) => {
    //         e.preventDefault();
    //         fetchSearch();
    //       }}
    //       className={"flex gap-4"}
    //     >
    //       <Input
    //         label="Name"
    //         placeholder={"Name"}
    //         value={name}
    //         onChange={(e) => setName(e.target.value)}
    //         crossOrigin={undefined}
    //       />
    //       <Button type={"submit"} className={"shrink-0"}>
    //         Search
    //       </Button>
    //     </form>

    //     {searchResults.length > 0 && (
    //       <div className="mt-5 divide-y-2 divide-brand-gray-20">
    //         <hr />
    //         {searchResults.map((result) => (
    //           <div
    //             key={result.user_id}
    //             className="flex justify-between px-5 py-2 items-center"
    //           >
    //             <p className={"font-medium"}>
    //               {result.user_firstname} {result.user_lastname}
    //             </p>
    //             <Button
    //               size={"sm"}
    //               variant={"outlined"}
    //               className={"!py-0.5"}
    //               onClick={() => createAssignment(result)}
    //             >
    //               Add
    //             </Button>
    //           </div>
    //         ))}
    //       </div>
    //     )}
    //   </DialogBody>
    //   <DialogFooter>
    //     <Button variant="text" color="red" onClick={onClose} className="mr-1">
    //       <span>Cancel</span>
    //     </Button>
    //   </DialogFooter>
    // </Dialog>
  );
};

export default AssignStudentModal;
