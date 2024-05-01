"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import Webcam from "../../components/Webcam";
import Image from "next/image";
import { ProgramContext } from "../../context/ProgramContext";
import { Timeline, Progress, Card } from "flowbite-react";

const ExerciseManager = () => {
  const { selectedPrograms } = useContext(ProgramContext);
  console.log(selectedPrograms);
  const handleSendKeypointsCount = (count) => {};

  return (
    <div className="w-full max-h-screen flex flex-col overflow-hidden">
      <div className="flex flex-col gap-10 lg:flex-row max-h-screen">
        <div className="w-full h-screen font-bold text-white text-2xl sm:text-3xl pb-2 relative">
          {/* Webcam Component */}
          <Webcam onKeypointsCountChange={handleSendKeypointsCount} />

          {/* Dynamic Timeline */}
          <div className="absolute bottom-10 left-0 w-full px-6 z-10 flex  justify-center items-center ">
            {selectedPrograms.map((program, index) => (
              <div
                key={index}
                className="min-w-32 w-full flex items-center text-lg text-center"
              >
                <Image
                  src={program.img_url} // Dynamically use the `img_url` property
                  layout="responsive"
                  objectFit="cover"
                  width={10}
                  height={10}
                  className="max-w-[60px] rounded-sm"
                  alt={`${program.title} image`} // Alternative text with the program title
                />
                <div className="w-full ">
                  <div class="w-full bg-gray-200 ">
                    <div
                      class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none "
                      style={{ width: "5%" }}
                    >
                      {" "}
                      45%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseManager;
