import db from '../mocks/db.mock.js';
import { Request, Response } from 'express';
import student from '../types/student.js';
import StudentModel from '../models/student.model.js';
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
    const studentReq = req.body;
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
    res.status(202);
    res.send(favourite_tutors);
    res.end();
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}

export async function setFavouriteTutor(req: Request, res: Response) {
  try {
    const studentId = req.params.id;
    const { tutor_id } = req.body;
    const student = await StudentModel.findOne({
      where: { id: studentId },
    });
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
        { where: { id: studentId }, returning: true }
      );
    }
    const dbRes =
      updatedStudent && updatedStudent[0] > 0 ? updatedStudent[1][0] : student;
    res.status(202);
    res.send(dbRes);
    res.end();
    // const dbRes = sequelizeConnection.query(
    //   `UPDATE student SET favourite_tutors = (select array_agg(distinct e) from unnest(favourite_tutors || '{${tutor_id}}') e) WHERE  id = '${studentId}' AND NOT favourite_tutors @> '{${tutor_id}}';`
    // );
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}

export async function getBlockTutor(req: Request, res: Response) {
  try {
    const studentId = req.params.id;
    const dbRes = await db.Student.getBlockTutor(studentId);
    res.status(202);
    res.send(dbRes);
    res.end();
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}

export async function blockTutor(req: Request, res: Response) {
  try {
    const studentId = req.params.id;
    const studentReq = req.body;
    const dbRes = await db.Student.blockTutor(studentId, studentReq.tutor_id);
    res.status(202);
    res.send(dbRes);
    res.end();
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}
