import HelpRequest from '../types/helprequest';

const mockHelpRequest: HelpRequest = {
  id: 'string',
  student_id: 'fea8be3e64777240',
  tutor_id: 'fea8be3e6479812379',
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
};

const helprequests: HelpRequest[] = [mockHelpRequest];

export default helprequests;
