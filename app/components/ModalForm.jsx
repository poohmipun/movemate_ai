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
import { CldUploadButton, CldImage } from "next-cloudinary";
import { FiRotateCw } from "react-icons/fi";

const ModalForm = ({ openModal, onCloseModal }) => {
  //set up modal
  const [modalSize, setModalSize] = useState("8xl");
  // file upload
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  // pages management
  const [currentPage, setCurrentPage] = useState(0);
  const pageNames = ["Infomations", "Up position", "Down position", "Summary"];
  const [infoFormData, setInfoFormData] = useState({
    /* Initial state for page 1 */
  });
  const [upPositionFormData, setUpPositionFormData] = useState({
    /* Initial state for page 2 */
  });
  const [downPositionFormData, setDownPositionFormData] = useState({
    /* Initial state for page 3 */
  });
  const [summaryFormData, setSummaryFormData] = useState({
    /* Initial state for page 4 */
  });
  const [showToast, setShowToast] = useState(false);
  // form management
  const [selectedOption, setSelectedOption] = useState(null);
  const [rotationToasts, setRotationToasts] = useState([]);
  const [positionToasts, setPositionToasts] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleAddToast = (condition) => {
    const newToast = {
      condition,
      formData: {},
      order: rotationToasts.length + positionToasts.length,
    };
    if (condition === "Keypoint Rotation") {
      setRotationToasts([...rotationToasts, newToast]);
    } else if (condition === "Keypoint Position") {
      setPositionToasts([...positionToasts, newToast]);
    }
  };
  const handleCloseToast = (index, toastType) => {
    if (toastType === "rotation") {
      const updatedToasts = [...rotationToasts];
      updatedToasts.splice(index, 1);
      setRotationToasts(updatedToasts);
    } else if (toastType === "position") {
      const updatedToasts = [...positionToasts];
      updatedToasts.splice(index, 1);
      setPositionToasts(updatedToasts);
    }
  };

  const handleInputChange = (index, field, value, toastType) => {
    if (toastType === "rotation") {
      const updatedToasts = [...rotationToasts];
      updatedToasts[index].formData[field] = value;
      setRotationToasts(updatedToasts);
    } else if (toastType === "position") {
      const updatedToasts = [...positionToasts];
      updatedToasts[index].formData[field] = value;
      setPositionToasts(updatedToasts);
    }
  };

  const renderToasts = () => {
    const allToasts = [...rotationToasts, ...positionToasts];
    const sortedToasts = allToasts.sort((a, b) => a.order - b.order);

    return sortedToasts.map((toast, index) => {
      if (toast.condition === "Keypoint Rotation") {
        return (
          <FormForRotation
            key={`rotation-${index}`}
            index={index}
            formData={toast.formData}
            handleChange={handleChange}
            onClose={() => handleCloseToast(index, "rotation")}
          />
        );
      } else if (toast.condition === "Keypoint Position") {
        return (
          <FormForPosition
            key={`position-${index}`}
            index={index}
            formData={toast.formData}
            handleChange={handleChange}
            onClose={() => handleCloseToast(index, "position")}
          />
        );
      }
    });
  };

  const handleUploadSuccess = (result) => {
    setImageUrl(result.info.public_id);
  };

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

  const [formData, setFormData] = useState({
    img_url: "",
    title: "",
    description: "",
    joint_rotation_1: "",
    joint_rotation_2: "",
  });

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
                  id="title"
                  name="title"
                  placeholder="input Radiant"
                  type="text"
                  onChange={handleChange}
                  required={true}
                  value={formData.title}
                  sizing="md"
                />
              </div>
              <div>
                <FaLessThanEqual />
              </div>
              <div>
                <Select id="Select Keypoints" size="md" className="space-y-2">
                  <option>Select Keypoint</option>
                  <option>Elbow</option>
                  <option>Shoulder</option>
                  <option>Hip</option>
                  <option>Ankle</option>
                </Select>
              </div>
              <div>
                <FaLessThanEqual />
              </div>
              <div className="max-w-fit">
                <TextInput
                  id="title"
                  name="title"
                  placeholder="input Radiant"
                  type="text"
                  onChange={handleChange}
                  required={true}
                  value={formData.title}
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
                  <option>Nose</option>
                  <option>Eye</option>
                  <option>Ear</option>
                  <option>Shoulder</option>
                  <option>Elbow</option>
                  <option>Wrist</option>
                  <option>Hip</option>
                  <option>Knee</option>
                  <option>Ankle</option>
                </Select>
              </div>
              <div>
                <FaChevronLeft />
              </div>
              <div>
                <Select id="Select Keypoints" size="md" className="space-y-2">
                  <option>Select Keypoint</option>
                  <option>Nose</option>
                  <option>Eye</option>
                  <option>Ear</option>
                  <option>Shoulder</option>
                  <option>Elbow</option>
                  <option>Wrist</option>
                  <option>Hip</option>
                  <option>Knee</option>
                  <option>Ankle</option>
                </Select>
              </div>
            </div>
          </div>
          <Toast.Toggle onClick={onClose} />
        </div>
      </Toast>
    );
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
            <div className="modal-container flex flex-col xl:space-x-8 xl:flex-row max-h-screen overflow-y-auto ">
              <div className="left-side flex-col items-center flex-1 justify-center max-h-screen overflow-y-auto ">
                <div className="flex flex-col w-full items-center justify-center mb-4 space-y-4  max-h-[800px] overflow-auto">
                  <h3 className="text-xl font-medium text-white text-left w-full">
                    {currentPage === 0
                      ? "Image Preview"
                      : pageNames[currentPage]}
                  </h3>
                  <div>
                    {currentPage > 0 ? (
                      <>
                        <iframe
                          className="w-[700px] h-[400px] rounded-md"
                          src="https://www.youtube.com/embed/CN_RsGkRScM?autoplay=1&mute=1&loop=1"
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          loop
                        ></iframe>
                      </>
                    ) : (
                      <div
                        role="status"
                        className="flex items-center w-[700px] justify-center h-56 bg-gray-300 rounded-lg overflow-hidden"
                      >
                        {imageUrl ? (
                          <CldImage
                            src={imageUrl}
                            width="1200"
                            height="1200"
                            alt="Uploaded"
                          />
                        ) : (
                          <svg
                            className="w-36 h-36 text-gray-600"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 18"
                          >
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                          </svg>
                        )}
                      </div>
                    )}
                  </div>
                  {currentPage > 0 ? (
                    <></>
                  ) : (
                    <>
                      {" "}
                      <CldUploadButton
                        uploadPreset="nh1i8otq"
                        onSuccess={handleUploadSuccess}
                        className="orange_btn w-full h-12"
                        onUploadAdded={(result) => {
                          console.log(result);
                          setImageUrl(result.info.public_id);
                          console.log(
                            "Uploaded image URL:",
                            result.info.secure_url
                          );
                        }}
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="right-side min-w-1/2 flex-1 grid gap-4 mb-4 ">
                <div className="col-span-1 w-full overflow-y-auto max-h-[450px] pl-4">
                  <h3 className="text-xl font-medium text-white mb-2">
                    Program Form
                  </h3>
                  {currentPage > 0 ? (
                    <div className="flex flex-wrap ">
                      <Dropdown
                        label="Add conditions "
                        size="lg"
                        className="min-w-full"
                      >
                        <Dropdown.Item
                          icon={FiRotateCw}
                          onClick={() => handleAddToast("Keypoint Rotation")}
                        >
                          Select Keypoint Rotation
                        </Dropdown.Item>
                        <Dropdown.Item
                          icon={FaMapMarkerAlt}
                          onClick={() => handleAddToast("Keypoint Position")}
                        >
                          Check Keypoint position
                        </Dropdown.Item>
                        <Dropdown.Divider />
                      </Dropdown>
                      {renderToasts()}
                    </div>
                  ) : (
                    <>
                      {/* frist page */}
                      <div className="space-y-4 mb-4">
                        <TextInput
                          id="title"
                          name="title"
                          placeholder="title"
                          type="text"
                          onChange={handleChange}
                          required={true}
                          value={formData.title}
                          sizing="md"
                        />
                        <Textarea
                          id="Description"
                          name="description"
                          placeholder="Description"
                          type="text"
                          onChange={handleChange}
                          required={true}
                          value={formData.description}
                          rows={11}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="w-full flex flex-row items-center justify-between">
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
              <Breadcrumb
                aria-label="Default breadcrumb example"
                className="text-white"
              >
                {pageNames.map((pageName, index) => (
                  <Breadcrumb.Item key={index}>{pageName}</Breadcrumb.Item>
                ))}
              </Breadcrumb>

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
