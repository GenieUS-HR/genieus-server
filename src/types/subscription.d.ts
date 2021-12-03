type subscription_id = 'basic' | 'pro' | 'max';

export default interface Subscription {
  id: subscription_id;
  subscription_name: string;
  description: string;
  seconds: number;
  cost: number;
  active: boolean;
}
