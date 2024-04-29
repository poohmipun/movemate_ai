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
    down_condition: [],
  });

  const handleNextPage = (newFormData) => {
    setFormData((prevData) => {
      let updatedData = { ...prevData };

      // Check for 'start_condition' updates
      if (newFormData.hasOwnProperty("start_condition")) {
        updatedData.start_condition = newFormData.start_condition;
      }

      // Check for 'down_condition' updates
      if (newFormData.hasOwnProperty("down_condition")) {
        updatedData.down_condition = newFormData.down_condition;
      }

      // If neither, merge all other data
      if (
        !newFormData.hasOwnProperty("start_condition") &&
        !newFormData.hasOwnProperty("down_condition")
      ) {
        updatedData = { ...prevData, ...newFormData };
      }

      return updatedData;
    });
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = (newData) => {
    if (currentPage > 0) {
      setFormData((prevData) => {
        let updatedData = { ...prevData };

        // Check for 'start_condition' updates
        if (newData.hasOwnProperty("start_condition")) {
          updatedData.start_condition = newData.start_condition;
        }

        // Check for 'down_condition' updates
        if (newData.hasOwnProperty("down_condition")) {
          updatedData.down_condition = newData.down_condition;
        }

        // If neither, use the entire newData
        if (
          !newData.hasOwnProperty("start_condition") &&
          !newData.hasOwnProperty("down_condition")
        ) {
          updatedData = newData;
        }

        return updatedData;
      });
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
            formData={{ down_condition: formData.down_condition }}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
            currentPage={currentPage}
            pageNames={pageNames}
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
