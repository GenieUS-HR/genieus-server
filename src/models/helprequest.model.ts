/* eslint-disable @typescript-eslint/no-empty-interface */
import sequelize from 'sequelize';
const { Model, DataTypes } = sequelize;
import sequelizeConnection from './sequelize.js';
import HelpRequest from '../types/helprequest';
import StudentModel from './student.model.js';
import TutorModel from './tutor.model.js';

class HelpRequestModel extends Model<HelpRequest> {
  public id: string;
  public status: string;
  public description: string;
  public time_opened: Date;
  public time_accepted: Date;
  public time_closed: Date;
  public rating: number;
  public feedback_comments: string;
  public tags: string[];
  public language: string;
  public code: string;
  public zoom_url: string;
  public call_length: number;
  public favourites_only: boolean;
  public tutor_id: string;
  public student_id: string;
  public student: {
    id: string;
    name: string;
    photo_url: string;
  };
  public tutor: {
    id: string;
    name: string;
    photo_url: string;
  };
}

HelpRequestModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    time_opened: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time_accepted: {
      type: DataTypes.DATE,
    },
    time_closed: {
      type: DataTypes.DATE,
    },
    rating: {
      type: DataTypes.INTEGER,
    },
    feedback_comments: {
      type: DataTypes.TEXT,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.TEXT,
    },
    zoom_url: {
      type: DataTypes.STRING,
    },
    call_length: {
      type: DataTypes.INTEGER,
    },
    favourites_only: {
      type: DataTypes.BOOLEAN,
    },
    tutor_id: {
      type: DataTypes.STRING,
    },
    student_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: 'HelpRequest',
    tableName: 'helprequest',
    sequelize: sequelizeConnection,
  }
);

HelpRequestModel.belongsTo(StudentModel, {
  foreignKey: 'student_id',
  targetKey: 'id',
  as: 'student',
});
HelpRequestModel.belongsTo(TutorModel, {
  foreignKey: 'tutor_id',
  targetKey: 'id',
  as: 'tutor',
});

export default HelpRequestModel;
