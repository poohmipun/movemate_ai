import React, { useState } from "react";
import { Button, Modal, Breadcrumb } from "flowbite-react";

import InformationForm from "./Form/InformationForm";
import StartPositionForm from "./Form/StartPositionForm";
import DownPositionForm from "./Form/DownPositionForm"; // Assuming you create this
import SummaryPage from "./Form/SummaryPage"; // Assuming you create this

const ModalForm = ({ openModal, onCloseModal }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageNames = ["Information", "Up position", "Down position", "Summary"];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });

  const updateFormData = (newData) => {
    console.log("Updating formData in ModalForm:", newData); // Log the updated formData
    setFormData(newData);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleMoveToNextPage = () => {
    handleNextPage(); // Move to the next page
  };

  console.log("formData from modal", formData);

  const renderPage = () => {
    switch (currentPage) {
      case 0:
        return (
          <InformationForm
            formData={formData}
            onNextPage={handleNextPage} // Pass onNextPage function as a prop
            updateFormData={updateFormData}
          />
        );
      case 1:
        return (
          <StartPositionForm
            formData={formData}
            setFormData={updateFormData}
            onNextPage={handleNextPage}
          />
        );
      case 2:
        return (
          <DownPositionForm
            formData={formData}
            setFormData={updateFormData}
            onNextPage={handleNextPage}
          />
        );
      case 3:
        return <SummaryPage formData={formData} />;
      default:
        return <div>Not Found</div>;
    }
  };

  return (
    <div className="flex w-full h-full">
      <Modal show={openModal} size="8xl" onClose={onCloseModal}>
        <form
          className="bg-gradient-to-tr from-black to-indigo-800 rounded-md text-white"
          method="post"
          onSubmit={(e) => e.preventDefault()}
        >
          <Modal.Header>
            <div className="text-white font-bold text-3xl">
              Create Workout Program
            </div>
          </Modal.Header>
          <Modal.Body>{renderPage()}</Modal.Body>
        </form>
      </Modal>
    </div>
  );
};

export default ModalForm;
