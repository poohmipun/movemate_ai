import React, { useState, useEffect, useMemo } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";

let ReactP5Wrapper;
if (typeof window !== "undefined") {
  ReactP5Wrapper = require("@p5-wrapper/react").ReactP5Wrapper;
}

const Webcam = ({
  onKeypointsCountChange,
  containerWidth,
  containerHeight,
}) => {
  const [keypoints, setKeypoints] = useState([]);
  const [Numkeypoint, setNumkeypoint] = useState(0);
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

  useEffect(() => {
    const init = async () => {
      const initVideoStream = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          setVideoStream(stream);
          setLoading((prevState) => ({ ...prevState, step1: false }));
        } catch (error) {
          console.error("Error accessing webcam:", error);
        }
      };
      initVideoStream();
      const currentBackend = tf.getBackend();
      if (currentBackend !== "webgl") {
        try {
          await tf.setBackend("webgl");
          await tf.ready();
          console.log("TensorFlow.js is ready.");

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
        } catch (error) {
          console.error("Error loading pose detection model:", error);
        }
      } else {
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
    };

    init();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate the number of keypoints
      const numKeypoints = keypoints.filter(
        (keypoint) => keypoint.score > 0.3
      ).length;
      // Update the state with the new value
      setNumkeypoint(numKeypoints);
      // Trigger the callback with the new value
      onKeypointsCountChange(numKeypoints);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [keypoints, onKeypointsCountChange]);

  const sketch = useMemo(() => {
    const drawKeypoints = (predictions, video, p5) => {
      const filteredKeypoints = predictions[0].keypoints.filter(
        (keypoint) => keypoint.score > 0.3
      );

      filteredKeypoints.forEach(({ x, y, score }) => {
        p5.fill(255);
        p5.noStroke();
        const canvasX = (x / video.elt.videoWidth) * p5.width;
        const canvasY = (y / video.elt.videoHeight) * p5.height;
        p5.ellipse(canvasX, canvasY, 5, 5);
      });
    };
    const drawSkeleton = (predictions, video, p5) => {
      if (predictions && predictions.length > 0) {
        const confidence_threshold = 0.5;
        for (const [key, value] of Object.entries(edges)) {
          const p = key.split(",");
          const p1 = p[0];
          const p2 = p[1];

          const keypoint1 = predictions[0].keypoints[p1];
          const keypoint2 = predictions[0].keypoints[p2];

          if (
            keypoint1.score > confidence_threshold &&
            keypoint2.score > confidence_threshold
          ) {
            p5.strokeWeight(2);
            // Set default color
            p5.stroke("rgb(255, 255, 255)");

            // Normalize coordinates
            const normX1 = keypoint1.x / video.elt.videoWidth;
            const normY1 = keypoint1.y / video.elt.videoHeight;
            const normX2 = keypoint2.x / video.elt.videoWidth;
            const normY2 = keypoint2.y / video.elt.videoHeight;

            // Transform to canvas coordinates
            const canvasX1 = normX1 * p5.width;
            const canvasY1 = normY1 * p5.height;
            const canvasX2 = normX2 * p5.width;
            const canvasY2 = normY2 * p5.height;

            p5.line(canvasX1, canvasY1, canvasX2, canvasY2);
          }
        }
      }
    };
    return (p5) => {
      let video;

      p5.setup = () => {
        const w = containerWidth;
        const h = containerHeight;
        p5.createCanvas(w, h);
        video = p5.createCapture(p5.VIDEO);
        video.hide();
        p5.frameRate(30);
      };

      p5.draw = async () => {
        p5.background(255);
        const predictions = await detector.estimatePoses(video.elt);
        p5.image(video, 0, 0, p5.width, p5.height);
        if (predictions && predictions.length > 0) {
          const filteredKeypoints = predictions[0].keypoints.filter(
            (keypoint) => keypoint.score > 0.3
          );
          setKeypoints(predictions[0].keypoints);
          drawKeypoints(predictions, video, p5);
          drawSkeleton(predictions, video, p5);
        }
      };
    };
  }, [detector, containerWidth, containerHeight]);

  if (loading.step1 || loading.step2) {
    return (
      <div className="flex items-center justify-center ">
        <ul>
          <li className="flex items-center">
            <div role="status">
              {loading.step1 ? (
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
    );
  }
  return <ReactP5Wrapper sketch={sketch} />;
};

export default Webcam;
