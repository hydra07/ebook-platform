// import { env } from 'bun';
import Cookieparser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import path from 'path';
import routers from './router.config';
import bookRouter from '../routers/book.router';
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(Cookieparser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../../../uploads')));
app.use('/api/hello', (req, res) => {
  res.send('Hello World');
});
routers.forEach(({ path, router }) => {
  app.use(path, router);
});

export default app;
