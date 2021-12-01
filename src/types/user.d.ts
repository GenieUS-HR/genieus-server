export default interface User {
  email: string;
  name: string;
  id: string;
  joined_date: Date;
  photo_url?: string;
  location?: string;
  bio: string;
  spoken_language?: string[];
}
