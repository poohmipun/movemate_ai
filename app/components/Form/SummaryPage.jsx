import React, { useState, useEffect } from "react";
import { Button, Card, Breadcrumb } from "flowbite-react";
import Image from "next/image";
import {
  FaChevronLeft,
  FaCloudDownloadAlt,
  FaLessThanEqual,
} from "react-icons/fa";

const SummaryPage = ({
  formData,
  onPreviousPage,
  currentPage,
  pageNames,
  handleStatusUpdate,
  onCloseModal,
}) => {
  console.log("SummaryPage: Received handleStatusUpdate");
  const [submitStatus, setSubmitStatus] = useState("");
  const [localData, setLocalData] = useState({
    title: formData.title || "",
    description: formData.description || "",
    imageUrl: formData.imageUrl || "",
    start_condition: formData.start_condition || [],
    end_condition: formData.end_condition || [],
  });

  const handleSubmit = async () => {
    try {
      const formDataToSend = {
        title: formData.title,
        description: formData.description,
        img_url: formData.imageUrl, // Ensure this is correctly populated
        start_condition: formData.start_condition,
        end_condition: formData.end_condition,
      };

      console.log("SummaryPage: Sending data", formDataToSend);

      const res = await fetch("/api/Programs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToSend),
      });

      if (!res.ok) {
        const errorResponse = await res.json(); // Get more detail on the error
        throw new Error(`Failed to create program: ${errorResponse.message}`);
      }

      const response = await res.json();
      handleStatusUpdate("Form has been successfully created.");
      onCloseModal();
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("SummaryPage: Error creating program", error);
      handleStatusUpdate(`Failed to create the program: ${error.message}`);
    }
  };

  const handlePreviousPage = () => {
    onPreviousPage(localData); // Send the updated form data to the parent component
  };

  const renderToastForm = (toast) => (
    <div
      key={toast.id}
      className="flex mt-2 min-w-full p-4 bg-gray-200 rounded-lg"
    >
      <div className="flex flex-col w-full">
        <h4 className="mb-2 text-xl font-bold text-blue-900">
          {toast.condition}
        </h4>
        <div className="flex flex-wrap items-center justify-between gap-2">
          {toast.condition === "Keypoint Rotation" ? (
            <>
              <p className="text-sm">{toast.formData.radius1 || "N/A"}</p>
              <FaLessThanEqual className="text-blue-900" />
              <p className="text-sm">
                {toast.formData.selectedKeypoint || "N/A"}
              </p>
              <FaLessThanEqual className="text-blue-900" />
              <p className="text-sm">{toast.formData.radius2 || "N/A"}</p>
            </>
          ) : (
            <>
              <p className="text-sm">{toast.formData.lowerKeypoint || "N/A"}</p>
              <FaChevronLeft className="text-blue-900" />
              <p className="text-sm">{toast.formData.upperKeypoint || "N/A"}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 divide-y overflow-y-auto max-h-[1200px]">
      <div className="modal-container grid xl:space-x-8 xl:grid-cols-2">
        <div className="grid grid-cols-1 auto-rows-max max-h-[600px] gap-4 overflow-auto">
          <h3 className="text-3xl font-bold text-white text-left max-w-full truncate ">
            {formData.title}
          </h3>
          {formData.imageUrl && (
            <Image
              src={formData.imageUrl}
              alt="Uploaded Image"
              layout="responsive"
              objectFit="contain"
              width={230}
              height={230}
              className="max-h-[300px] rounded-xl"
            />
          )}
          <p className="text-lg font-medium text-white mb-4 ">
            {formData.description}
          </p>
        </div>
        <div className="min-w-1/2 grid grid-cols-1 mb-4">
          <h3 className="text-xl font-medium text-white">Start Conditions</h3>
          <div className="overflow-y-auto max-h-[450px] pl-2 text-black">
            {formData.start_condition.map(renderToastForm)}
          </div>
          <h3 className="text-xl font-medium text-white mt-4">
            End Conditions
          </h3>
          <div className="overflow-y-auto max-h-[450px] pl-2 text-black">
            {formData.end_condition.map(renderToastForm)}
          </div>
        </div>
      </div>
      {/* Navigation and Action Buttons */}
      <div className="w-full flex flex-row items-center sm:justify-between justify-center pt-3">
        {currentPage > 0 && (
          <Button
            onClick={handlePreviousPage}
            className="orange_btn"
            type="button"
          >
            <FaChevronLeft className="mr-1" /> End Position
          </Button>
        )}
        <Button
          onClick={handleSubmit}
          className="orange_btn inline-flex items-center"
          type="button"
        >
          Create Program <FaCloudDownloadAlt className="ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default SummaryPage;
