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


  export const formatDate = (dateObj) => {
    if (!dateObj) {
      return "";
    }
    const formattedDate = `${dateObj?.year}-${dateObj?.monthValue
      ?.toString?.()
      .padStart?.(2, "0")}-${dateObj?.dayOfMonth
      ?.toString?.()
      .padStart?.(2, "0")}`;
    return formattedDate;
  };

export const isNotInTheFutureOrBeforeBirth = (date, birthday) => {
  return (
    !isBefore(new Date(date), new Date(birthday)) &&
    isBefore(new Date(date), new Date())
  );
};

export const  calculateDOB = (age) => {
  const currentYear = new Date().getFullYear();
  const birthYear = currentYear - age;
  const dob = new Date(birthYear, 0, 1); // Assuming DOB is January 1st of the birth year

  // Format date as yyyy-mm-dd
  const yyyy = dob.getFullYear();
  const mm = String(dob.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const dd = String(dob.getDate()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd}`;
}