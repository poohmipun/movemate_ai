async function setup() {
  var w = window.innerWidth;
  var h = window.innerHeight;

  createCanvas(w, h);
  video = createCapture(VIDEO, videoReady);
  video.hide();
}

async function getPoses() {
  poses = await detector.estimatePoses(video.elt);
  setTimeout(getPoses, 0);
}

function draw() {
  image(video, 0, 0, width, height);

  drawKeypoints(poses);
  if (skeleton) {
    drawSkeleton(poses);
  }
}

function drawKeypoints(poses) {
  var count = 0;
  if (poses && poses.length > 0) {
    for (let kp of poses[0].keypoints) {
      const { x, y, score, name } = kp;
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

        fill(color);
        textAlign(CENTER, BOTTOM);
        textSize(14);
        text(name, canvasX, canvasY - 5);
      }
      if (count == 17) {
        console.log("Whole body visible!");
      } else {
        console.log("Not fully visible!");
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

        stroke("rgb(0, 255, 0)");

        const normX1 = x1 / video.width;
        const normY1 = y1 / video.height;
        const normX2 = x2 / video.width;
        const normY2 = y2 / video.height;

        // Transform to canvas coordinates
        const canvasX1 = normX1 * width;
        const canvasY1 = normY1 * height;
        const canvasX2 = normX2 * width;
        const canvasY2 = normY2 * height;
        line(canvasX1, canvasY1, canvasX2, canvasY2);
      }
    }
  }
}
