"use client";
import React, { useState, useEffect, useRef } from "react";
import Webcam from "@components/Webcam";
import Image from "next/image";
import Link from "next/link";

const Exercise = () => {
  const webcamContainerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [openWebcam, setOpenWebcam] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(true);
  const [showWarningAlert, setShowWarningAlert] = useState(false);
  const [numKeypoints, setNumKeypoints] = useState(0);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [keypointsCount, setKeypointsCount] = useState(0);

  useEffect(() => {
    if (webcamContainerRef.current) {
      const { offsetWidth, offsetHeight } = webcamContainerRef.current;
      setContainerWidth(offsetWidth);
      setContainerHeight(offsetHeight);
    }
  }, []);

  const handleSendKeypointsCount = (count) => {
    setNumKeypoints(count);
    if (count === 17 && !showSuccessAlert) {
      setShowSuccessAlert(true);
      setShowWarningAlert(false);
    } else if (!showSuccessAlert && count !== 17) {
      setShowWarningAlert(true);
    }
  };

  const handleButtonClick = () => {
    if (showSuccessAlert && !buttonClicked) {
      setButtonClicked(true);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-col gap-10 lg:flex-row max-h-screen">
        <div className="w-full h-screen font-bold text-white text-2xl sm:text-3xl pt-4 pb-2">
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
                <span className="font-medium">Success alert!</span> Your webcam
                is capturing the full body. Ready for tracking!
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
                <span className="font-medium">Warning alert!</span> Please
                ensure that the camera is capable of capturing your entire body.
              </div>
            </div>
          )}
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
            className="w-full h-4/5 flex justify-center bg-black border-dashed border-2 border-orange-500 rounded-md overflow-hidden"
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
          <div className="flex mt-6 justify-between">
            <Link href="/" className="orange_btn ">
              Go back
            </Link>
            <Link
              href="exercise/programs"
              disabled={!showSuccessAlert}
              className={`orange_btn ${
                !showSuccessAlert ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <svg
                aria-hidden="true"
                role="status"
                className={`inline w-4 h-4 me-3 text-white animate-spin ${
                  !showSuccessAlert ? "" : "hidden"
                }`}
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              {showSuccessAlert
                ? "Choose Program"
                : "Ensure webcam captures full body"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exercise;
