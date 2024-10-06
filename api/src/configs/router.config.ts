import type { Router } from 'express';
import authRouter from '../routers/auth.router';
import bookRouter from '../routers/book.router';
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
    path: '/api/books',
    router: bookRouter,
  },
] as IRouterConfig[];
