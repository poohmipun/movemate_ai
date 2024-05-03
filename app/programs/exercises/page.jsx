"use client";
import React, { useState, useContext, useEffect } from "react";
import Webcam from "../../components/Webcam";
import { ProgramContext } from "../../context/ProgramContext";
import Image from "next/image";

const ExerciseManager = () => {
  const { selectedPrograms } = useContext(ProgramContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState({});

  /*  const handleWorkoutProgress = (progressPercentage) => {
    const currentProgram = selectedPrograms[currentIndex];
    setProgress((prev) => ({
      ...prev,
      [currentProgram._id]: progressPercentage,
    }));

    // Logic to move to the next program if progress is complete
    if (
      progressPercentage === 100 &&
      currentIndex < selectedPrograms.length - 1
    ) {
      setCurrentIndex((prev) => prev + 1);
    }
  }; */

  /* useEffect(() => {
    if (selectedPrograms.length > 0) {
      setProgress({});
      setCurrentIndex(0);
    }
  }, [selectedPrograms]); */

  return (
    <div className="w-full max-h-screen flex flex-col overflow-hidden">
      <div className="flex flex-col gap-10 lg:flex-row max-h-screen">
        <div className="w-full h-screen font-bold text-white text-2xl sm:text-3xl pb-2 relative">
          {selectedPrograms.length > 0 && (
            <Webcam
            /* program={selectedPrograms[currentIndex]}
              onWorkoutProgress={handleWorkoutProgress} */
            />
          )}

          <div className="absolute bottom-10 left-0 w-full px-6 z-10 flex justify-center items-center">
            {selectedPrograms.map((program) => (
              <div
                key={program._id}
                className="min-w-32 w-full flex items-center text-lg text-center"
              >
                <Image
                  src={program.img_url}
                  layout="responsive"
                  objectFit="cover"
                  width={10}
                  height={10}
                  className="max-w-[60px] rounded-sm"
                  alt={`${program.title} image`}
                />
                <div className="w-full">
                  <div className="w-full bg-gray-200">
                    <div
                      className="bg-blue-600 text-xs font-bold  text-black text-center p-0.5 leading-none"
                      style={{ width: `${progress[program._id] || 0}%` }}
                    >
                      {`${progress[program._id] || 0}%`}
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
