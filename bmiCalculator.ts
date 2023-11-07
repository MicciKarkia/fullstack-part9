import { isNotNumber } from "./utils";

interface CalculateBmi {
  value1: number;
  value2: number;
}

const parseArguments = (args: string[]): CalculateBmi => {
  if (args.length < 4) throw new Error('Not enough arguments to count bmi');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number) => {
  const heightInM = height / 100;
  const squareHeight = heightInM * heightInM;
  const bmi = weight / squareHeight;
  switch (true) {
    case (bmi < 18.5):
      return "Underweight";
    case (bmi < 25.0):
      return "Normal (healthy weight)";
    case (bmi < 30.0):
      return "Overweight";
    case (bmi >= 30.0):
      return "Obese";
    default: throw new Error("error thrown at calculator");
  }
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
