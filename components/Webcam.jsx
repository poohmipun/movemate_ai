"use client";
import React, { useEffect, useState, useRef } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs-core";

const Webcam = () => {
  const [poses, setPoses] = useState([]);
  const [videoInitialized, setVideoInitialized] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const videoRef = useRef(null);
  const detectorRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const initializeWebcam = async () => {
      try {
        await tf.setBackend("webgpu");
        console.log("TensorFlow.js backend set to webgpu.");

        await tf.ready();
        console.log("TensorFlow.js backend is ready.");

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setVideoInitialized(true);
          console.log("Webcam initialized successfully.");
        }
      } catch (error) {
        console.error("Error initializing webcam:", error);
      }
    };

    initializeWebcam();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (detectorRef.current) {
        detectorRef.current.dispose();
      }
      const stream = videoRef.current?.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    const initializePoseDetector = async () => {
      try {
        if (videoInitialized && !modelLoaded) {
          const detectorConfig = {
            modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
          };
          const detector = await poseDetection.createDetector(
            poseDetection.SupportedModels.MoveNet,
            detectorConfig
          );
          console.log("Pose detector initialized successfully.");
          detectorRef.current = detector;
          setModelLoaded(true);

          const getPoses = async () => {
            if (!videoRef.current) return; // Ensure videoRef is available
            const newPoses = await detector.estimatePoses(videoRef.current);
            console.log(newPoses);
            setPoses(newPoses);
            animationFrameRef.current = requestAnimationFrame(getPoses);
          };

          getPoses();
        }
      } catch (error) {
        console.error("Error initializing pose detector:", error);
      }
    };

    if (videoInitialized && !modelLoaded) {
      initializePoseDetector();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [videoInitialized, modelLoaded]);

  return (
    <video
      ref={videoRef}
      autoPlay
      width="100%"
      height="100%"
      style={{ objectFit: "cover" }}
    />
  );
};

export default Webcam;
