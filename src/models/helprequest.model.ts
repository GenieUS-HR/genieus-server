/* eslint-disable @typescript-eslint/no-empty-interface */
import sequelize from 'sequelize';
const { Model, DataTypes } = sequelize;
import sequelizeConnection from './sequelize.js';
import HelpRequest from '../types/helprequest';

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
  public tutor: {
    tutor_id: string;
    tutor_name: string;
    tutor_photo_url: string;
  };
  public student: {
    student_id: string;
    student_name: string;
    student_photo_url: string;
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
    tutor: {
      type: DataTypes.JSON,
    },
    student: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    modelName: 'HelpRequest',
    tableName: 'helprequest',
    sequelize: sequelizeConnection,
  }
);

export default HelpRequestModel;
