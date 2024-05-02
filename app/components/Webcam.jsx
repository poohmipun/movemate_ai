"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import Image from "next/image";
let ReactP5Wrapper;
if (typeof window !== "undefined") {
  ReactP5Wrapper = require("@p5-wrapper/react").ReactP5Wrapper;
}
import {
  checkKeypointRotationCondition,
  checkKeypointPositionCondition,
} from "../utils/calculator";

const Webcam = ({ program, onWorkoutProgress }) => {
  const videoStreamRef = useRef(null);
  const [openWebcam, setOpenWebcam] = useState(false);
  const [keypoints, setKeypoints] = useState(0);
  const [videoStream, setVideoStream] = useState(null);
  const [detector, setDetector] = useState(null);
  const [loading, setLoading] = useState({
    step1: true,
    step2: true,
  });
  const edges = {
    "5,7": "m",
    "7,9": "m",
    "6,8": "c",
    "8,10": "c",
    "5,6": "y",
    "5,11": "m",
    "6,12": "c",
    "11,12": "y",
    "11,13": "m",
    "13,15": "m",
    "12,14": "c",
    "14,16": "c",
  };
  const [haveStarted, setHaveStarted] = useState(false);
  const [repCount, setRepCount] = useState(0);

  useEffect(() => {
    const init = async () => {
      const initVideoStream = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          videoStreamRef.current = stream;
          setLoading((prevState) => ({ ...prevState, step1: false }));
        } catch (error) {
          console.error("Error accessing webcam:", error);
        }
      };

      const loadPoseDetectionModel = async () => {
        try {
          // Check if the model is already loaded
          if (!detector) {
            const currentBackend = tf.getBackend();
            if (currentBackend !== "webgl") {
              await tf.setBackend("webgl");
              await tf.ready();
              console.log("TensorFlow.js is ready.");
            }
            setLoading((prevState) => ({ ...prevState, step2: true }));
            const det = await poseDetection.createDetector(
              poseDetection.SupportedModels.MoveNet,
              {
                modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
                edges: {
                  "5,7": "m",
                  "7,9": "m",
                  "6,8": "c",
                  "8,10": "c",
                  "5,6": "y",
                  "5,11": "m",
                  "6,12": "c",
                  "11,12": "y",
                  "11,13": "m",
                  "13,15": "m",
                  "12,14": "c",
                  "14,16": "c",
                },
              }
            );
            console.log("Pose detection model is loaded.");
            setDetector(det);
            setLoading((prevState) => ({ ...prevState, step2: false }));
          }
        } catch (error) {
          console.error("Error loading pose detection model:", error);
        }
      };
      if (openWebcam) {
        console.log("Initializing video stream...");
        initVideoStream();
        console.log("Loading pose detection model...");
        loadPoseDetectionModel();
      } else {
        console.log("Stopping video stream...");
        stopVideoStream();
      }
    };

    init();

    return () => {
      console.log("Cleaning up...");
      stopVideoStream();
    };
  }, [openWebcam, detector]);

  const stopVideoStream = () => {
    const videoStream = videoStreamRef.current;

    if (videoStream) {
      videoStream.getTracks().forEach((track) => {
        track.stop();
      });
      console.log("Video stream stopped.");
    }
  };

  const checkConditions = (keypoints) => {
    const checkCondition = (condition) => {
      return condition.type === "Keypoint Rotation"
        ? checkKeypointRotationCondition(keypoints, condition)
        : checkKeypointPositionCondition(keypoints, condition);
    };

    const conditionsMet = (conditions) => conditions.every(checkCondition);

    // Check if the workout has started and end conditions are met
    if (haveStarted && conditionsMet(program.end_condition)) {
      console.log("End conditions met. Moving back to start conditions.");
      setHaveStarted(false); // Reset haveStarted flag
      setRepCount((prev) => prev + 1); // Increment rep count
      console.log(`Rep completed. Total reps: ${repCount + 1}`);
    }

    // Check if the workout hasn't started and start conditions are met
    if (!haveStarted && conditionsMet(program.start_condition)) {
      console.log("Start condition met. Moving to end conditions.");
      setHaveStarted(true); // Set haveStarted flag
    }

    const progressPercentage = Math.min((repCount / program.reps) * 100, 100);
    onWorkoutProgress(progressPercentage);
  };

  const sketch = useMemo(() => {
    const drawKeypoints = (filteredKeypoints, video, p5) => {
      const colors = {
        nose: [255, 0, 0],
        left_eye: [0, 0, 255],
        right_eye: [0, 255, 0],
        left_ear: [255, 165, 0],
        right_ear: [128, 0, 128],
        left_shoulder: [255, 255, 0],
        right_shoulder: [255, 192, 203],
        left_elbow: [0, 255, 255],
        right_elbow: [255, 0, 255],
        left_wrist: [0, 255, 0],
        right_wrist: [75, 0, 130],
        left_hip: [0, 128, 128],
        right_hip: [238, 130, 238],
        left_knee: [255, 215, 0],
        right_knee: [192, 192, 192],
        left_ankle: [165, 42, 42],
        right_ankle: [0, 0, 0],
      };

      filteredKeypoints.forEach(({ x, y, score, name }) => {
        const color = colors[name];
        p5.fill(color);
        p5.noStroke();
        const canvasX = (x / video.elt.videoWidth) * p5.width;
        const canvasY = (y / video.elt.videoHeight) * p5.height;
        p5.ellipse(canvasX, canvasY, 8, 8);
        p5.text(name, canvasX, canvasY - 5);
      });
    };

    const drawSkeleton = (predictions, video, p5) => {
      if (predictions && predictions.length > 0) {
        const confidenceThreshold = 0.5;
        for (const [key] of Object.entries(edges)) {
          const [p1Index, p2Index] = key.split(",");
          const keypoint1 = predictions[0].keypoints[p1Index];
          const keypoint2 = predictions[0].keypoints[p2Index];

          if (
            keypoint1.score > confidenceThreshold &&
            keypoint2.score > confidenceThreshold
          ) {
            p5.strokeWeight(2);
            p5.stroke("rgb(255, 255, 255)");

            const canvasX1 = (keypoint1.x / video.elt.videoWidth) * p5.width;
            const canvasY1 = (keypoint1.y / video.elt.videoHeight) * p5.height;
            const canvasX2 = (keypoint2.x / video.elt.videoWidth) * p5.width;
            const canvasY2 = (keypoint2.y / video.elt.videoHeight) * p5.height;

            p5.line(canvasX1, canvasY1, canvasX2, canvasY2);
          }
        }
      }
    };

    return (p5) => {
      let video;

      p5.setup = () => {
        const waitForContainer = setInterval(() => {
          const container = document.getElementById("webcam-container");
          if (container.offsetWidth && container.offsetHeight) {
            clearInterval(waitForContainer);
            createCanvas(container.offsetWidth, container.offsetHeight);
          }
        }, 100);
      };

      function createCanvas(w, h) {
        const canvas = p5.createCanvas(w, h);
        canvas.parent("webcam-container");
        video = p5.createCapture(p5.VIDEO);
        video.hide();
        p5.frameRate(30);
      }

      p5.draw = async () => {
        if (video && video.width > 0 && video.height > 0) {
          const predictions = await detector.estimatePoses(video.elt);
          p5.image(video, 0, 0, p5.width, p5.height);
          if (predictions && predictions.length > 0) {
            const filteredKeypoints = predictions[0].keypoints.filter(
              (keypoint) => keypoint.score > 0.3
            );
            drawKeypoints(filteredKeypoints, video, p5);
            drawSkeleton(predictions, video, p5);
            checkConditions(filteredKeypoints);
          }
        }
      };
    };
  }, [detector]);

  return (
    <div className="w-full h-full">
      <label
        className="absolute p-3 flex flex-col items-center cursor-pointer z-10"
        onClick={() => setOpenWebcam((prevState) => !prevState)}
      >
        <svg
          className={`w-12 h-12 ${openWebcam ? "text-blue-600" : "text-white"}`}
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
                ? "bg-gradient-to-r from-blue-500 to-cyan-600"
                : "white"
            } peer-focus:outline-none peer-focus:ring-3 peer-focus:ring-blue-200 dark:peer-focus:ring-cyan-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gradient-to-r from-blue-500 to-cyan-600`}
          ></div>
        </div>
      </label>
      <div
        className="w-full h-full flex justify-center overflow-hidden "
        id="webcam-container"
      >
        {openWebcam ? (
          <>
            {loading.step1 || loading.step2 ? (
              <div className="flex items-center justify-center ">
                <ul className="text-[14px] sm:text-3xl">
                  <li className="flex items-center">
                    <div role="status">
                      {loading.step1 ? (
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="w-6 h-6 me-2 text-gray-200 animate-spin fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <svg
                          className="w-6 h-6 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                      )}
                      <span className="sr-only">Loading...</span>
                    </div>
                    {loading.step1
                      ? "Getting your webcam ready"
                      : "Webcam setup finished!"}
                  </li>
                  <li className="flex items-center">
                    <div role="status">
                      {loading.step2 ? (
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="w-6 h-6 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <svg
                          className="w-6 h-6 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                      )}
                      <span className="sr-only">Loading...</span>
                    </div>
                    {loading.step2 ? "Loading the model" : " Model loaded!"}
                  </li>
                </ul>
              </div>
            ) : (
              <ReactP5Wrapper sketch={sketch} />
            )}
          </>
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
  );
};

export default Webcam;
