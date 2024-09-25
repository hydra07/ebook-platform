import { env } from 'bun';
import Cookieparser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import path from 'path';
const app = express();
app.use(
  cors({
    origin: env.CLIENT_URL,
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


export default app;