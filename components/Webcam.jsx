"use client";
import React, { useState, useEffect, useRef } from "react";
import CanvasSketch from "./CanvasSketch";
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';

const Webcam = ({
  onKeypointsCountChange,
  containerWidth,
  containerHeight,
}) => {
  const [videoStream, setVideoStream] = useState(null);
  const [detector, setDetector] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const setupDetector = async () => {
      try {
        await tf.setBackend("webgl");
        await tf.ready();
        console.log("TensorFlow.js is ready.");

        const det = await poseDetection.createDetector(
          poseDetection.SupportedModels.MoveNet,
          {
            modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
          }
        );
        console.log("Pose detection model is loaded.");
        setDetector(det);
      } catch (error) {
        console.error("Error loading pose detection model:", error);
      }
    };

    setupDetector();
  }, []);

  useEffect(() => {
    const initVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setVideoStream(stream);
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    initVideoStream();
  }, []);

  return (
    <>
      {videoStream && detector && (
        <CanvasSketch
          videoStream={videoStream}
          detector={detector}
          onKeypointsCountChange={onKeypointsCountChange}
          containerWidth={containerWidth}
          containerHeight={containerHeight}
        />
      )}
    </>
  );
};

export default Webcam;
