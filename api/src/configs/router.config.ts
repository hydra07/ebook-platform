import type { Router } from 'express';
import authRouter from '../routers/auth.router';
import fileRouter from '../routers/file.router';
import userRouter from '../routers/user.router';

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
    path: '/api/auth',
    router: authRouter,
  },
  {
    path: '/api/upload',
    router: fileRouter,
  },
  {
    path: '/api/users', // Add the path for user routes
    router: userRouter,
  },
] as IRouterConfig[];
