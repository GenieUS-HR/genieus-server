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
import createZoom from '../api/create-zoom-meeting.js';

export async function getHelpRequest(req: Request, res: Response) {
  try {
    const helprequestId = req.params.id;
    const dbRes = (await HelpRequestModel.findOne({
      where: { id: helprequestId },
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
    const helprequestReq: HelpRequestRequest = req.body;
    const helprequest: HelpRequest = {
      ...helprequestReq,
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
      interested_tutors: [],
      blocked_tutors: [],
    };
    const createdHR = (await HelpRequestModel.create(
      helprequest
    )) as HelpRequestResponse;
    const dbRes = await HelpRequestModel.findOne({
      where: { id: createdHR.id },
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
    where: { tutor_id, status: ['closed-complete', 'closed-incomplete'] },
  });
  const avgRating =
    helpRequests.reduce((acc, curr) => acc + curr.rating, 0) /
    helpRequests.length;
  TutorModel.update(
    {
      avg_rating: avgRating,
      completed_help_requests: helpRequests.length,
    },
    { where: { id: tutor_id } }
  );
}

function updateStudentTimeRemaining(student_id: string, timeElapsed: number) {
  StudentModel.decrement('time_remaining', {
    by: timeElapsed,
    where: { id: student_id },
  });
}
function updatetutorTimeCompleted(tutor_id: string, timeElapsed: number) {
  TutorModel.increment('time_completed', {
    by: timeElapsed,
    where: { id: tutor_id },
  });
}

function isValidStatus(status: string) {
  return [
    'pending',
    'assigned',
    'closed-complete',
    'closed-incomplete',
  ].includes(status);
}

async function copyHelpRequest(original: HelpRequestModel) {
  return await HelpRequestModel.create({
    student_id: original.student_id,
    description: original.description,
    tags: original.tags,
    language: original.language,
    code: original.code,
    favourites_only: original.favourites_only,
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
    interested_tutors: [],
    blocked_tutors: [],
  });
}

export async function updateHelpRequest(req: Request, res: Response) {
  try {
    const helprequestId = req.params.id;
    const helprequestReq: HelpRequestUpdate = req.body;
    const original = await HelpRequestModel.findOne({
      where: { id: helprequestId },
    });
    if (Object.keys(helprequestReq).includes('status')) {
      if (!isValidStatus(helprequestReq.status)) {
        res.status(400);
        res.send(
          `${helprequestReq.status} is not a valid status. Use 'pending', 'assigned', 'closed-complete', 'closed-incomplete'`
        );
        res.end();
        return;
      }
      if (
        // Go back to pending
        original.status === 'assigned' &&
        helprequestReq.status === 'pending'
      ) {
        helprequestReq.time_accepted = null;
        helprequestReq.tutor_id = null;
      } else if (helprequestReq.status === 'assigned') {
        helprequestReq.time_accepted = new Date();
        const zoomlink = await createZoom();
        helprequestReq.zoom_url = zoomlink;
      } else if (
        helprequestReq.status === 'closed-complete' ||
        helprequestReq.status === 'closed-incomplete'
      ) {
        helprequestReq.time_closed = new Date();
        const start = new Date(original.time_accepted).getTime();
        const end = new Date(helprequestReq.time_closed).getTime();
        const timeElapsed = (helprequestReq.call_length = Math.floor(
          (end - start) / 1000
        ));
        updateStudentTimeRemaining(original.student_id, timeElapsed);
        updatetutorTimeCompleted(original.tutor_id, timeElapsed);

        if (helprequestReq.status === 'closed-incomplete') {
          copyHelpRequest(original);
        }
      }
    }
    await HelpRequestModel.update(helprequestReq, {
      where: { id: helprequestId },
    });
    const dbRes = await HelpRequestModel.findOne({
      where: { id: helprequestId },
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
    if (Object.keys(helprequestReq).includes('rating')) {
      updateTutorAvgRating(original.tutor_id);
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
        order: [['time_opened', 'ASC']],
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
    } else {
      dbRes = await HelpRequestModel.findAll({
        where: query,
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

export async function setInterestedTutor(req: Request, res: Response) {
  try {
    const { id, dir } = req.params;
    const { tutor_id } = req.body;
    if (!tutor_id) {
      res.status(400);
      res.send('error, please provide tutor_id in help request body');
      res.end();
    }
    let dbRes: [number, HelpRequestModel[]];
    if (dir === 'push') {
      dbRes = await HelpRequestModel.update(
        {
          interested_tutors: sequelize.fn(
            'array_append',
            sequelize.col('interested_tutors'),
            tutor_id
          ),
        },
        { where: { id }, returning: true }
      );
    } else if (dir === 'remove') {
      dbRes = await HelpRequestModel.update(
        {
          interested_tutors: sequelize.fn(
            'array_remove',
            sequelize.col('interested_tutors'),
            tutor_id
          ),
          blocked_tutors: sequelize.fn(
            'array_append',
            sequelize.col('blocked_tutors'),
            tutor_id
          ),
        },
        { where: { id }, returning: true }
      );
    } else {
      res.status(404);
      res.send('error, valid endpoints are interested/:id/push and /remove');
      res.end();
    }
    res.status(202);
    res.send(dbRes[1][0]);
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
