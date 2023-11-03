interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (dailyHours: number[], ogTarget: number): Result => {

  const totalHours = dailyHours.reduce(function (a, b) { return a + b; });

  const rate = (a: number, t: number) => {
    if (a < t) {
      return 1;
    } else if (a === t) {
      return 2;
    } else {
      return 3;
    }
  }

  const isSucces = (a: number, t: number) => {
    if (a < t) {
      return false;
    } else {
      return true;
    }
  }

  const periodLength: number = dailyHours.length;
  const trainingDays: number = dailyHours.filter(function (e, i, a) {return e > 0;}).length;
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
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
