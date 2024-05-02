import React, { useEffect, useState } from "react";
import {
  TextInput,
  Toast,
  Dropdown,
  Select,
  Button,
  Breadcrumb,
} from "flowbite-react";
import {
  FaMapMarkerAlt,
  FaChevronRight,
  FaChevronLeft,
  FaLessThanEqual,
} from "react-icons/fa";
import { FiRotateCw } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";

const EndPositionForm = ({
  formData,
  onNextPage,
  onPreviousPage,
  updateFormData,
  currentPage,
  pageNames,
}) => {
  const [localData, setLocalData] = useState({
    end_condition: formData.end_condition || [],
  });

  useEffect(() => {
    setLocalData({
      end_condition: formData.end_condition || [],
    });
  }, [formData.end_condition]);

  const handleNextPage = () => {
    onNextPage({
      end_condition: localData.end_condition,
    });
  };

  const handlePreviousPage = () => {
    onPreviousPage({
      end_condition: localData.end_condition,
    });
  };

  const handleAddToast = (condition) => {
    setLocalData((prevState) => {
      const newToast = {
        id: uuidv4(), // assuming you are using uuid for unique key generation
        condition,
        formData:
          condition === "Keypoint Rotation"
            ? {
                radius1: "",
                radius2: "",
                selectedKeypoint: "",
              }
            : {
                lowerKeypoint: "",
                upperKeypoint: "",
              },
        order: prevState.end_condition.length,
      };

      return {
        ...prevState,
        end_condition: [...prevState.end_condition, newToast],
      };
    });
  };

  const handleCloseToast = (id) => {
    setLocalData((prevState) => {
      const updatedToasts = prevState.end_condition.filter(
        (toast) => toast.id !== id
      );
      return {
        ...prevState,
        end_condition: updatedToasts,
      };
    });
  };

  const handleInputChange = (id, field, value) => {
    setLocalData((prevState) => {
      const updatedToasts = prevState.end_condition.map((toast) => {
        if (toast.id === id) {
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
        end_condition: updatedToasts,
      };
    });
  };

  const renderToastForm = (toast) => (
    <Toast key={toast.id} className="flex mt-6 min-w-full">
      <div className="flex items-start min-w-full">
        <div className="ml-3 text-sm font-normal w-full">
          <div className="mb-4 text-xl font-bold text-blue-900">
            {toast.condition}
          </div>
          <div className="flex items-center justify-between gap-2">
            {toast.condition === "Keypoint Rotation" ? (
              <>
                <TextInput
                  id={`radius1-${toast.id}`}
                  name="radius1"
                  placeholder="input Radiant"
                  type="text"
                  onChange={(e) =>
                    handleInputChange(toast.id, "radius1", e.target.value)
                  }
                  required={true}
                  value={toast.formData.radius1}
                  sizing="md"
                />
                <FaLessThanEqual />
                <Select
                  id={`select-${toast.id}`}
                  size="md"
                  className="space-y-2"
                  onChange={(e) =>
                    handleInputChange(
                      toast.id,
                      "selectedKeypoint",
                      e.target.value
                    )
                  }
                  value={toast.formData.selectedKeypoint}
                >
                  <option>Select Keypoint</option>
                  <option value="Elbow">Elbow</option>
                  <option value="Shoulder">Shoulder</option>
                  <option value="Hip">Hip</option>
                  <option value="Knee">Knee</option>
                </Select>
                <FaLessThanEqual />
                <TextInput
                  id={`radius2-${toast.id}`}
                  name="radius2"
                  placeholder="input Radiant"
                  type="text"
                  onChange={(e) =>
                    handleInputChange(toast.id, "radius2", e.target.value)
                  }
                  required={true}
                  value={toast.formData.radius2}
                  sizing="md"
                />
              </>
            ) : (
              <>
                <Select
                  id={`select-lower-${toast.id}`}
                  size="md"
                  className="space-y-2"
                  onChange={(e) =>
                    handleInputChange(toast.id, "lowerKeypoint", e.target.value)
                  }
                  value={toast.formData.lowerKeypoint}
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
                <FaChevronLeft />
                <Select
                  id={`select-upper-${toast.id}`}
                  size="md"
                  className="space-y-2"
                  onChange={(e) =>
                    handleInputChange(toast.id, "upperKeypoint", e.target.value)
                  }
                  value={toast.formData.upperKeypoint}
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
              </>
            )}
          </div>
        </div>
        <Toast.Toggle onClick={() => handleCloseToast(toast.id)} />
      </div>
    </Toast>
  );

  return (
    <div className="grid grid-cols-1 divide-y">
      <div className="modal-container flex flex-col xl:space-x-8 xl:flex-row max-h-screen overflow-y-auto">
        <div className="left-side flex-col items-center flex-1 justify-center max-h-screen overflow-y-auto">
          <div className="flex flex-col w-full items-center justify-center mb-4 space-y-4 max-h-[800px] overflow-auto">
            <h3 className="text-xl font-medium text-white text-left w-full">
              Down position
            </h3>
            <div>
              <iframe
                className="w-[600px] h-[400px] rounded-md"
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
        <div className="right-side min-w-1/2 flex-1 grid gap-4 mb-4">
          <div className="col-span-1 w-full overflow-y-auto max-h-[450px] pl-4">
            <h3 className="text-xl font-medium text-white mb-2">
              Program Form
            </h3>
            <div className="flex flex-wrap">
              <Dropdown label="Add conditions" size="lg" className="min-w-full">
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
              {localData.end_condition.map((toast) => renderToastForm(toast))}
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

export default EndPositionForm;
