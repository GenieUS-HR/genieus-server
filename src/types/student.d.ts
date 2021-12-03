import { subscription_id } from './subscription';
import User from './user';

export default interface Student extends User {
  subscription_type: string;
  lastpayment_date: Date;
  subscription_expiry: Date;
  favourite_tutors: string[];
  blocked_tutors: string[];
  time_remaining: number;
}
export type StudentRequest = {
  email: string;
  name: string;
  id: string;
  subscription_type: subscription_id;
  photo_url?: string;
  spoken_language?: string[];
  location?: string;
};
