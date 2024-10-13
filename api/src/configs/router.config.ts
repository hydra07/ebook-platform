<<<<<<< HEAD
import type { Router } from "express";
import authRouter from "../routers/auth.router";
import fileRouter from "../routers/file.router";
import bookRouter from "../routers/book.router";
import commentRouter from "../routers/comment.router"; // Import the comment router
import userRouter from "../routers/user.router"; // Import the user router
import ratingRouter from "../routers/rating.router";
import settingRouter from "../routers/setting.router";
=======
import type { Router } from 'express';
import authRouter from '../routers/auth.router'
import bookRouter from '../routers/book.router';
import fileRouter from '../routers/file.router';

import settingRouter from '../routers/setting.router';
=======

>>>>>>> 324c8326c7e87f5da935b3cd1aedd83639d879b2
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
    path: "/api/comments", // Add the path for comments
    router: commentRouter,
  },
    {
      path: "/api/users", // Add the path for users
        router: userRouter,
    },
    {
      path: "/api/ratings",
        router: ratingRouter,
    }

] as IRouterConfig[];
