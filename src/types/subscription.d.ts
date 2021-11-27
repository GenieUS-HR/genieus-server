// type subscription_name = 'basic' | 'pro' | 'max';
// type subscription_

type Basic = {
  id: 1;
  subscription_name: 'basic';
  description: 'Subscription type is basic';
  minutes: 60;
  active: boolean;
};

type Pro = {
  id: 2;
  subscription_name: 'pro';
  description: 'Subscription type is pro';
  minutes: 120;
  active: boolean;
};

type Max = {
  id: 3;
  subscription_name: 'max';
  description: 'Subscription type is max';
  minutes: 180;
  active: boolean;
};

export type Subscription = Basic | Pro | Max;
