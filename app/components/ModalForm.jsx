"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FileInput,
  Label,
  Textarea,
  Table,
  TextInput,
  Button,
  Modal,
  Toast,
  Breadcrumb,
  Dropdown,
  Flowbite,
  Select,
} from "flowbite-react";
import { FaMapMarkerAlt, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { FaGreaterThanEqual, FaLessThanEqual } from "react-icons/fa6";
import { FiRotateCw } from "react-icons/fi";

import InformationForm from "./Form/InformationForm";
import StartPositionForm from "./Form/StartPositionForm";

const ModalForm = ({ openModal, onCloseModal }) => {
  //set up modal
  const [modalSize, setModalSize] = useState("8xl");
  // file upload
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  // pages management
  const [currentPage, setCurrentPage] = useState(0);
  const pageNames = ["Infomations", "Up position", "Down position", "Summary"];
  const [showToast, setShowToast] = useState(false);
  // form management
  /* ------------------------------------------- start Info ------------------------------------------------- */
  const [page1FormData, setPage1FormData] = useState({
    title: "",
    description: "",
    imageUrl: imageUrl,
  });

  const handlePage1Change = (event) => {
    const { name, value } = event.target;
    setPage1FormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUploadSuccess = (result) => {
    setPage1FormData({
      ...page1FormData,
      imageUrl: result.info.public_id, // Update the imageUrl field in the state
    });
  };

  /* ------------------------------------------- end Info ------------------------------------------------- */

  /* ------------------------------------------- Start Postion ------------------------------------------------- */
  const [page2FormData, setPage2FormData] = useState({
    allToasts: [],
  });

  const handleAddToast = (condition) => {
    setPage2FormData((prevState) => {
      console.log("PrevState:", prevState); // Debugging

      let newToast;
      if (condition === "Keypoint Rotation") {
        const newIndex = prevState.allToasts.length; // Generate unique index
        newToast = {
          condition,
          index: newIndex,
          formData: {
            radius1: "",
            radius2: "",
            selectedKeypoint: "",
          },
          order: newIndex,
        };
      } else if (condition === "Keypoint Position") {
        const newIndex = prevState.allToasts.length; // Generate unique index
        newToast = {
          condition,
          index: newIndex,
          formData: {
            lowerKeypoint: "",
            upperKeypoint: "",
          },
          order: newIndex,
        };
      }

      // Create a new array by concatenating the existing allToasts array with the new toast
      const updatedToasts = [...prevState.allToasts, newToast];
      // Return a new state object with the updated allToasts array
      return {
        ...prevState,
        allToasts: updatedToasts,
      };
    });
  };

  const handleCloseToast = (index) => {
    setPage2FormData((prevState) => {
      const updatedToasts = [...prevState.allToasts];
      updatedToasts.splice(index, 1);
      console.log("Updated State (All Toasts):", updatedToasts);
      return {
        ...prevState,
        allToasts: updatedToasts,
      };
    });
  };

  const handleInputChange = (index, field, value, toastType) => {
    setPage2FormData((prevState) => {
      return {
        ...prevState,
        allToasts: prevState.allToasts.map((toast, toastIndex) => {
          if (toastIndex === index) {
            return {
              ...toast,
              formData: {
                ...toast.formData,
                [field]: value,
              },
            };
          }
          return toast;
        }),
      };
    });
  };

  const renderToasts = () => {
    // Retrieve all toasts from page2FormData
    const allToasts = page2FormData.allToasts;

    // Sort allToasts by order
    const sortedToasts = allToasts.sort((a, b) => a.order - b.order);

    return sortedToasts.map((toast, index) => {
      if (toast.condition === "Keypoint Rotation") {
        return (
          <FormForRotation
            key={`rotation-${index}`}
            index={index}
            formData={toast.formData}
            handleChange={(index, field, value) =>
              handleInputChange(index, field, value, "rotation")
            }
            onClose={() => handleCloseToast(index, "rotation")}
          />
        );
      } else if (toast.condition === "Keypoint Position") {
        return (
          <FormForPosition
            key={`position-${index}`}
            index={index}
            formData={toast.formData}
            handleChange={(field, value) =>
              handleInputChange(index, field, value, "position")
            }
            onClose={() => handleCloseToast(index, "position")}
          />
        );
      }
    });
  };

  const FormForRotation = ({ index, formData, handleChange, onClose }) => {
    return (
      <Toast className="flex mt-6 min-w-full">
        <div className="flex items-start min-w-full">
          <div className="ml-3 text-sm font-normal w-full">
            <div className="mb-4 text-xl font-bold text-blue-900 ">
              Keypoint Rotation
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="max-w-fit">
                <TextInput
                  id={`radius1-${index}-1`}
                  name="radius1"
                  placeholder="input Radiant"
                  type="text"
                  onChange={(e) => {
                    console.log("Radius 1 changed:", e.target.value);
                    handleChange(index, "radius1", e.target.value, "rotation");
                  }}
                  required={true}
                  value={formData.radius1}
                  sizing="md"
                />
              </div>
              <div>
                <FaLessThanEqual />
              </div>
              <div>
                <Select
                  id={`select-${index}`}
                  size="md"
                  className="space-y-2"
                  onChange={(e) => {
                    console.log("Selected Keypoint changed:", e.target.value);
                    handleChange(
                      index,
                      "selectedKeypoint",
                      e.target.value,
                      "rotation"
                    );
                  }}
                >
                  <option>Select Keypoint</option>
                  <option value="Elbow">Elbow</option>
                  <option value="Shoulder">Shoulder</option>
                  <option value="Hip">Hip</option>
                  <option value="Ankle">Ankle</option>
                </Select>
              </div>
              <div>
                <FaLessThanEqual />
              </div>
              <div className="max-w-fit">
                <TextInput
                  id={`radius2-${index}-2`}
                  name="radius2"
                  placeholder="input Radiant"
                  type="text"
                  onChange={(e) => {
                    console.log("Radius 2 changed:", e.target.value);
                    handleChange(index, "radius2", e.target.value, "rotation");
                  }}
                  required={true}
                  value={formData.radius2}
                  sizing="md"
                />
              </div>
            </div>
          </div>
          <Toast.Toggle onClick={onClose} />
        </div>
      </Toast>
    );
  };

  const FormForPosition = ({ index, formData, handleChange, onClose }) => {
    return (
      <Toast className="flex mt-6 min-w-full">
        <div className="flex items-start min-w-full">
          <div className="ml-3 text-sm font-normal w-full">
            <div className="mb-4 text-xl font-bold text-blue-900 ">
              Keypoint Position
            </div>
            <div className="flex items-center justify-between gap-2">
              <div>
                <Select id="Select Keypoints" size="md" className="space-y-2">
                  <option>Select Keypoint</option>
                  <option value="Nose">Nose</option>
                  <option value="Eye">Eye</option>
                  <option value="Ear">Ear</option>
                  <option value="Shoulder">Shoulder</option>
                  <option value="Elbow">Elbow</option>
                  <option value="Wrist">Wrist</option>
                  <option value="Hip">Hip</option>
                  <option value="Knee">Knee</option>
                  <option value="Ankle">Ankle</option>
                </Select>
              </div>
              <div>
                <FaChevronLeft />
              </div>
              <div>
                <Select id="Select Keypoints" size="md" className="space-y-2">
                  <option>Select Keypoint</option>
                  <option value="Nose">Nose</option>
                  <option value="Eye">Eye</option>
                  <option value="Ear">Ear</option>
                  <option value="Shoulder">Shoulder</option>
                  <option value="Elbow">Elbow</option>
                  <option value="Wrist">Wrist</option>
                  <option value="Hip">Hip</option>
                  <option value="Knee">Knee</option>
                  <option value="Ankle">Ankle</option>
                </Select>
              </div>
            </div>
          </div>
          <Toast.Toggle onClick={onClose} />
        </div>
      </Toast>
    );
  };

  /* ------------------------------------------- Start Postion End ------------------------------------------------- */

  const handleNextPage = () => {
    setCurrentPage((prevPage) => {
      if (prevPage < pageNames.length - 1) {
        return prevPage + 1;
      } else {
        return prevPage;
      }
    });
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => {
      if (prevPage > 0) {
        return prevPage - 1;
      } else {
        return prevPage;
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFormData = { ...formData, img_url: imageUrl };

      const res = await fetch("/api/Programs", {
        method: "POST",
        body: JSON.stringify(updatedFormData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to create Program.");
      }

      onCloseModal();
      window.location.reload();
    } catch (error) {
      console.error("Error creating program:", error.message);
    }
  };
  //
  const handleInfoFormChange = (e) => {
    // Update info form data state
    setInfoFormData({ ...infoFormData, [e.target.name]: e.target.value });
  };

  const handleUpPositionFormChange = (e) => {
    // Update up position form data state
    setUpPositionFormData({
      ...upPositionFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDownPositionFormChange = (e) => {
    // Update down position form data state
    setDownPositionFormData({
      ...downPositionFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSummaryFormChange = (e) => {
    // Update summary form data state
    setSummaryFormData({ ...summaryFormData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex w-full h-full">
      <Modal show={openModal} size={modalSize} onClose={onCloseModal}>
        <form
          className="bg-gradient-to-tr from-black to-indigo-800 rounded-md text-white"
          method="post"
          onSubmit={handleSubmit}
        >
          <Modal.Header>
            <div className="text-white font-bold text-3xl">
              Create Workout Program
            </div>
          </Modal.Header>
          <Modal.Body>
            {currentPage === 0 && (
              <InformationForm
                handleImageUploadSuccess={handleImageUploadSuccess}
                imageUrl={imageUrl}
                handlePage1Change={handlePage1Change}
                setPage1FormData={setPage1FormData}
                page1FormData={page1FormData}
              />
            )}
            {currentPage === 1 && (
              <StartPositionForm
                page2FormData={page2FormData}
                setPage2FormData={setPage2FormData}
                handleAddToast={handleAddToast}
                handleCloseToast={handleCloseToast}
                handleInputChange={handleInputChange}
                renderToasts={renderToasts}
              />
            )}
          </Modal.Body>
          <Modal.Footer>
            <div className="w-full flex flex-row items-center sm:justify-between justify-center">
              {currentPage > 0 && (
                <Button
                  onClick={handlePreviousPage}
                  className="orange_btn"
                  type="button"
                >
                  <FaChevronLeft className="mr-1" />{" "}
                  {pageNames[currentPage - 1]}
                </Button>
              )}
              <div className="hidden sm:flex">
                <Breadcrumb
                  aria-label="Default breadcrumb example"
                  className="text-white"
                >
                  {pageNames.map((pageName, index) => (
                    <Breadcrumb.Item key={index}>{pageName}</Breadcrumb.Item>
                  ))}
                </Breadcrumb>
              </div>
              {currentPage < pageNames.length && (
                <Button
                  onClick={handleNextPage}
                  className="orange_btn inline-flex items-center"
                  type="button"
                >
                  {currentPage < pageNames.length - 1 ? (
                    <>
                      {pageNames[currentPage + 1]}{" "}
                      <FaChevronRight className="ml-1" />
                    </>
                  ) : (
                    "Create Program"
                  )}
                </Button>
              )}
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default ModalForm;
