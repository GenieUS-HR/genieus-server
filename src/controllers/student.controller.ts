import { Request, Response } from 'express';
import student, { StudentRequest } from '../types/student.js';
import StudentModel from '../models/student.model.js';
import TutorModel from '../models/tutor.model.js';
import sequelize from 'sequelize';
import Student from '../types/student.js';

export async function getAllStudents(req: Request, res: Response) {
  try {
    const dbRes = await StudentModel.findAll();
    res.status(200);
    res.send(dbRes);
    res.end();
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}

export async function getStudent(req: Request, res: Response) {
  try {
    const studentId = req.params.id;
    const dbRes = await StudentModel.findOne({ where: { id: studentId } });
    if (dbRes) {
      res.status(200);
      res.send(dbRes);
      res.end();
    } else {
      res.status(404);
      res.send(`no students found with id ${studentId}`);
      res.end();
    }
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}

export async function addStudent(req: Request, res: Response) {
  try {
    const studentReq: StudentRequest = req.body;
    const student: student = {
      ...studentReq,
      joined_date: new Date(),
      lastpayment_date: new Date(),
      subscription_expiry: new Date(),
      favourite_tutors: [],
      blocked_tutors: [],
      bio: '',
    };
    console.log(student);
    const dbRes = await StudentModel.create(student);
    res.status(201);
    res.send(dbRes);
    res.end();
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}

export async function deleteStudent(req: Request, res: Response) {
  try {
    const studentId = req.params.id;
    await StudentModel.destroy({ where: { id: studentId } });
    res.sendStatus(204);
    res.end();
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}

export async function updateStudent(req: Request, res: Response) {
  try {
    const studentId = req.params.id;
    const studentReq = req.body;
    const dbRes = await StudentModel.update(studentReq, {
      where: { id: studentId },
      returning: true,
    });
    if (dbRes[0] > 0) {
      res.status(202);
      // sequelize returns [num records, array of updated records]
      res.send(dbRes[1][0]);
      res.end();
    } else {
      res.status(404);
      res.send(`Student id ${studentId} not found`);
      res.end();
    }
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}

export async function getFavouriteTutor(req: Request, res: Response) {
  try {
    const studentId = req.params.id;
    const { favourite_tutors } = await StudentModel.findOne({
      where: { id: studentId },
    });
    const tutorlist = await TutorModel.findAll({
      where: { id: favourite_tutors },
    });
    console.log(tutorlist);
    res.status(202);
    res.send(tutorlist);
    res.end();
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}

export async function setFavouriteTutor(req: Request, res: Response) {
  try {
    const { id, dir } = req.params;
    const student = await StudentModel.findOne({
      where: { id: id },
    });
    if (dir === 'push') {
      const { tutor_id } = req.body;
      let updatedStudent: [number, Student[]] | null = null;
      if (!student.favourite_tutors.includes(tutor_id)) {
        updatedStudent = await StudentModel.update(
          {
            favourite_tutors: sequelize.fn(
              'array_append',
              sequelize.col('favourite_tutors'),
              tutor_id
            ),
          },
          { where: { id: id }, returning: true }
        );
      }
      const dbRes =
        updatedStudent && updatedStudent[0] > 0
          ? updatedStudent[1][0]
          : student;
      res.status(202);
      res.send(dbRes);
      res.end();
    } else if (dir === 'remove') {
      const { tutor_id } = req.body;
      let updatedStudent: [number, Student[]] | null = null;
      if (student.favourite_tutors.includes(tutor_id)) {
        updatedStudent = await StudentModel.update(
          {
            favourite_tutors: sequelize.fn(
              'array_remove',
              sequelize.col('favourite_tutors'),
              tutor_id
            ),
          },
          { where: { id: id }, returning: true }
        );
      }
      const dbRes =
        updatedStudent && updatedStudent[0] > 0
          ? updatedStudent[1][0]
          : student;
      res.status(202);
      res.send(dbRes);
      res.end();
    } else if (dir === 'replace') {
      const studentReq = req.body;
      const dbRes = await StudentModel.update(
        { favourite_tutors: studentReq.tutor_id },
        {
          where: { id: id },
          returning: true,
        }
      );
      if (dbRes[0] > 0) {
        res.status(202);
        res.send(dbRes[1][0]);
        res.end();
      } else {
        res.status(404);
        res.send(`Student id ${id} not found`);
        res.end();
      }
    }
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}

export async function getBlockTutor(req: Request, res: Response) {
  try {
    const studentId = req.params.id;
    const { blocked_tutors } = await StudentModel.findOne({
      where: { id: studentId },
    });
    const tutorlist = await TutorModel.findAll({
      where: { id: blocked_tutors },
    });
    res.status(202);
    res.send(tutorlist);
    res.end();
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}

export async function blockTutor(req: Request, res: Response) {
  try {
    const { id, dir } = req.params;
    const student = await StudentModel.findOne({
      where: { id: id },
    });
    if (dir === 'push') {
      const { tutor_id } = req.body;
      let updatedStudent: [number, Student[]] | null = null;
      if (!student.blocked_tutors.includes(tutor_id)) {
        updatedStudent = await StudentModel.update(
          {
            blocked_tutors: sequelize.fn(
              'array_append',
              sequelize.col('blocked_tutors'),
              tutor_id
            ),
          },
          { where: { id: id }, returning: true }
        );
      }
      const dbRes =
        updatedStudent && updatedStudent[0] > 0
          ? updatedStudent[1][0]
          : student;
      res.status(202);
      res.send(dbRes);
      res.end();
    } else if (dir === 'remove') {
      const { tutor_id } = req.body;
      let updatedStudent: [number, Student[]] | null = null;
      if (student.blocked_tutors.includes(tutor_id)) {
        updatedStudent = await StudentModel.update(
          {
            blocked_tutors: sequelize.fn(
              'array_remove',
              sequelize.col('blocked_tutors'),
              tutor_id
            ),
          },
          { where: { id: id }, returning: true }
        );
      }
      const dbRes =
        updatedStudent && updatedStudent[0] > 0
          ? updatedStudent[1][0]
          : student;
      res.status(202);
      res.send(dbRes);
      res.end();
    } else if (dir === 'replace') {
      const studentReq = req.body;
      const dbRes = await StudentModel.update(
        { blocked_tutors: studentReq.tutor_id },
        {
          where: { id: id },
          returning: true,
        }
      );
      if (dbRes[0] > 0) {
        res.status(202);
        res.send(dbRes[1][0]);
        res.end();
      } else {
        res.status(404);
        res.send(`Student id ${id} not found`);
        res.end();
      }
    }
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}
