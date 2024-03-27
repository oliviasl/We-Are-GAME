import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import Modal from "react-modal";
import X from "../components/X";
const appElement = document.getElementById("root")!;
Modal.setAppElement(appElement);

interface StudentData {
  user_id: number;
  user_firstname: string;
  user_lastname: string;
}

const AssignStudentModal = ({isOpen, onClose}: { isOpen: boolean, onClose: () => void }) => {
  const {id} = useParams();

  const [name, setName] = useState("");
  const [searchResults, setSearchResults] = useState<StudentData[]>([]);

  const fetchSearch = () => {
    fetch("/api/userByName/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        userName: name,
      }),
    })
      .then((response) => response.json())
      .then(setSearchResults)
      .catch((error) => console.error("Error fetching search:", error));
  };

  const createAssignment = async (student: StudentData) => {
    await fetch('/api/createAssignment', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        userId: student.user_id,
        collegeId: id,
      }),
    });

    toast(`${student.user_firstname} ${student.user_lastname} successfully assigned.`, {
      className: "border-l-8 border-semantic-success"
    });

    onClose();
  }

  return <Dialog
    size={"md"}
    open={isOpen}
    handler={onClose}
  >
    <DialogHeader>Assign Student</DialogHeader>
    <DialogBody>
      <form onSubmit={(e) => {
        e.preventDefault()
        fetchSearch();
      }} className={"flex gap-4"}>
        <Input
          label="Name"
          placeholder={"Name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          crossOrigin={undefined}/>
        <Button type={"submit"} className={"shrink-0"}>Search</Button>
      </form>

      {searchResults.length > 0 && (
        <div className="mt-5 divide-y-2 divide-brand-gray-20">
          <hr/>
          {searchResults.map((result) => (
            <div key={result.user_id} className="flex justify-between px-5 py-2 items-center">
              <p className={"font-medium"}>
                {result.user_firstname} {result.user_lastname}
              </p>
              <Button
                size={"sm"}
                variant={"outlined"}
                className={"!py-0.5"}
                onClick={() => createAssignment(result)}>
                Add
              </Button>
            </div>
          ))}
        </div>
      )}
    </DialogBody>
    <DialogFooter>
      <Button
        variant="text"
        color="red"
        onClick={onClose}
        className="mr-1"
      >
        <span>Cancel</span>
      </Button>
    </DialogFooter>
  </Dialog>
}

export default AssignStudentModal;