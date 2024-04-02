"use client";
import React, { useState, useEffect, useRef } from "react";
import Webcam from "../../components/Webcam";
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
          <Webcam onKeypointsCountChange={handleSendKeypointsCount} />
        </div>
      </div>
    </div>
  );
};

export default ExerciseManager;
