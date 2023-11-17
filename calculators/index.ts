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
  const { target, daily_exercises }: Exercises = req.body as { daily_exercises: number [], target: number };

  if (!daily_exercises || !target || daily_exercises.length === 0 ) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (daily_exercises.some(isNaN) || isNaN(Number(target))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const result: Result = calculateExercises(target, daily_exercises);
  return res.send(result);

});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

