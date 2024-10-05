import type { Router } from 'express';
import authRouter from '../routers/auth.router';
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
] as IRouterConfig[];
