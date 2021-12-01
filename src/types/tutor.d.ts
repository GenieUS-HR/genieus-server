import User from './user';

export default interface Tutor extends User {
  avg_rating: number;
  completed_help_requests: number;
  tags: string[];
  programming_languages: string[];
}
export interface TutorRequest {
  email: string;
  name: string;
  id: string;
  photo_url?: string;
  spoken_language?: string[];
  location?: string;
}
