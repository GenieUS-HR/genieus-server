// type language = 'JavaScript' | 'Python'; // options in dropbox ?
type status = 'pending' | 'assigned' | 'closed-complete' | 'closed-incomplete';
type rating = 1 | 2 | 3 | 4 | 5;
type user = {
  id: string;
  name: string;
  photo_url: string;
};

export default interface HelpRequest {
  id: string;
  status: status;
  description: string | null;
  time_opened: Date;
  time_accepted: Date | null;
  time_closed: Date | null;
  rating: rating | null;
  feedback_comments: string | null;
  tags: string[] | null;
  language: string;
  code: string | null;
  zoom_url: string | null;
  call_length: number;
  favourites_only: boolean;
  tutor: user | null;
  student: user;
}
