import React, { useEffect, useMemo } from "react";
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
  const sketch = useMemo(() => {
    return (p5) => {
      let video;

      p5.setup = () => {
        const w = containerWidth;
        const h = containerHeight;
        p5.createCanvas(w, h);
        video = p5.createCapture(p5.VIDEO);
        video.hide();
        p5.frameRate(30); // Set framerate to 30fps
      };

      p5.draw = async () => {
        if (
          !video ||
          !detector ||
          video.elt.readyState !== 4 ||
          video.elt.videoWidth <= 0 ||
          video.elt.videoHeight <= 0
        ) {
          return; // Exit early if video or detector is not ready
        }

        const predictions = await detector.estimatePoses(video.elt);

        p5.image(video, 0, 0, p5.width, p5.height);

        if (!predictions || predictions.length === 0) {
          return; // Exit early if no predictions
        }

        const filteredKeypoints = predictions[0].keypoints.filter(
          (keypoint) => keypoint.score > 0.3
        );

        filteredKeypoints.forEach(({ x, y }) => {
          p5.fill(255); // Set fill color to white
          p5.noStroke();
          const canvasX = (x / video.elt.videoWidth) * p5.width;
          const canvasY = (y / video.elt.videoHeight) * p5.height;
          p5.ellipse(canvasX, canvasY, 5, 5);
        });

        onKeypointsCountChange(filteredKeypoints.length);
      };
    };
  }, [detector, onKeypointsCountChange, containerWidth, containerHeight]);

  useEffect(() => {
    if (videoStream && detector) {
      console.log("Video stream and detector are ready.");
    }
  }, [videoStream, detector]);

  return <ReactP5Wrapper sketch={sketch} />;
};

export default React.memo(CanvasSketch);
