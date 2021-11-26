import Tutor from '../types/tutor.js';

const mockTutor: Tutor = {
  email: 'tom@example.com',
  name: 'Thomas Gibson',
  id: 'fea8be3e6479812379',
  joined_date: new Date('2021-10-08 04:05:06'),
  photo_url: 'https://randomuser.me/api/portraits/men/76.jpg',
  bio: "Hi I'm Tom",
  completed_help_requests: 10,
  avg_rating: 4,
  tags: [],
  programming_languages: [],
};

const tutors: Tutor[] = [mockTutor];

export default tutors;
