import React, { useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import { TextInput, Textarea, Breadcrumb, Button } from "flowbite-react";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";

const InformationForm = ({ formData, onNextPage, pageNames }) => {
  const [localData, setLocalData] = useState({
    title: formData.title || "",
    description: formData.description || "",
    imageUrl: formData.imageUrl || "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLocalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUploadSuccess = (result) => {
    const newImageUrl = result.info.secure_url;
    setLocalData((prev) => ({
      ...prev,
      imageUrl: newImageUrl,
    }));
  };

  const handleNextPage = () => {
    /* if (!localData.title || !localData.description || !localData.imageUrl) {
      alert("Please complete all fields before proceeding.");
      return;
    } */
    onNextPage(localData);
  };

  return (
    <div className="grid grid-cols-1 divide-y ">
      <div className="modal-container flex flex-col xl:space-x-8 xl:flex-row max-h-screen overflow-y-auto">
        <div className="left-side flex-col items-center flex-1 justify-center max-h-screen overflow-y-auto">
          <div className="flex flex-col w-full items-center justify-center mb-4 space-y-4 max-h-[800px] overflow-auto">
            <h3 className="text-xl font-medium text-white text-left w-full">
              Image Preview
            </h3>
            <div>
              <div
                role="status"
                className="flex items-center w-[600px] justify-center h-56 bg-gray-300 rounded-lg overflow-hidden"
              >
                {localData.imageUrl ? (
                  <div className="relative w-full h-auto max-h-500px">
                    <Image
                      src={localData.imageUrl}
                      alt="Uploaded Image"
                      width={1500}
                      height={500}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
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
            </div>
            <CldUploadButton
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
              onSuccess={handleImageUploadSuccess}
              className="orange_btn w-full h-10"
              onUploadAdded={(result) => {
                handleImageUploadSuccess(result);
                console.log("Uploaded image URL:", result.info.secure_url);
              }}
            />
          </div>
        </div>

        {/* Right side */}
        <div className="right-side min-w-1/2 flex-1 grid gap-4 mb-4">
          <div className="col-span-1 w-full overflow-y-auto max-h-[450px] pl-4">
            <h3 className="text-xl font-medium text-white mb-2">
              Program Form
            </h3>
            <div className="space-y-4 mb-4">
              <TextInput
                id="title"
                name="title"
                placeholder="Title"
                type="text"
                onChange={handleInputChange}
                required={true}
                value={localData.title}
                sizing="md"
              />
              <Textarea
                id="description"
                name="description"
                placeholder="Description"
                type="text"
                onChange={handleInputChange}
                required={true}
                value={localData.description}
                rows={11}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row items-center sm:justify-between justify-center pt-3">
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

        <Button
          onClick={handleNextPage}
          className="orange_btn inline-flex items-center"
          type="button"
        >
          {pageNames[1]} <FaChevronRight className="ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default InformationForm;
