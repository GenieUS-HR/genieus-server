import db from '../mocks/db.mock.js';
import { Request, Response } from 'express';
import student from '../types/student.js';
import StudentModel from '../models/student.model.js';

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
    const dbRes = await db.Student.updateStudent(studentId, studentReq);
    res.status(202);
    res.send(dbRes);
    res.end();
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}

export async function getFavouriteTutor(req: Request, res: Response) {
  try {
    const studentId = req.params.id;
    const dbRes = await db.Student.getFavouriteTutor(studentId);
    res.status(202);
    res.send(dbRes);
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
    const studentReq = req.body;
    const dbRes = await db.Student.setFavouriteTutor(
      studentId,
      studentReq.tutor_id
    );
    res.status(202);
    res.send(dbRes);
    res.end();
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
