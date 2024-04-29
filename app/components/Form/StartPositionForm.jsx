import React, { useState, useMemo, useReducer } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Label,
  TextInput,
  Toast,
  Breadcrumb,
  Dropdown,
  Flowbite,
  Select,
  Button,
} from "flowbite-react";
import { FaMapMarkerAlt, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { FaGreaterThanEqual, FaLessThanEqual } from "react-icons/fa6";
import { FiRotateCw } from "react-icons/fi";

const StartPositionForm = ({
  formData,
  onNextPage,
  onPreviousPage,
  setFormData,
  currentPage,
  pageNames,
}) => {
  const [localData, setLocalData] = useState({
    allToasts: [],
  });

  console.log("Local Data:", localData);

  const handleNextPage = () => {
    setFormData((prevData) => ({
      ...prevData,
      allToasts: localData.allToasts,
    }));
    onNextPage();
  };

  const handlePreviousPage = () => {
    onPreviousPage();
  };

  const handleAddToast = (condition) => {
    setLocalData((prevState) => {
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
    setLocalData((prevState) => {
      const updatedToasts = prevState.allToasts.filter((_, i) => i !== index);

      // After filtering out the deleted toast, reindex the remaining toasts
      const reindexedToasts = updatedToasts.map((toast, i) => ({
        ...toast,
        index: i,
        order: i, // Optionally update the order as well
      }));

      return {
        ...prevState,
        allToasts: reindexedToasts,
      };
    });
  };

  const handleInputChange = (index, field, value, toastType) => {
    setLocalData((prevState) => {
      const updatedToasts = prevState.allToasts.map((toast, toastIndex) => {
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
      });

      return {
        ...prevState,
        allToasts: updatedToasts,
      };
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
                <Select
                  id={`select-${index}`}
                  size="md"
                  className="space-y-2"
                  onChange={(e) => {
                    handleChange(
                      index,
                      "lowerKeypoint",
                      e.target.value,
                      "position"
                    );
                  }}
                  value={formData.lowerKeypoint}
                >
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
                <Select
                  id={`select-${index}`}
                  size="md"
                  className="space-y-2"
                  onChange={(e) => {
                    handleChange(
                      index,
                      "upperKeypoint",
                      e.target.value,
                      "position"
                    );
                  }}
                  value={formData.upperKeypoint}
                >
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

  const memoizedSortedToasts = useMemo(() => {
    const sortedToasts = [...localData.allToasts].sort(
      (a, b) => a.order - b.order
    );
    return sortedToasts.map((toast, index) => {
      if (toast.condition === "Keypoint Rotation") {
        return (
          <FormForRotation
            key={`rotation-${index}`}
            index={index}
            formData={toast.formData}
            handleChange={(index, field, value, toastType) =>
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
            handleChange={(index, field, value, toastType) =>
              handleInputChange(index, field, value, "position")
            }
            onClose={() => handleCloseToast(index, "position")}
          />
        );
      }
    });
  }, [localData.allToasts]); // Use the correct dependency array

  const renderToasts = () => memoizedSortedToasts;

  return (
    <div className="grid grid-cols-1 divide-y ">
      <div className="modal-container flex flex-col xl:space-x-8 xl:flex-row max-h-screen overflow-y-auto ">
        <div className="left-side flex-col items-center flex-1 justify-center max-h-screen overflow-y-auto ">
          <div className="flex flex-col w-full items-center justify-center mb-4 space-y-4  max-h-[800px] overflow-auto">
            <h3 className="text-xl font-medium text-white text-left w-full">
              Start position
            </h3>
            <div>
              <iframe
                className="w-[700px] h-[400px] rounded-md"
                src="https://www.youtube.com/embed/CN_RsGkRScM?autoplay=1&mute=1&loop=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loop
              ></iframe>
            </div>
          </div>
        </div>
        <div className="right-side min-w-1/2 flex-1 grid gap-4 mb-4 ">
          <div className="col-span-1 w-full overflow-y-auto max-h-[450px] pl-4">
            <h3 className="text-xl font-medium text-white mb-2">
              Program Form
            </h3>
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
              {memoizedSortedToasts}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row items-center sm:justify-between justify-center pt-3">
        {currentPage > 0 && (
          <Button
            onClick={handlePreviousPage}
            className="orange_btn"
            type="button"
          >
            <FaChevronLeft className="mr-1" /> {pageNames[currentPage - 1]}
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
                {pageNames[currentPage + 1]} <FaChevronRight className="ml-1" />
              </>
            ) : (
              "Create Program"
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default StartPositionForm;
