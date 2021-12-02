import { Request, Response } from 'express';
import helprequest from '../types/helprequest.js';
import HelpRequestModel from '../models/helprequest.model.js';
import TutorModel from '../models/tutor.model.js';
import StudentModel from '../models/student.model.js';

// include student/tutor name and photo in the response
// async function attachTutor(tutor_id: string) {
//   const { id, name, photo_url } = await TutorModel.findOne({
//     attributes: ['id', 'name', 'photo_url'],
//     where: { id: tutor_id },
//   });
//   return { id, name, photo_url };
// }
// async function attachStudent(student_id: string) {
//   const { id, name, photo_url } = await StudentModel.findOne({
//     attributes: ['id', 'name', 'photo_url'],
//     where: { id: student_id },
//   });
//   return { id, name, photo_url };
// }

export async function getAllHelpRequests(req: Request, res: Response) {
  try {
    const dbRes = await HelpRequestModel.findAll({
      include: [
        {
          model: StudentModel,
          as: 'student',
          attributes: ['id', 'name', 'photo_url'],
        },
        {
          model: TutorModel,
          as: 'tutor',
          attributes: ['id', 'name', 'photo_url'],
        },
      ],
    });
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
    const dbRes = await HelpRequestModel.findOne({
      where: { id: helprequestId },
    });
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
    const dbRes = await HelpRequestModel.create(helprequest);
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
    await HelpRequestModel.destroy({ where: { id: helprequestId } });
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
    const original = await HelpRequestModel.findOne({
      where: { id: helprequestId },
    });
    if (Object.keys(helprequestReq).includes('status')) {
      if (helprequestReq.status === 'assigned') {
        // TODO need to create zoom link !
        helprequestReq.time_accepted = new Date();
      } else if (
        helprequestReq.status === 'closed-complete' ||
        helprequestReq.status === 'closed-incomplete'
      ) {
        helprequestReq.time_closed = new Date();
        const start = new Date(original.time_accepted).getTime();
        const end = new Date(helprequestReq.time_closed).getTime();
        helprequestReq.call_length = Math.floor((end - start) / 1000);
      }
    }
    const dbRes = await HelpRequestModel.update(helprequestReq, {
      where: { id: helprequestId },
      returning: true,
    });
    res.status(202);
    res.send(dbRes[1][0]);
    res.end();
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}

export async function getFilteredHelpRequests(req: Request, res: Response) {
  try {
    // const { student_id, tutor_id, status, language, limit_responses } =
    //   req.query;
    // const dbRes = await HelpRequestModel.findAll({
    //   where: {},
    // });
    // res.status(202);
    // res.send(dbRes);
    // res.end();
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}

export async function getPendingHelpRequests(req: Request, res: Response) {
  try {
    // const tutorId = req.params.id;
    // const dbRes = await db.HelpRequest.getPendingHelpRequests(tutorId);
    // res.status(202);
    // res.send(dbRes);
    // res.end();
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}
