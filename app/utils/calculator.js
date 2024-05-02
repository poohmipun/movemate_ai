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

  // Define prefixes based on the keypoint
  const upperPrefixes = upperKeypoint === "nose" ? [""] : ["left_", "right_"];
  const lowerPrefixes = lowerKeypoint === "nose" ? [""] : ["left_", "right_"];

  let upperKeypointData = null;
  let lowerKeypointData = null;

  // Find the keypoint with the highest score for the upper keypoint
  upperPrefixes.forEach((prefix) => {
    const kp = keypoints.find(
      (keypoint) => keypoint.name.toLowerCase() === `${prefix}${upperKeypoint}`
    );
    if (kp && (!upperKeypointData || kp.score > upperKeypointData.score)) {
      upperKeypointData = kp;
    }
  });

  // Find the keypoint with the highest score for the lower keypoint
  lowerPrefixes.forEach((prefix) => {
    const kp = keypoints.find(
      (keypoint) => keypoint.name.toLowerCase() === `${prefix}${lowerKeypoint}`
    );
    if (kp && (!lowerKeypointData || kp.score > lowerKeypointData.score)) {
      lowerKeypointData = kp;
    }
  });

  // Check if the keypoints were found
  if (!upperKeypointData || !lowerKeypointData) {
    console.log(`One or both keypoints not found.`);
    return false;
  }

  // Determine the anchor point based on the scores
  const anchorPoint =
    upperKeypointData.score > lowerKeypointData.score
      ? upperKeypointData
      : lowerKeypointData;
  const otherKeypoint =
    anchorPoint === upperKeypointData ? lowerKeypointData : upperKeypointData;

  // Compare the y positions to determine if the condition is met
  const foundConditionMet = anchorPoint.y < otherKeypoint.y;

  console.log(`Position condition met: ${foundConditionMet}`);
  console.log(`Anchor point: ${anchorPoint.name}`);
  console.log(`Anchor side:`, anchorPoint);
  console.log(`Other keypoint:`, otherKeypoint);

  return foundConditionMet;
}
