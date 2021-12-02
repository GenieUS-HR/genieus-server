import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import HelpRequest, {
  HelpRequestRequest,
  HelpRequestResponse,
  HelpRequestUpdate,
} from '../types/helprequest.js';
import HelpRequestModel from '../models/helprequest.model.js';
import TutorModel from '../models/tutor.model.js';
import StudentModel from '../models/student.model.js';

export async function getAllHelpRequests(req: Request, res: Response) {
  try {
    const dbRes = (await HelpRequestModel.findAll({
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
    })) as HelpRequestResponse[];
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
    const dbRes = (await HelpRequestModel.findOne({
      where: { id: helprequestId },
    })) as HelpRequestResponse;
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
    const helpreqeustReq: HelpRequestRequest = req.body;
    const helprequest: HelpRequest = {
      ...helpreqeustReq,
      id: randomUUID(),
      status: 'pending',
      time_opened: new Date(),
      time_accepted: null,
      time_closed: null,
      rating: null,
      feedback_comments: null,
      zoom_url: null,
      call_length: null,
      tutor_id: null,
    };
    const dbRes = (await HelpRequestModel.create(
      helprequest
    )) as HelpRequestResponse;
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

// after feedback is submitted by student, recalc avg rating and increase # closed HR
// Faster approach to update tutor rating without querying all help requests (but not as reliaable)
// if duplicate requests are submitted ratings and completed would be incorrect
// async function updateTutorAfterRating(tutor_id: string, rating: number) {
//   const tutor = await TutorModel.findOne({ where: { id: tutor_id } });
//   const newAverageRating =
//     (tutor.avg_rating * tutor.completed_help_requests + rating) /
//     (tutor.completed_help_requests + 1);
//   TutorModel.update(
//     {
//       avg_rating: newAverageRating,
//       completed_help_requests: tutor.completed_help_requests + 1,
//     },
//     { where: { id: tutor_id } }
//   );
// }
async function updateTutorAvgRating(tutor_id: string) {
  const helpRequests = await HelpRequestModel.findAll({
    attributes: ['rating'],
    where: { tutor_id },
  });
  const avgRating = helpRequests.reduce((acc, curr) => acc + curr.rating, 0);
  TutorModel.update(
    {
      avg_rating: avgRating,
      completed_help_requests: helpRequests.length,
    },
    { where: { id: tutor_id } }
  );
}

export async function updateHelpRequest(req: Request, res: Response) {
  try {
    const helprequestId = req.params.id;
    const helprequestReq: HelpRequestUpdate = req.body;
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
    updateTutorAvgRating(original.tutor_id);
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
