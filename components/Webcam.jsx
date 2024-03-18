"use client";
import React, { useState } from "react";
let ReactP5Wrapper;
if (typeof window !== "undefined") {
  ReactP5Wrapper = require("@p5-wrapper/react").ReactP5Wrapper;
}
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";

const KeypointDetectorSketch = (p5, props) => {
  const { sendKeypointsCount } = props;
  let video;
  let detector;
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
  const setupDetector = async () => {
    try {
      await tf.setBackend("webgl");
      tf.ready();
      console.log("TensorFlow.js is ready.");

      detector = await poseDetection.createDetector(
        poseDetection.SupportedModels.MoveNet,
        {
          modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
        }
      );
      console.log("Pose detection model is loaded.");
    } catch (error) {
      console.error("Error loading pose detection model:", error);
    }
  };
  p5.setup = () => {
    const container = document.getElementById("webcam-container");
    const w = container.offsetWidth;
    const h = container.offsetHeight;
    p5.createCanvas(w, h);
    video = p5.createCapture(p5.VIDEO, () => {
      setupDetector();
    });
    video.hide(); // Hide the video element
  };

  p5.draw = async () => {
    if (video && detector) {
      const predictions = await detector.estimatePoses(video.elt);
      p5.image(video, 0, 0, p5.width, p5.height); // Draw video feed first
      if (predictions && predictions.length > 0) {
        drawKeypoints(predictions[0].keypoints); // Draw keypoints on top of the video feed
      }
    }
  };

  const drawKeypoints = (keypoints) => {
    let count = 0;

    keypoints.forEach((keypoint) => {
      const { x, y, score, name } = keypoint;
      if (score > 0.3) {
        count++;
        const color = colors[name];
        p5.fill(color[0], color[1], color[2]); // Set fill color based on keypoint
        p5.noStroke(); // Disable stroke
        const canvasX = (x / video.width) * p5.width;
        const canvasY = (y / video.height) * p5.height;
        p5.ellipse(canvasX, canvasY, 10, 10); // Draw keypoints as circles
        p5.text(name, canvasX, canvasY - 5); // Draw keypoint name
      }
    });
    return count;
    setKeypointsCount(count);
  };
};

const KeypointDetector = () => {
  const [keypointsCount, setKeypointsCount] = useState(0);

  const handleSendKeypointsCount = (count) => {
    setKeypointsCount(count);
  };

  return (
    <ReactP5Wrapper
      sketch={(p) =>
        KeypointDetectorSketch(p, {
          sendKeypointsCount: handleSendKeypointsCount,
        })
      }
    />
  );
};

export default KeypointDetector;
