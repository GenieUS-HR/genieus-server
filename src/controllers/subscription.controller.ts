import Subscription from '../types/subscription.js';
import { Request, Response } from 'express';

const Basic: Subscription = {
  subscription_name: 'basic',
  id: '',
  description: '',
  minutes: 0,
  active: false,
};

const Pro: Subscription = {
  subscription_name: 'pro',
  id: '',
  description: '',
  minutes: 0,
  active: false,
};

const Max: Subscription = {
  subscription_name: 'max',
  id: '',
  description: '',
  minutes: 0,
  active: false,
};

export function getSubscription(req: Request, res: Response) {
  res.send({ Basic, Pro, Max });
  res.status(200);
}
