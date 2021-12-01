import { Request, Response } from 'express';
import tutor from '../types/tutor.js';
import TutorModel from '../models/tutor.model.js';

export async function getAllTutors(req: Request, res: Response) {
  try {
    const dbRes = await TutorModel.findAll();
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
    const dbRes = await TutorModel.findOne({ where: { id: tutorId } });
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
    const tutor: tutor = {
      ...tutorReq,
      joined_date: new Date(),
      bio: '',
      tags: [],
      programming_languages: [],
    };
    const dbRes = await TutorModel.create(tutor);
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
    await TutorModel.destroy({ where: { id: tutorId } });
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
    const dbRes = await TutorModel.update(tutorReq, {
      where: { id: tutorId },
      returning: true,
    });
    if (dbRes[0] > 0) {
      res.status(202);
      res.send(dbRes[1][0]);
      res.end();
    } else {
      res.status(404);
      res.send(`Tutor id ${tutorId} not found`);
      res.end();
    }
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}
