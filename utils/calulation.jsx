function CalulateAngle() {
  let angle =
    (Math.atan2(wrist.x - elbow.x, wrist.y - elbow.y) -
      Math.atan2(shoulder.x - elbow.x, shoulder.y - elbow.y)) *
    (180 / Math.PI);

  // Make sure the angle is positive
  angle = angle < 0 ? angle + 360 : angle;
}

function CalulateArmAngle() {
  let wrist, shoulder, elbow;
  rightWrist = poses[0].keypoints[10];
  rightShoulder = poses[0].keypoints[6];
  rightElbow = poses[0].keypoints[8];
  leftWrist = poses[0].keypoints[9];
  leftShoulder = poses[0].keypoints[5];
  leftElbow = poses[0].keypoints[7];

  // Check if all keypoints of the left arm are visible
  if (
    leftWrist.score > 0.3 &&
    leftElbow.score > 0.3 &&
    leftShoulder.score > 0.3
  ) {
    wrist = leftWrist;
    elbow = leftElbow;
    shoulder = leftShoulder;
    /* console.log("we using Left arm for counter"); */
  }
  // Check if all keypoints of the right arm are visible
  else if (
    rightWrist.score > 0.3 &&
    rightElbow.score > 0.3 &&
    rightShoulder.score > 0.3
  ) {
    wrist = rightWrist;
    elbow = rightElbow;
    shoulder = rightShoulder;
    /* console.log("we using Right arm for counter"); */
  } else {
    // Both arms are not fully visible, exit the function
    //console.log("Both arms are not fully visible");
    return;
  }

  // Calculate the angle using the visible arm keypoints
  // Calculate the angle using the visible arm keypoints
  let angle =
    (Math.atan2(wrist.x - elbow.x, wrist.y - elbow.y) -
      Math.atan2(shoulder.x - elbow.x, shoulder.y - elbow.y)) *
    (180 / Math.PI);

  // Make sure the angle is positive
  angle = angle < 0 ? angle + 360 : angle;

  // Update arm angle variables
  armAngle = angle;
  elbowAngle = angle;
}

function isBackBending() {
  // Extract keypoints
  const leftShoulder = poses[0].keypoints[5];
  const leftHip = poses[0].keypoints[11];
  const leftKnee = poses[0].keypoints[13];

  // Check if all required keypoints are visible
  if (leftShoulder.score > 0.3 && leftHip.score > 0.3 && leftKnee.score > 0.3) {
    // Calculate the angle for the left side
    const leftAngle = calculateAngle(leftShoulder, leftHip, leftKnee);

    // Calculate the angle between leftHip, leftKnee, and leftShoulder
    function calculateAngle(shoulder, hip, knee) {
      const angle =
        (Math.atan2(knee.y - hip.y, knee.x - hip.x) -
          Math.atan2(shoulder.y - hip.y, shoulder.x - hip.x)) *
        (180 / Math.PI);

      return abs(angle);
    }

    // Check if left side is back bendin
    return leftAngle < bendingAngle;
  }

  // If any required keypoints are not visible, return false
  return false;
}
