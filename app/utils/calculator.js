/**
 * Checks if the keypoint rotation condition is met for both sides.
 * @param {Object} keypoints - The keypoints detected from pose estimation.
 * @param {Object} condition - The condition configuration from the selected program.
 * @returns {boolean} - True if the condition is met on either side, else false.
 */
export function checkKeypointRotationCondition(keypoints, condition) {
  const { radius1, radius2, selectedKeypoint } = condition;

  const sides = [
    { prefix: "left_", p1: null, p2: null, p3: null },
    { prefix: "right_", p1: null, p2: null, p3: null },
  ];

  // Find the appropriate keypoints for each side based on the selected keypoint
  sides.forEach((side) => {
    switch (selectedKeypoint) {
      case "Elbow":
        side.p1 = keypoints.find((kp) => kp.name === `${side.prefix}wrist`);
        side.p2 = keypoints.find((kp) => kp.name === `${side.prefix}elbow`);
        side.p3 = keypoints.find((kp) => kp.name === `${side.prefix}shoulder`);
        break;
      case "Shoulder":
        side.p1 = keypoints.find((kp) => kp.name === `${side.prefix}elbow`);
        side.p2 = keypoints.find((kp) => kp.name === `${side.prefix}shoulder`);
        side.p3 = keypoints.find((kp) => kp.name === `${side.prefix}hip`);
        break;
      case "Hip":
        side.p1 = keypoints.find((kp) => kp.name === `${side.prefix}shoulder`);
        side.p2 = keypoints.find((kp) => kp.name === `${side.prefix}hip`);
        side.p3 = keypoints.find((kp) => kp.name === `${side.prefix}knee`);
        break;
      case "Knee":
        side.p1 = keypoints.find((kp) => kp.name === `${side.prefix}hip`);
        side.p2 = keypoints.find((kp) => kp.name === `${side.prefix}knee`);
        side.p3 = keypoints.find((kp) => kp.name === `${side.prefix}ankle`);
        break;
      default:
        console.log(`No matching keypoint found for: ${selectedKeypoint}`);
        return false; // No matching keypoint
    }

    // Log keypoints for debugging
    console.log(
      `Keypoints for ${side.prefix} side - p1:`,
      side.p1,
      `p2:`,
      side.p2,
      `p3:`,
      side.p3
    );
  });

  // Check if any side matches the condition
  const result = sides.some((side) => {
    if (side.p1 && side.p2 && side.p3) {
      const angle = calculateAngle(
        side.p1.position,
        side.p2.position,
        side.p3.position
      );
      console.log(`Calculated angle for ${side.prefix} side: ${angle}`);
      return angle >= radius1 && angle <= radius2;
    }
    return false;
  });

  console.log(`Rotation condition met: ${result}`);
  return result;
}

/**
 * Checks if the keypoint position condition is met.
 * @param {Object[]} keypoints - The keypoints detected from pose estimation.
 * @param {Object} condition - The condition configuration from the selected program.
 * @returns {boolean} - True if the condition is met, else false.
 */
export function checkKeypointPositionCondition(keypoints, condition) {
  const upperKeypoint = condition.formData.upperKeypoint.toLowerCase();
  const lowerKeypoint = condition.formData.lowerKeypoint.toLowerCase();

  const prefixes = ["left_", "right_"];

  let upperKeypointData = null;
  let lowerKeypointData = null;

  // Find the highest scoring keypoint for upperKeypoint across all prefixes
  keypoints.forEach((keypoint) => {
    console.log("Processing keypoint:", keypoint.name);
    const nameLower = keypoint.name.toLowerCase();
    if (
      nameLower === "nose" ||
      prefixes.some((prefix) => nameLower === `${prefix}${upperKeypoint}`)
    ) {
      if (!upperKeypointData || keypoint.score > upperKeypointData.score) {
        upperKeypointData = keypoint;
      }
    }
  });

  // Find the highest scoring keypoint for lowerKeypoint across all prefixes
  keypoints.forEach((keypoint) => {
    const nameLower = keypoint.name.toLowerCase();
    if (
      nameLower === "nose" ||
      prefixes.some((prefix) => nameLower === `${prefix}${lowerKeypoint}`)
    ) {
      if (!lowerKeypointData || keypoint.score > lowerKeypointData.score) {
        lowerKeypointData = keypoint;
      }
    }
  });

  if (!upperKeypointData) {
    console.log(`Upper keypoint '${upperKeypoint}' not found.`);
    return false;
  }

  if (!lowerKeypointData) {
    console.log(`Lower keypoint '${lowerKeypoint}' not found.`);
    return false;
  }

  const foundConditionMet = upperKeypointData.y < lowerKeypointData.y;

  return foundConditionMet;
}
