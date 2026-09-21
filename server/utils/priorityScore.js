const calculatePriority = (
  severity,
  affectedPeople,
  ageInDays
) => {
  let score = 0;

  if (severity === "High") {
    score += 50;
  } else if (severity === "Medium") {
    score += 30;
  } else {
    score += 10;
  }

  if (affectedPeople >= 100) {
    score += 30;
  } else if (affectedPeople >= 50) {
    score += 20;
  } else if (affectedPeople >= 10) {
    score += 10;
  } else {
    score += 5;
  }

  if (ageInDays >= 7) {
    score += 20;
  } else if (ageInDays >= 3) {
    score += 10;
  } else {
    score += 5;
  }

  let priority = "Low";

  if (score >= 70) {
    priority = "High";
  } else if (score >= 40) {
    priority = "Medium";
  }
  

  return {
    score,
    priority,
  };
};

module.exports = calculatePriority;