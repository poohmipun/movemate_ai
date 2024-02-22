"use client";
import React, { useEffect, useState, useRef } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs-core";

<<<<<<< Updated upstream
const Webcam = () => {
  const [poses, setPoses] = useState([]);
  const [videoInitialized, setVideoInitialized] = useState(false);
=======
const Webcam = ({ sendKeypointsCount }) => {
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      if (detectorRef.current) {
        detectorRef.current.dispose();
      }
      const stream = videoRef.current?.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
=======
      /* if (videoRef.current) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop()); // Stop webcam tracks
      } */
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======

    const drawKeypoints = (p5) => {
      let Numkeypoints = 0;
      const poses = posesRef.current;
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

      p5.fill(255, 0, 0); // Red color for keypoints
      p5.noStroke();
      poses.forEach((pose) => {
        pose.keypoints.forEach((keypoint) => {
          const { x, y, score, name } = keypoint;
          if (score > 0.3) {
            Numkeypoints++;
            const color = colors[name];
            p5.fill(color);
            // Adjust the coordinates to match the canvas's coordinate system
            const canvasX = (x / videoRef.current.width) * p5.width;
            const canvasY = (y / videoRef.current.height) * p5.height;
            p5.ellipse(canvasX, canvasY, 10, 10);
            p5.text(name, canvasX, canvasY - 5);
          }
        });
      });
      sendKeypointsCount(Numkeypoints); // Send the number of keypoints to the parent component
    };
  };

  return <ReactP5Wrapper sketch={sketch} />;
>>>>>>> Stashed changes
};

export default Webcam;
