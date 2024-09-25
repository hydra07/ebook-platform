// import { NextFunction, Request, Response } from 'express';
// import { verifyToken } from '../services/auth.service';
// import {RequestHandler } from 'express';
// interface AuthenticatedRequest extends Request {
//   userId?: string;
//   userRole?: string[];
// }

// async function authMiddleware(
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction,
// ): Promise<RequestHandler<{}, any, any, any, AuthenticatedRequest> | undefined> {
//   try {
//     const authHeader = req.headers['authorization'];
//     if (!authHeader) {
//       res.status(401).send('Authorization header missing');
//       return;
//     }

//     const token = authHeader.replace(/^Bearer\s/, '');
//     if (!token) {
//       res.status(401).send('Token missing');
//       return;
//     }

//     try {
//       const { userId, role } = await verifyToken(token);
//       if (!userId) {
//         res.status(401).send('Invalid userId');
//         return;
//       }
//       res.setHeader('x-user-id', userId);
//       res.setHeader('x-user-role', role.join(','));

//       req.userId = userId;
//       req.userRole = role;
//       next();
//     } catch (error) {
//       res.status(401).send('Invalid token');
//     }
//   } catch (error) {
//     res.status(500).send('Internal Server Error');
//   }
// }

// export default async function roleRequire(handler: RequestHandler, role?: string) {
//   return async function(req:Request, res:Response, next:NextFunction){
//     try {
//       const authResult = await authMiddleware(req, res, next);
//       if (authResult !== undefined) {
//         if (role) {
//           const userRole = authResult.userRole;

//         }
//       }
//     }
//   }

// }
