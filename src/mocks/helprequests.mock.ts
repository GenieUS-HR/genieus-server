import HelpRequest from '../types/helprequest';

const mockHelpRequest: HelpRequest = {
  id: 'string',
  status: 'closed-complete',
  description: 'someone help me',
  time_opened: new Date('2021-10-08 04:05:06'),
  time_accepted: new Date('2021-10-08 04:06:06'),
  time_closed: new Date('2021-10-08 04:25:06'),
  rating: 3,
  feedback_comments: 'Nice',
  tags: [],
  language: 'JavaScript',
  code: null,
  zoom_url: 'http://it/was/there/',
  call_length: 300,
  favourites_only: false,
  tutor: {
    id: 'fea8be3e6479812379',
    name: 'Thomas Gibson',
    photo_url: 'https://randomuser.me/api/portraits/men/76.jpg',
  },
  student: {
    id: 'fea8be3e64777240',
    name: 'Brad Gibson',
    photo_url: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
};

const helprequests: HelpRequest[] = [mockHelpRequest];

export default helprequests;
