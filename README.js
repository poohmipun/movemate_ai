"use client";
import React, { useEffect, useRef, useState } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import _ as poseDetection from "@tensorflow-models/pose-detection";
import _ as tf from "@tensorflow/tfjs-core";

const Webcam = () => {
const [modelLoaded, setModelLoaded] = useState(false);
const [detector, setDetector] = useState(null);
const videoRef = useRef(null);
const posesRef = useRef([]);

useEffect(() => {
const loadModel = async () => {
try {
await tf.setBackend("webgpu");
console.log("TensorFlow.js backend set to webgpu.");

        await tf.ready();
        console.log("TensorFlow.js backend is ready.");

        const detector = await poseDetection.createDetector(
          poseDetection.SupportedModels.MoveNet,
          { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING }
        );
        setDetector(detector);
        setModelLoaded(true);
      } catch (error) {
        console.error("Error loading pose detection model:", error);
      }
    };

    loadModel();

    // Cleanup function
    return () => {
      if (detector) {
        detector.dispose(); // Dispose the model when unmounting
      }
      if (videoRef.current) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop()); // Stop webcam tracks
      }
    };

}, []);

useEffect(() => {
const setupWebcam = async () => {
try {
const stream = await navigator.mediaDevices.getUserMedia({
video: true,
});
if (videoRef.current) {
videoRef.current.srcObject = stream;
// Wait for the video to be ready before setting modelLoaded to true
videoRef.current.onloadedmetadata = () => {
setModelLoaded(true);
};
}
} catch (error) {
console.error("Error accessing camera:", error);
}
};

    if (!modelLoaded) {
      setupWebcam();
    }

}, [modelLoaded]);

useEffect(() => {
const getPoses = async () => {
if (!detector || !videoRef.current) return;

      const poses = await detector.estimatePoses(videoRef.current.elt);
      console.log(poses);
      posesRef.current = poses;
    };

    if (modelLoaded) {
      const intervalId = setInterval(getPoses, 100); // Adjust the interval as needed

      // Cleanup function to clear the interval when component unmounts or model is no longer loaded
      return () => {
        clearInterval(intervalId);
      };
    }

}, [modelLoaded]);

// Your p5.js sketch code for drawing keypoints using posesRef.current

const sketch = (p5) => {
let video;

    p5.setup = () => {
      const container = document.getElementById("webcam-container");
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      p5.createCanvas(w, h);
      video = p5.createCapture(p5.VIDEO);
      video.hide();
      videoRef.current = video;
    };

    p5.draw = () => {
      p5.background(255);
      if (videoRef.current && modelLoaded && posesRef.current.length > 0) {
        p5.image(videoRef.current, 0, 0, p5.width, p5.height);
        drawKeypoints(p5);
      }
    };

    const drawKeypoints = (p5) => {
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
    };

};

return <ReactP5Wrapper sketch={sketch} />;
};

export default Webcam;
