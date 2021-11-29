type subscription_name = 'basic' | 'pro' | 'max';

export default interface Subscription {
  id: string;
  subscription_name: subscription_name;
  description: string;
  minutes: number;
  active: boolean;
}
