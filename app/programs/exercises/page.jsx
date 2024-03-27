"use client";
import React, { useState, useEffect, useRef } from "react";
import Webcam from "@components/Webcam";
import Image from "next/image";

const ExerciseManager = () => {
  const webcamContainerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [openWebcam, setOpenWebcam] = useState(false);
  const [numKeypoints, setNumKeypoints] = useState(0);
  const [keypointsCount, setKeypointsCount] = useState(0);

  const handleSendKeypointsCount = (count) => {};
  return (
    <div className="w-full h-full flex flex-col ">
      <div className="flex flex-col gap-10 lg:flex-row max-h-screen">
        <div className="w-full h-screen font-bold text-white text-2xl sm:text-3xl pb-2">
          <label
            className="absolute p-3 flex flex-col items-center cursor-pointer z-10"
            onClick={() => setOpenWebcam((prevState) => !prevState)}
          >
            <svg
              className={`w-12 h-12 ${
                openWebcam ? "text-orange-600" : "text-white"
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill={openWebcam ? "currentColor" : "white"}
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 6H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h10c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1Zm7 11-6-2V9l6-2v10Z"
              />
            </svg>
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
          <div
            ref={webcamContainerRef}
            id="webcam-container"
            className="w-full h-full flex justify-center "
          >
            {openWebcam ? (
              <Webcam
                onKeypointsCountChange={handleSendKeypointsCount}
                containerWidth={containerWidth}
                containerHeight={containerHeight}
              />
            ) : (
              <Image
                src="/images/preview.svg"
                width={100}
                height={100}
                className="h-full w-1/2 p-12"
                priority
                alt="preview"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseManager;
