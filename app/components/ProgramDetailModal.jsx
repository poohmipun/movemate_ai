import React from "react";
import { Modal } from "flowbite-react";
import Image from "next/image"; // Assuming you are using 'next/image' for images
import { FaLessThanEqual, FaChevronLeft } from "react-icons/fa"; // Ensure these are imported

const ProgramDetailModal = ({ program, isOpen, onClose }) => {
  if (!program) return null;

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
    <div className="flex w-full h-full">
      <Modal show={isOpen} size="8xl" onClose={onClose}>
        <div className="bg-gradient-to-tr from-black to-indigo-800 rounded-md text-white">
          <Modal.Header>
            <div className="text-white font-bold text-3xl">{program.title}</div>
          </Modal.Header>
          <Modal.Body>
            <div className="grid grid-cols-1 divide-y overflow-y-auto max-h-[1200px]">
              <div className="modal-container grid xl:space-x-8 xl:grid-cols-2">
                <div className="grid grid-cols-1 auto-rows-max max-h-[600px] gap-4 overflow-auto">
                  {program.img_url && (
                    <Image
                      src={program.img_url}
                      alt="Uploaded Image"
                      layout="responsive"
                      width={230}
                      height={230}
                      className="max-h-[300px] rounded-xl"
                    />
                  )}
                  <p className="text-lg font-medium text-white mb-4 ">
                    {program.description}
                  </p>
                </div>
                <div className="min-w-1/2 grid grid-cols-1 mb-4">
                  <h3 className="text-xl font-medium text-white">
                    Start Conditions
                  </h3>
                  <div className="overflow-y-auto max-h-[450px] pl-2 text-black">
                    {program.start_condition.map(renderToastForm)}
                  </div>
                  <h3 className="text-xl font-medium text-white mt-4">
                    End Conditions
                  </h3>
                  <div className="overflow-y-auto max-h-[450px] pl-2 text-black">
                    {program.end_condition.map(renderToastForm)}
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
};
export default ProgramDetailModal;
