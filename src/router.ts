import { Router } from 'express';
import {
  getAllStudents,
  getStudent,
  addStudent,
  deleteStudent,
  updateStudent,
  getFavouriteTutor,
  setFavouriteTutor,
  getBlockTutor,
  blockTutor,
} from './controllers/student.controller.js';
import {
  getAllTutors,
  getTutor,
  addTutor,
  deleteTutor,
  updateTutor,
} from './controllers/tutor.controller.js';
import {
  getHelpRequest,
  addHelpRequest,
  deleteHelpRequest,
  updateHelpRequest,
  setInterestedTutor,
  getFilteredHelpRequests,
  getPendingHelpRequests,
} from './controllers/helprequest.controller.js';
import { getSubscription } from './controllers/subscription.controller.js';

const router = Router();

router.get('/student', getAllStudents);
router.get('/student/:id', getStudent);
router.post('/student', addStudent);
router.delete('/student/:id', deleteStudent);
router.patch('/student/:id', updateStudent);
router.get('/student/:id/favourite', getFavouriteTutor);
router.put('/student/:id/favourite/:dir', setFavouriteTutor);
router.get('/student/:id/block', getBlockTutor);
router.put('/student/:id/block/:dir', blockTutor);
// [!request is not set yet] router.put('/student/:id/subscribe', extendSubscribe);

router.get('/tutor', getAllTutors);
router.get('/tutor/:id', getTutor);
router.post('/tutor', addTutor);
router.delete('/tutor/:id', deleteTutor);
router.patch('/tutor/:id', updateTutor);

router.get('/helprequest', getFilteredHelpRequests);
router.get('/helprequest/:id', getHelpRequest);
router.post('/helprequest', addHelpRequest);
router.delete('/helprequest/:id', deleteHelpRequest);
router.patch('/helprequest/:id', updateHelpRequest);
router.put('/helprequest/:id/interested/:dir', setInterestedTutor);
router.get('/helprequest/pending/:tutor_id', getPendingHelpRequests);

router.get('/subscription', getSubscription);

export default router;
