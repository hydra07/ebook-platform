import type { Router } from "express";
import authRouter from "../routers/auth.router";
import bookRouter from "../routers/book.router";
import fileRouter from "../routers/file.router";
import notificationRouter from "../routers/notification.router";
import ratingRouter from "../routers/rating.router";
import userRouter from "../routers/user.router";
import settingRouter from "../routers/setting.router";
interface IRouterConfig {
  path: string;
  router: Router;
}
export default [
  // {
  //   path: '/api/hello',
  //   router: (res, req) => {
  //     res.send('Hello World');
  //   },
  // },
  {
    path: "/api/auth",
    router: authRouter,
  },
  {
    path: "/api/books",
    router: bookRouter,
  },
  {
    path: "/api/upload",
    router: fileRouter,
  },
  {
    path: "/api/ebook",
    router: settingRouter,
  },
  {
    path: "/api/notification",
    router: notificationRouter,
  },
  {
    path: "/api/users", // Add the path for users
    router: userRouter,
  },
  {
    path: "/api/ratings",
    router: ratingRouter,
  },
] as IRouterConfig[];
