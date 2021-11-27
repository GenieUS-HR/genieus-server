import { Router } from 'express';
import {
  getAllStudents,
  getStudent,
  addStudent,
  deleteStudent,
  updateStudent,
} from './controllers/student.controller.js';
import {
  getAllTutors,
  getTutor,
  addTutor,
  deleteTutor,
  updateTutor,
} from './controllers/tutor.controller.js';
import {
  getAllHelpRequests,
  getHelpRequest,
  addHelpRequest,
  deleteHelpRequest,
  updateHelpRequest,
} from './controllers/helprequest.controller.js';

const router = Router();

router.get('/student', getAllStudents);
router.get('/student/:id', getStudent);
router.post('/student', addStudent);
router.delete('/student/:id', deleteStudent);
router.patch('/student/:id', updateStudent);

router.get('/tutor', getAllTutors);
router.get('/tutor/:id', getTutor);
router.post('/tutor', addTutor);
router.delete('/tutor/:id', deleteTutor);
router.patch('/tutor/:id', updateTutor);

router.get('/helprequest', getAllHelpRequests);
router.get('/helprequest/:id', getHelpRequest);
router.post('/helprequest', addHelpRequest);
router.delete('/helprequest/:id', deleteHelpRequest);
router.patch('/helprequest/:id', updateHelpRequest);

export default router;
