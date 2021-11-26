import db from '../mocks/db.mock.js';
import { Request, Response } from 'express';

export async function getAllTutors(req: Request, res: Response) {
  try {
    const dbRes = await db.Tutor.getAll();
    res.status(200);
    res.send(dbRes);
    res.end();
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}

export async function getTutor(req: Request, res: Response) {
  try {
    const tutorId = req.params.id;
    const dbRes = await db.Tutor.getTutor(tutorId);
    if (dbRes) {
      res.status(200);
      res.send(dbRes);
      res.end();
    } else {
      res.status(404);
      res.send(`no tutors found with id ${tutorId}`);
      res.end();
    }
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}

export async function addTutor(req: Request, res: Response) {
  try {
    const tutorReq = req.body;
    const tutor = {
      ...tutorReq,
      joined_date: new Date(),
      bio: '',
      tags: [],
      programming_languages: [],
    };
    const dbRes = await db.Tutor.addTutor(tutor);
    res.status(201);
    res.send(dbRes);
    res.end();
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}

export async function deleteTutor(req: Request, res: Response) {
  try {
    const tutorId = req.params.id;

    await db.Tutor.deleteTutor(tutorId);
    res.sendStatus(204);
    res.end();
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}

export async function updateTutor(req: Request, res: Response) {
  try {
    const tutorId = req.params.id;
    const tutorReq = req.body;
    const dbRes = await db.Tutor.updateTutor(tutorId, tutorReq);
    res.status(202);
    res.send(dbRes);
    res.end();
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}
