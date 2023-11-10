import { calculateBmi } from "./bmiCalculator";
import { calculateExercises, Result } from "./exerciseCalculator";
import express from 'express';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
  const height = Number(_req.query.height);
  const weight = Number(_req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: "malformatted parameters" });
  } else {
    const bmi = calculateBmi(height, weight);
    res.json({ weight, height, bmi });
  }

});

app.post('/exercises', (req, res) => {
  interface Exercises {
    target: number;
    daily_exercises: number[];
  }

  console.log(req.body);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises }: Exercises = req.body;

  if (!daily_exercises || !target) {
    res.status(400).json({ error: "parameters missing" });
  } else if (daily_exercises.some(isNaN) || isNaN(Number(target))) {
    res.status(400).json({ error: "malformatted parameters" });
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result: Result = calculateExercises(target, daily_exercises);
    res.json(result);
  }

});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

