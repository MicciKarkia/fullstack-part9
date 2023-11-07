interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const parseExerciseArguments = (args: string[]) => {
  if (args.length < 4) throw new Error('Not enough arguments to count exercise');

  const metricsArray = args.slice(2).map(Number);
  const isNan = metricsArray.some(isNaN);

  if (!isNan) {
    return metricsArray;
  } else {
    throw new Error('One or more of the provided values were not numbers!');
  }
};

const calculateExercises = (ogTarget: number, dailyHours: number[]): Result => {

  const totalHours = dailyHours.reduce(function (a, b) { return a + b; });

  const rate = (a: number, t: number) => {
    if (a < t) {
      return 1;
    } else if (a === t) {
      return 2;
    } else {
      return 3;
    }
  };

  const isSucces = (a: number, t: number) => {
    if (a < t) {
      return false;
    } else {
      return true;
    }
  };

  const periodLength: number = dailyHours.length;
  const trainingDays: number = dailyHours.filter(function (e) { return e > 0; }).length;
  const target: number = ogTarget;
  const average: number = totalHours / periodLength;
  const success: boolean = isSucces(average, target);
  const rating: number = rate(average, target);
  const ratingDescription: string = rating === 3 ? "Excellent" : rating === 2 ? "OK" : "Do better";

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  const [first, ...rest] = parseExerciseArguments(process.argv);
  console.log(calculateExercises(first, rest));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
