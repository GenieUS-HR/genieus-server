import admin from './firebase-service.js';
import { Request, Response, NextFunction } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    currentUser: admin.auth.DecodedIdToken;
  }
}

async function checkUserToken(req: Request, res: Response, next: NextFunction) {
  if (req.headers?.authorization?.startsWith('Bearer ')) {
    const idToken = req.headers.authorization.split('Bearer ')[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req['currentUser'] = decodedToken;
      // ! REMOVE THIS BEFORE DEPLOYMENT
      console.log('TESTING: user found', req['currentUser']);
    } catch (err) {
      console.error('user not logged in');
    }
  }
  next();
}

export default checkUserToken;
