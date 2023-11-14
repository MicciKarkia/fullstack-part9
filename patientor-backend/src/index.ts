import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses';
const app = express();

const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(express.json());
app.use(cors(options));

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  res.status(200).json({ "message": "ok" });
});

app.use('/api/diagnoses', diagnosesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
