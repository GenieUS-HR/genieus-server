import db from '../mocks/db.mock.js';
import { Request, Response } from 'express';

export async function getAllStudents(req: Request, res: Response) {
  try {
    const dbRes = await db.Student.getAll();
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
    const dbRes = await db.Student.getStudent(studentId);
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
    const student = {
      ...studentReq,
      joined_date: new Date(),
      last_payment_date: new Date(),
      subscription_expiry: new Date(),
      favourite_tutors: [],
      blocked_tutors: [],
      bio: '',
    };
    const dbRes = await db.Student.addStudent(student);
    res.status(201);
    res.send(dbRes);
    res.end();
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}
