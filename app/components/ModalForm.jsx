import React, { useState } from "react";
import { Button, Modal, Breadcrumb } from "flowbite-react";

import InformationForm from "./Form/InformationForm";
import StartPositionForm from "./Form/StartPositionForm";
import EndPositionForm from "./Form/EndPositionForm"; // Assuming you create this
import SummaryPage from "./Form/SummaryPage"; // Assuming you create this

const ModalForm = ({ openModal, onCloseModal, handleStatusUpdate }) => {
  console.log("ModalForm: Received handleStatusUpdate prop");
  const [submitStatus, setSubmitStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const pageNames = [
    "Information",
    "Start position",
    "End position",
    "Summary",
  ];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    start_condition: [],
    end_condition: [],
  });

  const handleNextPage = (newFormData) => {
    setFormData((prevData) => {
      let updatedData = { ...prevData };

      // Check for 'start_condition' updates
      if (newFormData.hasOwnProperty("start_condition")) {
        updatedData.start_condition = newFormData.start_condition;
      }

      // Check for 'end_condition' updates
      if (newFormData.hasOwnProperty("end_condition")) {
        updatedData.end_condition = newFormData.end_condition;
      }

      // If neither, merge all other data
      if (
        !newFormData.hasOwnProperty("start_condition") &&
        !newFormData.hasOwnProperty("end_condition")
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

        // Check for 'end_condition' updates
        if (newData.hasOwnProperty("end_condition")) {
          updatedData.end_condition = newData.end_condition;
        }

        // If neither, use the entire newData
        if (
          !newData.hasOwnProperty("start_condition") &&
          !newData.hasOwnProperty("end_condition")
        ) {
          updatedData = newData;
        }

        return updatedData;
      });
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

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
          <EndPositionForm
            formData={{ end_condition: formData.end_condition }}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
            currentPage={currentPage}
            pageNames={pageNames}
          />
        );
      case 3:
        return (
          <SummaryPage
            formData={formData}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
            currentPage={currentPage}
            pageNames={pageNames}
            onCloseModal={onCloseModal}
            handleStatusUpdate={handleStatusUpdate}
          />
        );
      default:
        return <div>Not Found</div>;
    }
  };

  return (
    <div className="flex w-full h-full">
      <Modal show={openModal} size="8xl" onClose={onCloseModal}>
        <div className="bg-gradient-to-tr from-black to-indigo-800 rounded-md text-white">
          <Modal.Header>
            <div className="text-white font-bold text-3xl">
              Create Workout Program
            </div>
          </Modal.Header>
          <Modal.Body>{renderPage()}</Modal.Body>
        </div>
      </Modal>
    </div>
  );
};

export default ModalForm;
