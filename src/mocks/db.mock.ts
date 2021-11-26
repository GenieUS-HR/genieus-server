import students from './students.mock.js';
import Student from '../types/student.js';

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

export default db;
