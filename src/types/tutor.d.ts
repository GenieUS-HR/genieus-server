export default interface Tutor {
  email: string;
  name: string;
  id: string;
  joined_date: Date;
  photo_url: string;
  spoken_language: string[];
  location: string;
  bio: string;
  avg_rating: number;
  completed_help_requests: number;
  tags: string[];
  programming_languages: string[];
}
