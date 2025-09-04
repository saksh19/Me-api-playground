import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';



import healthRouter from './routes/health.js';
import profileRouter from './routes/profile.js';
import projectsRouter from './routes/projects.js';
import skillsRouter from './routes/skills.js';
import searchRouter from "./routes/search.js";
import authRouter from './routes/auth.js';
import { errorHandler } from './middleware/errorHandler.js';




const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.use('/health', healthRouter);
app.use('/profile', profileRouter);
app.use('/projects', projectsRouter);
app.use('/skills', skillsRouter);
app.use("/api/search", searchRouter);
app.use('/auth', authRouter);


// Not found handler
app.use((req, res) => {
res.status(404).json({ error: 'Not Found' });
});


// Central error handler
app.use(errorHandler);


export default app;