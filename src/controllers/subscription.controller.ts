import Subscription from '../types/subscription.js';
import { Request, Response } from 'express';

const basic: Subscription = {
  subscription_name: 'basic',
  id: 'basic',
  description: '🙂',
  seconds: 3 * 60 * 60,
  cost: 45,
  active: true,
};

const pro: Subscription = {
  subscription_name: 'pro',
  id: 'pro',
  description: '🤗',
  seconds: 5 * 60 * 60,
  cost: 60,
  active: true,
};

const max: Subscription = {
  subscription_name: 'max',
  id: 'max',
  description: '🤩',
  seconds: 8 * 60 * 60,
  cost: 80,
  active: true,
};

export const subscription = { basic, pro, max };

export function getSubscription(req: Request, res: Response) {
  res.send(subscription);
  res.status(200);
}
