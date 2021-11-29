import students from './students.mock.js';
import tutors from './tutors.mock.js';
import helprequests from './helprequests.mock.js';

import Student from '../types/student.js';
import Tutor from '../types/tutor.js';
import HelpRequest from '../types/helprequest.js';
import helprequest from '../types/helprequest.js';

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
    students.splice(idx, 1);
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
  getFavouriteTutor = (id: string): Promise<string[] | null> => {
    const dbRes = students.filter((student) => student.id === id);
    const favourite_tutors = dbRes[0].favourite_tutors;
    return Promise.resolve(favourite_tutors);
  };
  getBlockTutor = (id: string): Promise<string[] | null> => {
    const dbRes = students.filter((student) => student.id === id);
    const blocked_tutors = dbRes[0].blocked_tutors;
    return Promise.resolve(blocked_tutors);
  };
  setFavouriteTutor = (
    id: string,
    tutor_id: string
  ): Promise<Student | null> => {
    let dbRes: Student;
    students.forEach((student) => {
      if (student.id === id) {
        student.favourite_tutors.push(tutor_id);
        dbRes = student;
      }
    });
    return Promise.resolve(dbRes);
  };
  blockTutor = (id: string, tutor_id: string): Promise<Student | null> => {
    let dbRes: Student;
    students.forEach((student) => {
      if (student.id === id) {
        student.blocked_tutors.push(tutor_id);
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
    tutors.splice(idx, 1);
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
    helprequests.splice(idx, 1);
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
  getFilteredHelpRequests = (
    student_id: any,
    tutor_id: any,
    status: any,
    language: any,
    limit_responses: any
  ): Promise<helprequest[] | null> => {
    const dbRes = helprequests.filter((helprequest) => {
      if (student_id) {
        helprequest.student.id === student_id;
      }
      if (tutor_id) {
        helprequest.tutor.id === tutor_id;
      }
      if (status) {
        helprequest.status === status;
      }
      if (language) {
        helprequest.language === language;
      }
    });
    return limit_responses
      ? Promise.resolve(dbRes.slice(0, limit_responses))
      : Promise.resolve(dbRes);
  };
  getPendingHelpRequests = (tutor_id: string) => {
    const dbRes = helprequests.filter(
      (helprequest) => helprequest.tutor.id === tutor_id
    );
    return Promise.resolve(dbRes);
  };
}

const db: DB = {
  Student: new studentModel(),
  Tutor: new tutorModel(),
  HelpRequest: new helpRequestModel(),
};

export default db;
