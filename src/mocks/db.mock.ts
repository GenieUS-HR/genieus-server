import students from './students.mock.js';
import tutors from './tutors.mock.js';
import helprequests from './helprequests.mock.js';

import Student from '../types/student.js';
import Tutor from '../types/tutor.js';
import HelpRequest from '../types/helprequest.js';

type DB = {
  Student: studentModel;
  Tutor: tutorModel;
  HelpRequest: helpRequestModel;
};
type studentRequest = {
  email: string;
  name: string;
  id: string;
  subscription_type: string;
  photo_url: string;
  spoken_language: string[];
  location?: string;
};
type tutorRequest = {
  email: string;
  name: string;
  id: string;
  photo_url: string;
  spoken_language: string[];
  location?: string;
};
type helpRequestRequest = {
  student_id: string;
  description: string;
  tags?: any;
  language: string;
  code: string;
  favourites_only: boolean;
};
class studentModel {
  getAll = () => Promise.resolve(students);
  getStudent = (id: string): Promise<Student | null> => {
    const dbRes = students.filter((student) => student.id === id);
    if (dbRes.length > 0) return Promise.resolve(dbRes[0]);
    return null;
  };
  addStudent = (student: Student) => {
    students.push(student);
    return Promise.resolve(student);
  };
  deleteStudent = (id: string) => {
    let idx: number;
    students.forEach((student) => {
      if (student.id === id) {
        idx = students.indexOf(student);
      }
    });
    students.splice(idx);
  };
  updateStudent = (
    id: string,
    studentReq: studentRequest
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
}
class tutorModel {
  getAll = () => Promise.resolve(tutors);
  getTutor = (id: string): Promise<Tutor | null> => {
    const dbRes = tutors.filter((tutor) => tutor.id === id);
    if (dbRes.length > 0) return Promise.resolve(dbRes[0]);
    return null;
  };
  addTutor = (tutor: Tutor) => {
    tutors.push(tutor);
    return Promise.resolve(tutor);
  };
  deleteTutor = (id: string) => {
    let idx: number;
    tutors.forEach((tutor) => {
      if (tutor.id === id) {
        idx = tutors.indexOf(tutor);
      }
    });
    tutors.splice(idx);
  };
  updateTutor = (id: string, tutorReq: tutorRequest): Promise<Tutor | null> => {
    let dbRes: Tutor;
    tutors.forEach((tutor) => {
      if (tutor.id === id) {
        Object.assign(tutor, tutorReq);
        dbRes = tutor;
      }
    });
    return Promise.resolve(dbRes);
  };
}
class helpRequestModel {
  getAll = () => Promise.resolve(helprequests);
  getHelpRequest = (id: string): Promise<HelpRequest | null> => {
    const dbRes = helprequests.filter((helprequest) => helprequest.id === id);
    if (dbRes.length > 0) return Promise.resolve(dbRes[0]);
    return null;
  };
  addHelpRequest = (helprequest: HelpRequest) => {
    helprequests.push(helprequest);
    return Promise.resolve(helprequest);
  };
  deleteHelpRequest = (id: string) => {
    let idx: number;
    helprequests.forEach((helprequest) => {
      if (helprequest.id === id) {
        idx = helprequests.indexOf(helprequest);
      }
    });
    helprequests.splice(idx);
  };
  updateHelpRequest = (
    id: string,
    helpreqeustReq: helpRequestRequest
  ): Promise<HelpRequest | null> => {
    let dbRes: HelpRequest;
    helprequests.forEach((helprequest) => {
      if (helprequest.id === id) {
        Object.assign(helprequest, helpreqeustReq);
        dbRes = helprequest;
      }
    });
    return Promise.resolve(dbRes);
  };
}

const db: DB = {
  Student: new studentModel(),
  Tutor: new tutorModel(),
  HelpRequest: new helpRequestModel(),
};

export default db;
