import Student from '../types/student.js';

const mockStudent: Student = {
  email: 'brad.gibson@example.com',
  name: 'Brad Gibson',
  id: 'fea8be3e64777240',
  subscription_type: 'basic',
  lastpayment_date: new Date('2021-11-08 04:05:06'), //2021-11-08T04:05:06.000Z
  joined_date: new Date('2021-10-08 04:05:06'),
  photo_url: 'https://randomuser.me/api/portraits/men/75.jpg',
  subscription_expiry: new Date('2021-12-08 04:05:06'),
  favourite_tutors: ['Test for Favorite'],
  blocked_tutors: ['Test for Block'],
  bio: "Hi I'm Brad",
};

const students: Student[] = [mockStudent];

export default students;
