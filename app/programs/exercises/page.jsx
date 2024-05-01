"use client";
import React, { useState, useEffect, useRef } from "react";
import Webcam from "../../components/Webcam";
import Image from "next/image";

const ExerciseManager = () => {
  const handleSendKeypointsCount = (count) => {};
  return (
    <div className="w-full h-full flex flex-col ">
      <div className="flex flex-col lg:flex-row max-h-screen">
        <div className="w-full h-screen font-bold text-white text-2xl sm:text-3xl pb-2">
          <Webcam onKeypointsCountChange={handleSendKeypointsCount} />
        </div>
      </div>
    </div>
  );
};

export default ExerciseManager;
