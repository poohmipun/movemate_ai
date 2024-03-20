import React, { useEffect } from "react";
let ReactP5Wrapper;
if (typeof window !== "undefined") {
  ReactP5Wrapper = require("@p5-wrapper/react").ReactP5Wrapper;
}

const CanvasSketch = ({
  videoStream,
  detector,
  onKeypointsCountChange,
  containerWidth,
  containerHeight,
}) => {
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
  const sketch = (p5) => {
    let video;

    p5.setup = () => {
      const w = containerWidth;
      const h = containerHeight;
      p5.createCanvas(w, h);
      video = p5.createCapture(p5.VIDEO);
      video.hide();
    };

    p5.draw = async () => {
      if (
        video &&
        detector &&
        video.elt.readyState === 4 &&
        video.elt.videoWidth > 0 &&
        video.elt.videoHeight > 0
      ) {
        const predictions = await detector.estimatePoses(video.elt);
        p5.image(video, 0, 0, p5.width, p5.height);

        if (predictions && predictions.length > 0) {
          predictions[0].keypoints.forEach((keypoint) => {
            const { x, y, score, name } = keypoint;
            if (score > 0.3) {
              const color = colors[name];
              p5.fill(color[0], color[1], color[2]); // Set fill color based on keypoint
              p5.noStroke(); // Disable stroke
              const canvasX = (x / video.elt.videoWidth) * p5.width;
              const canvasY = (y / video.elt.videoHeight) * p5.height;
              p5.ellipse(canvasX, canvasY, 10, 10); // Draw keypoints as circles
              p5.text(name, canvasX, canvasY - 5); // Draw keypoint name
            }
          });
          onKeypointsCountChange(predictions[0].keypoints.length);
        }
      }
    };
  };

  useEffect(() => {
    if (videoStream && detector) {
      console.log("Video stream and detector are ready.");
    }
  }, [
    videoStream,
    detector,
    onKeypointsCountChange,
    containerWidth,
    containerHeight,
  ]);

  return <ReactP5Wrapper sketch={sketch} />;
};

export default CanvasSketch;
