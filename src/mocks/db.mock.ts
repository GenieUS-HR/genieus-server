import students from './students.mock.js';
import tutors from './tutors.mock.js';
import Student from '../types/student.js';
import Tutor from '../types/tutor.js';

type DB = {
  [name: string]: any;
};

const db: DB = {};
db.Student = {};
db.Student.getAll = () => Promise.resolve(students);
db.Student.getStudent = (id: string): Promise<Student | null> => {
  const dbRes = students.filter((student) => student.id === id);
  if (dbRes.length > 0) return Promise.resolve(dbRes[0]);
  return null;
};
db.Student.addStudent = (student: Student) => {
  students.push(student);
  return Promise.resolve(student);
};
db.Student.deleteStudent = (id: string) => {
  let idx: number;
  students.forEach((student) => {
    if (student.id === id) {
      idx = students.indexOf(student);
    }
  });
  students.splice(idx);
};
db.Student.updateStudent = (
  id: string,
  studentReq: {}
): Promise<Student | null> => {
  let dbRes: Student;
  students.forEach((student) => {
    if (student.id === id) {
      Object.assign(student, studentReq);
      dbRes = student;
    }
  });
  return Promise.resolve(dbRes);
};

db.Tutor = {};
db.Tutor.getAll = () => Promise.resolve(tutors);
db.Tutor.getTutor = (id: string): Promise<Tutor | null> => {
  const dbRes = tutors.filter((tutor) => tutor.id === id);
  if (dbRes.length > 0) return Promise.resolve(dbRes[0]);
  return null;
};
db.Tutor.addTutor = (tutor: Tutor) => {
  tutors.push(tutor);
  return Promise.resolve(tutor);
};
db.Tutor.deleteTutor = (id: string) => {
  let idx: number;
  tutors.forEach((tutor) => {
    if (tutor.id === id) {
      idx = tutors.indexOf(tutor);
    }
  });
  tutors.splice(idx);
};
db.Tutor.updateTutor = (id: string, tutorReq: {}): Promise<Tutor | null> => {
  let dbRes: Tutor;
  tutors.forEach((tutor) => {
    if (tutor.id === id) {
      Object.assign(tutor, tutorReq);
      dbRes = tutor;
    }
  });
  return Promise.resolve(dbRes);
};

export default db;
