import { Router } from 'express';
import {
  getAllStudents,
  getStudent,
  addStudent,
} from './controllers/student.controller.js';

const router = Router();

router.get('/student', getAllStudents);
router.get('/student/:id', getStudent);
router.post('/student', addStudent);

export default router;
