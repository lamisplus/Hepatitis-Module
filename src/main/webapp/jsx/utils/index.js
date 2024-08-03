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


export function formatDate(inputDate) {
  // Split the input date string into an array
  var dateArray = inputDate.split("-");

  // Check if the input date is in the correct format (yyyy-mm-dd)
  if (dateArray.length !== 3) {
    return "Invalid date format";
  }

  // Extract the year, month, and day from the array
  var year = dateArray[0];
  var month = dateArray[1];
  var day = dateArray[2];

  // Create a new date string in the "dd-mm-yyyy" format
  var newDateFormat = day + "-" + month + "-" + year;

  return newDateFormat;
}

export const isNotInTheFutureOrBeforeBirth = (date, birthday) => {
  return (
    !isBefore(new Date(date), new Date(birthday)) &&
    isBefore(new Date(date), new Date())
  );
};

