import { subscription_name } from './subscription';
import User from './user';

export default interface Student extends User {
  subscription_type: string;
  lastpayment_date: Date;
  subscription_expiry: Date;
  favourite_tutors: string[];
  blocked_tutors: string[];
}
export type StudentRequest = {
  email: string;
  name: string;
  id: string;
  subscription_type: subscription_name;
  photo_url?: string;
  spoken_language?: string[];
  location?: string;
};
