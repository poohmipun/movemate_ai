function draw() {
  // Add this line to show the video frame
  image(video, 0, 0, width, height); // Use width and height directly
  fps = frameRate();
  fill(0, 255, 0);
  textSize(32);
  stroke(0);
  text("FPS: " + fps.toFixed(2), 100, 50);
  // Draw keypoints and skeleton
  drawKeypoints(poses);
  if (skeleton) {
    drawSkeleton(poses);
  }
  // Assuming you have a <h1> element with id "pushup-counter" in your HTML
  const pushupCounter = document.getElementById("pushup-counter");

  // Update the inner text of the <h1> element with the value of reps
  pushupCounter.innerText = `Push-ups completed: ${reps}`;

  // Draw the arm angle gauge
  drawArmAngleGauge(width, height);
}
function drawKeypoints(poses) {
  var count = 0;
  if (poses && poses.length > 0) {
    updateArmAngle(); // Update arm angle once before iterating over keypoints
    for (let kp of poses[0].keypoints) {
      const { x, y, score, name } = kp; // Added 'name' to get the keypoint name
      if (
        name === "left_eye" ||
        name === "right_eye" ||
        name === "left_ear" ||
        name === "right_ear" ||
        name === "left_ankle" ||
        name === "right_ankle"
      ) {
        continue;
      }
      inUpPosition();
      inDownPosition();
      if (score > 0.3) {
        count = count + 1;
        const color = colors[name];
        fill(color);
        stroke(2);
        strokeWeight(1);
        // Normalize coordinates
        const normX = x / video.width;
        const normY = y / video.height;
        // Transform to canvas coordinates
        const canvasX = normX * width;
        const canvasY = normY * height;

        // Draw keypoint circle
        circle(canvasX, canvasY, 6);

        // Display name above keypoint
        fill(color); // Set text fill color to white
        textAlign(CENTER, BOTTOM); // Align text center horizontally and bottom vertically
        textSize(14); // Set text size
        text(name, canvasX, canvasY - 5); // Display name slightly above the keypoint
      }
      if (count == 17) {
        /* console.log("Whole body visible!"); */
      } else {
        /* console.log("Not fully visible!"); */
      }
    }
  }
}
function drawSkeleton(poses) {
  const confidence_threshold = 0.5;

  if (!poses || poses.length === 0) return;

  const backBending = isBackBending();

  if (poses && poses.length > 0) {
    for (const [key, value] of Object.entries(edges)) {
      const p = key.split(",");
      const p1 = p[0];
      const p2 = p[1];

      const y1 = poses[0].keypoints[p1].y;
      const x1 = poses[0].keypoints[p1].x;
      const c1 = poses[0].keypoints[p1].score;
      const y2 = poses[0].keypoints[p2].y;
      const x2 = poses[0].keypoints[p2].x;
      const c2 = poses[0].keypoints[p2].score;

      if (c1 > confidence_threshold && c2 > confidence_threshold) {
        strokeWeight(2);
        // Set default color
        stroke("rgb(0, 255, 0)");

        // Normalize coordinates
        const normX1 = x1 / video.width;
        const normY1 = y1 / video.height;
        const normX2 = x2 / video.width;
        const normY2 = y2 / video.height;

        // Transform to canvas coordinates
        const canvasX1 = normX1 * width;
        const canvasY1 = normY1 * height;
        const canvasX2 = normX2 * width;
        const canvasY2 = normY2 * height;

        // Check if the edge is between points 5-11 (left side) or 6-12 (right side)
        if ((p1 === "5" && p2 === "11") || (p1 === "11" && p2 === "13")) {
          // Left side
          if (backBending) {
            stroke("rgb(255, 0, 0)"); // Set the color to red for left side if backBending is true
          }
        } else if (
          (p1 === "6" && p2 === "12") ||
          (p1 === "12" && p2 === "14")
        ) {
          // Right side
          if (backBending) {
            stroke("rgb(255, 0, 0)"); // Set the color to red for right side if backBending is true
            fill(255); // Set the fill color for the text
            textAlign(CENTER, CENTER); // Align the text to the center
            textSize(20); // Set the text size
            text("Back Bending Detected", width / 2, height / 2); // Display the text at the center of the canvas
          }
        }

        line(canvasX1, canvasY1, canvasX2, canvasY2);
      }
    }
  }
}
