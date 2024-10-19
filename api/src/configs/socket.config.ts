import { NextFunction, Request, Response } from 'express';
import { createServer } from 'http';
import createHttpError, { isHttpError } from 'http-errors';
import { Server } from 'socket.io';
import Notification from '../models/notification.model';
import NotificationService from '../services/notification.service';
import env from '../utils/validateEnv.util';
import app from './app.config';
const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: env.CLIENT_URL,
    methods: ['*'],
  },
});

export const notificationService = new NotificationService(io);

app
  .post(
    '/notification',
    async (req: Request, res: Response, next: NextFunction) => {
      const body = req.body;
      const data = {
        title: body.title,
        content: body.content,
        // createAt: new Date(),
        userId: body.userId,
      };
      const notification = new Notification(data);
      const savedNotification = await notificationService.createNotification(
        notification,
      );
      io.emit('notifications', savedNotification);
      res.status(200).json({
        message: 'Notification created successfully',
        notification: savedNotification,
      });
    },
  )
  .get('/notification/:userId', async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const query = req.query.number;
    const number = query ? parseInt(query as string) : undefined;

    const notifications = await notificationService.getNotificationsByUserId(
      userId,
      number,
    );
    res.status(200).json(notifications);
  })
  .get(
    '/notification',
    async (req: Request, res: Response, next: NextFunction) => {
      const notifications = await notificationService.getNotifications();
      res.status(200).json(notifications);
    },
  );

app.use((res, req, next) => {
  next(createHttpError(404, 'Not found'));
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = 'An unknown error occurred';
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  console.log(error);
  res.status(statusCode).json({ error: error.message });
});

export default server;
