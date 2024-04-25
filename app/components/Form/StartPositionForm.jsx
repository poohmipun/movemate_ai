import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Label,
  Textarea,
  TextInput,
  Modal,
  Breadcrumb,
  Dropdown,
  Flowbite,
  Select,
} from "flowbite-react";
import { FaMapMarkerAlt, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { FaGreaterThanEqual, FaLessThanEqual } from "react-icons/fa6";
import { FiRotateCw } from "react-icons/fi";

const StartPositionForm = ({
  page2FormData,
  setPage2FormData,
  handleAddToast,
  handleCloseToast,
  handleInputChange,
  renderToasts,
}) => {
  const memoizedRenderToasts = useMemo(() => renderToasts(), [renderToasts]);

  return (
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
          <h3 className="text-xl font-medium text-white mb-2">Program Form</h3>
          <div className="flex flex-wrap ">
            <Dropdown label="Add conditions " size="lg" className="min-w-full">
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
            {memoizedRenderToasts}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartPositionForm;
