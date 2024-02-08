import React, { useState } from 'react';
import Modal from 'react-modal';
import X from "../components/X"

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const customStyles = {
  content: {
    border: '2px solid lightgrey' as const,
    width: '50%' as const,
    margin: 'auto' as const,
    height: '15rem' as const,
    overflow: 'hidden' as const,
  },
};

const AddCollegeModal: React.FC<ModalProps> = ({ isOpen, onClose}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add College"
      style={customStyles}
    >
      <div className="px-10 py-10">
        <div className="font-grotesk flex justify-between">
          <div className="font-bold text-2xl">Add College</div>
          <button onClick={onClose}><X fill="black" /></button>
        </div>
        <div className="flex mt-8 gap-3 ">
          <input placeholder="Search by college name" className="border-2 border-brand-gray-20 rounded-sm px-2 w-full"></input>
          <button className="bg-brand-gray-20 text-brand-white p-2 px-8 rounded-sm">Search</button>
        </div>
      </div>
    </Modal>
  );
};

export default AddCollegeModal;