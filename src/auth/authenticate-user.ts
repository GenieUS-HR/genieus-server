import { NextFunction, Request, Response } from 'express';

export default function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req['currentUser'];
  if (!user) {
    res.status(403).send('Please login');
  } else {
    next();
  }
}
