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

export default router;
