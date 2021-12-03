import TutorModel from '../models/tutor.model';
import StudentModel from '../models/student.model';

// type language = 'JavaScript' | 'Python'; // options in dropbox ?
type status = 'pending' | 'assigned' | 'closed-complete' | 'closed-incomplete';
type rating = 1 | 2 | 3 | 4 | 5;

export interface HelpRequestRequest {
  student_id: string;
  description: string;
  tags?: string[];
  language: string;
  code: string;
  favourites_only: boolean;
}

export default interface HelpRequest extends HelpRequestRequest {
  id: string;
  status: status;
  time_opened: Date;
  time_accepted: Date | null;
  time_closed: Date | null;
  rating: rating | null;
  feedback_comments: string | null;
  zoom_url: string | null;
  call_length: number;
  tutor_id: string | null;
  interested_tutors: string[];
  blocked_tutors: string[];
}

export interface HelpRequestResponse extends HelpRequest {
  student: {
    id: StudentModel['id'];
    name: StudentModel['name'];
    photo_url: StudentModel['photo_url'];
  };
  tutor?: {
    id: TutorModel['id'];
    name: TutorModel['name'];
    photo_url: TutorModel['photo_url'];
  };
}

export interface HelpRequestUpdate {
  tutor_id?: HelpRequest['tutor_id'];
  status?: HelpRequest['status'];
  description?: HelpRequest['description'];
  rating?: HelpRequest['rating'];
  feedback_comments?: HelpRequest['feedback_comments'];
  tags?: HelpRequest['tags'];
  language?: HelpRequest['language'];
  code?: HelpRequest['code'];
  zoom_url?: HelpRequest['zoom_url'];
  favourites_only?: HelpRequest['favourites_only'];
  time_accepted?: HelpRequest['time_accepted'];
  time_closed?: HelpRequest['time_closed'];
  call_length?: HelpRequest['call_length'];
}
