import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import sequelize from 'sequelize';
const { Op } = sequelize;
import HelpRequest, {
  HelpRequestRequest,
  HelpRequestResponse,
  HelpRequestUpdate,
} from '../types/helprequest.js';
import HelpRequestModel from '../models/helprequest.model.js';
import TutorModel from '../models/tutor.model.js';
import StudentModel from '../models/student.model.js';

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

type HelpRequestParams = {
  limit_responses?: number;
  student_id?: HelpRequestModel['student_id'];
  tutor_id?: HelpRequestModel['tutor_id'];
  language?: HelpRequestModel['language'];
  status?: HelpRequestModel['status'];
};

export async function getFilteredHelpRequests(req: Request, res: Response) {
  try {
    const { limit_responses, ...query }: HelpRequestParams = req.query;
    let dbRes;
    if (typeof limit_responses === 'number') {
      dbRes = await HelpRequestModel.findAll({
        where: query,
        limit: limit_responses,
      });
    } else {
      dbRes = await HelpRequestModel.findAll({
        where: query,
      });
    }
    res.status(202);
    res.send(dbRes);
    res.end();
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}

export async function getPendingHelpRequests(req: Request, res: Response) {
  try {
    const tutor_id = req.params.tutor_id;
    const tutor = await TutorModel.findOne({
      attributes: ['programming_languages'],
      where: { id: tutor_id },
    });
    const blockingStudents = await getBlockingStudents(tutor_id);
    const followingStudents = await getFollowingStudents(tutor_id);
    const pendingHelpRequests = await HelpRequestModel.findAll({
      where: {
        status: 'pending',
        language: { [Op.in]: tutor.programming_languages },
        student_id: { [Op.notIn]: blockingStudents },
      },
      order: [['time_opened', 'ASC']],
    });
    const availableHelpRequests = pendingHelpRequests.filter((hr) =>
      hr.favourites_only ? followingStudents.includes(hr.student_id) : true
    );
    res.status(200);
    res.send(availableHelpRequests);
    res.end();
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
}

// check if any students blocked the tutor
async function getBlockingStudents(tutor_id: string) {
  const blockingStudents = await StudentModel.findAll({
    attributes: ['id'],
    where: {
      blocked_tutors: {
        [Op.contains]: [tutor_id],
      },
    },
  });
  return blockingStudents.map((student) => student.id);
}

async function getFollowingStudents(tutor_id: string) {
  const followingStudents = await StudentModel.findAll({
    attributes: ['id'],
    where: {
      favourite_tutors: {
        [Op.contains]: [tutor_id],
      },
    },
  });
  return followingStudents.map((student) => student.id);
}
