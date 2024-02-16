"use client";
import React, { useState } from "react";
import Webcam from "@components/Webcam";
import Image from "next/image";

const Exercise = () => {
  const [openWebcam, setOpenWebcam] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showWarningAlert, setShowWarningAlert] = useState(true);

  return (
    <div className="w-full h-full flex flex-col pt-12 pb-12">
      <div className="flex flex-col gap-10 lg:flex-row max-h-screen">
        {/* Left side content can be added here */}
        <div className="w-full h-screen font-bold text-white text-2xl sm:text-3xl bg-red-200">
          {/* Alert components */}
          {showSuccessAlert && (
            <div
              className="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Success alert!</span> Change a few
                things up and try submitting again.
              </div>
            </div>
          )}
          {showWarningAlert && (
            <div
              className="flex items-center p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Warning alert!</span> Change a few
                things up and try submitting again.
              </div>
            </div>
          )}
          <label
            className="absolute p-3 flex flex-col items-center cursor-pointer z-10"
            onClick={() => setOpenWebcam((prevState) => !prevState)}
          >
            <Image
              src="/images/camera.svg"
              alt="camera icon"
              width={30}
              height={30}
              className="flex cursor-pointer mb-4 "
              onClick={() => setOpenWebcam((prevState) => !prevState)}
            />
            {/* Toggle button */}
            <div className="flex">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={openWebcam}
                onChange={() => setOpenWebcam((prevState) => !prevState)}
              />
              <div
                className={`relative w-11 h-6 bg-${
                  openWebcam
                    ? "bg-gradient-to-r from-amber-500 to-orange-600"
                    : "white"
                } peer-focus:outline-none peer-focus:ring-3 peer-focus:ring-red-200 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gradient-to-r from-amber-500 to-orange-600`}
              ></div>
            </div>
          </label>
          {openWebcam && <Webcam className="flex h-max" />}
          <div
            className={`w-full h-100vh flex justify-center bg-black border-dashed border-2 border-orange-500 rounded-md ${
              openWebcam ? "hidden" : ""
            }`}
          >
            <Image
              src="/images/preview.svg"
              width={100}
              height={100}
              className="h-full"
              alt="preview"
            />
            {/* Camera icon */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exercise;
