export default interface Student {
  email: string;
  name: string;
  id: string;
  subscription_type: string;
  lastpayment_date: Date;
  joined_date: Date;
  photo_url: string;
  subscription_expiry: Date;
  favourite_tutors: string[];
  blocked_tutors: string[];
  bio: string;
}
