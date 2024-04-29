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
    start_condition: [],
  });

  const handleNextPage = (newFormData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newFormData, // Merge the newFormData with existing formData
    }));
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = (newData) => {
    if (currentPage > 0) {
      setFormData(newData);
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  console.log("formData from modal", formData);

  const renderPage = () => {
    switch (currentPage) {
      case 0:
        return (
          <InformationForm
            formData={{
              title: formData.title,
              description: formData.description,
              imageUrl: formData.imageUrl,
            }}
            onNextPage={handleNextPage}
            pageNames={pageNames}
          />
        );
      case 1:
        return (
          <StartPositionForm
            formData={{ start_condition: formData.start_condition }}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
            currentPage={currentPage}
            pageNames={pageNames}
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
