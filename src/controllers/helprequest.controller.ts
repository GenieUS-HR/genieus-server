import db from '../mocks/db.mock.js';
import { Request, Response } from 'express';
import helprequest from '../types/helprequest.js';

export async function getAllHelpRequests(req: Request, res: Response) {
  try {
    const dbRes = await db.HelpRequest.getAll();
    res.status(200);
    res.send(dbRes);
    res.end();
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}

export async function getHelpRequest(req: Request, res: Response) {
  try {
    const helprequestId = req.params.id;
    const dbRes = await db.HelpRequest.getHelpRequest(helprequestId);
    if (dbRes) {
      res.status(200);
      res.send(dbRes);
      res.end();
    } else {
      res.status(404);
      res.send(`no help requests found with id ${helprequestId}`);
      res.end();
    }
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}

export async function addHelpRequest(req: Request, res: Response) {
  try {
    const helpreqeustReq = req.body;
    const helprequest: helprequest = {
      ...helpreqeustReq,
      id: Math.random().toString(36).substr(2, 16), // how to set id?
      status: 'pending',
      time_opened: new Date(),
      time_accepted: null,
      time_closed: null,
      rating: null,
      feedback_comments: null,
      zoom_url: null,
      call_length: null,
      tutor: null,
    };
    const dbRes = await db.HelpRequest.addHelpRequest(helprequest);
    res.status(201);
    res.send(dbRes);
    res.end();
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}

export async function deleteHelpRequest(req: Request, res: Response) {
  try {
    const helprequestId = req.params.id;
    await db.HelpRequest.deleteHelpRequest(helprequestId);
    res.sendStatus(204);
    res.end();
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}

export async function updateHelpRequest(req: Request, res: Response) {
  try {
    const helprequestId = req.params.id;
    const helprequestReq = req.body;
    const dbRes = await db.HelpRequest.updateHelpRequest(
      helprequestId,
      helprequestReq
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
