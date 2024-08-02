export const calculateAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob); // create a date object directlyfrom`dob1`argument
  let age_now = today.getFullYear() - birthDate.getFullYear();

  return age_now;
};

export const calculateBMI = (height, weight) => {
  let convertMeterToCM = Number(height) / 100;
  let squareH = convertMeterToCM * convertMeterToCM;
  let value = (Number(weight) / squareH).toFixed(2);
  return value;
};

export const calculateFib4 = (ast,  plt, alt, patientAge,) =>
  ast === -1 ? 0 : parseInt((patientAge * ast) / (plt * alt));

export const calculateApriScore = (ast, plt) =>
  ast === -1 ? 0 : parseInt((ast / plt) * 100);
