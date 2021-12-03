import sequelize from 'sequelize';
const { Model, DataTypes } = sequelize;
import sequelizeConnection from './sequelize.js';
import Tutor from '../types/tutor.d.js';

class TutorModel extends Model<Tutor> {
  public id: string;
  public email: string;
  public name: string;
  public joined_date: Date;
  public photo_url: string;
  public spoken_language: string[];
  public location: string;
  public avg_rating: number;
  public completed_help_requests: number;
  public tags: string[];
  public programming_languages: string[];
  public bio: string;
  public time_completed: number;
}

TutorModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    joined_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    photo_url: {
      type: DataTypes.STRING,
    },
    spoken_language: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: ['English'],
    },
    location: {
      type: DataTypes.STRING,
    },
    avg_rating: {
      type: DataTypes.INTEGER,
    },
    completed_help_requests: {
      type: DataTypes.INTEGER,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    programming_languages: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    bio: {
      type: DataTypes.TEXT,
    },
    time_completed: {
      type: DataTypes.INTEGER,
    },
  },
  { modelName: 'Tutor', tableName: 'tutor', sequelize: sequelizeConnection }
);

export default TutorModel;
